import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import menuItems from '../../components/header/menuItems.json'
import HRSeparator from '../../components/HRSeparator'
import Layout from '../../components/Layout'
import { fetchAll, findOne, getStagingOnlyFilters } from '../../lib/api/strapi'
import { convertDateToString } from '../../lib/utils/dateUtils'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { Video } from '../../lib/videos/types'
import { CommonProps } from '../../types/homepage'
import { getVideos } from '../../lib/videos'
import { getLexicons } from '../../lib/lexicons'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { Integration } from '../../types/integrations'

interface SitemapProps extends CommonProps {
  blogPosts: any[]
  allEvents: any[]
  allVideos: Video[]
  onDemandEvents: any[]
  newsEvents: any[]
  pressReleases: any[]
  menu: any[]
  comparisons: any[]
  lexicons: any[]
  integrations: Integration[]
}

export const getStaticProps: GetStaticProps<SitemapProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const blogsParams: Record<string, any> = {
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
      filters: {
        $or: getStagingOnlyFilters()
      }
    }

    const blogPosts = await fetchAll('blog-posts', blogsParams)
    const events = await fetchAll('events', {
      sort: ['localDatetime:DESC'],
      populate: ['category']
    })

    const comparisonsParams: Record<string, any> = {
      sort: ['publishedAt:DESC'],
      fields: ['Title', 'slug']
    }

    const allEvents = events.filter((event) => {
      return event.category !== 'On-Demand Webinar'
    })

    const onDemandEvents = events.filter((event) => {
      return event.category === 'On-Demand Webinar'
    })

    const newsEventsTest = findOne('news-and-event', {
      populate: [
        'hero',
        'newsItems',
        'newsItems.ctaButton',
        'pressReleases',
        'pressReleases.ctaButton',
        'seo',
        'seo.image'
      ]
    })

    const comparisons = await fetchAll('comparisons', comparisonsParams)

    const newsItems = await newsEventsTest
    const newsEvents = newsItems.newsItems
    const pressReleases = newsItems.pressReleases

    const lexicons = getLexicons()

    const allVideos = await getVideos()

    const integrations: Integration[] = await fetchAll('integrations', {
      sort: ['name:ASC'],
      filters: {
        // Integrations with `openInNewWindow` set to true are excluded from the query.
        // This is because they link off externally. See the IntegrationTile component.
        $or: [
          {
            openInNewWindow: {
              $eq: false
            }
          },
          {
            openInNewWindow: {
              $null: true
            }
          }
        ]
      }
    })

    const menu = menuItems

    return {
      props: {
        blogPosts,
        allEvents,
        allVideos,
        onDemandEvents,
        newsEvents,
        pressReleases,
        comparisons,
        menu,
        lexicons,
        integrations,
        seo: {
          title: 'Site map - ClickHouse',
          path: '/sitemap'
        },
        ...commonProps
      }
    }
  }

function Sitemap({
  seo,
  headerData,
  footerData,
  blogPosts,
  allEvents,
  allVideos,
  onDemandEvents,
  newsEvents,
  pressReleases,
  comparisons,
  menu,
  lexicons,
  integrations
}: SitemapProps) {
  const resourcesMenu = menuItems.find((obj) => obj.id === 2)?.menuItems

  galaxyOnPage('siteMapPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div>
        <h1 className='mx-auto mb-10 pt-10 text-center font-basier text-4xl text-neutral-100 md:text-5.5xl lg:mb-16 lg:pt-20'>
          Site map
        </h1>
        <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'>
          <div className='mb-10 grid gap-10 xl:grid-cols-4'>
            <div>
              <h2
                id='blog-posts'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                Product
              </h2>
              <p className='pb-2'>
                <Link
                  href={`/clickhouse`}
                  className=' text-primary-300 hover:underline'>
                  ClickHouse
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/cloud?loc=sitemap`}
                  className='text-primary-300 hover:underline'>
                  ClickHouse Cloud
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/cloud/clickpipes?loc=sitemap`}
                  className='text-primary-300 hover:underline'>
                  ClickPipes
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/clickhouse/keeper?loc=sitemap`}
                  className='text-primary-300 hover:underline'>
                  ClickHouse Keeper
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/real-time-data-warehouse?loc=sitemap`}
                  className='text-primary-300 hover:underline'>
                  Real-time Data Warehouse
                </Link>
              </p>
            </div>
            <div>
              <h2
                id='blog-posts'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                Company
              </h2>
              <p className='pb-2'>
                <Link
                  href={`/blog`}
                  className=' text-primary-300 hover:underline'>
                  Blog
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/company/our-story`}
                  className='text-primary-300 hover:underline'>
                  Our story
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/company/careers`}
                  className='text-primary-300 hover:underline'>
                  Careers
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/company/contact`}
                  className='text-primary-300 hover:underline'>
                  Contact us
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/company/news-events`}
                  className='text-primary-300 hover:underline'>
                  News and events
                </Link>
              </p>
            </div>
            <div>
              <h2
                id='use-cases'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                <Link
                  href={`/use-cases`}
                  className='hover:text-primary-300 hover:underline'>
                  Use cases
                </Link>
              </h2>
              <p className='pb-2'>
                <Link
                  href='/use-cases/real-time-analytics'
                  className='text-primary-300 hover:underline'>
                  Real-time analytics
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href='/use-cases/logging-and-metrics'
                  className='text-primary-300 hover:underline'>
                  Logs, events &amp; traces
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href='/use-cases/machine-learning-and-data-science'
                  className='text-primary-300 hover:underline'>
                  Machine Learning &amp; GenAI
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href='/use-cases/business-intelligence'
                  className='text-primary-300 hover:underline'>
                  Business intelligence
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={`/user-stories`}
                  className='text-primary-300 hover:underline'>
                  User stories
                </Link>
              </p>
            </div>
            <div>
              <h2
                id='Pricing'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                <Link
                  href={`/pricing`}
                  className='hover:text-primary-300 hover:underline'>
                  Pricing
                </Link>
              </h2>
              <p className='pb-2'>
                <Link
                  href={`/pricing`}
                  className='text-primary-300 hover:underline'>
                  Pricing
                </Link>
              </p>
            </div>
            <div className='col-span-full'>
              <h2
                id='integrations'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                <Link
                  href={`/integrations`}
                  className='hover:text-primary-300 hover:underline'>
                  Integrations
                </Link>
              </h2>
              <ul className='mb-2 gap-y-0 gap-x-10 xl:columns-4'>
                {integrations.map((integration) => {
                  return (
                    <li key={integration.slug} className='pb-2'>
                      <Link
                        href={`/integrations/${integration.slug}`}
                        className='font text-primary-300 hover:underline'>
                        {integration.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <HRSeparator className='my-20' />
          <div>
            <h2
              id='Resources'
              className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
              Resources
            </h2>
            <div className='mb-10 grid gap-10 gap-y-2 xl:grid-cols-4'>
              {resourcesMenu?.map((item) => (
                <div key={item.id}>
                  <p className='pb-2 font-semibold'>
                    {item.href ? (
                      <Link href={item.href} className='hover:underline'>
                        {item.name}
                      </Link>
                    ) : (
                      <>{item.name}</>
                    )}
                  </p>
                  {item.menuItems &&
                    item.menuItems.map((menuItem: any, index) => (
                      <div key={index}>
                        <ul className='mb-2'>
                          <li>
                            <Link
                              href={menuItem.href}
                              className='font text-primary-300 hover:underline'>
                              {menuItem.name}{' '}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              ))}
              <div>
                <p className='pb-2 font-semibold'>Comparisons</p>
                <ul className='mb-2'>
                  {comparisons.map((comparison, index) => {
                    return (
                      <li key={index} className='pb-2'>
                        <Link
                          href={`/comparison/${comparison.slug}`}
                          className='font text-primary-300 hover:underline'>
                          {comparison.Title}{' '}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <p className='pb-2 font-semibold'>
                  <Link
                    href={`/lexicon`}
                    className='text-white hover:underline'>
                    Lexicon
                  </Link>
                </p>
                <ul className='mb-2'>
                  {lexicons.map((lexicon, index) => {
                    return (
                      <li key={index} className='pb-2'>
                        <Link
                          href={`/lexicon/${lexicon.slug}`}
                          className='font text-primary-300 hover:underline'>
                          {lexicon.title}{' '}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <HRSeparator className='my-20' />
          <div className='grid gap-10 xl:grid-cols-4'>
            <div>
              <h2
                id='blog-posts'
                className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
                Blogs
              </h2>
              <ul>
                {blogPosts.map((post) => (
                  <li key={post.slug} className='pb-3'>
                    <p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className='text-primary-300 hover:underline'>
                        {post.title}
                      </Link>
                    </p>
                    <p className='text-sm text-neutral-200'>
                      Published:{' '}
                      {convertDateToString(post.date || post.publishedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2
                id='news-posts'
                className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
                News
              </h2>
              <ul>
                {newsEvents.map((news) => (
                  <li key={news.id} className='pb-3'>
                    <p>
                      <Link
                        href={news.ctaButton.href}
                        target={news.ctaButton.target}
                        className='text-primary-300 hover:underline'>
                        {news.headline}
                      </Link>
                    </p>
                    <p className='text-sm text-neutral-200'>
                      Published:{' '}
                      {convertDateToString(news.date || news.publishedAt)}
                    </p>
                  </li>
                ))}
              </ul>
              <h2
                id='press-releases'
                className='my-6 font-basier text-2xl font-semibold text-neutral-100'>
                Press Releases
              </h2>
              <ul>
                {pressReleases.map((news) => (
                  <li key={news.id} className='pb-3'>
                    <p>
                      <Link
                        href={news.ctaButton.href}
                        target={news.ctaButton.target}
                        className='text-primary-300 hover:underline'>
                        {news.headline}
                      </Link>
                    </p>
                    <p className='text-sm text-neutral-200'>
                      Published:{' '}
                      {convertDateToString(news.date || news.publishedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2
                id='Events'
                className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
                Events
              </h2>
              <ul>
                {allEvents.map((event) => (
                  <li key={event.slug} className='pb-3'>
                    <p>
                      <Link
                        href={`/company/events/${event.slug}`}
                        className='text-primary-300 hover:underline'>
                        {event.title}
                      </Link>
                    </p>
                    <p className='text-sm text-neutral-200'>
                      {event.category !== 'On-Demand Webinar' ? (
                        <>
                          {event.category}
                          {event.localDatetime && (
                            <> | {convertDateToString(event.localDatetime)}</>
                          )}
                        </>
                      ) : (
                        <span>{event.category}</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2
                id='Events'
                className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
                <Link href='/videos'>Videos</Link>
              </h2>
              <ul className='mb-2'>
                {allVideos.map((video, index) => {
                  return (
                    <li key={index} className='pb-2'>
                      <Link
                        href={`/videos/${video.slug}`}
                        className='font text-primary-300 hover:underline'>
                        {video.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h2
                id='on-demand'
                className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
                On-Demand
              </h2>
              <ul>
                {onDemandEvents.map((event) => (
                  <li key={event.slug} className='pb-3'>
                    <p>
                      <Link
                        href={`/company/events/${event.slug}`}
                        className='text-primary-300 hover:underline'>
                        {event.title}
                      </Link>
                    </p>
                    <p className='text-sm text-neutral-200'>
                      {event.category !== 'On-Demand Webinar' ? (
                        <>
                          {event.category} |{' '}
                          {event.localDatetime && (
                            <>{convertDateToString(event.localDatetime)}</>
                          )}
                        </>
                      ) : (
                        <span>{event.category}</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'></div>
        <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'></div>
        <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'></div>
      </div>
    </Layout>
  )
}

export default Sitemap
