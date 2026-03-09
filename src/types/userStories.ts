import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface UserStoriesPage extends CommonProps {
  stories: UserStory[]
  categories: Record<UseCase['id'], UseCase['Name']>
  migrations: Record<Migration['id'], Migration['Name']>
  verticals: Record<Vertical['id'], Vertical['Name']>
  cloudProviders: Record<CloudProvider['slug'], CloudProvider>
}

export interface UserStory {
  id: number
  Title: string
  highlight: boolean
  Description: string | null
  ReadBlogLink: string | null
  ExternalLink: string | null
  WatchVideoLink: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  SortOrder: number
  User: UserData
  useCase: UseCase[]
  migrations: Migration[]
  vertical: Vertical[]
  cloudProvider: null | Array<CloudProvider>
}

interface UserData {
  id: number
  Name: string
  createdAt: string
  updatedAt: string
  logo: StrapiImageType
}

export interface UseCase {
  id: number
  Name: string
  createdAt: string
  updatedAt: string
}

export interface Migration {
  id: number
  Name: string
  createdAt: string
  updatedAt: string
}

export interface Vertical {
  id: number
  Name: string
  createdAt: string
  updatedAt: string
}

export interface CloudProvider {
  id: number
  name: string
  slug: string
  logo: null | StrapiImageType
  displayOrder: number | null
  createdAt: string
  updatedAt: string
}
