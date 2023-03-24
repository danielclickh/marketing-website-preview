import React from 'react'
import { SuiLink, SuiText, SuiTitle } from '../../components/sui'
import { fetchAll, findAll, findOne } from '../../lib/api/strapi'

import BlogPostList from '../../components/BlogPostList'
import { BlogPost as BlogPostType, BlogProps } from '../../types/blogs'
import BlogPost from '../../components/BlogPostList/BlogPost'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'
import { StrapiImage } from '../../components/StrapiElements'
import { convertDateToString } from '../../lib/utils/dateUtils'
import { CUILink } from '../../components/ClickUI'
import Image from 'next/image'
import FollowUs from '../../components/FollowUs'

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps() {
    const blogPageparams = {
      populate: ['hero', 'seo', 'seo.image']
    }
    const { hero, seo } = await findOne('blog', blogPageparams)
    const blogsParams: Record<string, any> = {
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
    const { data: featuredBlog } = await findAll('blog-posts', {
      ...blogsParams,
      pagination: { limit: 1 }
    })
    if (featuredBlog[0]) {
      blogsParams.filters = {
        slug: {
          $ne: featuredBlog[0].slug
        }
      }
    }
    const data = await fetchAll('blog-posts', blogsParams)
    const categories = new Set<string>()
    for (let index = 0; index < data.length; index++) {
      categories.add(data[index].category)
    }
    const commonProps = await getCommonProps()
    return {
      props: {
        featuredBlog: featuredBlog[0],
        title: hero.title,
        description: hero.description,
        blogs: data,
        categories: Array.from(categories),
        seo,
        ...commonProps
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function BlogsPage({
  featuredBlog,
  blogs,
  categories,
  title,
  seo,
  footerData
}: BlogProps) {
  console.log(featuredBlog)
  return (
    <Layout footerData={footerData} seo={seo}>
      <SuiTitle type='h1' className='pt-10 mb-16 mx-auto'>
        {title}
      </SuiTitle>

      <CUILink
        href={`/blog/${featuredBlog.slug}`}
        className='mt-2 flex flex-col md:flex-row mb-16 gap-10 section-container hover:no-underline'>
        <div className='flex flex-col lg:flex-row-reverse hover:shadow-card rounded-xl gap-8 lg:gap-12 xl:gap-24'>
          {featuredBlog.thumbnailPng && (
            <StrapiImage
              {...featuredBlog.thumbnailPng}
              className='w-full lg:w-1/2 rounded-lg object-cover h-fit'
            />
          )}
          <div className='grid gap-6 w-full border-l-8 border-primary-300 pl-6'>
            <div className='flex flex-col'>
              <div className='text-primary-300 font-medium font-inconsolata'>
                {featuredBlog.category}
              </div>
              <SuiTitle type='h2'>{featuredBlog.title}</SuiTitle>
              <div className='my-8 text-neutral-200'>
                {featuredBlog.shortDescription}
              </div>

              <div className='flex flex-row items-center space-x-4'>
                {featuredBlog.author.avatarPng && (
                  <div className='flex w-11 h-11 aspect-square'>
                    <StrapiImage
                      {...featuredBlog.author.avatarPng}
                      alt={featuredBlog.author.name}
                      width={44}
                      height={44}
                      className='rounded-full'
                    />
                  </div>
                )}
                <div className='flex'>
                  <div className='flex flex-col'>
                    <SuiText size='sm' weight='medium'>
                      {featuredBlog.author.name}
                    </SuiText>
                    {(featuredBlog.date || featuredBlog.publishedAt) && (
                      <SuiText size='sm' weight='medium' color='secondary'>
                        {convertDateToString(
                          featuredBlog.date || featuredBlog.publishedAt
                        )}
                      </SuiText>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CUILink>
      <BlogPostList categories={categories}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-center'>
          {blogs.map((blog: BlogPostType) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
      </BlogPostList>
      <FollowUs />
    </Layout>
  )
}
