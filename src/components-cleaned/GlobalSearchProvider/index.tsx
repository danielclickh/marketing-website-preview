'use client'

import { useClickOutside } from '@/hooks'
import { BASE_URL_AND_PROTOCOL } from '@/lib/next'
import { SearchIcon, XIcon } from '@heroicons/react/outline'
import { Hit, liteClient as algoliasearch } from 'algoliasearch/lite'
import { AnimatePresence, motion } from 'framer-motion'
import { BaseHit } from 'instantsearch.js'
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
  close() {}
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
  const open = (openWithSearchTerm?: string) => {
    openWithSearchTerm = openWithSearchTerm || ''
    if (openWithSearchTerm !== searchTerm) {
      setSearchTerm(openWithSearchTerm)
    }
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
              <SearchContainer searchTerm={searchTerm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalSearchContext.Provider>
  )
}

function SearchContainer({ searchTerm }: { searchTerm?: string | null }) {
  const searchClient = useMemo(() => {
    return algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
    )
  }, [])

  const [combinedResults, setCombinedResults] = useState<Array<NormalizedHit>>(
    []
  )

  const handlers = useMemo(() => {
    function normalizeHits(type: string, hits: Array<Hit<BaseHit>>) {
      const maxUserScore =
        Math.max(...hits.map((hit) => hit._rankingInfo?.userScore || 0)) || 1

      return hits.map((hit) => ({
        ...hit,
        __type: type,
        __normalizedScore: (hit._rankingInfo?.userScore || 0) / maxUserScore
      }))
    }

    return {
      blogs(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [
          ...old,
          ...normalizeHits('blogs', results)
        ])
      },
      events(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [
          ...old,
          ...normalizeHits('events', results)
        ])
      },
      demos(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [
          ...old,
          ...normalizeHits('demos', results)
        ])
      },
      integrations(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [
          ...old,
          ...normalizeHits('integrations', results)
        ])
      },
      videos(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [
          ...old,
          ...normalizeHits('videos', results)
        ])
      },
      docs(results: Array<Hit<BaseHit>>) {
        setCombinedResults((old) => [...old, ...normalizeHits('docs', results)])
      }
    }
  }, [])

  const sortedAndLimitedResults = combinedResults
    .sort((a, b) => {
      return b.__normalizedScore - a.__normalizedScore
    })
    .slice(0, MAXIMUM_RESULTS_TO_DISPLAY)

  const hasResults = sortedAndLimitedResults.length > 0

  const context = useGlobalSearch()

  return (
    <InstantSearch searchClient={searchClient}>
      {/* Search handlers */}
      <Index indexName='strapi_api::blog-post.blog-post'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={5}
          filters='ListOnBlogs:true AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.blogs} />
      </Index>
      <Index indexName='strapi_api::demo.demo'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={5}
          filters='ListOnDemos:true AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.demos} />
      </Index>
      <Index indexName='strapi_api::event.event'>
        <Configure
          getRankingInfo={true}
          hitsPerPage={5}
          filters='unlisted:false AND StagingOnly:false'
        />
        <SearchHits onHitsUpdate={handlers.events} />
      </Index>
      <Index indexName='strapi_api::integration.integration'>
        <Configure getRankingInfo={true} hitsPerPage={5} />
        <SearchHits onHitsUpdate={handlers.integrations} />
      </Index>
      <Index indexName='strapi_api::marketing-video.marketing-video'>
        <Configure getRankingInfo={true} hitsPerPage={5} />
        <SearchHits onHitsUpdate={handlers.videos} />
      </Index>
      <Index indexName='clickhouse'>
        <Configure getRankingInfo={true} hitsPerPage={5} />
        <SearchHits onHitsUpdate={handlers.docs} />
      </Index>

      {/* Field UI */}
      <div
        className={`sticky top-0 z-10 flex bg-neutral-900 backdrop-blur ${hasResults ? 'border-b border-white/5' : ''}`}>
        <SearchIcon className='pointer-events-none absolute left-4 top-1/2 h-6 w-6 flex-shrink-0 flex-grow-0 -translate-y-1/2' />
        <SearchInput defaultValue={searchTerm} className='flex-1 p-4 pl-14' />
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
          {sortedAndLimitedResults.map((result, resultIndex) => {
            return (
              <li key={resultIndex}>
                <SearchResultLink hit={result} />
              </li>
            )
          })}
        </ul>
      )}
    </InstantSearch>
  )
}

function SearchInput({
  className = '',
  defaultValue
}: {
  className?: string
  defaultValue?: string | null
}) {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { query, refine } = useSearchBox()

  // Perform query for default value
  useEffect(() => {
    if (typeof defaultValue === 'string' && defaultValue !== query) {
      refine(defaultValue)
    }
  }, [defaultValue, query, refine])

  useEffect(() => {
    const inputEl = inputRef.current
    if (!inputEl) return
    inputEl.focus()
  }, [inputRef])

  return (
    <input
      ref={inputRef}
      type='search'
      defaultValue={defaultValue || ''}
      className={`appearance-none border-none bg-transparent text-lg outline-none ${className}`}
      placeholder='Search anything...'
      onChange={(event) => {
        refine(event.target.value)
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
  let label: null | string = null
  let target: React.HTMLProps<HTMLAnchorElement>['target'] = '_self'

  const joinPaths = (first: string, last: string) => {
    const firstTrimmed = first.replace(/\/$/, '')
    const lastTrimmed = first.replace(/^\//, '')
    return `${firstTrimmed}/${lastTrimmed}`
  }

  switch (hit.__type) {
    case 'blogs':
      badge = 'Blog'
      link = joinPaths('/blog', hit.slug)
      label = hit.title
      break
    case 'demos':
      badge = 'Demo'
      link = hit.External ? hit.Link : joinPaths('/demos', hit.Link)
      target = hit.External ? '_blank' : '_self'
      label = hit.Title
      break
    case 'events':
      badge = 'Event'
      link = joinPaths('/company/events', hit.slug)
      label = hit.title
      break
    case 'videos':
      badge = 'Video'
      link = `/videos/${hit.Slug}`
      label = hit.Title
      break
    case 'integrations':
      badge = 'Integration'
      link = hit.openInNewWindow
        ? hit.docsLink
        : joinPaths('/integrations', hit.slug)
      target = hit.openInNewWindow ? '_blank' : '_self'
      label = hit.name
      break
    case 'docs':
      badge = 'Docs'
      link = joinPaths('/docs', hit.slug)
      target = '_blank'
      label = hit.title
      break
  }

  if (!link) return null

  return (
    <Link
      href={link}
      target={target}
      className='group/searchItem block rounded-lg px-4 py-2 transition-colors hover:bg-white/5'>
      {badge && (
        <small className='-ml-2 mb-1 inline-block rounded-sm bg-white/15 px-2 py-1 leading-none opacity-70'>
          {badge}
        </small>
      )}
      <strong className='block group-hover/searchItem:text-primary-300'>
        {label}
      </strong>
      <span className='block truncate text-sm opacity-70'>
        {new URL(link, BASE_URL_AND_PROTOCOL).toString()}
      </span>
    </Link>
  )
}
