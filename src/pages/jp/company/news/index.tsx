import PaginateChildren from '@/components-cleaned/PaginateChildren'
import { CUICard } from '@/components/ClickUI'
import FollowUs from '@/components/FollowUs'
import { StrapiImageUrl } from '@/components/StrapiElements'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { fetchAll } from '@/lib/api/strapi'
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
          title: 'Latest news and press releases from ClickHouse',
          description:
            'Read the latest news and press releases from ClickHouse, including company updates and external media coverage.',
          path: '/company/news'
        },
        ...commonProps
      }
    }
  }

export default function News({
  newsItems,
  pressItems,
  headerData,
  seo
}: PageProps) {
  useGalaxyOnPage('newsPage')

  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='section-container my-16 flex flex-col items-start gap-x-16 gap-y-16 lg:my-24 lg:flex-row'>
        {/* Main */}
        <div>
          <SuiTitle type='h1'>プレスリリース</SuiTitle>
          <PaginateChildren perPage={6} mode='loadMore'>
            <PaginateChildren.Items
              as='ol'
              className='space-y-6 divide-y divide-white/5'>
              {pressItems.map((item, itemIndex) => (
                <li key={itemIndex} className='pt-6'>
                  <div className='group/newsItem relative space-y-2'>
                    <p className='font-inconsolata text-primary-300'>
                      {item.publisherName} •{' '}
                      {convertDateToString(item.publishedDate, 'ja-JP')}
                    </p>
                    <SuiTitle type='h3'>
                      <Link href={item.redirectUrl}>
                        <span className='absolute inset-0' />
                        {item.title}
                      </Link>
                    </SuiTitle>
                    <SuiText className='leading-relaxed text-neutral-200'>
                      {item.excerpt}
                    </SuiText>
                    <div className='text-primary-300 group-hover/newsItem:underline'>
                      続きを読む -&gt;
                    </div>
                  </div>
                </li>
              ))}
            </PaginateChildren.Items>
            <PaginateChildren.NextButton className='mx-auto mt-6 flex items-center justify-center gap-1 rounded border border-primary-600 bg-transparent px-6 py-2 text-sm text-neutral-0 hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl active:border-primary-500 active:bg-neutral-725 active:bg-opacity-80 active:shadow-xl disabled:hidden'>
              記事をもっと見る
            </PaginateChildren.NextButton>
          </PaginateChildren>
        </div>

        {/* Sidebar */}
        <div className='w-full lg:max-w-md'>
          <CUICard>
            <CUICard.Body className='p-4 lg:p-6'>
              <SuiTitle type='h2'>メディア掲載</SuiTitle>
              <PaginateChildren perPage={4}>
                <PaginateChildren.Items
                  as='ol'
                  className='space-y-6 divide-y divide-white/5'>
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
                            {convertDateToString(item.publishedDate, 'ja-JP')}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </PaginateChildren.Items>
                <div className='mt-6 flex justify-center gap-2 border-t border-white/5 pt-6'>
                  <PaginateChildren.PrevButton className='group rounded border border-transparent px-3 py-1 text-sm font-bold text-neutral-200 transition-colors hover:border-primary-300/50 hover:text-neutral-100 disabled:pointer-events-none disabled:opacity-40'>
                    <span className='tanslate-x-0 mr-2 inline-block transition-transform group-hover:-translate-x-1'>
                      &lt;-
                    </span>{' '}
                    前へ
                  </PaginateChildren.PrevButton>
                  <PaginateChildren.NextButton className='group rounded border border-transparent px-3 py-1 text-sm font-bold text-neutral-200 transition-colors hover:border-primary-300/50 hover:text-neutral-100 disabled:pointer-events-none disabled:opacity-40'>
                    次へ{' '}
                    <span className='tanslate-x-0 ml-2 inline-block transition-transform group-hover:translate-x-1'>
                      -&gt;
                    </span>
                  </PaginateChildren.NextButton>
                </div>
              </PaginateChildren>
            </CUICard.Body>
          </CUICard>
        </div>
      </div>

      <FollowUs />
    </Layout>
  )
}
