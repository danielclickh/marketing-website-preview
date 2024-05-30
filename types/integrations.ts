import { StrapiImageType } from '../lib/api/strapi/types'

export interface Integration {
  // Used in /integrations/index.ts
  name: string
  slug: string
  logo: StrapiImageType
  logo_dark: StrapiImageType | null
  category: string
  readiness: string | null
  openInNewWindow: boolean | null
  docsLink: string

  // Used in /integrations/[slug]/index.ts
  shortDescription: string
  supportLevel: string
  website: string | null
  summary: string
  summaryv2: string | null
  about: string | null
  aboutv2: string | null
  changelog: string | null
  changelogv2: string | null
}

export interface IntegrationGroup {
  label: string
  description?: string
  slug: string
  integrations: Array<Integration>
}
