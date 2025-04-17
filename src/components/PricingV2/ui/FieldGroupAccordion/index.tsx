import HRSeparator from '@/components/HRSeparator'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

export interface FieldGroupAccordionBaseProps {
  title: string | React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  onOpenClose?: (open: boolean) => void
}

export interface FieldGroupAccordionStaticProps
  extends FieldGroupAccordionBaseProps {
  removable?: false
  onRemove?: never
}

export interface FieldGroupAccordionRemovableProps
  extends FieldGroupAccordionBaseProps {
  removable: true
  onRemove: () => void
}

export type FieldGroupAccordionProps =
  | FieldGroupAccordionStaticProps
  | FieldGroupAccordionRemovableProps

export default function FieldGroupAccordion({
  title,
  children,
  open = true,
  onOpen,
  onClose,
  onOpenClose,
  removable,
  onRemove
}: FieldGroupAccordionProps) {
  const [isOpen, setIsOpen] = useState(open)

  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (removable && onRemove) {
        onRemove()
      }
    },
    [removable, onRemove]
  )

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen((old) => !old)
    },
    [removable, onRemove]
  )

  // Fire open/close callbacks
  useEffect(() => {
    if (onOpenClose) {
      onOpenClose(isOpen)
    }
    if (onOpen && isOpen) {
      onOpen()
    }
    if (onClose && !isOpen) {
      onClose()
    }
  }, [isOpen])

  // Sync prop and local state
  useEffect(() => {
    if (typeof open === 'boolean' && open !== isOpen) {
      setIsOpen(open)
    }
  }, [open])

  return (
    <div className='block flex-1 rounded-lg border border-neutral-700 text-sm shadow-input transition-colors hover:border-neutral-600 focus:outline-none'>
      <div className='flex'>
        <button
          onClick={handleToggle}
          className='group/handle flex flex-1 items-center gap-2 p-4 text-left'>
          <span className='inline-flex aspect-square w-5 flex-shrink-0 flex-grow-0 items-center justify-center rounded transition-colors group-hover/handle:bg-white/10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='10'
              height='5'
              fill='none'
              viewBox='0 0 10 5'
              className={`transition-transform ${isOpen ? '' : '-rotate-90'}`}>
              <path
                stroke='#fff'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M1.67.83 5 4.17 8.33.83'
              />
            </svg>
          </span>
          {title}
        </button>
        {removable && (
          <button
            onClick={handleRemove}
            className='group/remove m-4 flex aspect-square w-6 flex-shrink-0 flex-grow-0 items-center justify-center rounded transition-colors hover:bg-white/10'>
            <span className='sr-only'>Remove</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='8'
              fill='none'
              viewBox='0 0 8 8'>
              <path
                stroke='#fff'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='m1.33 1.33 5.34 5.34m0-5.34L1.33 6.67'
              />
            </svg>
          </button>
        )}
      </div>
      <motion.div
        variants={{
          closed: { opacity: 0, height: 0, y: -16 },
          open: { opacity: 1, height: 'auto', y: 0 }
        }}
        initial='closed'
        animate={open ? 'open' : 'closed'}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        className={open ? '' : 'pointer-events-none'}>
        <div className='p-4'>
          <HRSeparator className='-mt-4 mb-4' />
          {children}
        </div>
      </motion.div>
    </div>
  )
}
