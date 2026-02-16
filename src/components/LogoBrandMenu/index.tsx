import React, { useCallback, useEffect, useRef, useState } from 'react'

function copyToClipboard(text: string): boolean {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export default function LogoBrandMenu({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState<string | false>(false)
  const svgCache = useRef<string | null>(null)
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

    // Prefetch SVG when menu opens so copy is instant
    if (isOpen && !svgCache.current) {
      fetch('/brand-assets/clickhouse-logo-white.svg')
        .then((r) => r.text())
        .then((t) => {
          svgCache.current = t
        })
        .catch(() => {})
    }
  }, [isOpen])

  const copySvg = useCallback(async () => {
    try {
      const svg =
        svgCache.current ||
        (await fetch('/brand-assets/clickhouse-logo-white.svg').then((r) =>
          r.text()
        ))

      // Try modern clipboard API first, fall back to execCommand
      let ok = false
      try {
        await navigator.clipboard.writeText(svg)
        ok = true
      } catch {
        ok = copyToClipboard(svg)
      }

      setCopied(ok ? 'Copied!' : 'Failed to copy')
      setTimeout(() => setIsOpen(false), 600)
    } catch {
      setCopied('Failed to copy')
      setTimeout(() => setIsOpen(false), 1000)
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
            {copied || 'Copy logo as SVG'}
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
