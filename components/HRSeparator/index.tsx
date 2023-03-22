import React, { HTMLAttributes } from 'react'

function HRSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`w-full border-t border-neutral-725 max-w-screen-md px-7 mx-auto ${className}`}
      {...props}
    />
  )
}

export default HRSeparator
