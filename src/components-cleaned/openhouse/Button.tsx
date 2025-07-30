import styles from '@/components-cleaned/openhouse/styles.module.scss'
import { ArrowRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

type Variants = 'primary' | 'secondary'
type Sizes = 'md' | 'lg'

export interface OpenhouseButtonProps {
  variant?: Variants
  size?: Sizes
  arrow?: boolean
  href: LinkProps['href']
  children: React.ReactNode
  target?: React.HTMLProps<HTMLAnchorElement>['target']
  className?: string
}

const variantClassNames: Record<Variants, string> = {
  primary: 'bg-ch-yellow text-black',
  secondary: 'bg-black text-white'
}
const sizeClassNames: Record<Sizes, string> = {
  md: 'px-4 py-2',
  lg: 'p-4 lg:text-2xl'
}

export default function OpenhouseButton({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  href,
  target = '_self',
  className = ''
}: OpenhouseButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={`inline-flex items-center justify-center gap-1 text-center font-medium uppercase leading-normal hover:underline ${variantClassNames[variant]} ${sizeClassNames[size]} ${className}`}>
      {children}
      {arrow && (
        <>
          <ArrowRight
            strokeWidth={2}
            height={20}
            className='inline lg:hidden'
          />
          <ArrowRight strokeWidth={2.5} className='hidden lg:inline' />
        </>
      )}
    </Link>
  )
}
