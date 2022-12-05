import React from 'react'
import { SuiSpacer, SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findOne } from '../../lib/api/strapi'
import { BlogPost } from './types'
import markdownToHtml from '../../lib/markdown'

import BlogPostList from '../../components/BlogPostList'

async function getData() {
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
  const categories = new Set()
  for (let index = 0; index < data.length; index++) {
    const blog = data[index]
    categories.add(blog.category)
    data[index].shortDescription = await markdownToHtml(blog.shortDescription)
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
    <div className='bg-web-light-c1 dark:bg-dark_hero_background pt-10'>
      <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
        <div
          className='flex flex-col text-center mx-auto pt-6'
          data-aos='fade-up'>
          <SuiTitle size='web'>
            <h1>{title}</h1>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <div className='max-w-2xl'>
            <SuiText size='lg' color='dark' weight='normal'>
              <p>{description}</p>
            </SuiText>
          </div>
        </div>
      </div>

      <BlogPostList categories={categories} blogs={blogs} />
    </div>
  )
}
