import { WithContext, Thing } from 'schema-dts'

export type LinkTarget = '_self' | '_blank'

export interface StrapiEntry {
  id: number
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export interface BaseStrapiImage {
  id?: number
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata: any
  width?: number | null
  height?: number | null
  svgText?: string
}

export interface StrapiImageType extends BaseStrapiImage {
  formats?: Record<string, BaseStrapiImage>
}

export interface StrapiLink {
  href: string
  target: LinkTarget
}

export interface StrapiButton extends StrapiLink {
  id: number
  text: string
}

export interface StrapiIconButton extends StrapiLink {
  id: number
  darkIconPng: StrapiImageType
  lightIconPng: StrapiImageType
  text?: string
}

export interface SeoMetadata {
  title?: string
  keywords?: string
  description?: string
  image?: any
  imageUrl?: string
  type?: string
  siteName?: string
  path: string
  robots?: string
  locale?: string
  schema?: WithContext<Thing>
}

// ------
// Pricing V2
// ------

export interface PricingV2ComponentPerk {
  text: string
  icon: 'None' | 'Tick' | 'Dash'
  tooltip: null | string
}

export interface PricingV2ComponentRegion {
  key: string
  label: null | string
  icon: null | StrapiImageType
  internetEgress: number
  interRegionEgress: number
  category: null | string
  private: null | boolean
}

export interface PricingV2ComponentPlan {
  name: string
  slug: string
  description: null | string
  perks: Array<PricingV2ComponentPerk>
  featured: boolean
  maxStorageCapacity: null | number
  allowDataSources: boolean
  allowDataTransfer: boolean
  allowBackups: boolean
  priceList: Array<PricingV2ComponentPerk>
  packages: Array<PricingV2ComponentPackage>
  customizable: boolean
}

export interface PricingV2ComponentProvider {
  name: string
  slug: string
  logo: StrapiImageType
  regions: Array<PricingV2ComponentRegion>
  useDestinationInterRegionEgress: boolean
}

export interface PricingV2ComponentPackage {
  name: string
  slug: string
  computeMinimum: number
  computeMaximum: number
  replicas: number
  description: null | string
  activeHours: number
}

export interface PricingV2ComponentUseCase {
  name: string
  slug: string
  activeHours: number
  ratio: number
  replicas: number
  description: null | string
  title: null | string
  enableReset: boolean
}

export interface PricingV2ComponentDataSource {
  name: string
  slug: string
  icon: StrapiImageType | null
  ingestsData: boolean
  excludeFromCalculations: boolean
  excludeFromCalculationsLabel: null | string
}

export interface PricingV2 {
  plans: Array<PricingV2ComponentPlan>
  providers: Array<PricingV2ComponentProvider>
  useCases: Array<PricingV2ComponentUseCase>
  dataSources: Array<PricingV2ComponentDataSource>
}
