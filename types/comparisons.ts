import { ReactNode } from 'react'
import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'
import { SeoMetadata } from '../lib/api/strapi/types'

interface Painpoint {
  Title: string
  Description: string
  Proofpoint: string
}


interface ComparisonPage {
  Title: string
  HeroDescription: string
  painpoint: Array<Painpoint>
}

export interface ComparisonProps extends CommonProps {
  seo?: SeoMetadata
  comparison: ComparisonPage
}
