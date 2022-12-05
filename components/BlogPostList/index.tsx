'use client'
import React, { useMemo, useState } from 'react'
import BlogPost from './BlogPost'
import { BlogPostListProps } from './types'

import { SuiSpacer, SuiTextField, SuiTitle } from '../sui'
function BlogPostList({ blogs, categories }: BlogPostListProps) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')

  const blogList = useMemo(() => {
    let newBlogList =
      selectedCategory.length === 0
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

  return (
    <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between pt-24'>
      <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
        <SuiTextField
          placeholder='Search'
          htmlFor='search'
          onChange={(e) => setSearch(e.target.value)}
        />
        <SuiSpacer size='lg' />
        <SuiTitle size='xxs'>
          <h4>Blog categories</h4>ß
        </SuiTitle>
        <ul className='mt-4'>
          <li
            onClick={() => setSelectedCategory('')}
            className={`category-tile ${
              selectedCategory.length === 0 ? 'active' : ''
            }`}>
            View all
          </li>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-tile ${
                category === selectedCategory ? 'active' : ''
              }`}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-col- md:flex-row md:w-3/4 md:space-x-16 justify-center'>
        {blogList.map((blog) => (
          <BlogPost
            key={blog.id}
            {...blog}
            author_avatar='author_rich.png'
            author_name='Rich Raposa'
            date='May 3, 2022'
            image='docs-post.png'
            title='ClickHouse Docs have a new look and feel!'
            tag='Product'
            abstract='ClickHouse is impressively fast, in fact, that is core to our engineering ethos and the goals of the project. Understanding ClickHouse (or any new product) and using it effectively'
          />
        ))}
      </div>
    </div>
  )
}

export default BlogPostList
