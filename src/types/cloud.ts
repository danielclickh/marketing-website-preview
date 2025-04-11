import { CommonProps, Feature, ScreenshotAndBullets } from './homepage'
import { StrapiButton, StrapiImageType } from '@/lib/api/strapi/types'

export interface CloudProvider {
  title: string
  darkProviderPngs: Array<StrapiImageType>
  lightProviderPngs: Array<StrapiImageType>
}

export interface CloudHero {
  title: string
  description: string
  ctaButton: StrapiButton
  cloudProviders: Array<CloudProvider>
  videoGif: StrapiImageType
  backgroundSvg: StrapiImageType
}

export type CloudProviderType = {
  title: string
  lightProviderPngs: StrapiImageType[]
  darkProviderPngs: StrapiImageType[]
}

export type Logo = {
  href: string
  Logo: StrapiImageType
}

export interface CloudData extends CommonProps {
  hero: CloudHero
  cloudProviders: Array<CloudProviderType>
  features: Array<Feature>
  screenshotsAndBullets: Array<ScreenshotAndBullets>
  CloudCustomerLogos: { Title: string; logos: Array<Logo> }
}
