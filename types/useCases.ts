import { StrapiButton, StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

export interface UseCasesTestimonial {
  avatar: StrapiImageType
  review: string
  author: string
  role: string
  rating: number
}

export interface UseCasesItem {
  companyName: string
  darkLogoPng: StrapiImageType
  lightLogoPng: StrapiImageType
  description: string
  bullets: Array<{
    text: string
  }>
  ctaButton: StrapiButton
  anchorId: string
}

export interface UseCasesData extends CommonProps {
  hero: {
    title: string
    description: string
    testimonials: Array<UseCasesTestimonial>
  }
  useCases: {
    title: string
    description: string
    spotlightTitle: string
  }
  spotlight: UseCasesItem
  useCaseItems: Array<UseCasesItem>
}
