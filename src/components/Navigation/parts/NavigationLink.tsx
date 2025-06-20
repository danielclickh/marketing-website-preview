import Link, { LinkProps } from 'next/link'
import React, { forwardRef } from 'react'

export interface NavigationLinkProps extends Omit<LinkProps, 'href'> {
  href?: string // Restrict href to be a string
  className?: string
  children: React.ReactNode
  isHovered?: boolean
  target?: string
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  function NavigationLink(
    {
      className = '',
      href = '',
      children,
      isHovered = false,
      prefetch = false,
      target = '_self',
      ...props
    },
    ref
  ) {
    return (
      <Link
        ref={ref}
        href={href || '#'} // Ensure href is a string
        prefetch={prefetch}
        target={target}
        {...props}
        className={`flex flex-wrap rounded-lg px-2 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:inline-flex ${className} ${
          isHovered ? 'bg-neutral-700/25 text-primary-300' : ''
        }`}>
        {children}
      </Link>
    )
  }
)

export default NavigationLink
