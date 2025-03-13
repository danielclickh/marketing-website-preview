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
}

// ------
// Pricing V2
// ------

export interface PricingV2EntryCompute {
  name: string
  size: number
}

export interface PricingV2EntryPlan {
  name: string
  slug: string
  customizable: boolean
  packages: Array<PricingV2EntryPackage>
  order: null | number
  perks: Array<PricingV2ComponentPerk>
  description: null | string
  featured: boolean
  priceList: Array<PricingV2ComponentPerk>
  maxStorageCapacity: null | number
  allowDataSources: boolean
  allowDataTransfers: boolean
  useCases: Array<PricingV2EntryUseCase>
}

export interface PricingV2EntryProvider {
  name: string
  slug: string
  logo: StrapiImageType
  order: null | number
  regions: Array<PricingV2ComponentRegion>
  internetEgress: null | number
  interRegionEgress: null | number
}

export interface PricingV2EntryPackage {
  name: string
  minimumCompute: null | PricingV2EntryCompute
  maximumCompute: null | PricingV2EntryCompute
  replicas: number
  description: null | string
  activeHours: null | number
}

export interface PricingV2EntryUseCase {
  name: string
  slug: string
  minimumCompute: null | PricingV2EntryCompute
  maximumCompute: null | PricingV2EntryCompute
  replicas: number
  description: null | string
  activeHours: number
}

export interface PricingV2ComponentPerk {
  text: string
  icon: 'None' | 'Tick' | 'Dash'
  tooltip: null | string
}

export interface PricingV2ComponentRegion {
  key: string
  label: null | string
  icon: null | StrapiImageType
}
