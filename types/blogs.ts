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

export interface BlogPostListProps {
  blogs: BlogPost[]
  selectedCategory: string
  searchText: string
}

export interface BlogProps extends CommonProps {
  featuredBlog: BlogPost
  title: string
  description: string
  blogs: Array<BlogPost>
  categories: string[]
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}
