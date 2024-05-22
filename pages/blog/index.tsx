import { GetServerSideProps } from 'next'
import React from 'react'
import BlogPostList from '../../components/BlogPostList'
import BlogPost from '../../components/BlogPostList/BlogPost'
import { CUIButton, CUILink } from '../../components/ClickUI'
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
import { galaxyOnPage } from '../../lib/galaxy/galaxy'

export const getServerSideProps: GetServerSideProps<BlogProps> =
  async function getServerSideProps(context) {
    const { query } = context

    // Get and validate the paginated page number
    let page = query?.page ? Number(query?.page) : 1
    page = isNaN(page) ? 1 : page
    page = page < 1 ? 1 : page

    // Current page params
    const { hero, seo } = await findOne('blog', {
      populate: ['hero', 'seo', 'seo.image']
    })

    // Blog query params
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
      ],
      filters: {
        $or: getStagingOnlyFilters()
      }
    }

    const { data: featuredBlog } = await findAll('blog-posts', {
      ...blogsParams,
      pagination: { limit: 1 }
    })

    // Excluded featured blog from query
    if (featuredBlog[0]) {
      blogsParams.filters.slug = {
        $ne: featuredBlog[0].slug
      }
    }

    // Get paginated blog posts
    const { data, pagination } = await findAll('blog-posts', {
      ...blogsParams,
      pagination: { pageSize: 15, page: page }
    })

    // 404 if page number returned no results
    if (!data.length && page !== 1) {
      return {
        notFound: true
      }
    }

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
        pagination,
        seo,
        ...commonProps
      }
    }
  }

export default function BlogsPage({
  featuredBlog,
  blogs,
  categories,
  pagination,
  title,
  seo,
  headerData,
  footerData
}: BlogProps) {
  galaxyOnPage('blogListPage')

  const hasPrevPage = pagination.page > 1
  const hasNextPage = pagination.page < pagination.pageCount

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-16 lg:pt-20'>
        <SuiTitle type='h1'>{title}</SuiTitle>
        {pagination.page > 1 && (
          <p className='text-neutral-300'>Page {pagination.page}</p>
        )}
      </div>
      {featuredBlog && pagination.page === 1 && (
        <>
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
                        <div className='text-base'>
                          {featuredBlog.author.name}
                        </div>
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
        </>
      )}
      <BlogPostList categories={categories}>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {blogs.map((blog: BlogPostType) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
      </BlogPostList>

      {(hasPrevPage || hasNextPage) && (
        <div className='my-8 flex items-center justify-center gap-8'>
          <CUIButton
            href={hasPrevPage ? `?page=${pagination.page - 1}` : null}
            type='primary-dark'
            className={`group !border-primary-300/50 ${
              !hasPrevPage
                ? 'pointer-events-none cursor-default opacity-40'
                : 'hover:!border-primary-400'
            }`}>
            <span className='tanslate-x-0 mr-2 inline-block transition-transform group-hover:-translate-x-1'>
              &lt;-
            </span>
            Prev
          </CUIButton>
          <CUIButton
            href={hasNextPage ? `?page=${pagination.page + 1}` : null}
            type='primary-dark'
            className={`group !border-primary-300/50 ${
              !hasNextPage
                ? 'pointer-events-none cursor-default opacity-40'
                : 'hover:!border-primary-400'
            }`}>
            Next{' '}
            <span className='tanslate-x-0 ml-2 inline-block transition-transform group-hover:translate-x-1'>
              -&gt;
            </span>
          </CUIButton>
        </div>
      )}

      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
