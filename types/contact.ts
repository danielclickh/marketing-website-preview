import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

export interface ContactFormProps {
  firstNameLabel: string
  lastNameLabel: string
  emailLabel: string
  companyLabel: string
  messageLabel: string
  submitButtonLabel: string
  thankYouMessage: string
  disclaimer: string
  customPricingQuote?: string
  onSuccess?: Function
}

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
