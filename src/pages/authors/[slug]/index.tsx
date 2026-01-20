import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import StrapiImage from '@/components-cleaned/StrapiImage'
import BlogPost from '@/components/BlogPostList/BlogPost'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { authorsService, blogService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { camel } from '@/lib/utils/strings'
import { CommonProps } from '@/types/homepage'
import { EntryAuthor, EntryBlogPost } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import removeMarkdown from 'remove-markdown'

export interface Props extends CommonProps {
  author: EntryAuthor
  authorBlogs: Array<EntryBlogPost>
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

  const authorBlogs = await blogService.findMany({
    filters: {
      author: {
        profiles: {
          id: author.id
        }
      }
    },
    pagination: { limit: 12 },
    sort: ['date:DESC', 'publishedAt:DESC']
  })

  return {
    props: {
      ...commonProps,
      author,
      authorBlogs,
      seo: {
        title: `Articles by ${author.name} | ClickHouse`,
        path: `/authors/${author.slug}`,
        description: author.description
          ? removeMarkdown(author.description)
          : `Read all ClickHouse articles by ${author.name}.`
      }
    }
  }
}) satisfies GetStaticProps<Props>

export default function Page({
  author,
  authorBlogs,
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
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container flex flex-col items-start gap-x-16 gap-y-8 lg:flex-row'>
          <StrapiImage
            entry={author.avatar}
            className='hidden aspect-square h-auto w-64 max-w-none flex-shrink-0 flex-grow-0 rounded-full lg:block'
          />
          <div>
            <div className='flex flex-wrap items-center gap-4'>
              <StrapiImage
                entry={author.avatar}
                className='aspect-square h-auto w-16 max-w-none flex-shrink-0 flex-grow-0 rounded-full md:w-32 lg:hidden'
              />
              <div>
                <SuiTitle type='h1'>{author.name}</SuiTitle>
                {author.title && (
                  <p className='text-lg text-neutral-400 lg:text-xl'>
                    {author.title}
                  </p>
                )}
              </div>
            </div>
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
      {authorBlogs.length > 0 && (
        <section className='border-t border-neutral-725 py-16 lg:py-24'>
          <div className='section-container'>
            <SuiTitle type='h2'>Blog posts by {author.name}</SuiTitle>
            <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {authorBlogs.map((blog) => {
                return <StrapiBlogPostCard key={blog.id} entry={blog} />
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
