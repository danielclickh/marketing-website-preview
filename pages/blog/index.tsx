import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import BlogPost from '../../components/BlogPostList/BlogPost'
import CategorySelector from '../../components/CategorySelector'
import { CUIButton, CUILink } from '../../components/ClickUI'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import { useDebounce } from '../../hooks'
import { findOne } from '../../lib/api/strapi'
import { convertDateToString } from '../../lib/utils/dateUtils'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { BlogApiResponse, BlogProps } from '../../types/blogs'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps() {
    // Current page params
    const { hero, seo } = await findOne('blog', {
      populate: ['hero', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    seo.path = '/blog'

    return {
      props: {
        title: hero.title,
        description: hero.description,
        seo,
        ...commonProps
      }
    }
  }

export default function BlogsPage({
  title,
  seo,
  headerData,
  footerData
}: BlogProps) {
  galaxyOnPage('blogListPage')

  const router = useRouter()

  const scrollToContainer = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [response, setResponse] = useState<null | BlogApiResponse>(null)
  const [page, setPage] = useState<BlogApiResponse['pagination']['page']>(
    response ? response.pagination.page : 1
  )
  const [search, setSearch] = useState<BlogApiResponse['params']['search']>(
    response ? response.params.search : null
  )
  const [category, setCategory] = useState<
    BlogApiResponse['params']['category']
  >(response ? response.params.category : null)

  const currentPage = page > 1 ? page : 1

  const featuredBlog = response?.data?.featured || null
  const blogs = response?.data?.blogs || []
  const categories = response?.data?.categories || {}
  const hasPrevPage = response && currentPage > 1
  const hasNextPage = response && currentPage < response.pagination.pageCount

  const categoryList = Object.entries(categories).map(([slug, label]) => ({
    text: label,
    onClick: () => {
      setPage(1)
      setCategory(slug)
    },
    selected: category === slug
  }))

  categoryList.unshift({
    text: 'View All',
    onClick: () => {
      setPage(1)
      setCategory(null)
    },
    selected: !category
  })

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearch(e.target.value)
  }

  const pagination = (
    page: number,
    totalPages: number,
    display: number = 5,
    ellipsis = '…'
  ) => {
    const { floor, min, max } = Math
    const range = (lo: number, hi: number) =>
      Array.from({ length: hi - lo }, (_, i) => i + lo)
    const start = max(
      1,
      min(page - floor((display - 3) / 2), totalPages - display + 2)
    )
    const end = min(
      totalPages,
      max(page + floor((display - 2) / 2), display - 1)
    )
    return [
      ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
      ...range(start, end + 1),
      ...(end < totalPages - 1
        ? [ellipsis, totalPages]
        : end < totalPages
        ? [totalPages]
        : [])
    ]
  }

  const backToTop = () => {
    setTimeout(() => {
      scrollToContainer.current?.scrollIntoView({
        behavior: 'smooth'
      })
    })
  }

  // Load values from query string
  useEffect(() => {
    if (router.isReady) {
      const urlCategory = router.query?.category
      const urlSearch = router.query?.search
      const urlPage = Number(router.query?.page || '')

      if (typeof urlCategory === 'string' && urlCategory !== category)
        setCategory(urlCategory)
      if (typeof urlSearch === 'string' && urlSearch !== search)
        setSearch(urlSearch)
      if (!isNaN(urlPage) && urlPage !== page) setPage(urlPage)
    }
  }, [router.isReady])

  // On states changed
  useEffect(() => {
    ;(async function () {
      // Show loading screen
      setLoading(true)

      // Build query
      const params = new URLSearchParams()
      if (page && page > 1) params.set('page', page.toString())
      if (search) params.set('search', search)
      if (category) params.set('category', category)

      // Update URL
      router.push(`/blog?${params}`, undefined, {
        shallow: true
      })

      // Make request
      const response = await fetch(`/api/blog?${params}`)

      // Handle response
      try {
        setResponse(await response.json())
      } catch (e) {
        // Do nothing
      }

      // Hide loading screen
      setLoading(false)
    })()
  }, [page, search, category])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        <SuiTitle type='h1'>{title}</SuiTitle>
        {currentPage > 1 && (
          <p className='text-neutral-300'>Page {currentPage}</p>
        )}
      </div>
      {featuredBlog && (
        <>
          <CUILink
            href={`/blog/${featuredBlog.slug}`}
            className='section-container mt-2 mb-16 flex flex-col gap-10 hover:no-underline md:flex-row'>
            <div className='flex flex-col gap-8 rounded-xl hover:shadow-card lg:flex-row-reverse lg:gap-12 xl:gap-24'>
              {featuredBlog.thumbnailPng && (
                <StrapiImage
                  {...featuredBlog.thumbnailPng}
                  className='h-fit w-full rounded-lg object-cover lg:w-1/2'
                />
              )}
              <div className='grid w-full gap-6 border-l-8 border-primary-300 pl-6'>
                <div className='flex flex-col'>
                  <div className='font-inconsolata font-medium text-primary-300'>
                    {featuredBlog.category}
                  </div>
                  <SuiTitle type='h2' className=' text-neutral-100'>
                    {featuredBlog.title}
                  </SuiTitle>
                  <div className='my-8 text-neutral-200'>
                    {featuredBlog.shortDescription}
                  </div>

                  <div className='flex flex-row items-center space-x-4'>
                    {featuredBlog.author.avatarPng && (
                      <div className='flex aspect-square h-11 w-11'>
                        <StrapiImage
                          {...featuredBlog.author.avatarPng}
                          alt={featuredBlog.author.name}
                          width={44}
                          height={44}
                          className='rounded-full'
                        />
                      </div>
                    )}
                    <div className='flex'>
                      <div className='flex flex-col'>
                        <div className='text-base'>
                          {featuredBlog.author.name}
                        </div>
                        {(featuredBlog.date || featuredBlog.publishedAt) && (
                          <div className='text-sm text-neutral-300'>
                            {convertDateToString(
                              featuredBlog.date || featuredBlog.publishedAt
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CUILink>
        </>
      )}

      <div
        className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'
        ref={scrollToContainer}>
        <div className='flex-col items-center pb-8 lg:flex lg:flex-row lg:justify-between lg:space-x-24'>
          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='mb-6 lg:mb-0 lg:flex-1'
            onChange={useDebounce(onSearchChange, 500)}
          />
          <CategorySelector options={categoryList} />
        </div>

        {loading && <p className='mt-12 w-full text-center'>Loading...</p>}

        {!loading && !blogs.length && (
          <>
            <p className='mt-12 w-full text-center'>
              {search ? `No search results for "${search}"` : 'No results'}
              {category && category in categories
                ? ` in ${categories[category]}`
                : ''}
            </p>
          </>
        )}

        {!(loading && blogs.length) && (
          <>
            <div className='w-full'>
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {blogs.map((blog) => (
                  <BlogPost key={blog.id} {...blog} />
                ))}
              </div>
            </div>

            {(hasPrevPage || hasNextPage) && (
              <div className='my-8 flex items-center justify-center gap-3'>
                <CUIButton
                  type='primary-dark'
                  className={`group !border-primary-300/50 ${
                    !hasPrevPage
                      ? 'pointer-events-none opacity-40'
                      : 'hover:!border-primary-400'
                  }`}
                  onClick={() => {
                    if (hasPrevPage) {
                      setLoading(true)
                      setPage(currentPage - 1)
                      backToTop()
                    }
                  }}>
                  <span className='tanslate-x-0 mr-2 inline-block transition-transform group-hover:-translate-x-1'>
                    &lt;-
                  </span>
                  Prev
                </CUIButton>
                {response &&
                  pagination(page, response.pagination.pageCount).map(
                    (item) => {
                      const isEllipsis = typeof item === 'string'
                      const isActive = currentPage === item
                      return (
                        <div className='!hidden md:!inline-block'>
                          {isEllipsis && <span>{item}</span>}
                          {!isEllipsis && (
                            <CUIButton
                              type={isActive ? 'primary' : 'primary-dark'}
                              className={
                                isActive
                                  ? ''
                                  : '!border-primary-300/50 hover:!border-primary-400'
                              }
                              onClick={() => {
                                setLoading(true)
                                setPage(item)
                                backToTop()
                              }}>
                              {item}
                            </CUIButton>
                          )}
                        </div>
                      )
                    }
                  )}
                <CUIButton
                  type='primary-dark'
                  className={`group !border-primary-300/50 ${
                    !hasNextPage
                      ? 'pointer-events-none opacity-40'
                      : 'hover:!border-primary-400'
                  }`}
                  onClick={() => {
                    if (hasNextPage) {
                      setLoading(true)
                      setPage(currentPage + 1)
                      backToTop()
                    }
                  }}>
                  Next{' '}
                  <span className='tanslate-x-0 ml-2 inline-block transition-transform group-hover:translate-x-1'>
                    -&gt;
                  </span>
                </CUIButton>
              </div>
            )}
          </>
        )}
      </div>

      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
