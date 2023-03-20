import React from 'react'
import { SuiLink, SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findOne } from '../../lib/api/strapi'

import BlogPostList from '../../components/BlogPostList'
import GetStarted from '../../components/GetStarted'
import NewsLetter from '../../components/NewsLetter'
import { BlogPost as BlogPostType, BlogProps } from '../../types/blogs'
import BlogPost from '../../components/BlogPostList/BlogPost'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { getNewsLetterData } from '../../components/NewsLetter/getNewsLetterData'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps() {
    const blogPageparams = {
      populate: ['hero', 'seo', 'seo.image']
    }
    const { hero, seo } = await findOne('blog', blogPageparams)
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
    const commonProps = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        title: hero.title,
        description: hero.description,
        blogs: data,
        categories: Array.from(categories),
        seo,
        newsLetterData,
        ...commonProps
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function BlogsPage({
  blogs,
  categories,
  title,
  description,
  headerData,
  seo,
  newsLetterData,
  footerData,
  platforms
}: BlogProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='pt-10'>
        <div className='flex max-w-7xl px-4 sm:px-8 2xl:px-0 mx-auto flex-col'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-center'>
            {blogs.map((blog: BlogPostType) => (
              <BlogPost key={blog.id} {...blog} />
            ))}
          </div>
          <div className='mt-16 mb-32'>
            <NewsLetter {...newsLetterData} />
          </div>
        </BlogPostList>
        <GetStarted platforms={platforms} />

        <div className='pt-2'>
          <hr />
          <SuiLink
            key='blog-categories-nav'
            href='/rss.xml'
            target='blank'
            segmentEvent={{
              label: 'Blog RSS link',
              category: 'blog-categories-nav'
            }}
            weight='normal'>
            <div className='flex items-center pt-2'>
              <span className='text-sm px-4 pr-2 py-2 font-semibold cursor-pointer text-c4'>
                Grab the RSS feed
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 stroke-orange-400'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </div>
          </SuiLink>
        </div>
      </div>
    </Layout>
  )
}
