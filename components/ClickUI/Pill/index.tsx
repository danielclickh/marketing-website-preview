import React, { HTMLAttributes } from 'react'

function Pill({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <span
      className={`bg-primary-300 text-sm text-neutral-900 shadow-click-pill ${className}`}
      {...props}>
      {children}
    </span>
  )
}

export default Pill
