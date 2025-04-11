import FontSohneBreit from '../FontSohneBreit'
import Link, { LinkProps } from 'next/link'
import React from 'react'

type OpenHouseButtonVariants = 'light' | 'dark' | 'primary'
type OpenHouseButtonSizes = 'sm' | 'md' | 'lg'

interface OpenHouseButtonProps
  extends LinkProps,
    Omit<React.HTMLProps<HTMLAnchorElement>, keyof LinkProps | 'size' | 'ref'> {
  children: React.ReactNode
  variant?: OpenHouseButtonVariants
  size?: OpenHouseButtonSizes
  className?: string
}

const openHouseButtonVariantClasses: Record<OpenHouseButtonVariants, string> = {
  light:
    'bg-white border-white text-neutral-750 hover:bg-transparent hover:backdrop-blur hover:text-white',
  dark: 'bg-neutral-750 border-neutral-750 text-white hover:bg-transparent hover:backdrop-blur hover:text-neutral-750',
  primary:
    'bg-ch-yellow border-ch-yellow text-neutral-750 hover:bg-transparent hover:backdrop-blur hover:text-white'
}

const openHouseButtonSizeClasses: Record<OpenHouseButtonSizes, string> = {
  sm: 'px-3 py-1 text-sm leading-normal',
  md: 'px-4 py-2 text-base leading-normal',
  lg: 'px-6 py-3 text-base leading-normal'
}

export default function OpenHouseButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...link
}: OpenHouseButtonProps) {
  return (
    <FontSohneBreit
      as='span'
      className={`relative inline-block rounded border text-center transition duration-300 ${openHouseButtonSizeClasses[size]} ${openHouseButtonVariantClasses[variant]} ${className}`}>
      <Link {...link}>
        <span className='absolute inset-0 block' />
        {children}
      </Link>
    </FontSohneBreit>
  )
}
