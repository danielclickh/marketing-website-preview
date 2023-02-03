'use client'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { useAnalytics } from '../../Providers/Analytics'
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
  const analytics = useAnalytics()
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
        analytics.track('click', segmentEvent)
      } catch (error) {}
    }
    if (onClickProp) {
      onClickProp()
    }
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
      scroll
      {...props}>
      {children}
    </Link>
  )
}
