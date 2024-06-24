import React from 'react'

export interface NavigationChevronProps
  extends React.HTMLProps<HTMLSpanElement> {
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function NavigationChevron({
  direction = 'right',
  className = '',
  ...props
}: NavigationChevronProps) {
  return (
    <span
      className={`flex w-2.5 flex-shrink-0 flex-grow-0 items-center justify-center transition-all ${
        direction === 'down' ? 'rotate-90' : ''
      } ${direction === 'up' ? '-rotate-90' : ''} ${
        direction === 'left' ? 'rotate-180' : ''
      } ${className}`}
      {...props}>
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
