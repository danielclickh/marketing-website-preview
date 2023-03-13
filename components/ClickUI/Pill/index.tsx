import React, { HTMLAttributes } from 'react'

function Pill({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <span
      className={`text-sm shadow-click-pill bg-base-color text-primary-900 ${className}`}
      {...props}>
      {children}
    </span>
  )
}

export default Pill
