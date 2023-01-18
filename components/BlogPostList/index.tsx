'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { BlogPostListProps } from './types'

import { SuiSearchField, SuiText, SuiTitle } from '../sui/client'
import CategorySelector from '../CategorySelector'

function BlogPostList({ categories, children }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const filterBlogs = (
    search: string | null,
    selectedCategory: string | null
  ) => {
    const category = (selectedCategory ?? '').split(' ').join('-')
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
    filterBlogs(search, category)
    setSelectedCategory(category)
  }

  const ref = useRef<HTMLDivElement>(null)
  const categoryList = categories.map((category) => ({
    text: category,
    onClick: () => onChangeCategory(category),
    selected: selectedCategory === category
  }))

  categoryList.unshift({
    text: 'View All',
    onClick: () => onChangeCategory(null),
    selected: selectedCategory === null
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterBlogs(e.target.value, selectedCategory)
    setSearch(e.target.value)
  }

  return (
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl justify-between pt-24 px-6 sm:px-8 2xl:px-0'>
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
