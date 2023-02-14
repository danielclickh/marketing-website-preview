import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { colorCalculator, sizeCalculator } from './calculator'
export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  onClick?: any
  segmentEvent?: Record<string, string>
  color?: string | undefined
  size?: string
  weight?: string
  target?: string
}

export const SuiLink = ({ ...LinkProps }: LinkProps) => {
  const {
    children,
    href,
    onClick: onClickProp,
    segmentEvent,
    color,
    size = 'sm',
    weight,
    className,
    ...props
  } = LinkProps

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

  const containsHash = !!new URL(
    href.startsWith('http') ? href : `https://clickhouse/${href}`
  ).hash

  if (containsHash) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`
        ${sizeCalculator(size, weight)}
        ${colorCalculator(color ?? '', 'text-inherit')}
          hover:${colorCalculator(color ?? '', 'text-c6-link')}
          cursor-pointer hover:underline
          ${className ?? ''}
      `}
        {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${sizeCalculator(size, weight)}
        ${colorCalculator(color ?? '', 'text-inherit')}
          hover:${colorCalculator(color ?? '', 'text-c6-link')}
          cursor-pointer hover:underline
          ${className ?? ''}
      `}
      {...props}>
      {children}
    </Link>
  )
}
