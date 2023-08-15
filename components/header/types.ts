import { LinkTarget } from '../../lib/api/strapi/types'

export interface HeaderTopNavItem {
  id: number
  name: string
  href?: string
  prefetch?: boolean
  target?: LinkTarget
  menuItems: Array<HeaderLinkItem>
}

export interface HeaderNavItem {
  id: number
  name: string
  href?: never
  target?: never
  menuItems: Array<HeaderTopNavItem>
}

export interface HeaderLinkItem {
  id: number
  description?: string
  href: string
  target?: LinkTarget
  name: string
  icon?: string
  menuItems?: never
  prefetch?: boolean
}

export interface RegularNavItem {
  id: number
  name: string
  href: string
  target: LinkTarget
  prefetch?: boolean
}

export type MenuItem = HeaderNavItem | HeaderLinkItem

export interface HeaderData {
  banner: string
}

export interface HeaderProps {
  github: { stars: number }
  header: HeaderData
}
