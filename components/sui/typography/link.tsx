import Link from 'next/link'
import { colourCalculator, sizeCalculator } from './calculator'
export type LinkProps = {
  href: string
  onClick?: any
  color?: string | undefined
  size?: string
  weight?: string
}

// @ts-ignore
export const SuiLink = ({ ...LinkProps }) => {
  const { children, href, onClick, color, size, weight } = LinkProps

  return (
    <Link href={href}
        onClick={onClick}
        className={`
        ${sizeCalculator(size)}
        ${colourCalculator(color, 'text-text-warning')}
        font-${weight ? weight : 'semibold'}
          cursor-pointer hover:${colourCalculator(
            color,
            'text-text-warning'
          )} duration-200 hover:underline`}>
        {children}
    </Link>
  )
}
