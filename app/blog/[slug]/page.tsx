import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/solid'

import {
  SuiButton,
  SuiText,
  SuiTitle,
  SuiHorizontalDivide,
  SuiPanel,
  SuiTextField
} from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { BlogPost } from '../types'
import Markdown from '../../../components/Markdown'
import RecentBlog from './RecentBlog'
import { StrapiImage } from '../../../components/StrapiElements'
import GetStarted from '../../../components/GetStarted'

interface BlogProps extends BlogPost {
  content: string
  otherBlogs: BlogPost[]
}

async function getData(slug: string): Promise<BlogProps> {
  const { data } = await findAll('blog-posts', {
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: ['author', 'author.avatarPng', 'thumbnailPng'],
    pagination: { limit: 1 }
  })
  const blog = data[0]

  const blogsParams = {
    sort: ['date:DESC', 'publishedAt:DESC'],
    populate: ['thumbnailPng'],
    fields: ['category', 'title'],
    pagination: { limit: 3 }
  }
  const { data: otherBlogs } = await findAll('blog-posts', blogsParams)
  return {
    ...blog,
    otherBlogs
  }
}

export default async function BlogPage({ params }) {
  const { title, author, content, category, otherBlogs, date, publishedAt } =
    await getData(params.slug)
  return (
    <>
      <div className='bg-white dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6 max-w-3xl'
            data-aos='fade-up'>
            <SuiTitle type='h4' color='primary'>
              {category}
            </SuiTitle>
            <SuiTitle type='h1' className='mb-6'>
              {title}
            </SuiTitle>
            <div className='flex flex-row space-x-4 pt-2 justify-center'>
              <div className='flex w-11 h-11'>
                <StrapiImage
                  {...author.avatarPng}
                  alt='author avatar'
                  width='44'
                  height='44'
                  className='rounded-full h-11 w-11'
                />
              </div>
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText type='p3' weight='medium'>
                    {author.name}
                  </SuiText>
                  <SuiText type='p4' weight='medium' color='dark'>
                    {date || publishedAt}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container flex mx-auto px-6 2xl:px-0 max-w-3xl pt-16'>
          <div className='flex flex-col w-full pb-20 rich_content'>
            <Markdown>{content}</Markdown>
            <SuiHorizontalDivide />
            <div className='flex justify-between items-center mt-4'>
              <div className='flex'>
                <SuiText type='p3' weight='medium' color='dark'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <div className='border border-light-grey4 rounded-lg px-2 hover:bg-light-grey3 cursor-pointer'>
                  <SuiText type='p3' weight='bold' color='dark'>
                    Copy link
                  </SuiText>
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_twitter.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_facebook.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
                <div className='border border-light-grey4 rounded-lg p-2 pb-0 hover:bg-light-grey3 cursor-pointer'>
                  <Image
                    src='/blog/blog_linkedin.svg'
                    className='shadow-md'
                    alt='Social share'
                    width='24'
                    height='24'
                  />
                </div>
              </div>
            </div>
            <SuiPanel
              color='container-light-color'
              className='mt-8'
              padding='lg'>
              <div className='flex justify-between'>
                <div className='flex flex-col w-1/2'>
                  <SuiTitle type='h4'>Subscribe to our newsletter</SuiTitle>
                  <SuiText type='p3' weight='medium' color='dark'>
                    Stay informed on feature releases, product roadmap, future
                    support, and cloud offerings!
                  </SuiText>
                </div>
                <div className='flex align-middle items-center space-x-2'>
                  <SuiTextField htmlFor='email' placeholder='Email address' />
                  <div className='mt-1'>
                    <SuiButton title='Sign up' />
                  </div>
                </div>
              </div>
            </SuiPanel>
          </div>
        </div>
      </div>

      <div className='flex w-full container-light-color pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-4'>
            <SuiTitle type='h4'>Recent posts</SuiTitle>

            <div className='flex'>
              <Link href='/blog/'>
                <div className='flex items-center cursor-pointer hover:underline'>
                  <SuiText type='p1' weight='bold'>
                    All posts
                  </SuiText>
                  <ArrowRightIcon className='ml-2 w-4' />
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
            {otherBlogs.map((blog) => (
              <RecentBlog key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  )
}

export async function generateStaticParams() {
  const params = {
    fields: ['slug']
  }
  const paths = await getPathsValues('blog-posts', params)

  return paths
}
