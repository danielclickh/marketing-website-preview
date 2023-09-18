import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { getVideos, getCategories, getCategory } from '../../lib/videos'
import { SuiSearchField } from '../sui'
import CategorySelector from '../CategorySelector'
import VideoCard from '../VideoCard'

export default function VideosList() {

  const router = useRouter()

  const [category, setCategory] = useState<string|null>(null)
  const [search, setSearch] = useState<string|null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.trim().toLowerCase())

  const videoList = (() => {
    let results = getVideos();
    const categoryName = category ? getCategory(category) : false;

    if (categoryName) {
      results = results.filter(video => video.categories.includes(categoryName))
    }

    if (search) {
      results = results.filter(video => {
        const inTitle = video.title.toLowerCase().includes(search)
        const inSubTitle = (video?.subTitle || '').toLowerCase().includes(search)
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
  ];

  // Push categories to list
  getCategories().forEach((name, slug) => {
    categoryList.push({
      text: name,
      selected: slug === category,
      onClick() {
        setCategory(slug)
      }
    })
  });

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')

    // Check the url category is valid using the `getCategory` function
    if (urlCategory && String(urlCategory).trim().length && getCategory(String(urlCategory).trim())) {
      setCategory(urlCategory)
    }

    // Check the search query is not empty
    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = [];

    if (category && getCategory(category)) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (queryParams.length) {
      router.push('/videos?' + queryParams.join('&'), undefined, { shallow: true })
    } else {
      router.push('/videos', undefined, { shallow: true })
    }
  }, [category, search]);

  return (
    <>
      <div className='max-w-7xl container mx-auto px-8 2xl:px-0 pt-8'>

        <div className='flex-col lg:flex lg:flex-row lg:justify-between items-center pb-8 lg:space-x-24'>
          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='lg:flex-1 mb-6 lg:mb-0'
            value={search || ''}
            onChange={searchChange}/>
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
          <p className='text-center w-full mt-12'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && getCategory(category) ? ` in ${getCategory(category)}` : ''}
          </p>
        )}

      </div>
    </>
  )
}
