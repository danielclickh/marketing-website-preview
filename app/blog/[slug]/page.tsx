import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/solid'

import { SuiText, SuiTitle, SuiRecentCard } from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { BlogPost } from '../types'
import Markdown from '../../../components/Markdown'
import { StrapiImage } from '../../../components/StrapiElements'
import GetStarted from '../../../components/GetStarted'
import NewsLetter from '../../../components/NewsLetter'
import SocialButton from '../../../components/SocialButton'
import CopyUrlButton from '../../../components/CopyUrlButton'

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

export default async function BlogPage({
  params
}: {
  params: { slug: string }
}) {
  const { title, author, content, category, otherBlogs, date, publishedAt } =
    await getData(params.slug)

  return (
    <>
      <div className='bg-white dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6 max-w-3xl'
            data-aos='fade-up'>
            <SuiTitle type='h4' weight='normal' color='c6'>
              {category}
            </SuiTitle>
            <SuiTitle type='h1' className='mt-6 mb-8 max-w-screen-sm'>
              {title}
            </SuiTitle>
            <div className='flex flex-row space-x-4 pt-2 justify-center'>
              <div className='flex w-11 h-11'>
                <StrapiImage
                  {...author.avatarPng}
                  alt='author avatar'
                  width={44}
                  height={44}
                  className='rounded-full h-11 w-11'
                />
              </div>
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText size='sm' weight='medium'>
                    {author.name}
                  </SuiText>
                  <SuiText size='xs' weight='medium' color='secondary'>
                    {date || publishedAt}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container flex mx-auto px-6 2xl:px-0 max-w-3xl pt-20'>
          <div className='flex flex-col w-full pb-20'>
            <Markdown className='font-medium pb-6 mb-6 border-b border-c2'>
              {content}
            </Markdown>
            <div className='flex justify-between items-center mb-10'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='secondary'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex space-x-4 text-c4'>
                <CopyUrlButton />
                {['y_combinator', 'twitter', 'facebook', 'linkedin'].map(
                  (social) => (
                    <SocialButton key={social} type={social} title={title} />
                  )
                )}
              </div>
            </div>
            {/* @ts-expect-error Server Component */}
            <NewsLetter />
          </div>
        </div>
      </div>

      <div className='flex w-full container-light-color pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-4'>
            <SuiTitle type='h2'>Recent posts</SuiTitle>

            <div className='flex'>
              <Link href='/blog/'>
                <div className='flex items-center cursor-pointer hover:underline'>
                  <SuiText size='lg' weight='medium'>
                    All posts
                  </SuiText>
                  <ArrowRightIcon className='ml-2 w-4' />
                </div>
              </Link>
            </div>
          </div>
          <div className='w-full flex flex-col md:grid md:grid-cols-3 md:gap-x-16 gap-y-6 md:gap-y-0'>
            {otherBlogs.map((blog) => (
              <SuiRecentCard
                key={blog.id}
                pretitle={blog.category}
                title={blog.title}
                thumbnailPng={blog.thumbnailPng}
                url={`/blog/${blog.slug}`}
                className='w-full'
              />
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
