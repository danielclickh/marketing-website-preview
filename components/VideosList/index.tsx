import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { getVideos, getCategories } from '../../lib/videos'
import VideoPlayButton from "../../public/images/VideoPlayButton";
import { SuiSearchField } from '../sui'
import CategorySelector from '../CategorySelector'
import { CUICard } from '../ClickUI'

export default function VideosList() {

  const router = useRouter()

  const defaultCategory = 'View all';
  const [category, setCategory] = useState<string>(defaultCategory)
  const [search, setSearch] = useState<string | null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.trim().toLowerCase())

  const videoList = (() => {
    let results = getVideos();

    if (category && category !== defaultCategory) {
      results = results.filter(video => video.categories.includes(category))
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

  const categoryList = [defaultCategory, ...getCategories()].map(categoryName => {
    return {
      text: categoryName,
      selected: categoryName === category,
      onClick() {
        setCategory(categoryName)
      }
    }
  })

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')

    if (urlCategory && String(urlCategory).trim().length) {
      setCategory(urlCategory)
    }

    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = [];

    if (category && category !== defaultCategory) {
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
              <Link
                key={video.id} href={`/videos/${video.id}`}
                className='transition ease-in-out hover:no-underline hover:-translate-y-1 hover:scale-102'>
                <CUICard>
                  <CUICard.Body>
                    <div className='relative overflow-hidden rounded-t-lg'>
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={774}
                        height={420} />

                      <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center'>
                        <VideoPlayButton className='transition-all group-hover:scale-150' />
                      </div>
                    </div>

                    <div className='p-6 font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                        {video.categories.join(', ')}
                      </div>
                      <p>{video.title}</p>
                      {video?.subTitle && <p className='pt-4 text-sm whitespace-pre-wrap'>{video.subTitle}</p>}
                    </div>
                  </CUICard.Body>
                </CUICard>
              </Link>
            )
          })}
        </div>

        {!videoList.length && (
          <p className='text-center w-full mt-12'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && category !== defaultCategory ? ` in ${category}` : ''}
          </p>
        )}

      </div>
    </>
  )
}
