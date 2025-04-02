import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Avatars from '../../../components/Avatars'
import BlogPost from '../../../components/BlogPostList/BlogPost'
import CopyUrlButton from '../../../components/CopyUrlButton'
import FollowUs from '../../../components/FollowUs'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import NewsLetter from '../../../components/NewsLetter'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import ReadingProgress from '../../../components/ReadingProgress'
import SocialButton from '../../../components/SocialButton'
import TableOfContents from '../../../components/TableOfContents'
import { SuiButton, SuiText, SuiTitle } from '../../../components/sui'
import {
  findAll,
  findOne,
  getStagingOnlyFilters
} from '../../../lib/api/strapi'
import { useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { convertDateToString } from '../../../lib/utils/dateUtils'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { BlogProps } from '../../../types/blog'
import { ParamsType } from '../../../types/homepage'

export const getServerSideProps: GetServerSideProps<BlogProps> =
  async function getServerSideProps({ params }) {
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
        notFound: true
      }
    }

    const blog = data[0]

    const cloudCtaContent = await findOne('blog', {
      populate: ['CloudCTAHeader', 'CloudCTAFooter']
    })

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
        'date',
        'StagingOnly'
      ],
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

    const canonical = blog.canonical_url ? blog.canonical_url : `/blog/${slug}`

    //super hacky thing that we will change for CMS override
    if (
      slug === 'clickhouse-cloud-is-now-generally-available-on-microsoft-azure'
    ) {
      blog.thumbnailPng.url = '/images/clickhouse-msft-dark.png'
    }

    return {
      props: {
        ...blog,
        ...cloudCtaContent,
        otherBlogs,
        seo: {
          title: blog.title,
          description: blog.shortDescription,
          type: 'article',
          siteName: 'ClickHouse',
          image: [blog.thumbnailPng],
          path: canonical
        },
        newsLetterData,
        ...commonData
      }
    }
  }

export default function BlogPage({
  title,
  author,
  content,
  category,
  reading_time,
  otherBlogs,
  date,
  publishedAt,
  footerData,
  headerData,
  newsLetterData,
  ShowCloudCTAHeader,
  ShowCloudCTAFooter,
  CloudCTAFooter,
  CloudCTAHeader,
  seo,
  table_contents_headers
}: BlogProps) {
  useGalaxyOnPage('blogPage')
  const contentRef = React.createRef<HTMLDivElement>()
  const footerRef = React.createRef<HTMLDivElement>()
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='relative'>
        <div style={{ position: 'relative' }}>
          <ReadingProgress target={contentRef} />
        </div>
        <div className='section-container mx-auto flex flex-col xl:flex-row xl:pt-20'>
          <div className='block pt-10 lg:pl-0 2xl:pr-8'>
            <Link href='/blog'>
              <button className='mr-8 flex items-center text-base font-semibold'>
                <ArrowLeftIcon className='mr-2 w-4' />
                Back
              </button>
            </Link>
          </div>
          <div className='flex flex-col pt-10 text-left lg:pr-[180px] xl:pl-4'>
            <h4 className='text-base font-semibold text-primary-300 '>
              <Link href='/blog'>Blog</Link> /{' '}
              <Link
                href={`/blog?category=${category
                  .split(' ')
                  .join('-')
                  .toLowerCase()}`}>
                {category}
              </Link>
            </h4>
            <h1 className='mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100 '>
              <span className='leading-snug'>{title}</span>
            </h1>
            <div className='flex flex-row items-center space-x-4 pt-2'>
              <Avatars
                avatars={
                  Array.isArray(author.avatarPng)
                    ? author.avatarPng
                    : [author.avatarPng]
                }
              />
              <div className='flex'>
                <div className='flex flex-col items-start'>
                  <SuiText size='base' weight='normal'>
                    {author.name}
                  </SuiText>
                  <SuiText size='sm' weight='normal' color='secondary'>
                    {convertDateToString(date || publishedAt)} - {reading_time}{' '}
                    minutes read
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute right-0 z-0 hidden h-full pr-10 transition-opacity duration-500 xl:block 2xl:pr-30'>
          <TableOfContents
            contentRef={contentRef}
            footerRef={footerRef}
            headersSelector={table_contents_headers}
          />
        </div>
        <div className='section-container mx-auto flex pt-20 xl:pl-32 xl:pr-40'>
          <div className='flex w-full flex-col pb-20 lg:pr-[180px] xl:pl-4'>
            {ShowCloudCTAHeader && (
              <>
                <Markdown
                  className='rich-text-content mb-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAHeader}
                </Markdown>
              </>
            )}
            {content && (
              <div className='flex flex-col lg:flex-row'>
                <div ref={contentRef}>
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink>
                    {content}
                  </Markdown>
                </div>
              </div>
            )}

            {ShowCloudCTAFooter && (
              <>
                <Markdown
                  className='rich-text-content mt-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAFooter}
                </Markdown>
              </>
            )}
            <HRSeparator className='my-8' />
            <div className='mb-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this post
                </SuiText>
              </div>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <CopyUrlButton />
                {[
                  'y_combinator',
                  'twitter',
                  'bluesky',
                  'facebook',
                  'linkedin'
                ].map((social) => (
                  <SocialButton key={social} type={social} title={title} />
                ))}
              </div>
            </div>
            <NewsLetter {...newsLetterData} />
          </div>
        </div>
      </div>

      <div className='flex w-full pb-8 text-neutral-0' ref={footerRef}>
        <div className='section-container mx-auto flex flex-col bg-opacity-10 px-8 pb-8 pt-12 md:bg-no-repeat 2xl:px-0'>
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
          <div className='grid grid-cols-1 justify-center gap-8 lg:grid-cols-3'>
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
