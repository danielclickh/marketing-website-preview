import { CommonProps } from './homepage'
import { StrapiButton, StrapiImageType } from '@/lib/api/strapi/types'

export interface ServiceProps extends CommonProps {
  title: string
  description: string
  iconSvg: StrapiImageType
  contactForm: any
  ctaButton: StrapiButton
}
