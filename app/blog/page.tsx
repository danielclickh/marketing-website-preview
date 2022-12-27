import React from 'react'
import { SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findOne } from '../../lib/api/strapi'

import BlogPostList from '../../components/BlogPostList'
import GetStarted from '../../components/GetStarted'

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
    <div className='bg-white dark:bg-dark_hero_background pt-10'>
      <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
        <div
          className='flex flex-col text-center mx-auto pt-6'
          data-aos='fade-up'>
          <SuiTitle type='h1' className='mb-2'>
            {title}
          </SuiTitle>
          <SuiText
            size='lg'
            color='secondary'
            weight='normal'
            className='max-w-2xl'>
            {description}
          </SuiText>
        </div>
      </div>

      <BlogPostList categories={categories} blogs={blogs} />

      <GetStarted />
    </div>
  )
}
