import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Video,
  VideoCategory,
  VideoCategoryRecord
} from '../../lib/videos/types'
import { CUIButton } from '../ClickUI'
import Pagination from '../Pagination'
import { SuiSearchField } from '../sui'
import CategorySelector from '../CategorySelector'
import VideoCard from '../VideoCard'

const VIDEOS_PER_PAGE = 9

export default function VideosList({
  videos,
  categories
}: {
  videos: Video[]
  categories: VideoCategoryRecord
}) {
  const router = useRouter()

  const container = useRef<HTMLDivElement>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)

  const getCategory = (slug: string) => categories?.[slug] || null

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setSearch(e.target.value.trim().toLowerCase())
  }

  let videoList = (() => {
    let results = structuredClone(videos)
    const categoryName = category ? getCategory(category) : false

    if (categoryName) {
      results = results.filter((video) =>
        video.categories.includes(categoryName)
      )
    }

    if (search) {
      results = results.filter((video) => {
        const inTitle = video.title.toLowerCase().includes(search)
        const inSubTitle = (video?.subTitle || '')
          .toLowerCase()
          .includes(search)
        return inTitle || inSubTitle
      })
    }
    return results
  })()

  const totalPages = Math.floor(videoList.length / VIDEOS_PER_PAGE)
  const hasPrevPage = page > 0
  const hasNextPage = page < totalPages

  const backToTop = () => {
    setTimeout(() => {
      container.current?.scrollIntoView({
        behavior: 'smooth'
      })
    })
  }

  // Apply pagination
  if (page > 0 && page <= totalPages) {
    const pageStart = page * VIDEOS_PER_PAGE - 1
    const pageEnd = pageStart + VIDEOS_PER_PAGE
    videoList = videoList.slice(pageStart, pageEnd)
  } else {
    videoList = videoList.slice(0, VIDEOS_PER_PAGE)
  }

  const categoryList = [
    {
      text: 'View all',
      selected: !category,
      onClick() {
        setPage(0)
        setCategory(null)
      }
    }
  ]

  // Push categories to list
  Object.entries(categories).forEach(([slug, name]) => {
    categoryList.push({
      text: name,
      selected: slug === category,
      onClick() {
        setPage(0)
        setCategory(slug)
      }
    })
  })

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')
    const urlPage = parseInt(queryParams.get('page') || '')

    // Check the url category is valid using the `getCategory` function
    if (
      urlCategory &&
      String(urlCategory).trim().length &&
      getCategory(String(urlCategory).trim())
    ) {
      setCategory(urlCategory)
    }

    // Check the search query is not empty
    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }

    // Check the page number is not empty
    if (!isNaN(urlPage) && urlPage >= 0 && urlPage <= totalPages) {
      setPage(urlPage)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = []

    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`)
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`)
    }

    if (page) {
      queryParams.push(`page=${encodeURIComponent(page)}`)
    }

    if (queryParams.length) {
      router.push('/videos?' + queryParams.join('&'), undefined, {
        shallow: true
      })
    } else {
      router.push('/videos', undefined, { shallow: true })
    }
  }, [category, search, page])

  return (
    <>
      <div
        className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'
        ref={container}>
        <div className='mb-20 flex-col items-center'>
          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='mx-auto mb-6 md:max-w-md lg:mb-8'
            value={search || ''}
            onChange={searchChange}
          />
          <CategorySelector options={categoryList} />
        </div>

        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {videoList.map((video) => {
            return (
              <div key={video.slug}>
                <VideoCard video={video} />
              </div>
            )
          })}
        </div>

        <Pagination
          current={page + 1}
          totalPages={totalPages}
          onClick={(targetPage) => {
            backToTop()
            setPage(targetPage - 1)
          }}
        />

        {!videoList.length && (
          <p className='mt-12 w-full text-center'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && getCategory(category)
              ? ` in ${getCategory(category)}`
              : ''}
          </p>
        )}
      </div>
    </>
  )
}
