'use client'

import iconBlogs from './assets/icon-blogs.svg'
import iconDefault from './assets/icon-default.svg'
import iconDemos from './assets/icon-demos.svg'
import iconDocs from './assets/icon-docs.svg'
import iconEvents from './assets/icon-events.svg'
import iconIntegrations from './assets/icon-integrations.svg'
import iconResources from './assets/icon-resources.svg'
import iconVideos from './assets/icon-videos.svg'
import { useClickOutside } from '@/hooks'
import { BASE_URL_AND_PROTOCOL } from '@/lib/next'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { SearchIcon, XIcon } from '@heroicons/react/outline'
import { Hit, liteClient as algoliasearch } from 'algoliasearch/lite'
import { AnimatePresence, motion } from 'framer-motion'
import { BaseHit } from 'instantsearch.js'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Configure,
  Hits,
  Index,
  InstantSearch,
  useInstantSearch,
  useSearchBox
} from 'react-instantsearch'

const MINIMUM_QUERY_LENGTH = 0

type GlobalSearchContextType = {
  isOpen: boolean
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<GlobalSearchContextType['searchTerm']>>
  open: (searchTerm?: GlobalSearchContextType['searchTerm']) => void
  close: () => void
}

const GlobalSearchContext = createContext<GlobalSearchContextType>({
  isOpen: false,
  searchTerm: '',
  setSearchTerm() {},
  open() {},
  close() {}
})

export function useGlobalSearch() {
  const result = useContext(GlobalSearchContext)
  if (!result) {
    throw new Error('Context used outside of the <GlobalSearch> component!')
  }
  return result
}

export interface GlobalSearchProviderProps {
  children: React.ReactNode
}

export default function GlobalSearchProvider({
  children
}: GlobalSearchProviderProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const open = (openWithSearchTerm?: string) => {
    setSearchTerm(openWithSearchTerm || '')
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }

  useClickOutside(dialogRef, (event) => {
    event.preventDefault()
    close()
  })

  // Keyboard shortcuts
  useEffect(() => {
    const keypressHandler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const dialogEl = dialogRef.current

      // Toggle on [cmd + k] or [ctrl + k]
      if ((event.ctrlKey || event.metaKey) && key === 'k') {
        event.preventDefault()
        isOpen ? close() : open()
      }

      // Close on [esc]
      else if (key === 'escape' && isOpen) {
        event.preventDefault()
        close()
      }

      //
      else if (
        (key === 'arrowdown' || key === 'arrowup') &&
        isOpen &&
        dialogEl
      ) {
        event.preventDefault()
        const results = Array.from(
          dialogEl.querySelectorAll(
            '.ais-Hits ol.ais-Hits-list li.ais-Hits-item'
          )
        ) as Array<HTMLElement>
        const activeIndex = results.findIndex(
          (result) => document.activeElement === result.firstChild
        )
        let nextIndex = 0

        switch (key) {
          case 'arrowup':
            nextIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1
            break
          case 'arrowdown':
            nextIndex =
              activeIndex + 1 >= results.length
                ? results.length - 1
                : activeIndex + 1
            break
        }

        const linkEl = results[nextIndex].firstElementChild

        if (linkEl instanceof HTMLElement) {
          linkEl.scrollIntoView({ block: 'nearest', behavior: 'instant' })
          linkEl.focus()
        }
      }
    }
    window.addEventListener('keydown', keypressHandler)
    return () => window.removeEventListener('keydown', keypressHandler)
  }, [isOpen, dialogRef])

  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen,
        open,
        close,
        searchTerm,
        setSearchTerm
      }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-[9999] flex items-start px-2 py-[10vh] before:absolute before:inset-0 before:bg-black/40'>
            <motion.div
              ref={dialogRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='relative mx-auto mt-0 max-h-full w-full max-w-xl scroll-pt-16 overflow-y-auto rounded-lg border border-white/5 bg-neutral-900 text-white shadow-2xl'>
              <SearchContainer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalSearchContext.Provider>
  )
}

function SearchContainer() {
  const context = useGlobalSearch()

  const searchClient = useMemo(() => {
    return algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
    )
  }, [])

  return (
    <InstantSearch searchClient={searchClient}>
      {/* Field UI */}
      <div className='sticky top-0 z-10 flex border-b border-white/5 bg-neutral-900 backdrop-blur'>
        <SearchIcon className='pointer-events-none absolute left-4 top-1/2 h-6 w-6 flex-shrink-0 flex-grow-0 -translate-y-1/2' />
        <SearchInput className='flex-1 p-4 pl-14' />
        <button
          type='button'
          className='border-l border-white/5 p-4 outline-none transition-colors hover:bg-white/5 focus:bg-white/5'
          onClick={(event) => {
            event.preventDefault()
            context.close()
          }}>
          <XIcon className='h-6 w-6' />
        </button>
      </div>

      {/* Search handlers */}
      <ResultsManager
        fallback={<p className='py-6 text-center'>No results found.</p>}>
        <Index indexName='marketing_site'>
          <Configure
            hitsPerPage={5}
            optionalFilters={[
              `type:event AND datetime < ${Date.now()} <score=0>`
            ]}
          />
          <Hits
            hitComponent={StaticResult}
            classNames={{
              list: 'p-2 empty:hidden'
            }}
          />
        </Index>
        <Index indexName='clickhouse'>
          <Configure hitsPerPage={3} />
          <Hits
            hitComponent={DocsResult}
            classNames={{
              list: `p-2 border-t border-white/5 empty:hidden before:content-['Docs_results'] before:block before:py-1 before:px-4 before:font-bold`
            }}
          />
        </Index>
      </ResultsManager>
    </InstantSearch>
  )
}

function SearchInput({ className = '' }: { className?: string }) {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { query, refine } = useSearchBox()
  const context = useGlobalSearch()

  // Perform query everytime the search term changes
  useEffect(() => {
    if (context.searchTerm !== query) {
      refine(context.searchTerm)
    }
  }, [context.searchTerm, query, refine])

  // Focus input on mount
  useEffect(() => {
    const inputEl = inputRef.current
    if (!inputEl) return
    inputEl.focus()
  }, [inputRef])

  return (
    <input
      ref={inputRef}
      type='search'
      defaultValue={context.searchTerm}
      className={`appearance-none border-none bg-transparent text-lg outline-none ${className}`}
      placeholder='Search anything...'
      onChange={(event) => {
        context.setSearchTerm(event.target.value)
      }}
    />
  )
}

function joinPaths(first: string, last: string | undefined) {
  const firstTrimmed = first.replace(/\/$/, '')
  const lastTrimmed = (last || '').replace(/^\//, '')
  return `${firstTrimmed}/${lastTrimmed}`
}

function StaticResult({ hit }: { hit: Hit<BaseHit> }) {
  let badge: null | string = null
  let link: null | string = null
  let date: null | Date = null
  let icon: ImageProps['src'] = iconDefault
  let label: null | string = null
  let target: React.HTMLProps<HTMLAnchorElement>['target'] = '_self'

  switch (hit.type) {
    case 'blog':
      badge = 'Blog'
      link = joinPaths('/blog', hit.attributes.slug)
      label = hit.title
      icon = iconBlogs
      date = new Date(hit.datetime)
      break
    case 'demo':
      badge = 'Demo'
      link = hit.attributes.slug
        ? joinPaths('/demos', hit.attributes.slug)
        : hit.attributes.link
      target = hit.attributes.slug ? '_self' : '_blank'
      label = hit.title
      icon = iconDemos
      break
    case 'event':
      badge = 'Event'
      link = joinPaths('/company/events', hit.attributes.slug)
      label = hit.title
      icon = iconEvents
      date = new Date(hit.datetime)
      break
    case 'integration':
      badge = 'Integration'
      link = hit.attributes.slug
        ? joinPaths('/integrations', hit.attributes.slug)
        : hit.attributes.link
      target = hit.attributes.slug ? '_self' : '_blank'
      label = hit.title
      icon = iconIntegrations
      break
    case 'video':
      badge = 'Video'
      link = joinPaths('/videos', hit.attributes.slug)
      label = hit.title
      icon = iconVideos
      break
    case 'engineering-resources':
      badge = 'Engineering Resource'
      link = hit.attributes?.path
      label = hit.title
      icon = iconResources
      break
    default:
      link =
        hit.attributes?.path || hit.attributes?.slug || hit.attributes?.link
      label = hit.title
      icon = iconDefault
      break
  }

  if (!link) return null

  return (
    <SearchResultLink
      badge={badge}
      link={link}
      label={label}
      date={date}
      target={target}
      icon={icon}
    />
  )
}

function DocsResult({ hit }: { hit: Hit<BaseHit> }) {
  let link: string = joinPaths('/docs', hit.slug)
  return (
    <SearchResultLink
      badge='Docs'
      link={link}
      label={hit.title}
      icon={iconDocs}
    />
  )
}

function SearchResultLink({
  badge,
  link,
  date,
  icon = iconDefault,
  label,
  target = '_self'
}: {
  link: string
  badge?: null | string
  date?: null | Date
  icon?: ImageProps['src']
  label?: null | string
  target?: React.HTMLProps<HTMLAnchorElement>['target']
}) {
  const absoluteLink = new URL(link, BASE_URL_AND_PROTOCOL).toString()
  const context = useGlobalSearch()

  return (
    <Link
      href={link}
      target={target}
      onClick={() => context.close()}
      className='group/searchItem flex w-full items-center gap-4 rounded-lg p-2 outline-none transition-colors hover:bg-white/5 focus:bg-white/5'>
      <span className='block w-14 flex-shrink-0 flex-grow-0 rounded bg-white/10'>
        <Image
          src={icon}
          alt={badge || ''}
          width={48}
          height={48}
          className='aspect-square h-auto w-full max-w-none object-scale-down object-center opacity-80 invert'
        />
      </span>
      <span className='flex min-w-0 flex-1 flex-col leading-tight'>
        {(date || badge) && (
          <span className='mb-1'>
            <small className='flex w-max gap-1 whitespace-nowrap rounded-full border border-white/40 px-2 py-0.5 lowercase leading-none opacity-40 transition-opacity group-hover/searchItem:opacity-60 group-focus/searchItem:opacity-60'>
              {badge && <span>{badge}</span>}
              {badge && date && <span>&bull;</span>}
              {date && <span>{convertDateToString(date)}</span>}
            </small>
          </span>
        )}
        <strong className='break-words group-hover/searchItem:text-primary-300 group-focus/searchItem:text-primary-300'>
          {label}
        </strong>
        <span className='truncate text-sm opacity-70'>{absoluteLink}</span>
      </span>
    </Link>
  )
}

function ResultsManager({
  children,
  fallback
}: {
  children?: React.ReactNode
  fallback?: React.ReactNode
}) {
  const context = useGlobalSearch()
  const { scopedResults } = useInstantSearch()

  const totalHits = scopedResults.reduce((acc, current) => {
    return acc + (current.results?.nbHits || 0)
  }, 0)

  const hasQuery = context.searchTerm.length > MINIMUM_QUERY_LENGTH

  if (!hasQuery) {
    return (
      <>
        <div hidden>{children}</div>
      </>
    )
  }

  if (hasQuery && totalHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return <>{children}</>
}
