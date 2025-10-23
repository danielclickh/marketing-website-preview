import Avatars from '@/components/Avatars'
import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Markdown from '@/components/Markdown'
import NewsLetter from '@/components/NewsLetter'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import ReadingProgress from '@/components/ReadingProgress'
import SocialButton from '@/components/SocialButton'
import { StrapiImage } from '@/components/StrapiElements'
import TableOfContents from '@/components/TableOfContents'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import {
  fetchAll,
  findAll,
  findOne,
  getStagingOnlyFilters
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { BlogProps } from '@/types/blog'
import { ParamsType } from '@/types/homepage'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useRef } from 'react'

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
      populate: [
        'author',
        'author.avatarPng',
        'thumbnailPng',
        'promotion',
        'promotion.image'
      ],
      pagination: { limit: 1 }
    })

    const blog = data?.[0]

    if (!blog) {
      return {
        notFound: true
      }
    } else if (blog?.category !== 'Japanese') {
      return {
        redirect: {
          destination: `/blog/${slug}`,
          permanent: true
        }
      }
    }

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
      pagination: { limit: 4 },
      filters: {
        slug: {
          $ne: slug
        },
        category: { $eq: 'Japanese' },
        $or: stagingOnlyFilters
      }
    }
    const { data: otherBlogs } = await findAll('blog-posts', blogsParams)
    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()

    const canonical = blog.canonical_url
      ? blog.canonical_url
      : `/jp/blog/${slug}`

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
          path: canonical,
          lastModified: blog.updatedAt
        },
        newsLetterData,
        ...commonData
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data = await fetchAll('blog-posts', {
    filters: {
      category: { $eq: 'Japanese' },
      $or: getStagingOnlyFilters()
    },
    fields: ['slug']
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
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
  table_contents_headers,
  promotion
}: BlogProps) {
  useGalaxyOnPage('blogPage')
  const contentRef = useRef<null | HTMLDivElement>(null)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='relative'>
        <ReadingProgress target={contentRef} />

        <div className='section-container flex flex-col items-start gap-8 py-12 lg:flex-row lg:py-20'>
          <Link
            href='/jp/blog'
            className='group/backButton -mx-3 -my-1.5 mr-8 inline-flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-semibold transition-colors hover:bg-white/5'>
            <ArrowLeftIcon className='mr-2 w-4 transition-transform group-hover/backButton:-translate-x-1' />
            戻る
          </Link>
          <div className='flex flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-6'>
            {/* Blog meta */}
            <div className='order-1 lg:order-none lg:col-span-11 lg:mb-12 xl:col-span-9'>
              <h4 className='text-base font-semibold text-primary-300'>
                <Link href='/jp/blog' className='hover:underline'>
                  ブログ
                </Link>
              </h4>
              <h1 className='mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100'>
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
                <div className='flex flex-col items-start'>
                  <SuiText size='base' weight='normal'>
                    {author.name}
                  </SuiText>
                  <SuiText size='sm' weight='normal' color='secondary'>
                    {convertDateToString(date || publishedAt)} - {reading_time}{' '}
                    分で読める
                  </SuiText>
                </div>
              </div>
            </div>

            {/* Blog content */}
            <article className='order-3 lg:order-none lg:col-span-11 xl:col-span-9'>
              {ShowCloudCTAHeader && (
                <Markdown
                  className='rich-text-content mb-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAHeader}
                </Markdown>
              )}

              {content && (
                <div className='flex flex-col lg:flex-row' ref={contentRef}>
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink>
                    {content}
                  </Markdown>
                </div>
              )}

              {promotion && (
                <div className='mt-8'>
                  <CUICard className='border-primary-300'>
                    <CUICard.Body className='p-6 text-sm'>
                      <p className='mb-3'>
                        <strong>{promotion.title}</strong>
                      </p>
                      <div className='flex flex-col gap-6 md:flex-row md:items-start'>
                        <p>{promotion.description}</p>
                        <StrapiImage
                          {...promotion.image}
                          className='mx-auto !h-auto !w-36 flex-shrink-0 flex-grow-0 md:mr-0'
                        />
                      </div>
                    </CUICard.Body>
                  </CUICard>
                </div>
              )}

              {ShowCloudCTAFooter && (
                <Markdown
                  className='rich-text-content mt-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAFooter}
                </Markdown>
              )}
            </article>

            {/* Blog sidebar */}
            <aside className='order-2 hidden lg:order-none xl:col-span-3 xl:block'>
              <TableOfContents
                contentRef={contentRef}
                headersSelector={table_contents_headers}
              />
            </aside>

            {/* Blog footer */}
            <div className='order-4 lg:order-none lg:col-span-11 xl:col-span-9'>
              <HRSeparator className='mb-8 !max-w-none' />

              {/* Sharer */}
              <div className='mb-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <SuiText size='sm' weight='medium' color='primary'>
                  この投稿を共有する
                </SuiText>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  <SocialButton type='y_combinator' title={title} />
                  <SocialButton type='twitter' title={title} />
                  <SocialButton type='bluesky' title={title} />
                  <SocialButton type='facebook' title={title} />
                  <SocialButton type='linkedin' title={title} />
                </div>
              </div>

              {/* Form */}
              <NewsLetter {...newsLetterData} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent posts */}
      <div className='section-container my-20 flex flex-col'>
        <div className='flex justify-between pb-8'>
          <SuiTitle
            type='h2'
            className='!text-3xl text-neutral-100'
            weight='semibold'>
            Recent posts
          </SuiTitle>

          <CUIButton href='/jp/blog' type='secondary-dark'>
            View all Blogs
          </CUIButton>
        </div>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {otherBlogs.map((recentBlog, recentBlogIndex) => {
            return (
              <div
                className={
                  recentBlogIndex > 2 ? 'hidden md:block lg:hidden' : ''
                }>
                <BlogPost key={recentBlogIndex} {...recentBlog} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Socials */}
      <FollowUs />
    </Layout>
  )
}
