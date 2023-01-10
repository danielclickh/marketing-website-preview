import { StrapiButton, StrapiImageType } from '../../lib/api/strapi/types'
import { Feature, ScreenshotAndBullets } from '../types'

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

export interface CloudData {
  hero: CloudHero
  features: Array<Feature>
  screenshotsAndBullets: Array<ScreenshotAndBullets>
}
