import React from 'react'
import { SuiText, SuiTitle } from '../../components/sui'
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
      </div>
    </Layout>
  )
}
