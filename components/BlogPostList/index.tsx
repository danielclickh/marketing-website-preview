'use client'
import React, { ChangeEvent, useMemo, useState } from 'react'
import BlogPost from './BlogPost'
import { BlogPostListProps, BlogPost as BlogPostType } from './types'

import { SuiTextField, SuiTitle } from '../sui'
import CategorySelector from '../CategorySelector'
function BlogPostList({ blogs, categories, children }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const blogList: BlogPostType[] = useMemo(() => {
    let newBlogList =
      selectedCategory === null
        ? blogs
        : blogs.filter((blog) => selectedCategory === blog.category)
    if (search.length > 0) {
      newBlogList = newBlogList.filter((blogPost) => {
        return search
          .toLowerCase()
          .trim()
          .split(' ')
          .every((keyword) => {
            const title = blogPost.title.toLowerCase()
            const shortDescription = blogPost.shortDescription.toLowerCase()
            return title.includes(keyword) || shortDescription.includes(keyword)
          })
      })
    }
    return newBlogList
  }, [blogs, selectedCategory, search])

  const categoryList = categories.map((category) => ({
    text: category,
    onClick: () => setSelectedCategory(category),
    selected: selectedCategory === category
  }))

  categoryList.unshift({
    text: 'View All',
    onClick: () => setSelectedCategory(null),
    selected: selectedCategory === null
  })

  return (
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between pt-24'>
      <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
        <SuiTextField
          placeholder='Search'
          htmlFor='search'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <SuiTitle type='h6' className='mt-6'>
          Blog categories
        </SuiTitle>
        <CategorySelector options={categoryList} />
      </div>
      <div className='w-full md:w-3/4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 justify-center'>
          {blogList.map((blog: BlogPostType) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}

export default BlogPostList
