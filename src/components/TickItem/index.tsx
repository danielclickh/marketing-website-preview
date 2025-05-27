import React from 'react'

export interface TickItemProps {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLDivElement>['className']
}

export default function TickItem({ children, className = '' }: TickItemProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
