import { colorCalculator, sizeCalculator } from './calculator'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  onClick?: any
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
    color,
    size = 'sm',
    weight,
    className,
    ...props
  } = LinkProps

  const onClick = () => {
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
        className={` ${sizeCalculator(size, weight)} ${colorCalculator(color ?? '', 'text-inherit')} hover:${colorCalculator(color ?? '', 'text-primary-300')} cursor-pointer hover:underline ${className ?? ''} `}
        {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={` ${sizeCalculator(size, weight)} ${colorCalculator(color ?? '', 'text-inherit')} hover:${colorCalculator(color ?? '', 'text-primary-300')} cursor-pointer hover:underline ${className ?? ''} `}
      {...props}>
      {children}
    </Link>
  )
}
