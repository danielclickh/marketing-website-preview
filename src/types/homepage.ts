import { GettingStartedPlatform } from '@/components/GetStarted/types'
import { HeaderProps } from '@/components/Header/types'
import {
  SeoMetadata,
  StrapiButton,
  StrapiImageType,
  StrapiLink
} from '@/lib/api/strapi/types'
import { ParsedUrlQuery } from 'querystring'
import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
}

export interface Feature {
  id: string
  title: string
  description: string
  iconSvg: StrapiImageType
}

export interface Bullet {
  text: string
}

export interface ScreenshotAndBullets {
  id: string
  title: string
  description: string
  bullets: Array<Bullet>
  screenshotPng: StrapiImageType
}

export interface HomepageHeroHighlight extends StrapiLink {
  title: string
  description: string
  buttonText: string
}

export interface HomepageAdvancedCallout extends StrapiLink {
  title: string
  description: string
  buttonText: string
}

export interface HomepageHero {
  title: string
  description: string
  ctaButton: StrapiButton
  ctaButtonSubtext: string
  darkBackgroundIcon: StrapiImageType
  lightBackgroundIcon: StrapiImageType
  advancedCallout: HomepageAdvancedCallout
  highlights: Array<HomepageHeroHighlight>
}

export interface HomepageAboutClickhouse {
  title: string
  features: Array<Feature>
  allFeaturesButton: StrapiButton
}

export interface HomepageClickhouseCloud {
  pretitle: string
  title: string
  description: string
  primaryButton: StrapiButton
  secondaryButton: StrapiButton
}

export interface HomepageTestimonials {
  pretitle: string
  title: string
  description: string
  testimonialsIconSvg: StrapiImageType
  bottomIconSvg: StrapiImageType
  testimonialItems: Array<HomepageTestimonialItem>
}

export interface HomepageTestimonialItem extends StrapiLink {
  id: string
  title: string
  author: string
}

export interface HomepageCustomerStories {
  title: string
  description: string
  logos: Array<HomepageCustomerStoryLogo>
  ctaButton: StrapiButton
  popText: string
}

export interface HomepageCustomerStoryLogo extends StrapiLink {
  id: string
  darkLogoPng: StrapiImageType
  lightLogoPng: StrapiImageType
}
export interface NewsLetterData {
  title: string
  description: string
  emailLabel: string
  submitButtonLabel: string
}

export interface CommonProps {
  headerData: HeaderProps
  seo?: SeoMetadata
  platforms: Array<GettingStartedPlatform>
}

export interface HomePageProps extends CommonProps {
  hero: HomepageHero
  aboutClickhouse: HomepageAboutClickhouse
  customerStories: HomepageCustomerStories
  clickhouseCloud: HomepageClickhouseCloud
  clickhouseCloudItems: Array<ScreenshotAndBullets>
  testimonials: HomepageTestimonials
  customerLogos: HomepageCustomerLogos
}

export interface HomepageCustomerLogos {
  useCaseItems: Array<CustomerLogo>
}

export interface CustomerLogo {
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

export interface ParamsType extends ParsedUrlQuery {
  slug: string
}

export interface CatAllParamsType extends ParsedUrlQuery {
  slug: string[]
}

export interface RichContentPageProps extends CommonProps {
  title: string
  content?: null | string
  fullWidthContent?: null | string
  leftContent?: null | string
  rightContent?: null | string
  slug?: null | string
}
