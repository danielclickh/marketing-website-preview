import { GetStaticProps } from 'next'
import React from 'react'
import BlogPostList from '../../components/BlogPostList'
import BlogPost from '../../components/BlogPostList/BlogPost'
import { CUILink } from '../../components/ClickUI'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiTitle } from '../../components/sui'
import {
  fetchAll,
  findAll,
  findOne,
  getStagingOnlyFilters
} from '../../lib/api/strapi'
import { convertDateToString } from '../../lib/utils/dateUtils'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'
import { BlogPost as BlogPostType, BlogProps } from '../../types/blogs'

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
        'date',
        'StagingOnly'
      ]
    }

    const stagingOnlyFilters = getStagingOnlyFilters()

    const { data: featuredBlog } = await findAll('blog-posts', {
      ...blogsParams,
      pagination: { limit: 1 },
      filters: {
        $or: stagingOnlyFilters
      }
    })

    if (featuredBlog[0]) {
      blogsParams.filters = {
        slug: {
          $ne: featuredBlog[0].slug
        },
        $or: stagingOnlyFilters
      }
    }
    const data = await fetchAll('blog-posts', blogsParams)

    const categories = new Set<string>()
    for (let index = 0; index < data.length; index++) {
      categories.add(data[index].category)
    }
    const commonProps = await getCommonProps()

    seo.path = '/blog'

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
  headerData,
  footerData
}: BlogProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <SuiTitle
        type='h1'
        className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        {title}
      </SuiTitle>
      <CUILink
        href={`/blog/${featuredBlog.slug}`}
        className='section-container mt-2 mb-16 flex flex-col gap-10 hover:no-underline md:flex-row'>
        <div className='flex flex-col gap-8 rounded-xl hover:shadow-card lg:flex-row-reverse lg:gap-12 xl:gap-24'>
          {featuredBlog.thumbnailPng && (
            <StrapiImage
              {...featuredBlog.thumbnailPng}
              className='h-fit w-full rounded-lg object-cover lg:w-1/2'
            />
          )}
          <div className='grid w-full gap-6 border-l-8 border-primary-300 pl-6'>
            <div className='flex flex-col'>
              <div className='font-inconsolata font-medium text-primary-300'>
                {featuredBlog.category}
              </div>
              <SuiTitle type='h2' className=' text-neutral-100'>
                {featuredBlog.title}
              </SuiTitle>
              <div className='my-8 text-neutral-200'>
                {featuredBlog.shortDescription}
              </div>

              <div className='flex flex-row items-center space-x-4'>
                {featuredBlog.author.avatarPng && (
                  <div className='flex aspect-square h-11 w-11'>
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
                    <div className='text-base'>{featuredBlog.author.name}</div>
                    {(featuredBlog.date || featuredBlog.publishedAt) && (
                      <div className='text-sm text-neutral-300'>
                        {convertDateToString(
                          featuredBlog.date || featuredBlog.publishedAt
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CUILink>
      <BlogPostList categories={categories}>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {blogs.map((blog: BlogPostType) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
      </BlogPostList>
      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
