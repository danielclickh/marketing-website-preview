import { ReactNode } from 'react'
import { SeoMetadata, StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

interface PricingDimension {
  priceUSD: string
  meteringUnit: string
  meteringTooltip: string
  tieredPricing?: string
  devPriceUSD: string
}

export interface RegionPricing {
  cloudProvider: 'aws' | 'gcp' | 'azure'
  region: string
  regionFlagPNG: StrapiImageType
  storagePricing: PricingDimension
  computePricing: PricingDimension
  devStoragePricing: PricingDimension
  devComputePricing: PricingDimension
  hasDevService: boolean
}

interface PricingHero {
  title: string
  description: string
  openSourceLink: string
}

export interface MeteredPricing {
  title: string
  subtitle: string
  footerNote: string
}

interface PlanBullet {
  description: string
  isBulleted: boolean
}

interface pricingActionButton {
  text: string
  link: string
}

export interface PricingPlanData {
  name: string
  description: string
  pricingMain: string
  items: Array<PlanBullet>
  items_disabled: Array<PlanBullet>
  actionButton: pricingActionButton
  seo: SeoMetadata
  cloudProvider: 'aws' | 'gcp' | 'acp'
}

interface PhilosophyColumn {
  header: string
  content: string
  image: StrapiImageType
}

interface PricingPhilosophy {
  title: string
  columns: Array<PhilosophyColumn>
}

interface PricingContactSection {
  title: string
  subtitle: string
  contactButton: pricingActionButton
  excludeImageLight: StrapiImageType
  excludeImageDark: StrapiImageType
}

export interface PricingData {
  hero: PricingHero
  meteredPricing: MeteredPricing
  contactSection: PricingContactSection
  seo: SeoMetadata
}

export type CloudProviderType = {
  title: string
  lightProviderPngs: StrapiImageType[]
  darkProviderPngs: StrapiImageType[]
}
export interface PricingPageProps extends CommonProps {
  hero: PricingHero
  meteredPricing: MeteredPricing
  contactSection: PricingContactSection
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
}
