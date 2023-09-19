import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import FollowUs from '../../../components/FollowUs'
import Layout from '../../../components/Layout'
import { SuiButton, SuiTitle } from '../../../components/sui'
import VideoCard from '../../../components/VideoCard'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { slugify } from "../../../lib/utils/strings";
import { CommonProps } from '../../../types/homepage'
import { Video } from '../../../lib/videos/types'
import { getVideos, getVideo } from '../../../lib/videos'
import ResponsiveEmbed from '../../../components/ResponsiveEmbed'

interface VideoPageProps extends CommonProps {
  video: Video|null,
  nextVideo: Video|null,
  prevVideo: Video|null,
}

interface VideoPageParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getVideos().map(video => {
      return {
        params: { slug: video.slug }
      }
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as VideoPageParams

  const video = getVideo(slug);
  if (video) {

    const thisIndex = getVideos().findIndex(vid => vid.slug === video.slug)
    const nextVideo = getVideos().at(thisIndex + 1) || null
    const prevVideo = thisIndex > 0 ? getVideos().at(thisIndex - 1) || null : null

    const props: VideoPageProps = {
      video,
      nextVideo,
      prevVideo,
      seo: {
        title: `${video.title} | ClickHouse Videos`,
        description: video.description,
        imageUrl: video.thumbnail,
        path: `/videos/${video.slug}`
      },
      ...(await getCommonProps())
    };

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
  video,
  nextVideo,
  prevVideo,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>

      <div className='container mx-auto flex max-w-3xl flex-col px-6 2xl:px-0 my-20'>
        <div className='mx-auto flex flex-col text-center'>
          <h4 className='text-base font-semibold text-primary-300'>
            <Link href='/videos'>Videos</Link>{video.categories?.[0] && ` / `}
            {video.categories?.[0] && <Link href={`/videos?category=${slugify(video.categories?.[0])}`}>
              {video.categories?.[0]}
            </Link>}
          </h4>
          <h1 className='mt-6 font-basier text-4xl font-bold text-neutral-100'>
            <span className='leading-snug'>{video.title}</span>
          </h1>
        </div>
      </div>

      <div className='container mx-auto max-w-4xl px-6 2xl:px-0 mt-20 mb-10'>
        <ResponsiveEmbed html={video.embed} />
      </div>

      <div className='container mx-auto max-w-3xl px-6 2xl:px-0 mt-10 mb-20'>
        <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
          {prevVideo && <div>
            <Link href={`/videos/${prevVideo.slug}`} className='block w-full'>
              <SuiButton
                  type='empty'
                  color='primary'
                  className='font-base border border-primary-300/50 hover:translate-y-0 hover:border-primary-400 block w-full hover:no-underline'>
                <div className='flex flex-row-reverse gap-6 items-center w-full'>
                  <div className='text-left flex-grow flex-shrink basis-0 truncate'>
                    <strong className='block font-bold'>Previous video</strong>
                    <span className='block font-normal truncate'>{prevVideo.title}</span>
                  </div>
                  <div className='flex-grow-0 flex-shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                  </div>
                </div>
              </SuiButton>
            </Link>
          </div>}
          {!prevVideo && <div></div>}
          {nextVideo && <div>
            <Link href={`/videos/${nextVideo.slug}`} className='block w-full'>
              <SuiButton
                  type='empty'
                  color='primary'
                  className='font-base border border-primary-300/50 hover:translate-y-0 hover:border-primary-400 block w-full hover:no-underline'>
                <div className='flex flex-row gap-6 items-center w-full'>
                  <div className='text-left flex-grow flex-shrink basis-0 truncate'>
                    <strong className='block font-bold'>Next video</strong>
                    <span className='block font-normal truncate'>{nextVideo.title}</span>
                  </div>
                  <div className='flex-grow-0 flex-shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              </SuiButton>
            </Link>
          </div>}
        </div>
        <div className='flex w-full flex-col gap-3'>
          {video.subTitle && <h2 className='text-xl whitespace-pre-wrap'>{video.subTitle}</h2>}
          {video.description && <p>{video.description}</p>}
        </div>
      </div>

      <div className='flex w-full pb-8 text-neutral-0 my-20'>
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
            {getVideos().filter(item => item.slug !== video.slug).map((item) => {
              return (
                <div key={item.slug}>
                  <VideoCard video={item} />
                </div>
              )
            }).slice(0, 3)}
          </div>
        </div>
      </div>

      <FollowUs />
    </Layout>
  )
}
