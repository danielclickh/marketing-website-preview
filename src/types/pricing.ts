import { CommonProps } from './homepage'
import { PricingV2, SeoMetadata, StrapiImageType } from '@/lib/api/strapi/types'
import { ParsedUrlQuery } from 'querystring'

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
  cloudProvider: 'aws' | 'gcp' | 'acp' | 'azure'
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

interface PricingPageBase extends CommonProps {
  hero: PricingHero
  meteredPricing: MeteredPricing
  contactSection: PricingContactSection
  requestParams: ParsedUrlQuery | undefined
}

export interface PricingPagePropsV1 extends PricingPageBase {
  displayOldPricing: true
  pricingData: never
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
}

export interface PricingPagePropsV2 extends PricingPageBase {
  displayOldPricing: false
  pricingData: PricingV2
  pricingByRegion: never
  pricingPlans: never
  cloudProviders: never
}

export type PricingPageProps = PricingPagePropsV1 | PricingPagePropsV2

export interface JpPricingPageProps extends CommonProps {
  hero: PricingHero
  meteredPricing: MeteredPricing
  contactSection: PricingContactSection
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
}
