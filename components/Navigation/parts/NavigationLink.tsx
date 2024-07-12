import { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export interface NavigationLinkProps extends Omit<LinkProps, 'href'> {
  href?: LinkProps['href']
  className?: string
  children: React.ReactNode
  isHovered: boolean
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  function NavigationLink(
    { className = '', href = '', children, isHovered, ...props },
    ref
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        {...props}
        className={`flex flex-wrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:inline-flex ${className} ${
          isHovered ? 'bg-neutral-700/25 text-primary-300' : ''
        }`}>
        {children}
      </Link>
    )
  }
)

export default NavigationLink
