import StrapiAuthorMeta from '@/components-cleaned/StrapiAuthorMeta'
import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUILink } from '@/components/ClickUI'
import FollowUs from '@/components/FollowUs'
import Pagination from '@/components/Pagination'
import Layout from '@/components/jp/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { useDebounce } from '@/hooks'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateBlogArchiveSchema } from '@/lib/schema'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { fetchBlogs } from '@/pages/api/blog'
import { BlogApiResponse, BlogProps } from '@/types/blogs'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export const getServerSideProps: GetServerSideProps<BlogProps> =
  async function getServerSideProps(context) {
    // Current page params
    const { hero, seo } = await findOne('blog', {
      populate: ['hero', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    const { page = 1, search = null } = context.query || {}
    const initialData = await fetchBlogs({ page, search, locale: 'jp' })

    seo.locale = 'ja_JP'
    seo.path = '/jp/blog'
    seo.title = 'ClickHouse ブログ'
    seo.schema = generateBlogArchiveSchema({ path: '/jp/blog' })
    seo.languages = ['en', 'ja']

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
  headerData
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
  const [search, setSearch] = useState<BlogApiResponse['params']['search']>(
    response?.params?.search || null
  )

  const currentPage = page > 1 ? page : 1

  const featuredBlog = response?.data?.featured || null
  const blogs = response?.data?.blogs || []

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearch(e.target.value)
  }

  const backToTop = () => {
    setTimeout(() => {
      window.scroll({
        top: (scrollToContainer?.current?.offsetTop || 0) - 100
      })
    }, 0)
  }

  // On states changed
  useEffect(() => {
    // Condition prevent double loading
    if (
      router.isReady &&
      (page !== response?.pagination?.page ||
        search !== response?.params?.search)
    ) {
      ;(async function () {
        // Show loading screen
        setLoading(true)

        const params = new URLSearchParams()
        if (page && page > 1) params.set('page', page.toString())
        if (search) params.set('search', search)
        const paramsString = Array.from(params).length ? `?${params}` : ''

        // Update URL
        router.push(`/jp/blog${paramsString}`, undefined, {
          shallow: true
        })

        // Make request
        params.set('locale', 'jp')
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
    }
  }, [page, search])

  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        <SuiTitle type='h1'>ブログ</SuiTitle>
      </div>
      {featuredBlog && (
        <div className='section-container'>
          <CUILink
            href={`/jp/blog/${featuredBlog.slug}`}
            className='mb-16 mt-2 flex w-full flex-col gap-y-8 rounded-xl hover:no-underline hover:shadow-card lg:flex-row-reverse lg:gap-x-12 xl:gap-x-24'>
            {featuredBlog.thumbnailPng && (
              <div className='lg:w-1/2'>
                <StrapiImage
                  entry={featuredBlog.thumbnailPng}
                  loading='eager'
                  priority
                  width={640}
                  height={640}
                  className='overflow-hidden rounded-lg'
                />
              </div>
            )}
            <div className='flex w-full flex-col justify-start border-l-8 border-primary-300 pl-6 lg:w-1/2 lg:flex-1'>
              <SuiTitle type='h2' className='text-neutral-100'>
                {featuredBlog.title}
              </SuiTitle>
              <div className='my-8 text-neutral-200'>
                {featuredBlog.shortDescription}
              </div>

              <StrapiAuthorMeta
                authors={featuredBlog.author}
                profileLinks={false}
                extras={[
                  featuredBlog.date || featuredBlog.publishedAt
                    ? convertDateToString(
                        featuredBlog.date || featuredBlog.publishedAt
                      )
                    : null,
                  featuredBlog.reading_time_override ||
                  featuredBlog.reading_time
                    ? `${featuredBlog.reading_time_override || featuredBlog.reading_time} 分で読める`
                    : null
                ]}
              />
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
            defaultValue={search || ''}
            placeholder='タイトルまたはキーワードで検索...'
            htmlFor='search'
            className='mb-6 lg:mb-0 lg:flex-1'
            onChange={useDebounce(onSearchChange, 500)}
            inputRef={inputRef}
          />
        </div>

        {loading && <p className='mt-12 w-full text-center'>読み込み中...</p>}

        {!loading && !blogs.length && (
          <>
            <p className='mt-12 w-full text-center'>
              {currentPage > 1 && (
                <>
                  このページには結果がありません,{' '}
                  <button
                    className='font-bold text-primary-300 underline'
                    onClick={() => setPage(1)}>
                    1ページ目へ
                  </button>
                </>
              )}
              {currentPage === 1 && (
                <>
                  {search ? `"${search}" の検索結果はありません` : '結果なし'}
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
                  <StrapiBlogPostCard key={blog.id} entry={blog} />
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
