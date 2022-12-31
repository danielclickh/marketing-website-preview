import { ReactNode } from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'

export interface BlogPostAuthor {
  name: string
  avatarPng: StrapiImageType
}

export interface BlogPost {
  id: number
  category: string
  title: string
  shortDescription: string
  content: string
  author: BlogPostAuthor
  thumbnailPng: StrapiImageType
  publishedAt: string
  slug?: string
  date?: string
  keywords?: string
}

export interface BlogPostListProps {
  blogs: BlogPost[]
  categories: string[]
  children?: ReactNode
}
