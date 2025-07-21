'use client'

import iconBlogs from './assets/icon-blogs.svg'
import iconDefault from './assets/icon-default.svg'
import iconDemos from './assets/icon-demos.svg'
import iconDocs from './assets/icon-docs.svg'
import iconEvents from './assets/icon-events.svg'
import iconIntegrations from './assets/icon-integrations.svg'
import iconVideos from './assets/icon-videos.svg'
import { useClickOutside } from '@/hooks'
import { BASE_URL_AND_PROTOCOL } from '@/lib/next'
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
              className='relative mx-auto mt-0 max-h-full w-full max-w-xl overflow-y-auto rounded-lg border border-white/5 bg-neutral-900 text-white shadow-2xl'>
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
    <div className='divide-y divide-white/5'>
      <InstantSearch searchClient={searchClient}>
        {/* Field UI */}
        <div className='sticky top-0 z-10 flex bg-neutral-900 backdrop-blur'>
          <SearchIcon className='pointer-events-none absolute left-4 top-1/2 h-6 w-6 flex-shrink-0 flex-grow-0 -translate-y-1/2' />
          <SearchInput className='flex-1 p-4 pl-14' />
          <button
            type='button'
            className='border-l border-white/5 p-4 transition-colors hover:bg-white/5'
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
            <Configure getRankingInfo={true} hitsPerPage={5} />
            <Hits
              hitComponent={SearchResultLink}
              classNames={{
                list: 'p-2 empty:hidden'
              }}
            />
          </Index>
          <Index indexName='clickhouse'>
            <Configure getRankingInfo={true} hitsPerPage={3} />
            <Hits
              hitComponent={DocsResultLink}
              classNames={{
                list: `p-2 bg-white/15 empty:hidden before:content-[\'Docs\'] before:block before:uppercase before:py-2 before:px-4 before:-mx-2 before:-mt-2 before:mb-2 before:text-primary-300 before:font-bold before:leading-none before:text-sm before:bg-white/15`
              }}
            />
          </Index>
        </ResultsManager>
      </InstantSearch>
    </div>
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

function SearchResultLink({ hit }: { hit: Hit<BaseHit> }) {
  let badge: null | string = null
  let link: null | string = null
  let icon: ImageProps['src'] = iconDefault
  let label: null | string = null
  let target: React.HTMLProps<HTMLAnchorElement>['target'] = '_self'

  switch (hit.type) {
    case 'blog':
      badge = 'Blog'
      link = joinPaths('/blog', hit.attributes.slug)
      label = hit.title
      icon = iconBlogs
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
    default:
      link = hit.attributes?.path || hit.attributes?.slug
      label = hit.title
      icon = iconDefault
      break
  }

  if (!link) return null

  const absoluteLink = new URL(link, BASE_URL_AND_PROTOCOL).toString()
  const context = useGlobalSearch()

  return (
    <Link
      href={link}
      target={target}
      onClick={() => context.close()}
      className='group/searchItem flex w-full items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/5'>
      <small className='inline-block aspect-square w-12 flex-shrink-0 flex-grow-0 rounded bg-white/10 px-2 py-1 leading-none'>
        <Image
          src={icon}
          alt={badge || ''}
          width={48}
          height={48}
          className='h-full w-full max-w-none object-scale-down object-center opacity-80 invert'
        />
      </small>
      <span className='min-w-0 flex-1'>
        <strong className='block break-words group-hover/searchItem:text-primary-300'>
          {label}
        </strong>
        <span className='block truncate text-sm opacity-70'>
          {absoluteLink}
        </span>
      </span>
    </Link>
  )
}

function DocsResultLink({ hit }: { hit: Hit<BaseHit> }) {
  let link: string = joinPaths('/docs', hit.slug)
  const absoluteLink = new URL(link, BASE_URL_AND_PROTOCOL).toString()
  const context = useGlobalSearch()
  return (
    <Link
      href={link}
      onClick={() => context.close()}
      className='group/searchItem block w-full rounded px-2 py-1 transition-colors hover:bg-white/10'>
      <strong className='block break-words group-hover/searchItem:text-primary-300'>
        {hit.title}
      </strong>
      <span className='block truncate text-sm opacity-70'>{absoluteLink}</span>
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
