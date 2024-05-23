import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import FollowUs from '../../../components/FollowUs'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import { SuiButton, SuiTitle } from '../../../components/sui'
import VideoCard from '../../../components/VideoCard'
import { convertDateToString } from '../../../lib/utils/dateUtils'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { slugify } from '../../../lib/utils/strings'
import { CommonProps } from '../../../types/homepage'
import { Video } from '../../../lib/videos/types'
import { getVideos, getVideo } from '../../../lib/videos'
import ResponsiveEmbed from '../../../components/ResponsiveEmbed'

interface VideoPageProps extends CommonProps {
  allVideos: Video[]
  video: Video
  nextVideo: Video | null
  prevVideo: Video | null
}

interface VideoPageParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getVideos()).map((video) => {
      return {
        params: { slug: video.slug }
      }
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<VideoPageProps> = async (
  context
) => {
  const { slug } = context.params as VideoPageParams

  const video = await getVideo(slug)
  if (video) {
    const allVideos = await getVideos()
    const thisIndex = allVideos.findIndex((vid) => vid.slug === video.slug)
    const nextVideo = allVideos.at(thisIndex + 1) || null
    const prevVideo = thisIndex > 0 ? allVideos.at(thisIndex - 1) || null : null

    const props: VideoPageProps = {
      allVideos,
      video,
      nextVideo,
      prevVideo,
      seo: { ...video.seo, ...{ path: `/videos/${video.slug}` } },
      ...(await getCommonProps())
    }

    return {
      props,
      revalidate: REVALIDATE_SECONDS
    }
  }

  return {
    notFound: true,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function VideoPage({
  allVideos,
  video,
  nextVideo,
  prevVideo,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='container mx-auto my-20 flex max-w-3xl flex-col px-6 2xl:px-0'>
        <div className='mx-auto flex flex-col text-center'>
          <h4 className='text-base font-semibold text-primary-300'>
            <Link href='/videos'>Videos</Link>
            {video.categories?.[0] && ` / `}
            {video.categories?.[0] && (
              <Link href={`/videos?category=${slugify(video.categories?.[0])}`}>
                {video.categories?.[0]}
              </Link>
            )}
          </h4>
          <h1 className='mt-6 font-basier text-4xl font-bold text-neutral-100'>
            <span className='leading-snug'>{video.title}</span>
          </h1>
        </div>
      </div>

      <div className='container mx-auto mt-20 mb-10 max-w-4xl px-6 2xl:px-0'>
        <ResponsiveEmbed html={video.embed} />
      </div>

      <div className='container mx-auto mt-10 mb-20 max-w-3xl px-6 2xl:px-0'>
        <div className='mb-10 grid w-full grid-cols-1 gap-8 md:grid-cols-2'>
          {prevVideo && (
            <div>
              <Link href={`/videos/${prevVideo.slug}`} className='block w-full'>
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
                        {prevVideo.title}
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
              <Link href={`/videos/${nextVideo.slug}`} className='block w-full'>
                <SuiButton
                  type='empty'
                  color='primary'
                  className='font-base block w-full border border-primary-300/50 hover:translate-y-0 hover:border-primary-400 hover:no-underline'>
                  <div className='flex w-full flex-row items-center gap-6'>
                    <div className='flex-shrink flex-grow basis-0 truncate text-left'>
                      <strong className='block font-bold'>Next video</strong>
                      <span className='block truncate font-normal'>
                        {nextVideo.title}
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
          {video.subTitle && (
            <h2 className='whitespace-pre-wrap text-xl'>{video.subTitle}</h2>
          )}
          {video.description && <Markdown>{video.description}</Markdown>}
        </div>
      </div>

      <div className='my-20 flex w-full pb-8 text-neutral-0'>
        <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pt-12 pb-8 md:bg-no-repeat 2xl:px-0'>
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
            {allVideos
              // Make sure not to display the same video
              .filter((item) => {
                return item.slug !== video.slug
              })

              // Order videos by those with matching categories
              .sort((a, b) => {
                // Related item to the top!
                if (video.related.length && video.related.includes(a.id)) {
                  return -1
                }

                // Find matching categories for a
                const aCategories = a.categories.filter((cat) =>
                  video.categories.includes(cat)
                )

                // Find matching categories for b
                const bCategories = b.categories.filter((cat) =>
                  video.categories.includes(cat)
                )

                // A negative value indicates that a should come before b.
                // A positive value indicates that a should come after b.
                // Zero or NaN indicates that a and b are considered equal.
                return bCategories.length - aCategories.length
              })

              // Limit selection to 3 items
              .slice(0, 3)

              // Render video cards
              .map((item) => {
                return (
                  <div key={item.slug}>
                    <VideoCard video={item} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      <FollowUs />
    </Layout>
  )
}
