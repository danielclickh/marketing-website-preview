import { ReactNode } from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'

export interface BlogPostListProps {
  categories: string[]
  children?: ReactNode
}
