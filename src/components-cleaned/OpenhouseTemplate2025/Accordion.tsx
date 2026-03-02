import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export default function Accordion({
  handle,
  children,
  classNames = {}
}: {
  handle: string | React.ReactNode
  children: React.ReactNode
  classNames?: {
    container?: string
    handle?: string
    body?: string
  }
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className={classNames.container || ''}>
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault()
          setIsOpen((old) => !old)
        }}
        className={`flex w-full items-center gap-4 ${classNames.handle || ''}`}>
        <span className='flex-1'>{handle}</span>
        {/* Plus/minus icon */}
        <span className='relative ml-auto block aspect-square w-4 flex-shrink-0 flex-grow-0 transition-colors'>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
            <span
              className={`absolute inset-0 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span className='absolute inset-0 rotate-90 bg-white' />
          </span>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
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
            }}>
            <div className={classNames.body || ''}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
