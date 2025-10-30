'use client'

import iconChatgpt from './assets/icon-chatgpt.svg'
import iconClaude from './assets/icon-claude.svg'
import iconMarkdown from './assets/icon-markdown.svg'
import iconV0 from './assets/icon-v0.svg'
import { useClickOutside } from '@/hooks'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ChevronDown, Copy, ExternalLink } from 'lucide-react'
import Image, { ImageProps } from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface AiActionsProps {
  galaxyNamespace?: string
}

/** In-memory cache to dedupe fetches and allow "queue after fetch" */
const mdCache = new Map<string, Promise<string>>()

export default function AiActions({
  galaxyNamespace = 'page'
}: AiActionsProps) {
  const menuRef = useRef<null | HTMLUListElement>(null)
  const openRef = useRef<null | HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const {
    cleanedUrl,
    markdownUrl
  }: { cleanedUrl: string | null; markdownUrl: string | null } = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        cleanedUrl: null,
        markdownUrl: null
      }
    }

    const urlObj = new URL(window.location.toString())
    urlObj.search = ''
    urlObj.hash = ''
    const clean = urlObj.toString()
    urlObj.pathname = `${urlObj.pathname}.md`
    const md = urlObj.toString()
    return { cleanedUrl: clean, markdownUrl: md }
  }, [])

  // Silent fetch with dedupe + cancellation
  const fetchMarkdown = useCallback(async () => {
    if (!markdownUrl) return null
    if (markdownContent) return markdownContent

    // If there’s a fetch in the cache, reuse it.
    const existing = mdCache.get(markdownUrl)
    if (existing) {
      const txt = await existing
      setMarkdownContent((prev) => prev ?? txt)
      return txt
    }

    // Start a new fetch and cache the Promise immediately.
    const ctrl = new AbortController()
    abortRef.current?.abort()
    abortRef.current = ctrl

    const p = (async () => {
      const res = await fetch(markdownUrl, {
        signal: ctrl.signal
      })
      if (!res.ok) throw new Error(`Failed to load markdown (${res.status})`)
      return await res.text()
    })()

    mdCache.set(markdownUrl, p)
    try {
      const txt = await p
      setMarkdownContent((prev) => prev ?? txt)
      return txt
    } catch (e) {
      // On failure, clear cache so a later attempt can retry
      mdCache.delete(markdownUrl)
      throw e
    }
  }, [markdownUrl, markdownContent])

  // Prefetch on hover/focus
  const handlePrefetch = useCallback(() => {
    void fetchMarkdown()
  }, [fetchMarkdown])

  // Copy queues behind any in-flight fetch
  const handleCopy = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      useGalaxyOnClick(`${galaxyNamespace}.aiAction.copyMarkdown`)()
      try {
        const txt = markdownContent ?? (await fetchMarkdown())
        if (!txt) throw new Error('No markdown content available')
        if (navigator.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(txt)
        } else {
          const el = document.createElement('textarea')
          el.value = txt
          el.setAttribute('readonly', '')
          el.style.position = 'fixed'
          el.style.top = '-1000px'
          el.style.opacity = '0'
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')
          document.body.removeChild(el)
        }
        setCopied(true)
      } catch (err) {
        // Silence is golden...
      }
    },
    [fetchMarkdown, galaxyNamespace, markdownContent]
  )

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOpen((old) => !old)
    },
    []
  )

  const openWith = useCallback(
    (base: string, q: string) => {
      if (!cleanedUrl) return
      const url = `${base}${encodeURIComponent(q)}`
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [cleanedUrl]
  )

  const handleOpenMarkdown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      useGalaxyOnClick(`${galaxyNamespace}.aiAction.openMarkdown`)()
      if (markdownUrl) window.open(markdownUrl, '_blank', 'noopener,noreferrer')
    },
    [galaxyNamespace, markdownUrl]
  )

  const handleOpenChatGpt = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      useGalaxyOnClick(`${galaxyNamespace}.aiAction.openChatgpt`)()
      openWith(
        'https://chatgpt.com/?q=',
        `Read from ${cleanedUrl} so I can ask questions about it.`
      )
    },
    [galaxyNamespace, openWith, cleanedUrl]
  )

  const handleOpenClaude = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      useGalaxyOnClick(`${galaxyNamespace}.aiAction.openClaude`)()
      openWith(
        'https://claude.ai/new?q=',
        `Read from ${cleanedUrl} so I can ask questions about it.`
      )
    },
    [galaxyNamespace, openWith, cleanedUrl]
  )

  const handleOpenV0 = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      useGalaxyOnClick(`${galaxyNamespace}.aiAction.openV0`)()
      openWith(
        'https://v0.app/chat?q=',
        `Read from ${cleanedUrl} so I can ask questions about it.`
      )
    },
    [galaxyNamespace, openWith, cleanedUrl]
  )

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  useEffect(() => () => abortRef.current?.abort(), [])

  useClickOutside([menuRef, openRef], () => setIsOpen(false))

  return (
    <div className='relative w-max text-sm'>
      <span className='flex'>
        <button
          type='button'
          disabled={copied}
          onClick={handleCopy}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
          className='inline-flex items-center gap-3 rounded-l border border-white/20 bg-neutral-900 px-3 py-1 text-left text-neutral-200 transition-colors hover:bg-white/10 disabled:pointer-events-none'
          title={copied ? 'Copied!' : 'Copy page as Markdown'}>
          <Copy className='size-3 text-white' />
          <span className='grid grid-cols-1 grid-rows-1'>
            <span
              className={`col-start-1 row-start-1 ${copied ? 'opacity-0' : ''}`}>
              Copy page
            </span>
            <span
              className={`col-start-1 row-start-1 ${copied ? '' : 'opacity-0'}`}>
              Copied!
            </span>
          </span>
        </button>

        <button
          type='button'
          ref={openRef}
          onClick={handleOpen}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
          aria-haspopup='menu'
          aria-expanded={isOpen}
          className='inline-flex items-center rounded-r border border-l-0 border-white/20 bg-neutral-900 px-2 py-1 transition-colors hover:bg-white/10'>
          <span className='sr-only'>More actions</span>
          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? '-rotate-180' : ''}`}
          />
        </button>
      </span>
      <ul
        role='menu'
        ref={menuRef}
        className={`absolute left-0 top-full z-10 w-max translate-y-2 space-y-1 rounded border border-white/10 bg-neutral-900/60 p-1 shadow backdrop-blur-xl transition-opacity ${isOpen ? '' : 'pointer-events-none opacity-0'}`}>
        <li role='none'>
          <Item
            icon={iconMarkdown}
            name='View as Markdown'
            description='Open this page in Markdown'
            onClick={handleOpenMarkdown}
          />
        </li>
        <li role='none'>
          <Item
            icon={iconChatgpt}
            name='Open in ChatGPT'
            description='Ask questions about this page'
            onClick={handleOpenChatGpt}
            external
          />
        </li>
        <li role='none'>
          <Item
            icon={iconClaude}
            name='Open in Claude'
            description='Ask questions about this page'
            onClick={handleOpenClaude}
            external
          />
        </li>
        <li role='none'>
          <Item
            icon={iconV0}
            name='Open in v0'
            description='Ask questions about this page'
            onClick={handleOpenV0}
            external
          />
        </li>
      </ul>
    </div>
  )
}

function Item({
  icon,
  name,
  description,
  external,
  onClick
}: {
  icon: ImageProps['src']
  name: string
  description: string
  external?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {
  return (
    <button
      onClick={onClick}
      type='button'
      role='menuitem'
      className='flex w-full items-center gap-3 rounded-sm px-3 py-1 transition-colors hover:bg-white/10'>
      <span>
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className='aspect-square size-6 object-scale-down object-center'
        />
      </span>
      <span className='flex flex-col text-left'>
        <strong className='inline-flex items-center gap-2'>
          {name}{' '}
          {external && <ExternalLink className='size-3 text-neutral-200' />}
        </strong>
        <small className='text-neutral-200'>{description}</small>
      </span>
    </button>
  )
}
