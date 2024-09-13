import Link, { LinkProps } from 'next/link'
import React from 'react'
import Nbsp from '../Nbsp'
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
    <Link
      {...props}
      className={`group/linkWithArrow ${className}`}
      target='_blank'>
      {children}
      <Nbsp />
      <span className='relative whitespace-nowrap'>
        <span className='opacity-0'>-&gt;</span>
        <span className='absolute left-0 top-1/2 block -translate-y-1/2 transition-all group-hover/linkWithArrow:indent-1'>
          -&gt;
        </span>
      </span>
    </Link>
  )
}
