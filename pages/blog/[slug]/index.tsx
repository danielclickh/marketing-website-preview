import React from 'react'
import {
  SuiText,
  SuiTitle,
  SuiRecentCard,
  SuiButton
} from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import Markdown from '../../../components/Markdown'
import { StrapiImage } from '../../../components/StrapiElements'
import NewsLetter from '../../../components/NewsLetter'
import SocialButton from '../../../components/SocialButton'
import CopyUrlButton from '../../../components/CopyUrlButton'
import { convertDateToString } from '../../../lib/utils/dateUtils'
import Layout from '../../../components/Layout'
import { GetStaticProps } from 'next'
import { BlogProps } from '../../../types/blog'
import { ParamsType } from '../../../types/homepage'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import {
  NOT_FOUND_FALLBACK,
  REVALIDATE_SECONDS
} from '../../../lib/utils/revalidationConfig'
import FollowUs from '../../../components/FollowUs'
import BlogPost from '../../../components/BlogPostList/BlogPost'

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('blog-posts', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: ['author', 'author.avatarPng', 'thumbnailPng'],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    const blog = data[0]

    const blogsParams = {
      sort: ['date:DESC', 'publishedAt:DESC'],
      populate: ['thumbnailPng', 'author'],
      fields: ['category', 'title', 'slug'],
      pagination: { limit: 3 }
    }
    const { data: otherBlogs } = await findAll('blog-posts', blogsParams)
    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        ...blog,
        otherBlogs,
        seo: {
          title: blog.title,
          description: blog.shortDescription,
          type: 'article',
          siteName: 'ClickHouse',
          image: [blog.thumbnailPng]
        },
        newsLetterData,
        ...commonData
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function BlogPage({
  title,
  author,
  content,
  category,
  otherBlogs,
  date,
  publishedAt,
  footerData,
  newsLetterData,
  seo
}: BlogProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0 max-w-6xl'>
          <div className='flex flex-col text-center mx-auto pt-6'>
            <h4 className='text-primary-300 text-lg'>{category}</h4>
            <h1 className='mt-6 mb-8 text-3xl md:text-5xl font-inter font-bold'>
              <span className='leading-snug'>{title}</span>
            </h1>
            <div className='flex flex-row items-center space-x-4 pt-2 justify-center'>
              <div className='flex w-11 h-11 aspect-square'>
                <StrapiImage
                  {...author.avatarPng}
                  alt='author avatar'
                  width={44}
                  height={44}
                  className='rounded-full h-11 w-11'
                />
              </div>
              <div className='flex'>
                <div className='flex flex-col items-start'>
                  <SuiText size='base' weight='normal'>
                    {author.name}
                  </SuiText>
                  <SuiText size='sm' weight='normal' color='secondary'>
                    {convertDateToString(date || publishedAt)}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container flex mx-auto px-6 2xl:px-0 max-w-3xl pt-20'>
          <div className='flex flex-col w-full pb-20'>
            <Markdown className='rich-text-content leading-7 pb-6 mb-6 border-b border-c2'>
              {content}
            </Markdown>
            <div className='flex flex-col md:flex-row gap-4 justify-between items-center mb-10'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex gap-4 flex-wrap justify-center text-neutral-0'>
                <CopyUrlButton />
                {['y_combinator', 'twitter', 'facebook', 'linkedin'].map(
                  (social) => (
                    <SocialButton key={social} type={social} title={title} />
                  )
                )}
              </div>
            </div>
            <NewsLetter {...newsLetterData} />
          </div>
        </div>
      </div>

      <div className='flex w-full text-neutral-0 pb-8 '>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex justify-between pb-8'>
            <SuiTitle type='h2' className='!text-3xl' weight='semibold'>
              Recent posts
            </SuiTitle>

            <SuiButton
              path='/blog'
              type='empty'
              color='primary'
              className='font-base border border-primary-300/50	'>
              View all Blogs
            </SuiButton>
          </div>
          <div className='w-full flex flex-col md:grid md:grid-cols-3 md:gap-x-16 gap-y-6 md:gap-y-0 '>
            {otherBlogs.map((blog) => (
              <BlogPost key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
      <FollowUs />
    </Layout>
  )
}

export async function getStaticPaths() {
  const params = {
    fields: ['slug']
  }
  const paths = await getPathsValues('blog-posts', params)

  return {
    paths,
    fallback: NOT_FOUND_FALLBACK
  }
}
