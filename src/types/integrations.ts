import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface Integration {
  id: number

  // Used in /integrations/index.ts
  name: string
  slug: string
  logo: StrapiImageType | null
  logo_dark: StrapiImageType | null
  category: string
  readiness: string | null
  openInNewWindow: boolean | null
  docsLink: string

  // Used in /integrations/[slug]/index.ts
  shortDescription: string
  supportLevel: string
  website: string | null
  summary: string | null
  summaryv2: string | null
  about: string | null
  aboutv2: string | null
  changelog: string | null
  changelogv2: string | null
}

export interface IntegrationGroup {
  key: string
  label: string
  description?: null | string
  slug: string
  integrations: Array<Integration>
}

export interface IntegrationsPageProps extends CommonProps {
  title: string
  integrationGroups: Array<IntegrationGroup>
}
