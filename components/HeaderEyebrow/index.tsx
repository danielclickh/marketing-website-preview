import { MouseEvent, useEffect, useState } from 'react'
import { slugify } from '../../lib/utils/strings'
import LinkWithArrow from '../LinkWithArrow'

export interface HeaderEyebrowProps {
  text: string
  link: string
  dismissible?: boolean
  className?: string
  onShow?: () => void
  onHide?: () => void
}

export default function HeaderEyebrow({
  text,
  link,
  className = '',
  dismissible = false,
  onShow,
  onHide
}: HeaderEyebrowProps) {
  const storageKey = slugify(`header eyebrow ${text}`)

  const [isVisible, setIsVisible] = useState<boolean>(false)

  // Set initial visible state on component mount
  useEffect(() => {
    setIsVisible(!dismissible || !window.sessionStorage.getItem(storageKey))
  }, [])

  // Event handlers for visibility change
  useEffect(() => {
    if (isVisible && onShow) onShow()
    if (!isVisible && onHide) onHide()
  }, [isVisible])

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsVisible(false)
    window.sessionStorage.setItem(storageKey, Date.now().toString())
  }

  return (
    <div
      className={`relative z-50 flex bg-primary-300 text-primary-900 transition ${
        isVisible ? 'max-h-max' : 'max-h-0 overflow-hidden opacity-0'
      }`}>
      <LinkWithArrow
        prefetch={false}
        href={link}
        className={`block w-full flex-1 px-4 py-1 text-center text-sm font-medium ${className}`}>
        {text}
      </LinkWithArrow>
      {dismissible && (
        <button
          onClick={handleClick}
          className='m-1 flex aspect-square w-6 items-center justify-center rounded transition-colors hover:bg-primary-900/10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-auto w-4'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'>
            <path d='M18 6 6 18M6 6l12 12' />
          </svg>
          <span className='sr-only'>Dismiss notice</span>
        </button>
      )}
    </div>
  )
}
