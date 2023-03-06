import React from 'react'
import NextLink from 'next/link'
import { LinkProps } from './types'

function Link({ href, target, children, disabled, className = '' }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={`${
        disabled ? 'cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      target={target}>
      {children}
    </NextLink>
  )
}

export default Link
