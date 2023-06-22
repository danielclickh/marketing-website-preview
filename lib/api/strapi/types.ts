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
