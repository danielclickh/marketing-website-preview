import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

export interface CareersHero {
  title: string
  description: string
  companyImages: Array<StrapiImageType>
  paragraphTitle: string
  paragraphText: string
}

export interface CareersCompanyValue {
  title: string
  description: string
  iconSvg: StrapiImageType
}

export interface CareersData extends CommonProps {
  hero: CareersHero
  companyValues: Array<CareersCompanyValue>
  positionsTitle: string
}
