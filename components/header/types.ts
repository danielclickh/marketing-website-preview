import {
  LinkTarget,
  StrapiButton,
  StrapiEntry,
  StrapiImageType
} from '../../lib/api/strapi/types'

export interface HeaderTopNavItem {
  id: number
  name: string
  href?: string
  target: LinkTarget
  menuItems: Array<HeaderTopNavSubItem>
}

export interface HeaderTopNavSubItem {
  id: number
  description?: string
  href: string
  target: LinkTarget
  name: string
  icon?: StrapiImageType
}

export interface HeaderData extends StrapiEntry {
  ctaButton: StrapiButton
  ctaSecondaryButton: StrapiButton
  menuItems: Array<HeaderTopNavItem>
  logoIcon: StrapiImageType
}

export interface RegularNavItem {
  id: number
  name: string
  href: string
  target: LinkTarget
}
