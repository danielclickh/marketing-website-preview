import { HTMLAttributes } from 'react'

function HRSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-screen-md border-t border-neutral-725 px-7 ${className}`}
      {...props}
    />
  )
}

export default HRSeparator
