import React, { HTMLAttributes } from 'react'

function Pill({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <span
      className={`text-sm shadow-click-pill bg-primary-300 text-primary-900 ${className}`}
      {...props}>
      {children}
    </span>
  )
}

export default Pill
