import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from "querystring";
import React from 'react'
import FollowUs from '../../../components/FollowUs'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { CommonProps } from '../../../types/homepage'
import { Video } from '../../../lib/videos/types'
import { getVideos, getVideo } from '../../../lib/videos'
import ResponsiveEmbed from '../../../components/ResponsiveEmbed'

interface VideoPageProps extends CommonProps {
  video: Video|undefined
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

  const props: VideoPageProps = {
    video: getVideo(slug),
    seo: {
      title: 'ClickHouse | Videos',
      description: 'Video page description',
      path: '/videos'
    },
    ...(await getCommonProps())
  };

  if (props.video) {
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
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>

      <div className='max-w-7xl container mx-auto px-8 2xl:px-0'>

        <div className='my-10 text-center'>
          <div className='font-inconsolata text-base font-medium text-primary-300'>
            Videos / {video.categories?.[0]}
          </div>
          <h1 className='font-basier text-4xl font-bold'>{video.title}</h1>
          {video.subTitle && <h2 className='text-2xl mt-2 whitespace-pre-wrap'>{video.subTitle}</h2>}
          {video.description && <p className='mt-10 max-w-2xl mx-auto'>{video.description}</p>}
        </div>

        <ResponsiveEmbed html={video.embed} />

      </div>

      <div className='mt-20'>
        <FollowUs />
      </div>

    </Layout>
  )
}
