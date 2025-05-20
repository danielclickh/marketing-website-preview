import { AnimatePresence, motion } from 'motion/react'
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
    <div className={`overflow-hidden border-b-2 border-black ${className}`}>
      <button
        onClick={() => setIsOpen((old) => !old)}
        className={`flex w-full items-center gap-4 text-left text-lg transition-all duration-300 ${isOpen ? 'pt-4' : 'py-4'}`}>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                height: 0
              },
              open: {
                opacity: 1,
                height: 'auto'
              }
            }}
            initial='closed'
            animate='open'
            exit='closed'
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.5
            }}>
            <div className='pb-6'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
