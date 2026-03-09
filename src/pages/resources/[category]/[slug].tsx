import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ScrollToTop from '@/components-cleaned/ScrollToTop'
import SmartBackButton from '@/components-cleaned/SmartBackButton'
import StrapiAuthorMeta from '@/components-cleaned/StrapiAuthorMeta'
import StrapiDynamicBlogModules from '@/components-cleaned/StrapiDynamicBlogModules'
import StrapiImage from '@/components-cleaned/StrapiImage'
import CopyUrlButton from '@/components/CopyUrlButton'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import NewsLetter from '@/components/NewsLetter'
import ReadingProgress from '@/components/ReadingProgress'
import SocialButton from '@/components/SocialButton'
import TableOfContents from '@/components/TableOfContents'
import { SuiText, SuiTitle } from '@/components/sui'
import {
  resourcesService,
  seoFieldToNextComponentProps
} from '@/lib/api/strapi'
import { generateFaqPageSchema } from '@/lib/schema'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource } from '@/types/strapi'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useRef } from 'react'
import removeMarkdown from 'remove-markdown'

export async function getStaticPaths() {
  const posts = await resourcesService.findAll({
    fields: ['slug'],
    populate: ['category']
  })

  return {
    paths: posts.map((post) => ({
      params: { category: post.category.slug, slug: post.slug }
    })),
    fallback: 'blocking'
  }
}

export interface Props extends CommonProps {
  resource: EntryResource
  related: Array<EntryResource>
}

export const getStaticProps = (async ({ params }) => {
  const categorySlug =
    typeof params?.category === 'string' ? params.category : null

  const resourceSlug = typeof params?.slug === 'string' ? params.slug : null

  if (!categorySlug || !resourceSlug) {
    return {
      notFound: true
    }
  }

  const [commonProps, resource, related] = await Promise.all([
    getCommonProps(),
    resourcesService.findOne({
      filters: {
        slug: resourceSlug
      }
    }),
    resourcesService.findMany({
      sort: ['publishedAt:DESC'],
      filters: {
        slug: {
          $ne: resourceSlug
        },
        category: {
          slug: {
            $eq: categorySlug
          }
        }
      },
      pagination: { limit: 3 }
    })
  ])

  if (!resource) {
    return {
      notFound: true
    }
  }

  const combinedFaqs = resource.sections
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
      ...commonProps,
      resource,
      related,
      seo: seoFieldToNextComponentProps(resource.seo, {
        title: resource.category?.seo?.title
          ? `${resource.title} | ${resource.category.seo.title}`
          : `${resource.title} | ${resource.category.name} | ClickHouse Resource Hub`,
        description: resource.excerpt,
        path: `/resources/${resource.category.slug}/${resource.slug}`,
        lastModified: resource.updatedAt,
        schema: combinedFaqs.length
          ? generateFaqPageSchema({ faqs: combinedFaqs })
          : null
      })
    }
  }
}) satisfies GetStaticProps<Props>

export default function ResourcePage({
  resource,
  related,
  ...commonProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<null | HTMLDivElement>(null)
  return (
    <Layout {...commonProps}>
      <ScrollToTop showFrom={600} hideAtBottomRef={contentRef} />
      <div className='relative'>
        <ReadingProgress target={contentRef} />

        <div className='section-container flex flex-col items-start gap-8 pt-12 lg:flex-row lg:pt-20'>
          <SmartBackButton
            fallbackPath='/resources'
            className='group/backButton -mx-3 -my-1.5 mr-8 inline-flex items-center whitespace-nowrap rounded px-3 py-1.5 text-base font-semibold transition-colors hover:bg-white/5'>
            <ArrowLeftIcon className='mr-2 w-4 transition-transform group-hover/backButton:-translate-x-1' />
            Back
          </SmartBackButton>
          <div className='flex w-full flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-6'>
            {/* Meta */}
            <div className='order-1 lg:order-none lg:col-span-11 lg:mb-12 xl:col-span-9'>
              <Breadcrumbs>
                <Breadcrumbs.Link href='/resources'>Resources</Breadcrumbs.Link>
                <Breadcrumbs.Link href={`/resources/${resource.category.slug}`}>
                  {resource.category.name}
                </Breadcrumbs.Link>
              </Breadcrumbs>

              <h1 className='mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100'>
                <span className='leading-snug'>{resource.title}</span>
              </h1>

              {/* Authors */}
              <StrapiAuthorMeta
                authors={resource.author}
                extras={[
                  resource.date
                    ? `${resource.dateLabel ? `${resource.dateLabel}: ` : ''}${convertDateToString(resource.date)}`
                    : null
                ]}
              />
            </div>

            {/* Blog content */}
            <article className='order-3 lg:order-none lg:col-span-11 xl:col-span-9'>
              <div className='w-full space-y-6' ref={contentRef}>
                {resource.thumbnail && (
                  <StrapiImage
                    entry={resource.thumbnail}
                    className='h-auto w-full'
                  />
                )}
                {resource.sections &&
                  resource.sections.length > 0 &&
                  resource.sections.map((section, sectionIndex) => {
                    return (
                      <StrapiDynamicBlogModules
                        key={sectionIndex}
                        {...section}
                      />
                    )
                  })}

                {resource.content && (
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink={true}>
                    {resource.content}
                  </Markdown>
                )}
              </div>
            </article>

            {/* Blog sidebar */}
            <aside className='order-2 hidden lg:order-none xl:col-span-3 xl:block'>
              <div className='sticky top-30 flex max-h-[calc(100vh_-_9rem)] flex-col gap-6'>
                {resource.tocSelectors && (
                  <TableOfContents
                    contentRef={contentRef}
                    headersSelector={resource.tocSelectors}
                  />
                )}
                {related.length > 0 && (
                  <div>
                    <SuiTitle type='h2' className='mb-2 !text-lg'>
                      More like this
                    </SuiTitle>
                    <ul className='space-y-4'>
                      {related.map((item, itemIndex) => {
                        return (
                          <li key={itemIndex}>
                            <LinkWithArrow
                              href={`/resources/${item.category.slug}/${item.slug}`}
                              className='flex w-full justify-between rounded border border-neutral-700 px-4 py-2 transition hover:border-primary-400/40'>
                              {item.title}
                            </LinkWithArrow>
                          </li>
                        )
                      })}
                    </ul>
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
                  Share this resource
                </SuiText>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  <SocialButton type='y_combinator' title={resource.title} />
                  <SocialButton type='twitter' title={resource.title} />
                  <SocialButton type='bluesky' title={resource.title} />
                  <SocialButton type='facebook' title={resource.title} />
                  <SocialButton type='linkedin' title={resource.title} />
                </div>
              </div>

              <NewsLetter />
            </div>
          </div>
        </div>
      </div>

      {/* Socials */}
      <FollowUs />
    </Layout>
  )
}
