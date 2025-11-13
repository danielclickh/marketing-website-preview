import { useDebounce } from '../../../hooks'
import { fetchVideos } from '../../api/videos'
import PillFilters, { Filter } from '@/components-cleaned/PillFilters'
import FollowUs from '@/components/FollowUs'
import Pagination from '@/components/Pagination'
import Layout from '@/components/jp/Layout'
import VideoCard from '@/components/jp/VideoCard'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { VideosApiResponse, VideosPageProps } from '@/types/videos'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export const getServerSideProps: GetServerSideProps<VideosPageProps> =
  async function getServerSideProps(context) {
    const commonProps = await getCommonProps()

    const { page = 1, category = null, search = null } = context.query || {}
    const initialData = await fetchVideos({ page, category, search })

    return {
      props: {
        title: 'ビデオ',
        initialData,
        seo: {
          locale: 'ja_JP',
          title: 'ClickHouse ビデオ | ClickHouse ハウツー ビデオ',
          description:
            '豊富な顧客の声、有益なチュートリアル、魅力的なMeetupの録画をご覧ください。当社の多様なビデオライブラリでデータ分析のレベルを高めましょう。',
          path: '/jp/videos',
          languages: ['en', 'ja']
        },
        ...commonProps
      }
    }
  }

export default function VideosPage({
  title,
  initialData,
  seo,
  headerData,
  footerData
}: VideosPageProps) {
  useGalaxyOnPage('videosPage')

  const router = useRouter()

  const scrollToContainer = useRef<HTMLDivElement>(null)

  const inputRef = useRef<null | HTMLInputElement>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [response, setResponse] = useState<null | VideosApiResponse>(
    initialData
  )
  const [page, setPage] = useState<VideosApiResponse['pagination']['page']>(
    response?.pagination?.page || 1
  )
  const [search, setSearch] = useState<VideosApiResponse['params']['search']>(
    response?.params?.search || null
  )
  const [category, setCategory] = useState<
    VideosApiResponse['params']['category']
  >(response?.params?.category || null)

  const currentPage = page > 1 ? page : 1

  const videos = response?.data?.videos || []
  const categories = response?.data?.categories || {}

  const categoryList = Object.entries(categories).map(([slug, label]) => ({
    kind: 'link',
    label,
    href: `/jp/videos?category=${slug}`,
    onClick(event) {
      event.preventDefault()
      setPage(1)
      setCategory(slug)
    },
    active: category === slug
  })) satisfies Array<Filter>

  categoryList.unshift({
    kind: 'link',
    label: 'すべて表示',
    href: '/jp/videos',
    onClick(event) {
      event.preventDefault()
      setPage(1)
      setSearch(null)
      setCategory(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    active: !category
  })

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
        router.push(`/jp/videos${paramsString}`, undefined, {
          shallow: true
        })

        // Make request
        const response = await fetch(`/api/videos${paramsString}`)

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
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:pt-20'>
        <SuiTitle type='h1'>ビデオ</SuiTitle>
      </div>
      <div
        className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'
        ref={scrollToContainer}>
        <div className='mb-20 flex-col items-center'>
          <SuiSearchField
            defaultValue={search || ''}
            placeholder='タイトルまたはキーワードで検索...'
            htmlFor='search'
            className='mx-auto mb-6 md:max-w-md lg:mb-8'
            onChange={useDebounce(onSearchChange, 500)}
            inputRef={inputRef}
          />
          <PillFilters className='justify-center' options={categoryList} />
        </div>

        {loading && <p className='mt-12 w-full text-center'>読み込み中...</p>}

        {!loading && !videos.length && (
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
                  {search ? `No search results for "${search}"` : 'No results'}
                  {category && category in categories
                    ? ` in ${categories[category]}`
                    : ''}
                </>
              )}
            </p>
          </>
        )}

        {!loading && !!videos.length && (
          <>
            <div className='w-full'>
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {videos.map((video) => (
                  <VideoCard key={video.id} {...video} />
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
