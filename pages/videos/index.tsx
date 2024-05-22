import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import VideosList from '../../components/VideosList'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'
import { getCategories, getVideos } from '../../lib/videos'
import { Video, VideoCategoryRecord } from '../../lib/videos/types'
import { CommonProps } from '../../types/homepage'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'

interface VideosPageProps extends CommonProps {
  allVideos: Video[]
  allCategories: VideoCategoryRecord
  title: string
}

export async function getStaticProps() {
  const props: VideosPageProps = {
    allVideos: await getVideos(),
    allCategories: await getCategories(),
    title: 'Videos',
    seo: {
      title: 'ClickHouse Videos | ClickHouse How to videos',
      description:
        'Discover a rich collection of customer testimonials, informative how-to tutorials, and engaging Meetup recordings. Elevate your data analytics game with our diverse video library.\n',
      path: '/videos'
    },
    ...(await getCommonProps())
  }

  return {
    props,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function VideosPage({
  allVideos,
  allCategories,
  title,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  galaxyOnPage('videosPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <SuiTitle
        type='h1'
        className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        {title}
      </SuiTitle>
      <VideosList categories={allCategories} videos={allVideos} />
      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
