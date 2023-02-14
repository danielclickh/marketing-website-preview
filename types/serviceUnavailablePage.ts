import { StrapiButton, StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

export interface ServiceProps extends CommonProps {
  title: string
  description: string
  iconSvg: StrapiImageType
  contactForm: any
  ctaButton: StrapiButton
  install_oss: {
    title: string
  }
}
