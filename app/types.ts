import { StrapiImageType } from '../lib/api/strapi/types'

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
