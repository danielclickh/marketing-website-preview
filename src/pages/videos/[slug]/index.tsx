import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import { CUICard } from '@/components/ClickUI'
import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import { StrapiImage } from '@/components/StrapiElements'
import VideoCard from '@/components/VideoCard'
import { SuiButton, SuiTitle } from '@/components/sui'
import { fetchAll, findAll, getProxiedMediaUrl } from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { absoluteUrl } from '@/lib/next'
import { generateVideoObjectSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { slugify } from '@/lib/utils/strings'
import { ParamsType } from '@/types/homepage'
import { Video } from '@/types/videos'
import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params as ParamsType
  const { data } = await findAll('marketing-videos', {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: [
      'categories',
      'RelatedVideos',
      'RelatedVideos.categories',
      'RelatedVideos.seo.image',
      'seo',
      'seo.image',
      'promotion',
      'promotion.image'
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
    path: `/videos/${video.Slug}`,
    title: video.Title || video.VideoID
  }

  if (video.seo?.title) seo.title = video.seo.title

  if (video.seo?.description) seo.description = video.seo.description

  if (video.seo?.image) seo.image = [video.seo.image]

  // Use YT thumbnail as fallback seo image
  if (!seo.image) {
    seo.imageUrl = `https://img.youtube.com/vi/${video.VideoID}/maxresdefault.jpg`
  }

  seo.schema = generateVideoObjectSchema({
    title: video.Title || seo.title || `Video: ${video.VideoID}`,
    description: seo.description || video.Description || video.IntroText || '',
    thumbnailUrl: video.seo?.image
      ? getProxiedMediaUrl(video.seo.image.url)
      : `https://img.youtube.com/vi/${video.VideoID}/maxresdefault.jpg`,
    uploadDate: video.publishedAt,
    contentUrl: absoluteUrl(seo.path),
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.VideoID}?rel=0`
  })

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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data = await fetchAll('marketing-videos', {
    fields: ['Slug']
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.Slug }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function VideoPage({
  video,
  nextVideo,
  prevVideo,
  relatedVideos,
  seo,
  headerData,
  footerData
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='container mx-auto my-20 flex max-w-3xl flex-col px-6 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <Breadcrumbs className='justify-center'>
            <Breadcrumbs.Link href='/videos'>Videos</Breadcrumbs.Link>
            {video.categories?.[0] && (
              <Breadcrumbs.Link
                href={`/videos?category=${slugify(
                  video.categories?.[0]?.CategoryName
                )}`}>
                {video.categories?.[0]?.CategoryName}
              </Breadcrumbs.Link>
            )}
          </Breadcrumbs>
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
              <Link href={`/videos/${prevVideo.Slug}`} className='block w-full'>
                <SuiButton
                  type='empty'
                  color='primary'
                  className='font-base block w-full border border-primary-300/50 hover:translate-y-0 hover:border-primary-400 hover:no-underline'>
                  <div className='flex w-full flex-row-reverse items-center gap-6'>
                    <div className='flex-shrink flex-grow basis-0 truncate text-left'>
                      <strong className='block font-bold'>
                        Previous video
                      </strong>
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
                </SuiButton>
              </Link>
            </div>
          )}
          {!prevVideo && <div></div>}
          {nextVideo && (
            <div>
              <Link href={`/videos/${nextVideo.Slug}`} className='block w-full'>
                <SuiButton
                  type='empty'
                  color='primary'
                  className='font-base block w-full border border-primary-300/50 hover:translate-y-0 hover:border-primary-400 hover:no-underline'>
                  <div className='flex w-full flex-row items-center gap-6'>
                    <div className='flex-shrink flex-grow basis-0 truncate text-left'>
                      <strong className='block font-bold'>Next video</strong>
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
                </SuiButton>
              </Link>
            </div>
          )}
        </div>
        <div className='flex w-full flex-col gap-3'>
          {video.IntroText && (
            <h2 className='whitespace-pre-wrap text-xl'>{video.IntroText}</h2>
          )}
          {video.Description && <Markdown>{video.Description}</Markdown>}
          {video.promotion && (
            <div className='mt-8'>
              <CUICard className='border-primary-300'>
                <CUICard.Body className='p-6 text-sm'>
                  <p className='mb-3'>
                    <strong>{video.promotion.title}</strong>
                  </p>
                  <div className='flex flex-col gap-6 md:flex-row md:items-start'>
                    <p>{video.promotion.description}</p>
                    <StrapiImage
                      {...video.promotion.image}
                      className='mx-auto !h-auto !w-36 flex-shrink-0 flex-grow-0 md:mr-0'
                    />
                  </div>
                </CUICard.Body>
              </CUICard>
            </div>
          )}
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
                Recent videos
              </SuiTitle>

              <SuiButton
                path='/videos'
                type='empty'
                color='primary'
                className='font-base border border-primary-300/50'>
                View all Videos
              </SuiButton>
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
