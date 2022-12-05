import { StrapiImage } from '../../lib/types/images'

export interface BlogPostAuthor {
  name: string
  avatarPng: StrapiImage
}

export interface BlogPost {
  id: number
  category: string
  title: string
  shortDescription: string
  content: string
  author: BlogPostAuthor
  thumbnailPng: StrapiImage
  publishedAt: string
  slug?: string
  date?: string
  keywords?: string
}

export interface BlogPostListProps {
  blogs: BlogPost[]
  categories: string[]
}
