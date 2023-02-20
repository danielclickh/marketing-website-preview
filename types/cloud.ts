import { StrapiButton, StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps, Feature, ScreenshotAndBullets } from './homepage'

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

export interface CloudData extends CommonProps {
  hero: CloudHero
  features: Array<Feature>
  screenshotsAndBullets: Array<ScreenshotAndBullets>
}
