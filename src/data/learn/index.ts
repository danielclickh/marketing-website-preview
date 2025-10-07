import dataWarehousing from './data-warehousing'
import mlAndGenai from './ml-and-genai'
import observability from './observability'
import realTimeAnalytics from './real-time-analytics'
import { ImageProps } from 'next/image'

export type ItemTypes = 'module' | 'quiz' | 'hands-on' | 'certificate'

export type Item = {
  type: ItemTypes
  title: string
  description?: string
  link?: string
  panel?: {
    image: { src: ImageProps['src'] } & Partial<Omit<ImageProps, 'src'>>
    title: string
    description: string
  }
}

export type Section = {
  title?: string
  description?: string
  items?: Array<Item>
}

export interface PageItem {
  title: string
  slug: string
  icon: ImageProps['src']
  h1: string
  lmsUrl?: string
  intro: string
  level: string
  modules: string
  quizzes: string
  duration: string
  sections?: Array<Section>
}

export const pages: Array<PageItem> = [
  realTimeAnalytics,
  mlAndGenai,
  dataWarehousing,
  observability
]
