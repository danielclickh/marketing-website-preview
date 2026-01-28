import React from 'react'

type Sizes = 'sm' | 'md' | 'lg'

export interface TickItemProps {
  children: React.ReactNode
  size?: Sizes
  className?: React.HTMLProps<HTMLDivElement>['className']
}

const sizeClasses: Record<Sizes, string> = {
  sm: 'w-4',
  md: 'w-6',
  lg: 'w-8'
}

export default function TickItem({
  children,
  size = 'md',
  className = ''
}: TickItemProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'
          className={`h-auto ${sizeClasses[size]}`}>
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
