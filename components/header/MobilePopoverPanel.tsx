'use client'
import React from 'react'
import { PopoverPanel } from '../HeadlessUIClient'

type CloseFn = (
  focusableElement?:
    | HTMLElement
    | React.MutableRefObject<HTMLElement | null>
    | undefined
) => void

const MobilePopoverPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children }, ref) => {
  const onClick =
    (close: CloseFn) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      console.log(e.target.closest('.menu-item'))
      close()
    }
  return (
    <PopoverPanel
      ref={ref}
      focus
      className='absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right min-[930px]:hidden'>
      {({ close }) => (
        <div
          className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-c1 divide-y-2 divide-c2'
          onClick={onClick(close)}>
          {children}
        </div>
      )}
    </PopoverPanel>
  )
})

export default MobilePopoverPanel
