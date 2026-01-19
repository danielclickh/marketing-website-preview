import AiActions from '@/components-cleaned/AiActions'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ScrollToTop from '@/components-cleaned/ScrollToTop'
import SimpleCtaCard from '@/components-cleaned/SimpleCtaCard'
import SmartBackButton from '@/components-cleaned/SmartBackButton'
import StrapiBlogMeta from '@/components-cleaned/StrapiBlogMeta'
import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import StrapiDynamicBlogModules from '@/components-cleaned/StrapiDynamicBlogModules'
import StrapiImage from '@/components-cleaned/StrapiImage'
import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import NewsLetter from '@/components/NewsLetter'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import ReadingProgress from '@/components/ReadingProgress'
import SocialButton from '@/components/SocialButton'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TableOfContents from '@/components/TableOfContents'
import { SuiText, SuiTitle } from '@/components/sui'
import {
  blogService,
  fetchAll,
  findOne,
  getProxiedMediaUrl,
  getStagingOnlyFilters
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateBlogArticleSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { camel, slugify } from '@/lib/utils/strings'
import { CommonProps, ParamsType } from '@/types/homepage'
import { BlogModules, EntryBlogPost } from '@/types/strapi'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import removeMarkdown from 'remove-markdown'

interface BlogProps extends CommonProps {
  blog: EntryBlogPost
  otherBlogs: Array<EntryBlogPost>
  CloudCTAFooter: string
  CloudCTAHeader: string
  globalCta?: null | {
    content: string
    link: {
      href: string
      text: string
      target: '_self' | '_blank'
    }
  }
}

export const getStaticProps: GetStaticProps<BlogProps> =
  async function getStaticProps({ params }) {
    const stagingOnlyFilters = getStagingOnlyFilters()
    const { slug } = params as ParamsType
    const blog = await blogService.findOne({
      filters: {
        slug: {
          $eq: slug
        },
        $or: stagingOnlyFilters
      }
    })

    if (!blog) {
      return {
        notFound: true
      }
    } else if (blog?.category === 'Japanese') {
      return {
        redirect: {
          destination: `/jp/blog/${slug}`,
          permanent: true
        }
      }
    }

    const cloudCtaContentRequest = findOne('blog', {
      populate: [
        'CloudCTAHeader',
        'CloudCTAFooter',
        'globalCta',
        'globalCta.link'
      ]
    })

    const otherBlogsRequest = blogService.findMany({
      sort: ['date:DESC', 'publishedAt:DESC'],
      populate: [
        'author',
        'author.avatarPng',
        'thumbnailPng',
        'author.profiles',
        'author.profiles.avatar'
      ],
      fields: [
        'category',
        'title',
        'shortDescription',
        'createdAt',
        'updatedAt',
        'publishedAt',
        'slug',
        'date',
        'reading_time',
        'reading_time_override'
      ],
      pagination: { limit: 4 },
      filters: {
        slug: {
          $ne: slug
        },
        category: { $ne: 'Japanese' },
        $or: stagingOnlyFilters
      }
    })

    const commonDataRequest = getCommonProps()
    const newsLetterDataRequest = getNewsLetterData()

    const [cloudCtaContent, otherBlogs, commonData, newsLetterData] =
      await Promise.all([
        cloudCtaContentRequest,
        otherBlogsRequest,
        commonDataRequest,
        newsLetterDataRequest
      ])

    const canonical = blog.canonical_url?.trim()?.length
      ? blog.canonical_url
      : `/blog/${slug}`

    const combinedFaqs = ((blog.sections as Array<BlogModules>) || [])
      .filter((module) => module.__component === 'blog-modules.faqs')
      .flatMap((module) => {
        return module.items.map((item) => {
          return {
            question: item.question,
            answer: removeMarkdown(item.answer)
          }
        })
      })

    return {
      props: {
        blog,
        ...cloudCtaContent,
        otherBlogs,
        seo: {
          title: blog.title,
          description: blog.shortDescription,
          type: 'article',
          siteName: 'ClickHouse',
          image: [blog.thumbnailPng],
          path: canonical,
          keywords: blog?.keywords || '',
          lastModified: blog.updatedAt,
          schema: generateBlogArticleSchema({
            title: blog.title,
            description: blog.shortDescription,
            imageUrl: getProxiedMediaUrl(blog.thumbnailPng.url),
            authorName: blog?.author?.name
              ? blog.author.name
              : 'ClickHouse Team',
            publishedDate: blog.publishedAt,
            modifiedDate: blog.updatedAt,
            faqs: combinedFaqs
          })
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
      category: { $ne: 'Japanese' },
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
  seo,
  blog,
  otherBlogs,
  headerData,
  CloudCTAFooter,
  CloudCTAHeader,
  globalCta
}: BlogProps) {
  useGalaxyOnPage('blogPage')
  const contentRef = useRef<null | HTMLDivElement>(null)
  const [hideScrollTopAt, setHideScrollTopAt] = useState<undefined | number>(
    undefined
  )

  const GlobalBlogCta = ({
    location,
    children
  }: {
    location: string
    children?: React.ReactNode
  }) => {
    return (
      <>
        {globalCta && (
          <SimpleCtaCard
            link={globalCta.link}
            galaxyEventName={`blogPage.${location}GlobalCta.${camel(globalCta.link.text)}`}>
            {!children && (
              <Markdown allowHeaderLink={false}>{globalCta.content}</Markdown>
            )}
            {children}
          </SimpleCtaCard>
        )}
      </>
    )
  }

  const markdownDirectives: Record<
    string,
    (props: Record<string, any>) => React.ReactNode
  > = {
    'global-blog-cta': ({ node, children }) => {
      return (
        <div className='my-6'>
          <GlobalBlogCta location='content'>{children}</GlobalBlogCta>
        </div>
      )
    }
  }

  // Ensure correct directive syntax is used
  Object.keys(markdownDirectives).forEach((directiveKey) => {
    blog.content = (blog.content || '').replaceAll(
      `:::${directiveKey}:::`,
      `:::${directiveKey}\n:::`
    )
  })

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) {
      setHideScrollTopAt(undefined)
      return
    }

    const hideAtHanlder = () => {
      setHideScrollTopAt(contentEl.offsetTop + contentEl.clientHeight)
    }

    const resizeObserver = new ResizeObserver(hideAtHanlder)
    resizeObserver.observe(contentEl)

    return () => resizeObserver.disconnect()
  }, [contentRef.current])

  return (
    <Layout seo={seo} headerData={headerData}>
      <ScrollToTop showFrom={600} hideAt={hideScrollTopAt} />
      <div className='relative'>
        <ReadingProgress target={contentRef} />

        <div className='section-container flex flex-col items-start gap-8 py-12 lg:flex-row lg:py-20'>
          <SmartBackButton
            fallbackPath='/blog'
            className='group/backButton -mx-3 -my-1.5 mr-8 inline-flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-semibold transition-colors hover:bg-white/5'>
            <ArrowLeftIcon className='mr-2 w-4 transition-transform group-hover/backButton:-translate-x-1' />
            Back
          </SmartBackButton>
          <div className='flex w-full flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-6'>
            {/* Blog meta */}
            <div className='order-1 lg:order-none lg:col-span-11 lg:mb-12 xl:col-span-9'>
              <div className='flex flex-col gap-6 sm:-mt-0.5 sm:flex-row sm:items-center'>
                <Breadcrumbs>
                  <Breadcrumbs.Link href='/blog'>Blog</Breadcrumbs.Link>
                  <Breadcrumbs.Link
                    href={`/blog?category=${slugify(blog.category)}`}>
                    {blog.category}
                  </Breadcrumbs.Link>
                </Breadcrumbs>
                {/* AI Actions */}
                <div>
                  <AiActions galaxyNamespace='blogPage' />
                </div>
              </div>

              <h1 className='mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100'>
                <span className='leading-snug'>{blog.title}</span>
              </h1>

              {/* Authors */}
              <StrapiBlogMeta entry={blog} />
            </div>

            {/* Blog content */}
            <article className='order-3 lg:order-none lg:col-span-11 xl:col-span-9'>
              {blog.ShowCloudCTAHeader && (
                <Markdown
                  className='rich-text-content mb-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAHeader}
                </Markdown>
              )}

              <div className='w-full space-y-6' ref={contentRef}>
                {blog.sections &&
                  blog.sections.length > 0 &&
                  blog.sections.map((section, sectionIndex) => {
                    return (
                      <StrapiDynamicBlogModules
                        key={sectionIndex}
                        {...section}
                      />
                    )
                  })}

                {blog.content && (
                  <Markdown
                    allowDirectives={true}
                    className='rich-text-content leading-6'
                    allowHeaderLink={true}
                    components={markdownDirectives}>
                    {blog.content}
                  </Markdown>
                )}
              </div>

              {blog.promotion && (
                <div className='mt-8'>
                  <CUICard className='border-primary-300'>
                    <CUICard.Body className='p-6 text-sm'>
                      <p className='mb-3'>
                        <strong>{blog.promotion.title}</strong>
                      </p>
                      <div className='flex flex-col gap-6 md:flex-row md:items-start'>
                        <p>{blog.promotion.description}</p>
                        <StrapiImage
                          entry={blog.promotion.image}
                          className='mx-auto !h-auto !w-36 flex-shrink-0 flex-grow-0 md:mr-0'
                        />
                      </div>
                    </CUICard.Body>
                  </CUICard>
                </div>
              )}

              {blog.ShowCloudCTAFooter && (
                <Markdown
                  className='rich-text-content mt-8 leading-6'
                  allowHeaderLink>
                  {CloudCTAFooter}
                </Markdown>
              )}
            </article>

            {/* Blog sidebar */}
            <aside className='order-2 hidden lg:order-none xl:col-span-3 xl:block'>
              <div className='sticky top-30 flex max-h-[calc(100vh_-_9rem)] flex-col gap-6'>
                <TableOfContents
                  contentRef={contentRef}
                  headersSelector={blog.table_contents_headers || ''}
                />
                {blog.enableSidebarGlobalCta && (
                  <div className='flex-shrink-0'>
                    <GlobalBlogCta location='sidebar' />
                  </div>
                )}
              </div>
            </aside>

            {/* Blog footer */}
            <div className='order-4 lg:order-none lg:col-span-11 xl:col-span-9'>
              <HRSeparator className='mb-8 !max-w-none' />

              {/* Sharer */}
              <div className='mb-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this post
                </SuiText>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  <SocialButton type='y_combinator' title={blog.title} />
                  <SocialButton type='twitter' title={blog.title} />
                  <SocialButton type='bluesky' title={blog.title} />
                  <SocialButton type='facebook' title={blog.title} />
                  <SocialButton type='linkedin' title={blog.title} />
                </div>
              </div>

              {/* Form */}
              <NewsLetter />
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

          <CUIButton href='/blog' type='secondary'>
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
                <StrapiBlogPostCard key={recentBlogIndex} entry={recentBlog} />
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
