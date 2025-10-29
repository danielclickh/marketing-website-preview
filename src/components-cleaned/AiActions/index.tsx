'use client'

import iconChatgpt from './assets/icon-chatgpt.svg'
import iconClaude from './assets/icon-claude.svg'
import iconMarkdown from './assets/icon-markdown.svg'
import iconV0 from './assets/icon-v0.svg'
import { useClickOutside } from '@/hooks'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ChevronDown, Copy, ExternalLink } from 'lucide-react'
import Image, { ImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'

export interface AiActionsProps {
  galaxyNamespace?: string
}

export default function AiActions({
  galaxyNamespace = 'aiActions'
}: AiActionsProps) {
  const menuRef = useRef<null | HTMLUListElement>(null)
  const openRef = useRef<null | HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [copied, setCopied] = useState(false)

  const cleanedUrlRef = useRef<null | string>(null)
  const markdownUrlRef = useRef<null | string>(null)

  useEffect(() => {
    cleanedUrlRef.current = (() => {
      const urlObj = new URL(window.location.toString())
      urlObj.search = ''
      urlObj.hash = ''
      return urlObj.toString()
    })()

    markdownUrlRef.current = (() => {
      const urlObj = new URL(cleanedUrlRef.current)
      urlObj.pathname = `${urlObj.pathname}.md`
      return urlObj.toString()
    })()
  }, [])

  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const markdownUrl = markdownUrlRef.current
    useGalaxyOnClick(`${galaxyNamespace}.action.copyMarkdown`)()
    if (markdownUrl) {
      setFetching(true)
      ;(async () => {
        const request = await fetch(markdownUrl)
        const body = await request.text()
        navigator.clipboard
          .writeText(body)
          .catch((err) => {
            console.error(
              'Error copying text to clipboard using Clipboard API:',
              err
            )
          })
          .finally(() => {
            setFetching(false)
            setCopied(true)
          })
      })()
    }
  }

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsOpen((old) => !old)
  }

  const handleOpenMarkdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    useGalaxyOnClick(`${galaxyNamespace}.action.openMarkdown`)()
    if (markdownUrlRef.current) {
      window.open(markdownUrlRef.current, '_blank')
    }
  }

  const handleOpenChatGpt = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    useGalaxyOnClick(`${galaxyNamespace}.action.openChatgpt`)()
    if (cleanedUrlRef.current) {
      window.open(
        `https://chatgpt.com/?q=${encodeURIComponent(`Read from ${cleanedUrlRef.current} so I can ask questions about it.`)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  const handleOpenClaude = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    useGalaxyOnClick(`${galaxyNamespace}.action.openClaude`)()
    if (cleanedUrlRef.current) {
      window.open(
        `https://claude.ai/new?q=${encodeURIComponent(`Read from ${cleanedUrlRef.current} so I can ask questions about it.`)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }
  const handleOpenV0 = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    useGalaxyOnClick(`${galaxyNamespace}.action.openV0`)()
    if (cleanedUrlRef.current) {
      window.open(
        `https://v0.app/chat?q=${encodeURIComponent(`Read from ${cleanedUrlRef.current} so I can ask questions about it.`)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = window.setTimeout(() => {
        setCopied(false)
      }, 2000)

      return () => window.clearTimeout(timer)
    }
  }, [copied])

  useClickOutside([menuRef, openRef], () => {
    setIsOpen(false)
  })

  const showCopiedFeedback = fetching || copied

  return (
    <div className='relative w-max text-sm'>
      <span className='flex'>
        <button
          type='button'
          disabled={showCopiedFeedback}
          onClick={handleCopy}
          className='inline-flex items-center gap-3 rounded-l border border-white/20 bg-neutral-900 px-3 py-1 text-left text-neutral-200 transition-colors hover:bg-white/10 disabled:pointer-events-none'>
          <Copy className='size-3 text-white' />
          <span className='grid grid-cols-1 grid-rows-1'>
            <span
              className={`col-start-1 row-start-1 ${showCopiedFeedback ? 'opacity-0' : ''}`}>
              Copy page
            </span>
            <span
              className={`col-start-1 row-start-1 ${showCopiedFeedback ? '' : 'opacity-0'}`}>
              Copied!
            </span>
          </span>
        </button>
        <button
          type='button'
          onClick={handleOpen}
          ref={openRef}
          className='inline-flex items-center rounded-r border border-l-0 border-white/20 bg-neutral-900 px-2 py-1 transition-colors hover:bg-white/10'>
          <span className='sr-only'>More actions</span>
          <ChevronDown
            className={`size-4 transition-transform ${isOpen ? '-rotate-180' : ''}`}
          />
        </button>
      </span>
      <ul
        ref={menuRef}
        className={`absolute left-0 top-full z-10 w-max translate-y-2 space-y-1 rounded border border-white/10 bg-neutral-900/60 p-1 shadow backdrop-blur-xl transition-opacity ${isOpen ? '' : 'pointer-events-none opacity-0'}`}>
        <li>
          <Item
            icon={iconMarkdown}
            name='View as Markdown'
            description='Open this page in Markdown'
            onClick={handleOpenMarkdown}
          />
        </li>
        <li>
          <Item
            icon={iconChatgpt}
            name='Open in ChatGPT'
            description='Ask questions about this page'
            onClick={handleOpenChatGpt}
            external={true}
          />
        </li>
        <li>
          <Item
            icon={iconClaude}
            name='Open in Claude'
            description='Ask questions about this page'
            onClick={handleOpenClaude}
            external={true}
          />
        </li>
        <li>
          <Item
            icon={iconV0}
            name='Open in v0'
            description='Ask questions about this page'
            onClick={handleOpenV0}
            external={true}
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
