import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { EntryBlogPost } from '@/types/strapi'
import { ReactNode } from 'react'

export interface BlogProps extends CommonProps {
  title: string
  description: string
  initialData: null | BlogApiResponse
}

export interface BlogApiResponse {
  data: {
    featured: null | EntryBlogPost
    blogs: Array<EntryBlogPost>
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
