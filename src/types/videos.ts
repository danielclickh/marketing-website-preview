import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface VideoCategory {
  id: number
  CategoryName: string
}

export interface Video {
  id: number
  Slug: string
  VideoID: string
  Title: null | string
  IntroText: null | string
  Description?: null | string
  categories: Array<VideoCategory>
  RelatedVideos: Array<Video>
  VideoDate?: null | string
  promotion?: {
    title: string
    description: string
    image: StrapiImageType
  }
  seo?: CommonProps['seo']
  publishedAt: string
}

export interface VideosPageProps extends CommonProps {
  title: string
  initialData: null | VideosApiResponse
}

export interface VideosInnerPageProps extends CommonProps {
  title: string
  video: Video
  prevVideo: null | Video
  nextVideo: null | Video
  relatedVideos: Array<Video>
}

export interface VideosApiResponse {
  data: {
    videos: Array<Video>
    categories: Record<string, string>
  }
  params: {
    search: null | string
    category: null | string
  }
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}
