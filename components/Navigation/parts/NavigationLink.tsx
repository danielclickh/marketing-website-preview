import Link, { LinkProps } from 'next/link'
import React from 'react'

export interface NavigationLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

export default function NavigationLink({
  className = '',
  children,
  ...props
}: NavigationLinkProps) {
  return (
    <Link
      {...props}
      className={`block rounded px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/75 hover:text-primary-300 md-mid:inline-block md-mid:py-2 ${className}`}>
      {children}
    </Link>
  )
}
