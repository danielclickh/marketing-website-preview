import { CUIButton } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import DemoCard from '@/components/DemoCard'
import FollowUs from '@/components/FollowUs'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import NewsLetter from '@/components/NewsLetter'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import ReadingProgress from '@/components/ReadingProgress'
import SocialButton from '@/components/SocialButton'
import TableOfContents from '@/components/TableOfContents'
import { SuiText, SuiTitle } from '@/components/sui'
import { fetchAll, findAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { DemoProps } from '@/types/demo'
import { Demo } from '@/types/demos'
import { ParamsType } from '@/types/homepage'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useRef } from 'react'

export const getStaticProps: GetStaticProps<DemoProps> =
  async function getStaticProps({ params }) {
    const { link } = params as ParamsType
    const stagingOnlyFilters = getStagingOnlyFilters()

    const filters: Record<string, any> = {
      Link: { $eq: link },
      External: { $eq: false },
      $or: stagingOnlyFilters
    }

    const { data } = await findAll('demos', {
      filters,
      populate: ['Image'],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true
      }
    }

    const demo = data[0] as Demo

    const otherDemoParams = {
      populate: ['Image'],
      sort: ['SortOrder:ASC', 'publishedAt:DESC'],
      fields: ['Title', 'Description', 'Link', 'GitHubLink', 'External'],
      pagination: { limit: 4 },
      filters: {
        Link: {
          $ne: link
        },
        ListOnDemos: {
          $eq: true
        },
        $or: stagingOnlyFilters
      }
    }
    const { data: otherDemos } = await findAll('demos', otherDemoParams)
    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    const demo_link = demo.External ? demo.Link : `/demos/${demo.Link}`

    return {
      props: {
        ...demo,
        otherDemos,
        seo: {
          title: demo.Title,
          description: demo.Description,
          type: 'article',
          siteName: 'ClickHouse',
          image: [demo.Image],
          path: demo_link
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
  const data = await fetchAll('demos', {
    filters: {
      Link: { $notNull: true },
      External: { $eq: false },
      ListOnDemos: { $eq: true },
      $or: getStagingOnlyFilters()
    },
    fields: ['Link']
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { link: post.Link }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function DemoPage({
  Title,
  Content,
  seo,
  headerData,
  footerData,
  newsLetterData,
  otherDemos = []
}: DemoProps) {
  useGalaxyOnPage('demo_page')
  const contentRef = useRef<null | HTMLDivElement>(null)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='relative'>
        <ReadingProgress target={contentRef} />

        <div className='section-container flex flex-col items-start gap-8 py-12 lg:flex-row lg:py-20'>
          <Link
            href='/demos'
            className='group/backButton -mx-3 -my-1.5 mr-8 inline-flex items-center rounded px-3 py-1.5 text-base font-semibold transition-colors hover:bg-white/5'>
            <ArrowLeftIcon className='mr-2 w-4 transition-transform group-hover/backButton:-translate-x-1' />
            Back
          </Link>
          <div className='flex flex-col gap-y-8 lg:grid lg:grid-cols-12 lg:gap-x-6'>
            {/* Demo content */}
            <article className='order-3 lg:order-none lg:col-span-11 xl:col-span-9'>
              {Content && (
                <div className='flex flex-col lg:flex-row' ref={contentRef}>
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink>
                    {Content}
                  </Markdown>
                </div>
              )}
            </article>

            {/* Demo sidebar */}
            <aside className='order-2 hidden lg:order-none xl:col-span-3 xl:block'>
              <TableOfContents
                contentRef={contentRef}
                headersSelector='h1, h2, h3'
              />
            </aside>

            {/* Blog footer */}
            <div className='order-4 lg:order-none lg:col-span-11 xl:col-span-9'>
              <HRSeparator className='mb-8 !max-w-none' />

              {/* Sharer */}
              <div className='mb-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this demo
                </SuiText>
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <CopyUrlButton />
                  {[
                    'y_combinator',
                    'twitter',
                    'bluesky',
                    'facebook',
                    'linkedin'
                  ].map((social) => (
                    <SocialButton key={social} type={social} title={Title} />
                  ))}
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
            Other demos
          </SuiTitle>

          <CUIButton href='/demos' type='secondary-dark'>
            View all Demos
          </CUIButton>
        </div>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {otherDemos.map((recentDemo, recentDemoIndex) => {
            return (
              <div
                className={
                  recentDemoIndex > 2 ? 'hidden md:block lg:hidden' : ''
                }>
                <DemoCard key={recentDemoIndex} {...recentDemo} />
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
