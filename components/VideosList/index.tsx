import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  Video,
  VideoCategory,
  VideoCategoryRecord
} from '../../lib/videos/types'
import { SuiSearchField } from '../sui'
import CategorySelector from '../CategorySelector'
import VideoCard from '../VideoCard'

export default function VideosList({
  videos,
  categories
}: {
  videos: Video[]
  categories: VideoCategoryRecord
}) {
  const router = useRouter()

  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const getCategory = (slug: string) => categories?.[slug] || null

  const searchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.trim().toLowerCase())

  const videoList = (() => {
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

  const categoryList = [
    {
      text: 'View all',
      selected: !category,
      onClick() {
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
        setCategory(slug)
      }
    })
  })

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')

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

    if (queryParams.length) {
      router.push('/videos?' + queryParams.join('&'), undefined, {
        shallow: true
      })
    } else {
      router.push('/videos', undefined, { shallow: true })
    }
  }, [category, search])

  return (
    <>
      <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
        <div className='flex-col items-center pb-8 lg:flex lg:flex-row lg:justify-between lg:space-x-24'>
          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='mb-6 lg:mb-0 lg:flex-1'
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
