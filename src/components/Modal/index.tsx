import React, { forwardRef, useEffect } from 'react'

export interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  innerRef?: React.RefObject<HTMLDivElement>
  className?: string
  innnerClassName?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { children, isOpen, onClose, innerRef, className = '', innnerClassName = '' },
  ref
) {
  // Prevent body from scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
    } else {
      const scrollTop = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo({
        left: 0,
        top: parseInt(scrollTop || '0') * -1,
        behavior: 'instant'
      })
    }
  }, [isOpen])

  return (
    <div
      ref={ref}
      className={`fixed left-0 right-0 top-0 flex h-dvh overflow-auto bg-[#323232] bg-opacity-50 transition-opacity ${
        isOpen ? 'z-50' : 'pointer-events-none -z-50 opacity-0'
      } ${className}`}>
      <div className='m-auto flex-1 p-4'>
        <div
          className={`relative mx-auto w-full max-w-2xl rounded-lg bg-[#323232] p-4 shadow-2xl md:p-6 ${innnerClassName}`}
          ref={innerRef}>
          <button
            className='absolute right-4 top-4 opacity-60 transition-opacity hover:opacity-80'
            type='button'
            onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  )
})

export default Modal
