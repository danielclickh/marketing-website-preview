import { CUIButton } from '@/components/ClickUI'
import FollowUs from '@/components/FollowUs'
import Markdown from '@/components/Markdown'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import VideoCard from '@/components/VideoCard'
import Layout from '@/components/jp/Layout'
import { SuiTitle } from '@/components/sui'
import { findAll } from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { slugify } from '@/lib/utils/strings'
import { ParamsType } from '@/types/homepage'
import { Video } from '@/types/videos'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as ParamsType
  const { data } = await findAll('marketing-videos', {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: [
      'categories',
      'RelatedVideos',
      'RelatedVideos.categories',
      'RelatedVideos.seo.image',
      'seo',
      'seo.image'
    ],
    filters: {
      Slug: {
        $eq: slug
      }
    },
    pagination: { limit: 1 }
  })

  if (!data?.[0]) {
    return {
      notFound: true
    }
  }

  const video = data[0] as Video

  // Get the next video by querying ids less than the current
  const nextVideoQuery = await findAll('marketing-videos', {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: ['categories', 'seo', 'seo.image'],
    filters: {
      Slug: {
        $ne: slug
      },
      ...(video.VideoDate
        ? {
            VideoDate: {
              $te: video.VideoDate
            },
            publishedAt: {
              $lte: video.publishedAt
            }
          }
        : {
            publishedAt: {
              $lte: video.publishedAt
            }
          })
    },
    pagination: { limit: 1 }
  })

  // Get the previous video by querying ids greater than the current
  const prevVideoQuery = await findAll('marketing-videos', {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: ['categories', 'seo', 'seo.image'],
    filters: {
      Slug: {
        $ne: slug
      },
      ...(video.VideoDate
        ? {
            VideoDate: {
              $gte: video.VideoDate
            },
            publishedAt: {
              $gte: video.publishedAt
            }
          }
        : {
            publishedAt: {
              $gte: video.publishedAt
            }
          })
    },
    pagination: { limit: 1 }
  })

  const prevVideo = (prevVideoQuery.data[0] as Video) || null
  const nextVideo = (nextVideoQuery.data[0] as Video) || null

  // Get or query for related videos
  let relatedVideos = video.RelatedVideos
  if (!relatedVideos.length) {
    const relatedResponse = await findAll('marketing-videos', {
      sort: ['VideoDate:DESC', 'publishedAt:DESC'],
      populate: ['categories', 'seo', 'seo.image'],
      filters: {
        id: {
          $ne: video.id
        },
        categories: {
          id: {
            $in: video.categories ? video.categories.map((cat) => cat.id) : []
          }
        }
      },
      pagination: { limit: 3 }
    })

    relatedVideos = relatedResponse.data as Video[]
  }

  const commonData = await getCommonProps()

  let seo: SeoMetadata = {
    locale: 'ja_JP',
    path: `/jp/videos/${video.Slug}`,
    title: video.Title || video.VideoID,
    languages: ['en', 'ja'],
    lastModified: video.updatedAt
  }

  if (video.seo?.title) seo.title = video.seo.title

  if (video.seo?.description) seo.description = video.seo.description

  if (video.seo?.image) seo.image = [video.seo.image]

  // Use YT thumbnail as fallback seo image
  if (!seo.image)
    seo.imageUrl = `https://img.youtube.com/vi/${video.VideoID}/maxresdefault.jpg`

  return {
    props: {
      video,
      prevVideo,
      nextVideo,
      relatedVideos,
      seo,
      ...commonData
    }
  }
}

export default function VideoPage({
  video,
  nextVideo,
  prevVideo,
  relatedVideos,
  seo,
  headerData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='container mx-auto my-20 flex max-w-3xl flex-col px-6 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <h4 className='text-base font-semibold text-primary-300'>
            <Link href='/jp/videos'>ビデオ</Link>
            {video.categories?.[0] && ' / '}
            {video.categories?.[0] && (
              <Link
                href={`/jp/videos?category=${slugify(
                  video.categories?.[0]?.CategoryName
                )}`}>
                {video.categories?.[0]?.CategoryName}
              </Link>
            )}
          </h4>
          <h1 className='mt-6 font-basier text-4xl font-bold text-neutral-100'>
            <span className='leading-snug'>{video.Title}</span>
          </h1>
        </div>
      </div>

      <div className='container mx-auto mb-10 mt-20 max-w-4xl px-6 2xl:px-0'>
        <ResponsiveEmbed>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.VideoID}?rel=0&autoplay=1`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
        </ResponsiveEmbed>
      </div>

      <div className='container mx-auto mb-20 mt-10 max-w-3xl px-6 2xl:px-0'>
        <div className='mb-10 grid w-full grid-cols-1 gap-8 md:grid-cols-2'>
          {prevVideo && (
            <div>
              <Link
                href={`/jp/videos/${prevVideo.Slug}`}
                className='font-base block w-full rounded-lg border border-primary-300/50 px-4 py-3 text-sm hover:translate-y-0 hover:border-primary-400'>
                <div className='flex w-full flex-row-reverse items-center gap-6'>
                  <div className='flex-shrink flex-grow basis-0 truncate text-left'>
                    <strong className='block font-bold'>前のビデオ</strong>
                    <span className='block truncate font-normal'>
                      {prevVideo.Title}
                    </span>
                  </div>
                  <div className='flex-shrink-0 flex-grow-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'>
                      <path
                        fillRule='evenodd'
                        d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {!prevVideo && <div></div>}
          {nextVideo && (
            <div>
              <Link
                href={`/jp/videos/${nextVideo.Slug}`}
                className='font-base block w-full rounded-lg border border-primary-300/50 px-4 py-3 text-sm hover:translate-y-0 hover:border-primary-400'>
                <div className='flex w-full flex-row items-center gap-6'>
                  <div className='flex-shrink flex-grow basis-0 truncate text-left'>
                    <strong className='block font-bold'>次のビデオ</strong>
                    <span className='block truncate font-normal'>
                      {nextVideo.Title}
                    </span>
                  </div>
                  <div className='flex-shrink-0 flex-grow-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'>
                      <path
                        fillRule='evenodd'
                        d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className='flex w-full flex-col gap-3'>
          {video.IntroText && (
            <h2 className='whitespace-pre-wrap text-xl'>{video.IntroText}</h2>
          )}
          {video.Description && <Markdown>{video.Description}</Markdown>}
        </div>
      </div>

      {!!relatedVideos.length && (
        <div className='my-20 flex w-full pb-8 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pb-8 pt-12 md:bg-no-repeat 2xl:px-0'>
            <div className='flex justify-between pb-8'>
              <SuiTitle
                type='h2'
                className='!text-3xl text-neutral-100'
                weight='semibold'>
                最近の動画
              </SuiTitle>

              <CUIButton href='/jp/videos' type='secondary'>
                すべてのビデオを見る
              </CUIButton>
            </div>
            <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {relatedVideos.map((item) => {
                return <VideoCard key={item.id} {...item} />
              })}
            </div>
          </div>
        </div>
      )}

      <FollowUs />
    </Layout>
  )
}
