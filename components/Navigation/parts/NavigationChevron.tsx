import React from 'react'

export interface NavigationChevronProps {
  isOpen?: boolean
}

export default function NavigationChevron({
  isOpen = false
}: NavigationChevronProps) {
  return (
    <span
      className={`flex w-2.5 flex-shrink-0 flex-grow-0 items-center justify-center transition-all md-mid:hidden ${
        isOpen ? 'rotate-90' : 'text-neutral-500'
      }`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='6'
        height='10'
        fill='none'
        viewBox='0 0 6 10'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='m1 9 4-4-4-4'
        />
      </svg>
    </span>
  )
}
