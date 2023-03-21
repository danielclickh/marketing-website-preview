import React, { MouseEventHandler } from 'react'
import NextLink from 'next/link'
import { LinkProps } from './types'

function Link({
  href,
  target,
  children,
  disabled,
  className = '',
  segmentEvent,
  onClick: onClickProp,
  ...props
}: LinkProps) {
  const onClick = () => {
    if (segmentEvent) {
      try {
        window.analytics.track('click', segmentEvent)
      } catch (error) {}
    }
    if (onClickProp) {
      onClickProp()
    }
  }

  const containsHash = !!(
    typeof href === 'string'
      ? new URL(href.startsWith('http') ? href : `https://clickhouse/${href}`)
      : href
  ).hash

  if (containsHash && typeof href === 'string') {
    return (
      <a
        href={href}
        target={target}
        onClick={onClick}
        className={`${
          disabled ? 'cursor-not-allowed pointer-events-none' : ''
        } ${className}`}
        {...props}>
        {children}
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      onClick={onClick}
      className={`${
        disabled ? 'cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      target={target}>
      {children}
    </NextLink>
  )
}

export default Link
