import { ReactNode } from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'

export interface BlogPost {
  id: number
  category: string
  title: string
  shortDescription: string
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
