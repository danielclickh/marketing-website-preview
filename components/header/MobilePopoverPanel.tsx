import { Popover } from '@headlessui/react'
import React from 'react'
type CloseFn = (
  focusableElement?:
    | HTMLElement
    | React.MutableRefObject<HTMLElement | null>
    | undefined
) => void

const MobilePopoverPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function MobilePopoverPanel({ children }, ref) {
  const onClick =
    (close: CloseFn) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      close()
    }
  return (
    <Popover.Panel
      ref={ref}
      focus
      className='absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right min-[930px]:hidden'>
      {({ close }) => (
        <div
          className='rounded-lg shadow-lg ring-1 ring-rangitoto ring-opacity-5 bg-noised divide-y-2 divide-c2'
          onClick={onClick(close)}>
          {children}
        </div>
      )}
    </Popover.Panel>
  )
})

export default MobilePopoverPanel
