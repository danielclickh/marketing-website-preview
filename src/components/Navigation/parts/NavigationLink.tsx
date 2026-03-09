import LinkWithArrow from '@/components/LinkWithArrow'
import Link, { LinkProps } from 'next/link'
import React, { forwardRef } from 'react'

export interface NavigationLinkProps
  extends Omit<LinkProps & React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  isHovered?: boolean
  target?: string
  arrow?: boolean
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
      arrow = false,
      ...props
    },
    ref
  ) {
    const LinkComponent = arrow ? LinkWithArrow : Link

    return (
      <LinkComponent
        ref={ref}
        href={href}
        prefetch={prefetch}
        target={target}
        {...props}
        className={`flex flex-wrap rounded-lg px-2 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:inline-flex ${className} ${
          isHovered ? 'bg-neutral-700/25 text-primary-300' : ''
        }`}>
        {children}
      </LinkComponent>
    )
  }
)

export default NavigationLink
