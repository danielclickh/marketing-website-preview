import React from 'react'

export interface NavigationSubNavProps extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean
}

export default function NavigationSubNav({
  isOpen,
  children
}: NavigationSubNavProps) {
  return (
    <ul
      className={`h-auto w-full px-4 text-white transition-all md-mid:absolute md-mid:left-full md-mid:top-0 md-mid:-ml-4 md-mid:min-h-full md-mid:w-auto md-mid:min-w-full md-mid:rounded-lg md-mid:bg-neutral-750 md-mid:py-2 ${
        isOpen
          ? 'pointer-events-auto block md-mid:z-10 md-mid:opacity-100'
          : 'pointer-events-none hidden md-mid:opacity-0'
      }`}>
      {children}
    </ul>
  )
}
