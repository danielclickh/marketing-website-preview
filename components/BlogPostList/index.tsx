'use client'
import React, { useMemo, useState } from 'react'
import BlogPost from './BlogPost'
import { BlogPostListProps } from './types'

import { SuiSpacer, SuiTextField, SuiTitle } from '../sui'
import CategorySelector from '../CategorySelector'
function BlogPostList({ blogs, categories }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const blogList = useMemo(() => {
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
          onChange={(e) => setSearch(e.target.value)}
        />
        <SuiSpacer size='lg' />
        <SuiTitle size='xs'>
          <h4>Blog categories</h4>
        </SuiTitle>
        <CategorySelector options={categoryList} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-3/4 md:gap-16 justify-center'>
        {blogList.map((blog) => (
          <BlogPost key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogPostList
