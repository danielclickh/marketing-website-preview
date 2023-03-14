import React, { ChangeEvent, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BlogPostListProps } from './types'
import { SuiLink } from '../sui'
import { SuiSearchField, SuiTitle } from '../sui/client'
import CategorySelector from '../CategorySelector'

function BlogPostList({ categories, children }: BlogPostListProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const filterBlogs = (
    search: string | null,
    selectedCategory: string | null
  ) => {
    const category = (selectedCategory ?? '').split(' ').join('-').toLowerCase()
    if (ref.current) {
      const blogs = ref.current?.querySelectorAll(
        `.blog-post-card${selectedCategory ? `.category-${category}` : ''}`
      )
      if (selectedCategory) {
        ref.current
          ?.querySelectorAll(`.blog-post-card:not(.category-${category})`)
          .forEach((blog) => {
            if (!blog.classList.contains('hidden')) {
              blog.classList.add('hidden')
            }
          })
      }
      blogs.forEach((blog) => {
        if (search) {
          const blogContent = (blog.textContent ?? '').toLowerCase()
          const showBlog = search
            .toLowerCase()
            .trim()
            .split(' ')
            .every((keyword) => {
              return blogContent.includes(keyword)
            })
          if (showBlog && blog.classList.contains('hidden')) {
            blog.classList.remove('hidden')
          } else if (!showBlog && !blog.classList.contains('hidden')) {
            blog.classList.add('hidden')
          }
        } else if (blog.classList.contains('hidden')) {
          blog.classList.remove('hidden')
        }
      })
    }
  }

  const onChangeCategory = (category: string | null) => {
    const normalizedCategory = category
      ? category.split(' ').join('-').toLowerCase()
      : ''
    filterBlogs(search, category)
    setSelectedCategory(category)
    const queryString = category ? `?category=${normalizedCategory}` : ''
    router.push('/blog' + queryString, undefined, { shallow: true })
  }

  const ref = useRef<HTMLDivElement>(null)
  const categoryList = categories.map((category) => ({
    text: category,
    onClick: () => onChangeCategory(category),
    selected: selectedCategory == category
  }))

  categoryList.unshift({
    text: 'View All',
    onClick: () => onChangeCategory(null),
    selected: selectedCategory == null
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterBlogs(e.target.value, selectedCategory)
    setSearch(e.target.value)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const category = searchParams.get('category')
    if (category) {
      const sanitizedCategory = encodeURIComponent(category) // sanitize the category parameter
      const normalizedCategory = sanitizedCategory
        .split(' ')
        .join('-')
        .toLowerCase()
      const matchingCategory = categories.find(
        (c) => c.split(' ').join('-').toLowerCase() === normalizedCategory
      )
      if (matchingCategory) {
        onChangeCategory(matchingCategory)
      } else {
        setSelectedCategory(null)
        filterBlogs(null, null) // show all blogs
      }
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl justify-between pt-24 px-4 sm:px-8 2xl:px-0'>
      <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
        <SuiSearchField
          placeholder='Search'
          htmlFor='search'
          onChange={onChange}
        />
        <SuiTitle type='h6' color='c6' className='mt-4'>
          Blog categories
        </SuiTitle>
        <CategorySelector options={categoryList} />
        <div className='pt-2'>
          <hr />
          <SuiLink
            key='blog-categories-nav'
            href='/rss.xml'
            target='blank'
            segmentEvent={{
              label: 'Blog RSS link',
              category: 'blog-categories-nav'
            }}
            weight='normal'>
            <div className='flex items-center pt-2'>
              <span className='text-sm px-4 pr-2 py-2 font-semibold cursor-pointer text-c4'>
                Grab the RSS feed
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 stroke-orange-400'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </div>
          </SuiLink>
        </div>
      </div>
      <div className='w-full md:w-3/4' ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default BlogPostList
