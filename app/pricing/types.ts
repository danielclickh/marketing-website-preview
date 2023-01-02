import { StrapiImageType } from '../../lib/api/strapi/types'

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

interface MeteredPricing {
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
  pricingPhilosophy: PricingPhilosophy
  meteredPricing: MeteredPricing
  contactSection: PricingContactSection
}
