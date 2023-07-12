import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import BlogPost from '../../../components/BlogPostList/BlogPost'
import CopyUrlButton from '../../../components/CopyUrlButton'
import FollowUs from '../../../components/FollowUs'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import NewsLetter from '../../../components/NewsLetter'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import SocialButton from '../../../components/SocialButton'
import { StrapiImage } from '../../../components/StrapiElements'
import { SuiButton, SuiText, SuiTitle } from '../../../components/sui'
import {
  findAll,
  getPathsValues,
  getStagingOnlyFilters
} from '../../../lib/api/strapi'
import { convertDateToString } from '../../../lib/utils/dateUtils'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import {
  NOT_FOUND_FALLBACK,
  REVALIDATE_SECONDS
} from '../../../lib/utils/revalidationConfig'
import { BlogProps } from '../../../types/blog'
import { ParamsType } from '../../../types/homepage'

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps({ params }) {
    const stagingOnlyFilters = getStagingOnlyFilters()
    const { slug } = params as ParamsType
    const { data } = await findAll('blog-posts', {
      filters: {
        slug: {
          $eq: slug
        },
        $or: stagingOnlyFilters
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
      pagination: { limit: 3 },
      filters: {
        slug: {
          $ne: slug
        },
        $or: stagingOnlyFilters
      }
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
          image: [blog.thumbnailPng],
          path: `/blog/${slug}`
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
  headerData,
  newsLetterData,
  seo
}: BlogProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex max-w-3xl flex-col px-6 2xl:px-0'>
          <div className='mx-auto flex flex-col pt-6 text-center'>
            <h4 className='text-base font-semibold text-primary-300'>
              <Link href='/blog'>Blog</Link> /{' '}
              <Link
                href={`/blog?category=${category
                  .split(' ')
                  .join('-')
                  .toLowerCase()}`}>
                {category}
              </Link>
            </h4>
            <h1 className='mt-6 mb-8 font-basier text-4xl font-bold text-neutral-100 '>
              <span className='leading-snug'>{title}</span>
            </h1>
            <div className='flex flex-row items-center justify-center space-x-4 pt-2'>
              <div className='flex aspect-square h-11 w-11'>
                <StrapiImage
                  {...author.avatarPng}
                  alt='author avatar'
                  width={44}
                  height={44}
                  className='h-11 w-11 rounded-full'
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

        <div className='container mx-auto flex max-w-3xl px-6 pt-20 2xl:px-0'>
          <div className='flex w-full flex-col pb-20'>
            <Markdown className='rich-text-content leading-6' allowHeaderLink>
              {content}
            </Markdown>
            <HRSeparator className='my-8' />
            <div className='mb-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
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

      <div className='flex w-full pb-8 text-neutral-0 '>
        <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pt-12 pb-8 md:bg-no-repeat 2xl:px-0'>
          <div className='flex justify-between pb-8'>
            <SuiTitle
              type='h2'
              className='!text-3xl text-neutral-100'
              weight='semibold'>
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
          <div className='flex w-full flex-col gap-y-6 md:grid md:grid-cols-3 md:gap-x-16 md:gap-y-0 '>
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
