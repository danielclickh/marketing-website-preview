import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import StrapiImage from '@/components-cleaned/StrapiImage'
import StrapiResourceCard from '@/components-cleaned/StrapiResourceCard'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { authorsService, blogService, resourcesService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { camel } from '@/lib/utils/strings'
import { CommonProps } from '@/types/homepage'
import { EntryAuthor, EntryBlogPost, EntryResource } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import removeMarkdown from 'remove-markdown'

const DISPLAY_LIMIT = 6

export interface Props extends CommonProps {
  author: EntryAuthor
  blogs: Array<EntryBlogPost>
  resources: Array<EntryResource>
  totalBlogs: number
  totalResources: number
}

export async function getStaticPaths() {
  const authors = await authorsService.findAll({
    fields: ['slug'],
    populate: []
  })

  return {
    paths: authors.map((author) => ({
      params: { slug: author.slug }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps = (async ({ params }) => {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  if (!slug) {
    return {
      notFound: true
    }
  }

  const commonProps = await getCommonProps()

  const author = await authorsService.findOne({
    filters: {
      slug: {
        $eq: slug
      }
    }
  })

  if (!author) {
    return {
      notFound: true
    }
  }

  const { data: blogs, pagination: blogPagination } =
    await blogService.findMany(
      {
        filters: {
          author: {
            profiles: {
              id: author.id
            }
          }
        },
        pagination: { limit: DISPLAY_LIMIT, withCount: true },
        sort: ['date:DESC', 'publishedAt:DESC']
      },
      true
    )

  const { data: resources, pagination: resourcePagination } =
    await resourcesService.findMany(
      {
        filters: {
          author: {
            profiles: {
              id: author.id
            }
          }
        },
        pagination: { limit: DISPLAY_LIMIT, withCount: true },
        sort: ['date:DESC', 'publishedAt:DESC']
      },
      true
    )

  const hasBlogs = blogs.length > 0
  const hasResources = resources.length > 0

  let title = author.name
  let description = ''

  if (hasBlogs && hasResources) {
    title = `Articles & Resources by ${author.name}`
    description = `Explore ClickHouse articles and resources by ${author.name}.`
  } else if (hasBlogs) {
    title = `Articles by ${author.name}`
    description = `Read ClickHouse articles by ${author.name}.`
  } else if (hasResources) {
    title = `Resources by ${author.name}`
    description = `Explore ClickHouse resources by ${author.name}.`
  }

  const seo: Props['seo'] = {
    title: `${title} | ClickHouse`,
    path: `/authors/${author.slug}`,
    description: author.description
      ? removeMarkdown(author.description)
      : description
  }

  if (!hasBlogs && !hasResources) {
    seo.robots = 'noindex,nofollow'
  }

  return {
    props: {
      ...commonProps,
      author,
      blogs,
      resources,
      totalBlogs: blogPagination?.total || blogs.length,
      totalResources: resourcePagination?.total || resources.length,
      seo: seo
    }
  }
}) satisfies GetStaticProps<Props>

export default function Page({
  author,
  blogs,
  resources,
  totalBlogs,
  totalResources,
  ...commonProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useGalaxyOnPage(camel(`${author.slug} author page`), [author.slug])

  const socials = [
    {
      icon: '/socials/linkedin.svg',
      label: `Follow ${author.name} on LinkedIn`,
      url: author.linkedinUrl
    },
    {
      icon: '/socials/twitter.svg',
      label: `Follow ${author.name} on Twitter`,
      url: author.twitterUrl
    },
    {
      icon: '/socials/github.svg',
      label: `Follow ${author.name} on GitHub`,
      url: author.githubUrl
    },
    {
      icon: '/socials/instagram.svg',
      label: `Follow ${author.name} on Instagram`,
      url: author.instagramUrl
    },
    {
      icon: '/socials/link.svg',
      label: `Visit ${author.name}'s Website`,
      url: author.websiteUrl
    }
  ].filter((item) => item.url && item.url.trim().length > 0)

  return (
    <Layout {...commonProps}>
      <section className='bg-grid py-16'>
        <div className='section-container flex flex-col items-start gap-x-16 gap-y-8 lg:flex-row'>
          <StrapiImage
            entry={author.avatar}
            className='aspect-square h-auto w-16 max-w-none flex-shrink-0 flex-grow-0 rounded-full bg-neutral md:w-32 lg:w-64'
          />
          <div className='my-auto'>
            <SuiTitle type='h1'>{author.name}</SuiTitle>
            {author.title && (
              <p className='text-lg text-neutral-400 lg:text-xl'>
                {author.title}
              </p>
            )}
            {author.description && (
              <Markdown
                allowDirectives={false}
                className='rich-text-content mt-8 max-w-3xl leading-6'
                allowHeaderLink={false}>
                {author.description}
              </Markdown>
            )}
            {socials.length > 0 && (
              <>
                <p className='mb-4 mt-8 text-sm font-bold uppercase text-primary-300'>
                  Follow {author.name}
                </p>
                <ul className='flex gap-4'>
                  {socials.map((social, socialIndex) => {
                    return (
                      <li key={socialIndex}>
                        <Link
                          href={social.url!}
                          target='_blank'
                          className='flex size-10 items-center justify-center rounded border border-neutral-700 bg-neutral-900/70 shadow transition-colors hover:border-primary-500 hover:bg-neutral-900'
                          title={social.label}>
                          <Image
                            src={social.icon}
                            alt={social.label}
                            width={32}
                            height={32}
                            className='size-5 max-w-none object-contain'
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
      <HRSeparator className='!max-w-none' />
      {!blogs.length && !resources.length && (
        <section className='section-container my-16 text-center lg:my-24'>
          <p>No articles or resources published yet.</p>
        </section>
      )}
      {blogs.length > 0 && (
        <section className='my-16 lg:my-24'>
          <div className='section-container'>
            <SuiTitle type='h2'>Blog posts by {author.name}</SuiTitle>
            {totalBlogs > blogs.length && (
              <p className='mt-4 text-neutral-400'>
                Showing {blogs.length} of {totalBlogs} articles
              </p>
            )}
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3'>
              {blogs.map((blog) => {
                return <StrapiBlogPostCard key={blog.id} entry={blog} />
              })}
            </div>
          </div>
        </section>
      )}
      {resources.length > 0 && (
        <section className='my-16 lg:my-24'>
          <div className='section-container'>
            <SuiTitle type='h2'>Resources by {author.name}</SuiTitle>
            {totalResources > resources.length && (
              <p className='mt-4 text-neutral-400'>
                Showing {resources.length} of {totalResources} resources
              </p>
            )}
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3'>
              {resources.map((resource) => {
                resource.category.requiresThumbnail = false // force non-mixed display types
                return <StrapiResourceCard key={resource.id} entry={resource} />
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
