import { LinkTarget, StrapiImageType, StrapiLink } from '@/lib/api/strapi/types'

export interface SubLevelFooterMenu {
  id: number
  href: string
  target: LinkTarget
  name: string
  items?: Array<SubLevelFooterMenu>
}
export interface TopLevelFooterMenu {
  id: number
  title: string
  items: Array<SubLevelFooterMenu>
}

export interface FooterNewsletterForm {
  id: number
  buttonLabel: string
  description: string
  inputLabel: string
  title: string
}

export interface FooterSocialLinks {
  id: number
  title: string
  socialLinkItems: Array<FooterSocialLink>
}

export interface FooterSocialLink {
  href: string
  target: string
  iconSvg: StrapiImageType
}

export interface FooterBottomLink extends StrapiLink {
  text: string
}

export interface FooterData {
  licensingText?: string
  copyright?: string
  logoSvg?: StrapiImageType
  topLevelFooterMenu?: Array<TopLevelFooterMenu>
  newsletterForm: FooterNewsletterForm
  socialLinks?: FooterSocialLinks
  bottomLinks?: Array<FooterBottomLink>
}
