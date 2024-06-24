import { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export interface NavigationLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  function NavigationLink({ className = '', children, ...props }, ref) {
    return (
      <Link
        ref={ref}
        {...props}
        className={`flex flex-wrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:inline-flex md-mid:py-2 ${className}`}>
        {children}
      </Link>
    )
  }
)

export default NavigationLink
