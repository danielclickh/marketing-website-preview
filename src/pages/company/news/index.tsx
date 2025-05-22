import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import NewsItem from '@/components/NewsItem'
import Pagination from '@/components/Pagination'
import { SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { NewsAndEventsData, NewsPageProps } from '@/types/newsEvents'
import { GetStaticProps } from 'next'
import { useMemo, useState } from 'react'

export const getStaticProps: GetStaticProps<NewsPageProps> =
  async function getStaticProps() {
    const newsEvents: Promise<NewsAndEventsData> = findOne('news-and-event', {
      populate: [
        'newsItems',
        'newsItems.ctaButton',
        'pressReleases',
        'pressReleases.ctaButton'
      ]
    })

    const { newsItems, pressReleases } = await newsEvents

    const commonProps = await getCommonProps()
    return {
      props: {
        newsItems,
        pressReleases,
        seo: {
          title: 'News - ClickHouse',
          path: '/company/news'
        },
        ...commonProps
      }
    }
  }

export default function News({
  newsItems,
  pressReleases,
  footerData,
  headerData,
  seo
}: NewsPageProps) {
  useGalaxyOnPage('newsPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='section-container my-10 lg:my-16'>
        <SuiTitle type='h1' className='mb-10 text-center lg:mb-16'>
          News
        </SuiTitle>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {newsItems.map((newsItem, newsIndex) => (
            <NewsItem
              key={newsIndex}
              source={newsItem.publication}
              date={newsItem.date}
              title={newsItem.headline}
              abstract={newsItem.shortIntro}
              ctaButton={newsItem.ctaButton}
            />
          ))}
        </div>
      </section>

      <section className='section-container my-10 lg:my-16'>
        <SuiTitle type='h2' className='mb-10 text-center lg:mb-16'>
          Press releases
        </SuiTitle>
        <div className='section-container grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {pressReleases.map((pressRelease, pressReleaseIndex) => (
            <NewsItem
              key={pressReleaseIndex}
              source={pressRelease.publication}
              date={pressRelease.date}
              title={pressRelease.headline}
              abstract={pressRelease.shortIntro}
              ctaButton={pressRelease.ctaButton}
            />
          ))}
        </div>
      </section>

      <FollowUs />
    </Layout>
  )
}
