import { LinkProps } from 'next/link'
import React from 'react'

export interface MenuLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

export interface TopLevelItemProps
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'href' | 'onMouseEnter' | 'onMouseLeave' | 'onClick'
  > {
  label: string
  href?: LinkProps['href']
  children?: React.ReactNode
  open?: boolean
  onMouseEnter?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onMouseLeave?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onClick?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onClickOutside?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
}

export interface NavigationProps extends React.HTMLProps<HTMLElement> {
  onTopLevelMouseEnter?: TopLevelItemProps['onMouseEnter']
  onTopLevelMouseLeave?: TopLevelItemProps['onMouseLeave']
  onTopLevelClick?: TopLevelItemProps['onClick']
  onTopLevelClickOutside?: TopLevelItemProps['onClickOutside']
}
