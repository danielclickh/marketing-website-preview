import { CUICard } from '@/components/ClickUI'
import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import NewsItem from '@/components/NewsItem'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import { fetchAll, findOne } from '@/lib/api/strapi'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

interface StrapiNewsItem {
  title: string
  slug: string
  redirectUrl: string
  publisherName: string
  publisherAvatar: StrapiImageType
  type: 'News' | 'Press release'
  publishedDate: string
  excerpt: null | string
}

interface PageProps extends CommonProps {
  newsItems: Array<StrapiNewsItem>
  pressItems: Array<StrapiNewsItem>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const newsPromise: Promise<Array<StrapiNewsItem>> = fetchAll('news-items', {
      filters: {
        type: {
          $eq: 'News'
        }
      },
      populate: ['publisherAvatar'],
      sort: ['publishedDate:desc']
    })

    const pressPromise: Promise<Array<StrapiNewsItem>> = fetchAll(
      'news-items',
      {
        filters: {
          type: {
            $eq: 'Press release'
          }
        },
        populate: ['publisherAvatar'],
        sort: ['publishedDate:desc']
      }
    )

    const commonPromise = getCommonProps()

    const [newsItems, pressItems, commonProps] = await Promise.all([
      newsPromise,
      pressPromise,
      commonPromise
    ])

    return {
      props: {
        newsItems,
        pressItems,
        seo: {
          title: 'News & Press releases - ClickHouse',
          path: '/company/news'
        },
        ...commonProps
      }
    }
  }

export default function News({
  newsItems,
  pressItems,
  footerData,
  headerData,
  seo
}: PageProps) {
  useGalaxyOnPage('newsPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='section-container my-16 flex flex-col items-start gap-x-16 gap-y-16 lg:my-24 lg:flex-row'>
        {/* Main */}
        <div>
          <SuiTitle type='h1'>Press releases</SuiTitle>
          <ul className='space-y-6 divide-y divide-white/5'>
            {pressItems.map((item, itemIndex) => (
              <li key={itemIndex} className='pt-6'>
                <div className='group/newsItem relative'>
                  <p className='mb-2 font-inconsolata text-primary-300'>
                    {item.publisherName} •{' '}
                    {convertDateToString(item.publishedDate)}
                  </p>
                  <SuiTitle type='h3'>
                    <Link href={item.redirectUrl}>
                      <span className='absolute inset-0' />
                      {item.title}
                    </Link>
                  </SuiTitle>
                  <div className='flex flex-col'>
                    <SuiText
                      className='mb-6 leading-relaxed text-neutral-200'
                      size='sm'>
                      {item.excerpt}
                    </SuiText>
                    <div className='mt-auto text-primary-300 group-hover/newsItem:underline'>
                      Read more -&gt;
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className='w-full lg:max-w-md'>
          <CUICard>
            <CUICard.Body className='p-4 lg:p-6'>
              <SuiTitle type='h2'>In the news</SuiTitle>
              <ul className='space-y-6 divide-y divide-white/5'>
                {newsItems.map((item, itemIndex) => (
                  <li key={itemIndex} className='pt-6'>
                    <div className='group/newsItem relative'>
                      <SuiTitle type='h3'>
                        <Link
                          href={item.redirectUrl}
                          className='text-primary-300 hover:underline'>
                          <span className='absolute inset-0' />
                          {item.title}
                        </Link>
                      </SuiTitle>
                      <div className='mt-4 flex items-center gap-4'>
                        <StrapiImageUrl
                          {...item.publisherAvatar}
                          width={100}
                          height={100}
                          unoptimized={false}
                          className='size-11 rounded-full object-cover object-center'
                        />
                        <p className='font-inconsolata leading-tight text-neutral-200'>
                          {item.publisherName}
                          <br />
                          {convertDateToString(item.publishedDate)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CUICard.Body>
          </CUICard>
        </div>
      </div>

      <FollowUs />
    </Layout>
  )
}
