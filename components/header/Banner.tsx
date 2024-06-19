import Link, { LinkProps } from 'next/link'
import React from 'react'

interface BannerProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export default function Banner({
  children,
  className = '',
  ...props
}: BannerProps) {
  return (
    <Link
      {...props}
      className={`group block w-full bg-primary-300 px-4 py-1 text-center text-sm font-medium text-primary-900 ${className}`}>
      {children}
      <span className='inline-block pl-0.5 transition group-hover:translate-x-1/2'>
        -&gt;
      </span>
    </Link>
  )
}
