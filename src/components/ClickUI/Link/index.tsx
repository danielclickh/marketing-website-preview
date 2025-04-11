import { LinkProps } from './types'
import NextLink from 'next/link'
import { MouseEventHandler } from 'react'

function Link({
  href,
  target,
  children,
  disabled,
  className = '',
  onClick: onClickProp,
  ...props
}: LinkProps) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onClickProp) {
      onClickProp(e)
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
          disabled ? 'pointer-events-none cursor-not-allowed' : ''
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
        disabled ? 'pointer-events-none cursor-not-allowed' : ''
      } ${className}`}
      target={target}
      {...props}>
      {children}
    </NextLink>
  )
}

export default Link
