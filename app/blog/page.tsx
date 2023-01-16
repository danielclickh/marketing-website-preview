import React, { createElement } from 'react'
import { SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findOne } from '../../lib/api/strapi'

import BlogPostList from '../../components/BlogPostList'
import GetStarted from '../../components/GetStarted'
import NewsLetter from '../../components/NewsLetter'
import { BlogPost as BlogPostType } from './types'
import Markdown from '../../components/Markdown'

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

const components = {
  a: (props: any) => <span {...props} />
}

export default async function BlogsPage() {
  const { blogs, categories, title, description } = await getData()

  blogs.map((blog) => ({
    ...blog,
    shortDescriptionElement: createElement('div', {
      childreen: (
        <SuiText
          size='xs'
          weight='medium'
          color='secondary'
          className='line-clamp'>
          <Markdown components={components}>{blog.shortDescription}</Markdown>
        </SuiText>
      )
    })
  }))

  return (
    <div className='bg-hero pt-10'>
      <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
        <div
          className='flex flex-col text-center mx-auto pt-6'
          data-aos='fade-up'>
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

      <BlogPostList categories={categories} blogs={blogs}>
        {/* @ts-expect-error Server Component */}
        <NewsLetter />
      </BlogPostList>
      <GetStarted />
    </div>
  )
}
