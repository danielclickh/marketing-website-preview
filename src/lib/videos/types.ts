import { SeoMetadata } from '../api/strapi/types'

export type VideoCategory = string

export type VideoCategoryRecord = Record<string, VideoCategory>

export interface Video {
  id: number
  slug: string
  title: string
  subTitle?: string | null
  description: string | null
  date: null | string
  thumbnail: string
  socialImage?: string
  embed: string
  categories: VideoCategory[]
  related: Array<Video['id']>
  seo: Omit<SeoMetadata, 'path'>
  updatedAt: string
  publishedAt: string
}
