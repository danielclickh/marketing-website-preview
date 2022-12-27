import Link from 'next/link'
import { colorCalculator, sizeCalculator } from './calculator'
export type LinkProps = {
  href: string
  onClick?: any
  color?: string | undefined
  size?: string
  weight?: string
}

// @ts-ignore
export const SuiLink = ({ ...LinkProps }) => {
  const {
    children,
    href,
    onClick,
    color,
    size = 'sm',
    weight,
    className
  } = LinkProps

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${sizeCalculator(size, weight)}
        ${colorCalculator(color, 'text-inherit')}
          hover:${colorCalculator(color, 'text-primary')}
          cursor-pointer duration-200 hover:underline 
          ${className ?? ''}
      `}>
      {children}
    </Link>
  )
}
