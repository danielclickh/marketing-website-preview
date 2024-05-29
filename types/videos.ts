import { ReactNode } from 'react'
import { StrapiImageProps } from '../components/StrapiElements/types'
import { CommonProps } from './homepage'

export interface Video {
  id: number
  Slug: string
  VideoID: string
  Title: null | string
  IntroText: null | string
  Description?: null | string
  categories: Array<{ CategoryName: string }>
  RelatedVideos: Array<Video>
  VideoDate?: null | string
  seo: null | {
    title?: null | string
    description?: null | string
    image?: null | StrapiImageProps
  }
  publishedAt: string
}

export interface VideosProps extends CommonProps {
  title: string
  initialData: null | VideosApiResponse
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
