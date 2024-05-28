import { GetServerSideProps } from 'next'
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
import { fetchBlogs } from '../api/blog'

export const getServerSideProps: GetServerSideProps<BlogProps> =
  async function getServerSideProps(context) {
    // Current page params
    const { hero, seo } = await findOne('blog', {
      populate: ['hero', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    const { page = 1, category = null, search = null } = context.query || {}
    const initialData = await fetchBlogs({ page, category, search })

    seo.path = '/blog'

    return {
      props: {
        title: hero.title,
        description: hero.description,
        initialData,
        seo,
        ...commonProps
      }
    }
  }

export default function BlogsPage({
  title,
  initialData,
  seo,
  headerData,
  footerData
}: BlogProps) {
  galaxyOnPage('blogListPage')

  const router = useRouter()

  const scrollToContainer = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [response, setResponse] = useState<null | BlogApiResponse>(initialData)
  const [page, setPage] = useState<BlogApiResponse['pagination']['page']>(
    response?.pagination?.page || 1
  )
  const [search, setSearch] = useState<BlogApiResponse['params']['search']>(
    response?.params?.search || null
  )
  const [category, setCategory] = useState<
    BlogApiResponse['params']['category']
  >(response?.params?.category || null)

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
      window.scroll({
        top: (scrollToContainer?.current?.offsetTop || 0) - 100,
        behavior: 'smooth'
      })
    }, 0)
  }

  // On states changed
  useEffect(() => {
    // Condition prevent double loading
    if (
      router.isReady &&
      (page !== response?.pagination?.page ||
        search !== response?.params?.search ||
        category !== response?.params?.category)
    ) {
      ;(async function () {
        // Show loading screen
        setLoading(true)

        const params = new URLSearchParams()
        if (page && page > 1) params.set('page', page.toString())
        if (search) params.set('search', search)
        if (category) params.set('category', category)
        const paramsString = Array.from(params).length ? `?${params}` : ''

        // Update URL
        router.push(`/blog${paramsString}`, undefined, {
          shallow: true
        })

        // Make request
        const response = await fetch(`/api/blog${paramsString}`)

        // Handle response
        try {
          setResponse(await response.json())
        } catch (e) {
          // Do nothing
        }

        // Hide loading screen
        setLoading(false)
      })()
    }
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
        <div className='section-container'>
          <CUILink
            href={`/blog/${featuredBlog.slug}`}
            className='mt-2 mb-16 flex w-full flex-col gap-y-8 rounded-xl hover:no-underline hover:shadow-card lg:flex-row-reverse lg:gap-x-12 xl:gap-x-24'>
            {featuredBlog.thumbnailPng && (
              <StrapiImage
                {...featuredBlog.thumbnailPng}
                className='h-auto !w-full rounded-lg object-cover lg:!w-1/2 lg:flex-shrink-0 lg:flex-grow-0'
              />
            )}
            <div className='flex w-full flex-col justify-center border-l-8 border-primary-300 pl-6 lg:w-1/2 lg:flex-1'>
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
                  <StrapiImage
                    {...featuredBlog.author.avatarPng}
                    alt={featuredBlog.author.name}
                    width={44}
                    height={44}
                    className='aspect-square !h-11 !w-11 rounded-full'
                  />
                )}
                <div>
                  <div className='text-base'>{featuredBlog.author.name}</div>
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
          </CUILink>
        </div>
      )}

      <div
        className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'
        ref={scrollToContainer}>
        <div
          className={`flex-col items-center pb-8 lg:flex lg:flex-row lg:justify-between lg:space-x-24 ${
            !response ? '!hidden' : ''
          }`}>
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
              {currentPage > 1 && (
                <>
                  No results on this page,{' '}
                  <button
                    className='font-bold text-primary-300 underline'
                    onClick={() => setPage(1)}>
                    go to page 1
                  </button>
                </>
              )}
              {currentPage === 1 && (
                <>
                  {search ? `No search results for "${search}"` : 'No results'}
                  {category && category in categories
                    ? ` in ${categories[category]}`
                    : ''}
                </>
              )}
            </p>
          </>
        )}

        {!loading && !!blogs.length && (
          <>
            <div className='w-full'>
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {blogs.map((blog) => (
                  <BlogPost key={blog.id} {...blog} />
                ))}
              </div>
            </div>

            {(hasPrevPage || hasNextPage) && (
              <div className='my-8 flex items-center justify-center gap-2'>
                <PaginationButton
                  disabled={!hasPrevPage}
                  onClick={() => {
                    if (hasPrevPage) {
                      backToTop()
                      setLoading(true)
                      setPage(currentPage - 1)
                    }
                  }}>
                  <span className='tanslate-x-0 mr-2 inline-block transition-transform group-hover:-translate-x-1'>
                    &lt;-
                  </span>
                  Prev
                </PaginationButton>
                {response &&
                  pagination(page, response.pagination.pageCount).map(
                    (item, index) => {
                      const isEllipsis = typeof item === 'string'
                      const isActive = currentPage === item
                      return (
                        <div key={index} className='!hidden md:!inline-block'>
                          {isEllipsis && (
                            <span className='text-neutral-300'>{item}</span>
                          )}
                          {!isEllipsis && (
                            <PaginationButton
                              active={isActive}
                              onClick={() => {
                                backToTop()
                                setLoading(true)
                                setPage(item)
                              }}>
                              {item}
                            </PaginationButton>
                          )}
                        </div>
                      )
                    }
                  )}
                <PaginationButton
                  disabled={!hasNextPage}
                  onClick={() => {
                    if (hasNextPage) {
                      backToTop()
                      setLoading(true)
                      setPage(currentPage + 1)
                    }
                  }}>
                  Next{' '}
                  <span className='tanslate-x-0 ml-2 inline-block transition-transform group-hover:translate-x-1'>
                    -&gt;
                  </span>
                </PaginationButton>
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

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  disabled?: boolean
}
function PaginationButton({
  active = false,
  disabled = false,
  children,
  className = '',
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={`group rounded border border-transparent px-3 py-1 text-sm transition-colors ${
        disabled
          ? 'pointer-events-none opacity-40'
          : 'hover:border-primary-300/50 hover:text-neutral-100'
      } ${active ? '!border-primary-300 text-white' : 'text-neutral-200'}`}
      {...props}>
      {children}
    </button>
  )
}
