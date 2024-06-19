import Link, { LinkProps } from 'next/link'
import React from 'react'
interface Props extends LinkProps {
  children: React.ReactNode
  className?: string
}

export default function LinkWithArrow({
  children,
  className = '',
  ...props
}: Props) {
  return (
    <Link {...props} className={`group/linkWithArrow ${className}`}>
      {children}
      <span className='inline whitespace-nowrap pl-0.5 transition group-hover/linkWithArrow:translate-x-1/2'>
        -&gt;
      </span>
    </Link>
  )
}
