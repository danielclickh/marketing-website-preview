import Nbsp from '../Nbsp'
import Link, { LinkProps } from 'next/link'
import React from 'react'

export interface LinkWithArrowProps
  extends Omit<LinkProps & React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  arrowClassName?: string
}

export default function LinkWithArrow({
  children,
  className = '',
  arrowClassName = '',
  ...props
}: LinkWithArrowProps) {
  return (
    <Link {...props} className={`group/linkWithArrow ${className}`}>
      {children}
      <Nbsp />
      <span className='relative whitespace-nowrap'>
        <span className='opacity-0'>-&gt;</span>
        <span
          className={`absolute left-0 top-1/2 block -translate-y-1/2 transition-all group-hover/linkWithArrow:indent-1 ${arrowClassName}`}>
          -&gt;
        </span>
      </span>
    </Link>
  )
}
