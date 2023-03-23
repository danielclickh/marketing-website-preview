import { LinkTarget } from '../../lib/api/strapi/types'

export interface HeaderTopNavItem {
  id: number
  name?: string
  href?: never
  target?: never
  menuItems: Array<HeaderLinkItem>
}

export type SubMenuItem = HeaderLinkItem | HeaderTopNavItem

export interface HeaderNavItem {
  id: number
  name: string
  href?: never
  target?: never
  menuItems: Array<SubMenuItem>
}

export interface HeaderLinkItem {
  id: number
  description?: string
  href: string
  target?: LinkTarget
  name: string
  icon?: string
  menuItems?: never
}

export interface RegularNavItem {
  id: number
  name: string
  href: string
  target: LinkTarget
}

export type MenuItem = HeaderNavItem | HeaderLinkItem
