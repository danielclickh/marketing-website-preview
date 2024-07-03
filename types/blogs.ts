import { ReactNode } from 'react'
import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps, NewsLetterData } from './homepage'

export interface BlogPost {
  id: number
  category: string
  title: string
  shortDescription?: string
  shortDescriptionElement: ReactNode
  content: string
  author: {
    name: string
    avatarPng: StrapiImageType
  }
  thumbnailPng: StrapiImageType
  publishedAt: string
  slug?: string
  date?: string
  keywords?: string
}

export interface BlogProps extends CommonProps {
  title: string
  description: string
  initialData: null | BlogApiResponse
}

export interface BlogApiResponse {
  data: {
    featured: BlogPost
    blogs: Array<BlogPost>
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
