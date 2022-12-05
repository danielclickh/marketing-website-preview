import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/solid'

import {
  SuiButton,
  SuiSpacer,
  SuiText,
  SuiTitle,
  SuiHorizontalDivide,
  SuiPanel,
  SuiTextField
} from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import markdownToHtml from '../../../lib/markdown'
import { BlogPost } from '../types'
import BlogPostComponent from '../../../components/BlogPostList/BlogPost'

interface BlogProps extends BlogPost {
  content: string
  otherBlogs: BlogPost[]
}

async function getData(): Promise<BlogProps> {
  const { data } = await findAll('blog-posts', {
    populate: ['author', 'author.avatarPng', 'thumbnailPng']
  })
  const blog = data[0]
  blog.content = await markdownToHtml(blog.content)

  const blogsParams = {
    filters: {
      category: {
        $eq: blog.category
      }
    },
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
    ],
    pagination: { limit: 3 }
  }
  const { data: otherBlogs } = await findAll('blog-posts', blogsParams)
  return {
    ...blog,
    otherBlogs
  }
}

export default async function BlogPage() {
  const { title, author, content, category, otherBlogs, date, publishedAt } =
    await getData()
  const avatar = author.avatarPng.data.attributes.url
  return (
    <>
      <div className='bg-web-light-c1 dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6 max-w-3xl'
            data-aos='fade-up'>
            <SuiTitle size='sm' color='primary' dark_color='primary'>
              <h4>{category}</h4>
            </SuiTitle>
            <SuiTitle size='web'>
              <h1>{title}</h1>
            </SuiTitle>

            <SuiSpacer size='lg' />
            <div className='flex flex-row space-x-4 pt-2 justify-center'>
              <div className='flex w-11 h-11'>
                <Image src={avatar} alt='Rich Raposa' width='44' height='44' />
              </div>
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText padding_0>{author.name}</SuiText>
                  <SuiText padding_0 color='dark'>
                    {date || publishedAt}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container flex mx-auto px-6 2xl:px-0 max-w-3xl pt-16'>
          <div className='flex flex-col pb-20'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <SuiHorizontalDivide />
            <SuiSpacer />
            <div className='flex justify-between items-center'>
              <div className='flex'>
                <SuiText size='md' color='dark'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <div className='border border-light-grey4 rounded-lg px-2 hover:bg-light-grey3 cursor-pointer'>
                  <SuiText size='md' color='dark'>
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
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              className='mt-8'
              padding='lg'>
              <div className='flex justify-between'>
                <div className='flex flex-col w-1/2'>
                  <SuiTitle>
                    <h4>Subscribe to our newsletter</h4>
                  </SuiTitle>
                  <SuiText color='dark'>
                    <p>
                      Stay informed on feature releases, product roadmap, future
                      support, and cloud offerings!
                    </p>
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

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-4'>
            <SuiTitle size='md'>
              <h4>Recent posts</h4>
            </SuiTitle>

            <div className='flex'>
              <Link href='/blog/'>
                <div className='flex items-center cursor-pointer hover:underline'>
                  <SuiText weight='medium'>All posts</SuiText>
                  <ArrowRightIcon className='ml-2 w-4' />
                </div>
              </Link>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
            {otherBlogs.map((blog) => (
              <BlogPostComponent key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const params = {
    fields: ['url']
  }
  const paths = await getPathsValues('blog-posts', params, 'slug')

  return paths
}
