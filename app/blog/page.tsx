import React, { createElement } from 'react'
import { SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findOne } from '../../lib/api/strapi'

import BlogPostList from '../../components/BlogPostList'
import GetStarted from '../../components/GetStarted'
import NewsLetter from '../../components/NewsLetter'
import { BlogPost as BlogPostType } from './types'
import Markdown from '../../components/Markdown'
import BlogPost from '../../components/BlogPostList/BlogPost'

interface Props {
  title: string
  description: string
  blogs: BlogPostType[]
  categories: string[]
}

async function getData(): Promise<Props> {
  const blogPageparams = {
    populate: ['hero']
  }
  const { hero } = await findOne('blog', blogPageparams)
  const blogsParams = {
    sort: ['date:DESC', 'publishedAt:DESC'],
    populate: ['author', 'author.avatarPng', 'thumbnailPng'],
    fields: [
      'category',
      'title',
      'shortDescription',
      'createdAt',
      'updatedAt',
      'publishedAt',
      'slug',
      'date'
    ]
  }
  const data = await fetchAll('blog-posts', blogsParams)
  const categories = new Set<string>()
  for (let index = 0; index < data.length; index++) {
    categories.add(data[index].category)
  }
  return {
    title: hero.title,
    description: hero.description,
    blogs: data,
    categories: Array.from(categories)
  }
}

export default async function BlogsPage() {
  const { blogs, categories, title, description } = await getData()

  return (
    <div className='bg-hero pt-10'>
      <div className='flex container mx-auto flex-col'>
        <div className='flex flex-col text-center mx-auto pt-6'>
          <SuiTitle type='h1' className='mb-6'>
            {title}
          </SuiTitle>
          <SuiText
            size='lg'
            color='secondary'
            weight='normal'
            className='max-w-screen-sm'>
            {description}
          </SuiText>
        </div>
      </div>

      <BlogPostList categories={categories}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 justify-center'>
          {blogs.map((blog: BlogPostType) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
        <div className='mt-16 mb-32'>
          {/* @ts-expect-error Server Component */}
          <NewsLetter />
        </div>
      </BlogPostList>
      <GetStarted />
    </div>
  )
}
