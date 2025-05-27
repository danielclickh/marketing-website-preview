'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface AccordionItemProps {
  prefix?: string | number | React.ReactNode
  handle: React.ReactNode | string
  children: React.ReactNode
  open?: boolean
  className?: React.HTMLProps<HTMLDivElement>['className']
  onOpen?: () => void
  onClose?: () => void
  onToggle?: (open: boolean) => void
}

export default function AccordionItem({
  prefix,
  handle,
  children,
  open,
  className = '',
  onOpen,
  onClose,
  onToggle
}: AccordionItemProps) {
  const elRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const hasPrefix = !!prefix

  // Use parent state if provided, else default to local state
  const areWeOpen = useMemo(() => {
    return open !== undefined ? open : isOpen
  }, [open, isOpen])

  const onClickCallback = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      if (areWeOpen) {
        setIsOpen(false)
        if (onClose) onClose()
      } else {
        setIsOpen(true)
        if (onOpen) onOpen()
      }

      if (onToggle) onToggle(!areWeOpen)
    },
    [areWeOpen, onOpen, onClose, onToggle]
  )

  return (
    <div
      ref={elRef}
      className={`relative overflow-hidden rounded border border-jet bg-neutral-900/50 p-4 transition-colors hover:bg-neutral-750 hover:bg-opacity-40 ${hasPrefix ? 'grid grid-cols-[auto_1fr]' : ''} ${className}`}>
      {hasPrefix && (
        <div className='border-r border-neutral-700/80 pr-4'>{prefix}</div>
      )}
      {/* Handle */}
      <button
        onClick={onClickCallback}
        className={`flex w-full items-center gap-4 text-left ${hasPrefix ? 'pl-4 pr-2' : 'px-2'} ${areWeOpen ? 'text-white' : 'text-neutral-200 hover:text-neutral-0'}`}>
        <span className='absolute inset-0 z-10' />
        <span className='flex-1'>{handle}</span>
        {/* Plus/minus icon */}
        <span className='relative ml-auto block aspect-square w-4 flex-shrink-0 flex-grow-0 transition-colors'>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${areWeOpen ? '-rotate-90' : ''}`}>
            <span
              className={`absolute inset-0 bg-white transition-opacity duration-300 ${areWeOpen ? 'opacity-0' : ''}`}
            />
            <span className='absolute inset-0 rotate-90 bg-white' />
          </span>
        </span>
      </button>
      <AnimatePresence>
        {areWeOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                y: '-1rem',
                height: 0
              },
              open: {
                opacity: 1,
                y: 0,
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
            }}
            className='relative z-20 col-start-2'>
            {hasPrefix && (
              <span className='absolute -bottom-0 -left-px -top-4 border-l border-neutral-700/80' />
            )}
            <div
              className={`pt-4 text-sm text-neutral-200 ${hasPrefix ? 'pl-4' : 'pl-2'}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
