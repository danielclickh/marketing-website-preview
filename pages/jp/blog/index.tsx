import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import BlogPost from '../../../components/BlogPostList/BlogPost'
import FollowUs from '../../../components/FollowUs'
import Layout from '../../../components/jp/Layout'
import Pagination from '../../../components/Pagination'
import { SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { BlogApiResponse, BlogProps } from '../../../types/blogs'
import { fetchBlogs } from '../../api/blog'

export const getServerSideProps: GetServerSideProps<BlogProps> =
  async function getServerSideProps(context) {
    // Current page params
    const { hero, seo } = await findOne('blog', {
      populate: ['hero', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    const { page = 1, category = null, search = null } = context.query || {}
    const initialData = await fetchBlogs({ page, category, search })

    seo.path = '/jp/blog'

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
  initialData,
  seo,
  headerData,
  footerData
}: BlogProps) {
  useGalaxyOnPage('blogListPage')

  const router = useRouter()

  const scrollToContainer = useRef<HTMLDivElement>(null)

  const inputRef = useRef<null | HTMLInputElement>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [response, setResponse] = useState<null | BlogApiResponse>(initialData)
  const [page, setPage] = useState<BlogApiResponse['pagination']['page']>(
    response?.pagination?.page || 1
  )

  const [category, setCategory] =
    useState<BlogApiResponse['params']['category']>('community')

  const currentPage = page > 1 ? page : 1
  const blogs = response?.data?.blogs || []
  const categories = response?.data?.categories || {}

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
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    selected: !category
  })

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
        category !== response?.params?.category)
    ) {
      ;(async function () {
        // Show loading screen
        setLoading(true)

        const params = new URLSearchParams()
        if (page && page > 1) params.set('page', page.toString())
        if (category) params.set('category', category)
        const paramsString = Array.from(params).length ? `?${params}` : ''

        // Update URL
        router.push(`/jp/blog${paramsString}`, undefined, {
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
  }, [page, category])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        <SuiTitle type='h1'>ブログ</SuiTitle>
      </div>

      <div
        className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'
        ref={scrollToContainer}>
        <div
          className={`flex-col items-center pb-8 lg:flex lg:flex-row lg:justify-between lg:space-x-24 ${
            !response ? '!hidden' : ''
          }`}></div>

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

            <Pagination
              current={currentPage}
              totalPages={response?.pagination?.pageCount || 0}
              onClick={(targetPage) => {
                backToTop()
                setLoading(true)
                setPage(targetPage)
              }}
            />
          </>
        )}
      </div>

      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
