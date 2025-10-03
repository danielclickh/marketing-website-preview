import LinkWithArrow from '../LinkWithArrow'
import { IconButton } from '@clickhouse/click-ui'
import Link from 'next/link'
import { MouseEvent, useEffect, useState } from 'react'

export interface AnnouncementBarProps {
  enabled?: boolean
  text: string
  link: string
  dismissible?: boolean
  expires?: Date
  className?: string
  onShow?: () => void
  onHide?: () => void
  arrow?: boolean
}

async function hashString(input: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export default function AnnouncementBar({
  enabled = true,
  text,
  link,
  className = '',
  dismissible = false,
  expires,
  onShow,
  onHide,
  arrow = true
}: AnnouncementBarProps) {
  const [expired, setExpired] = useState<boolean>(false)
  const [storageKey, setStorageKey] = useState('')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    if (expires) {
      const now = new Date()
      setExpired(now > expires)
    } else {
      setExpired(false)
    }
  }, [expires])

  // Create a hashed storage key of the text and link
  useEffect(() => {
    ;(async () => {
      const keyLinkHash = await hashString(`${text} ${link}`)
      setStorageKey(`header-eyebrow-${keyLinkHash}`)
    })()
  }, [text, link])

  // Set initial visible state
  useEffect(() => {
    setIsVisible(!dismissible || !window.sessionStorage.getItem(storageKey))
  }, [dismissible, storageKey])

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

  const LinkComponent = arrow ? LinkWithArrow : Link

  return (
    <>
      {enabled && !expired && (
        <div
          className={`relative z-50 flex items-center bg-primary-300 text-primary-900 transition ${
            isVisible ? 'max-h-max' : 'max-h-0 overflow-hidden opacity-0'
          } ${className}`}>
          <LinkComponent
            prefetch={false}
            href={link}
            className='block w-full flex-1 px-4 py-1 text-center text-sm font-medium'>
            {text}
          </LinkComponent>
          {dismissible && (
            <IconButton
              icon='cross'
              size='sm'
              type='primary'
              className='m-1 !text-inherit hover:!bg-primary-900/10'
              onClick={handleClick}
            />
          )}
        </div>
      )}
    </>
  )
}
