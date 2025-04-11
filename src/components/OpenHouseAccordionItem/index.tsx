import React, { useEffect, useState } from 'react'

interface OpenHouseAccordionItemProps {
  handle: string
  children: React.ReactNode
  open?: boolean
  className?: React.HTMLProps<HTMLDivElement>['className']
}

export default function OpenHouseAccordionItem({
  handle,
  children,
  open = false,
  className = ''
}: OpenHouseAccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Sync local state with prop
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <div className={`border-b-2 border-black ${className}`}>
      <button
        onClick={() => setIsOpen((old) => !old)}
        className='flex w-full items-center gap-4 py-4 text-left text-lg'>
        <span className='flex-1 text-xl'>{handle}</span>
        <span className='relative ml-auto block aspect-square w-10 flex-shrink-0 flex-grow-0 p-3 transition-colors lg:w-12 lg:p-4'>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
            <span
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span className='absolute inset-0 rotate-90 bg-black' />
          </span>
        </span>
      </button>
      <div className={`-mt-4 pb-6 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
