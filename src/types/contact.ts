import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface ContactFormProps {}

export interface GrowingCommunityProps {
  title: string
  iconButtons: {
    darkIconPng: StrapiImageType
    lightIconPng: StrapiImageType
    href: string
    target?: string
  }[]
}

export interface ContactProps extends CommonProps {
  title: string
  description: string
  contactForm: ContactFormProps
  growingCommunityData: GrowingCommunityProps
}
