import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function LogoBrandMenu({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setCopied(false)
  }, [isOpen])

  const copySvg = useCallback(async () => {
    try {
      const res = await fetch('/brand-assets/clickhouse-logo-white.svg')
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setIsOpen(false), 600)
    } catch {
      setIsOpen(false)
    }
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  const itemClass =
    'flex w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300'

  return (
    <div
      ref={wrapperRef}
      className='relative mr-auto'
      onContextMenu={handleContextMenu}
      onMouseLeave={() => setIsOpen(false)}>
      {children}

      <div
        className={`absolute left-0 top-full z-50 pt-2 w-56 origin-top-left transition-all ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}>
        <div className='rounded-lg bg-neutral-750 p-1.5 shadow-lg border border-white/10'>
          <button onClick={copySvg} className={itemClass}>
            {copied ? 'Copied!' : 'Copy logo as SVG'}
          </button>
          <a
            href='/brand-assets/clickhouse-logo.zip'
            download='clickhouse-logo.zip'
            onClick={close}
            className={itemClass}>
            Download full logo
          </a>
          <a
            href='/brand-assets/clickhouse-logomark.zip'
            download='clickhouse-logomark.zip'
            onClick={close}
            className={itemClass}>
            Download logomark
          </a>
        </div>
      </div>
    </div>
  )
}
