import React, { ChangeEvent, useRef, useState, useEffect } from 'react'
import { BlogPostListProps } from './types'

import { SuiSearchField, SuiTitle } from '../sui/client'
import CategorySelector from '../CategorySelector'

function BlogPostList({ categories, children }: BlogPostListProps) {
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
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${queryString}`
    )
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
      </div>
      <div className='w-full md:w-3/4' ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default BlogPostList
