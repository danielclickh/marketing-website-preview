import { useClickOutside } from '../../hooks'
import Link, { LinkProps } from 'next/link'
import React, { useRef, useState } from 'react'

export interface HeaderRegionSelectorProps {
  className?: React.HTMLProps<HTMLDivElement>['className']
}

export default function HeaderRegionSelector({
  className = ''
}: HeaderRegionSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectorRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(selectorRef, () => {
    setIsOpen(false)
  })

  const disablePrefetch: Partial<LinkProps> = {
    prefetch: false,
    onMouseEnter(e) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div
      ref={selectorRef}
      onMouseLeave={() => setIsOpen(false)}
      className={`relative ${className}`}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onTouchEnd={() => setIsOpen((old) => !old)}
        className={`flex items-center gap-2 ${
          isOpen ? 'text-primary-300' : ''
        }`}>
        {isOpen && <span className='sr-only'>Close region selector</span>}
        {!isOpen && <span className='sr-only'>Open region selector</span>}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='15'
          height='15'
          fill='none'
          viewBox='0 0 15 15'
          className='flex-shrink-0 flex-grow-0'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M13.75 7.5c0 3.45-2.8 6.25-6.25 6.25m6.25-6.25c0-3.45-2.8-6.25-6.25-6.25m6.25 6.25H1.25m6.25 6.25A6.25 6.25 0 0 1 1.25 7.5m6.25 6.25A9.56 9.56 0 0 0 10 7.5a9.56 9.56 0 0 0-2.5-6.25m0 12.5A9.56 9.56 0 0 1 5 7.5a9.56 9.56 0 0 1 2.5-6.25M1.25 7.5c0-3.45 2.8-6.25 6.25-6.25'
          />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='6'
          height='10'
          fill='none'
          viewBox='0 0 6 10'
          className={`flex w-2.5 flex-shrink-0 flex-grow-0 origin-center rotate-90 items-center justify-center transition-all ${
            isOpen ? '' : 'opacity-50'
          }`}>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m1 9 4-4-4-4'
          />
        </svg>
      </button>
      <div
        className={`absolute right-0 top-full origin-top-right pt-4 transition ${
          isOpen ? '' : 'pointer-events-none scale-90 opacity-0'
        }`}>
        <ul className='relative min-w-44 rounded-lg bg-neutral-750 p-4 text-sm text-white shadow transition-all'>
          <li>
            <Link
              {...disablePrefetch}
              href='/?country=en'
              className='block w-full rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-700/25 hover:text-primary-300'>
              English
            </Link>
          </li>
          <li>
            <Link
              {...disablePrefetch}
              href='/jp?country=jp'
              className='block w-full rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-700/25 hover:text-primary-300'>
              Japanese
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
