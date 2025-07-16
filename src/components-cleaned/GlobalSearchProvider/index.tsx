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
  Index,
  InstantSearch,
  useHits,
  useSearchBox
} from 'react-instantsearch'

const MINIMUM_QUERY_LENGTH = 3
const MAXIMUM_RESULTS_TO_DISPLAY = 5

type GlobalSearchContextType = {
  isOpen: boolean
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<GlobalSearchContextType['searchTerm']>>
  open: (searchTerm?: GlobalSearchContextType['searchTerm']) => void
  close: () => void
  results: Array<NormalizedHit>
  setResults: Dispatch<SetStateAction<GlobalSearchContextType['results']>>
}

type NormalizedHit = Hit<BaseHit> & {
  __type: string
  __normalizedScore: number
}

const GlobalSearchContext = createContext<GlobalSearchContextType>({
  isOpen: false,
  searchTerm: '',
  setSearchTerm() {},
  open() {},
  close() {},
  results: [],
  setResults() {}
})

export function useGlobalSearch() {
  const result = useContext(GlobalSearchContext)
  if (!result) {
    throw new Error('Context used outside of the <GlobalSearch> component!')
  }
  return result
}

function getRankingScore(hit: NormalizedHit): number {
  const info = hit._rankingInfo
  if (!info) return 0

  // Sample scoring logic (you can tweak this):
  return (
    (info.words || 0) * 10 +
    (10 - (info.proximityDistance || 10)) * 2 -
    (info.nbTypos || 0) * 5 +
    (info.userScore || 0)
  )
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
  const [results, setResults] = useState<Array<NormalizedHit>>([])
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

  // Reset results on term change
  useEffect(() => {
    setResults([])
  }, [searchTerm])

  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen,
        open,
        close,
        searchTerm,
        setSearchTerm,
        results,
        setResults
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

  const handlers = useMemo(() => {
    function normalizeHits(
      oldHits: Array<Hit<BaseHit>>,
      type: string,
      newHits: Array<Hit<BaseHit>>
    ) {
      const tagHits = (hits: Array<Hit<BaseHit>>) => {
        return hits.map((hit) => ({
          ...hit,
          __type: type
        })) as Array<Omit<NormalizedHit, '__normalizedScore'>>
      }

      const scoreHits = (
        hits: Array<Omit<NormalizedHit, '__normalizedScore'>>
      ) => {
        const maxUserScore =
          Math.max(...hits.map((hit) => hit._rankingInfo?.userScore || 0)) || 1

        return hits.map((hit) => ({
          ...hit,
          __normalizedScore: (hit._rankingInfo?.userScore || 0) / maxUserScore
        })) as Array<NormalizedHit>
      }

      return scoreHits([...oldHits, ...tagHits(newHits)])
    }

    return {
      blogs(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'blogs', results))
      },
      events(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'events', results))
      },
      demos(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'demos', results))
      },
      integrations(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'integrations', results))
      },
      videos(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'videos', results))
      },
      docs(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'docs', results))
      },
      pages(results: Array<Hit<BaseHit>>) {
        context.setResults((old) => normalizeHits(old, 'pages', results))
      }
    }
  }, [])

  const filteredResults = useMemo(() => {
    const seen = new Set()

    const deduped = context.results.filter((hit) => {
      const key = `${hit.__type}_${hit.objectID}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    return deduped
      .sort((a, b) => {
        return b.__normalizedScore - a.__normalizedScore
      })
      .slice(0, MAXIMUM_RESULTS_TO_DISPLAY)
  }, [context.results])

  const hasValidQuery = context.searchTerm.length >= MINIMUM_QUERY_LENGTH
  const hasResults = filteredResults.length > 0

  return (
    <InstantSearch searchClient={searchClient}>
      {/* Search handlers */}
      <Index indexName='strapi_api::blog-post.blog-post'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
          filters='ListOnBlogs:true AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.blogs} />
      </Index>
      <Index indexName='strapi_api::demo.demo'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
          filters='ListOnDemos:true AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.demos} />
      </Index>
      <Index indexName='strapi_api::event.event'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
          filters='unlisted:false AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.events} />
      </Index>
      <Index indexName='strapi_api::integration.integration'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
        />
        <SearchHits onHitsUpdate={handlers.integrations} />
      </Index>
      <Index indexName='strapi_api::marketing-video.marketing-video'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
        />
        <SearchHits onHitsUpdate={handlers.videos} />
      </Index>
      <Index indexName='clickhouse'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
        />
        <SearchHits onHitsUpdate={handlers.docs} />
      </Index>
      <Index indexName='non_strapi_pages'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={MAXIMUM_RESULTS_TO_DISPLAY}
        />
        <SearchHits onHitsUpdate={handlers.pages} />
      </Index>

      {/* Field UI */}
      <div
        className={`sticky top-0 z-10 flex bg-neutral-900 backdrop-blur ${hasValidQuery ? 'border-b border-white/5' : ''}`}>
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

      {/* Results UI */}
      {hasResults && (
        <ul className='p-4'>
          {filteredResults.map((result, resultIndex) => {
            return (
              <li key={resultIndex}>
                <SearchResultLink hit={result} />
              </li>
            )
          })}
        </ul>
      )}
      {hasValidQuery && !hasResults && (
        <p className='py-6 text-center'>No search results</p>
      )}
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

function SearchHits({
  onHitsUpdate
}: {
  onHitsUpdate: (hits: Array<Hit<BaseHit>>) => void
}) {
  const { items, results } = useHits()

  useEffect(() => {
    if (results?.query && results.query.trim().length >= MINIMUM_QUERY_LENGTH) {
      onHitsUpdate(items)
    } else {
      onHitsUpdate([])
    }
  }, [results?.query, items, onHitsUpdate])

  return null
}

function SearchResultLink({ hit }: { hit: NormalizedHit }) {
  let badge: null | string = null
  let link: null | string = null
  let icon: ImageProps['src'] = iconDefault
  let label: null | string = null
  let target: React.HTMLProps<HTMLAnchorElement>['target'] = '_self'

  const joinPaths = (first: string, last: string) => {
    const firstTrimmed = first.replace(/\/$/, '')
    const lastTrimmed = last.replace(/^\//, '')
    return `${firstTrimmed}/${lastTrimmed}`
  }

  switch (hit.__type) {
    case 'blogs':
      badge = 'Blog'
      link = joinPaths('/blog', hit.slug)
      label = hit.title
      icon = iconBlogs
      break
    case 'demos':
      badge = 'Demo'
      link = hit.External ? hit.Link : joinPaths('/demos', hit.Link)
      target = hit.External ? '_blank' : '_self'
      label = hit.Title
      icon = iconDemos
      break
    case 'events':
      badge = 'Event'
      link = joinPaths('/company/events', hit.slug)
      label = hit.title
      icon = iconEvents
      break
    case 'videos':
      badge = 'Video'
      link = `/videos/${hit.Slug}`
      label = hit.Title
      icon = iconVideos
      break
    case 'integrations':
      badge = 'Integration'
      link = hit.openInNewWindow
        ? hit.docsLink
        : joinPaths('/integrations', hit.slug)
      target = hit.openInNewWindow ? '_blank' : '_self'
      label = hit.name
      icon = iconIntegrations
      break
    case 'docs':
      badge = 'Docs'
      link = joinPaths('/docs', hit.slug)
      target = '_blank'
      label = hit.title
      icon = iconDocs
      break
    case 'pages':
      link = hit.path
      label = hit.h1 || hit.title
      break
  }

  if (!link) return null

  const absoluteLink = new URL(link, BASE_URL_AND_PROTOCOL).toString()

  return (
    <Link
      href={link}
      target={target}
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
