import { LinkTarget } from '../../lib/api/strapi/types'
import { FullyQualifiedEvent } from '../../lib/galaxy/client'

export type MenuItemTopLevel = {
  name: string
  href?: string
  target?: LinkTarget
  menuItems: Array<MenuItemSubLevel>
  galaxyEvent?: FullyQualifiedEvent
}

export type MenuItemSubLevel = {
  name: string
  href: string
  target?: LinkTarget
  description?: string
  icon?: string
  menuItems?: Array<MenuItemSubLevel>
  galaxyEvent?: FullyQualifiedEvent
}

export interface HeaderData {
  banner: string
}

export interface HeaderProps {
  github: { stars: number }
  header: HeaderData
}
