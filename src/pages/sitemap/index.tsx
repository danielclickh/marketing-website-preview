import { fetchCategories } from '../api/blog'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import {
  fetchAll,
  findOne,
  getStagingOnlyFilters,
  getUnlistedFilters,
  resourcesService
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { getVideos } from '@/lib/videos'
import { Video } from '@/lib/videos/types'
import { CommonProps } from '@/types/homepage'
import { EntryResource } from '@/types/strapi'
import { GetStaticProps } from 'next'
import Link from 'next/link'

interface SitemapProps extends CommonProps {
  blogCategories: Record<string, string>
  blogPosts: any[]
  allEvents: any[]
  allVideos: Video[]
  onDemandEvents: any[]
  newsEvents: any[]
  pressReleases: any[]
  comparisons: any[]
  resources: EntryResource[]
  demos: any[]
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
      filters: {
        $and: [
          {
            $or: getUnlistedFilters()
          }
        ]
      },
      sort: ['localDatetime:DESC'],
      populate: ['category']
    })

    const blogCategories = await fetchCategories()

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
    const demos = await fetchAll('demos', {})

    const newsItems = await newsEventsTest
    const newsEvents = newsItems.newsItems
    const pressReleases = newsItems.pressReleases

    const resources = await resourcesService.findAll()

    const allVideos = await getVideos()

    return {
      props: {
        blogCategories,
        blogPosts,
        allEvents,
        allVideos,
        onDemandEvents,
        newsEvents,
        pressReleases,
        comparisons,
        resources,
        demos,
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
  blogCategories,
  blogPosts,
  allEvents,
  allVideos,
  onDemandEvents,
  newsEvents,
  pressReleases,
  comparisons,
  resources,
  demos
}: SitemapProps) {
  useGalaxyOnPage('siteMapPage')

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
                  href={'/clickhouse'}
                  className='text-primary-300 hover:underline'>
                  ClickHouse
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/cloud?loc=sitemap'}
                  className='text-primary-300 hover:underline'>
                  ClickHouse Cloud
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/cloud/clickpipes?loc=sitemap'}
                  className='text-primary-300 hover:underline'>
                  ClickPipes
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/chdb?loc=sitemap'}
                  className='text-primary-300 hover:underline'>
                  chDB
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/clickhouse/keeper?loc=sitemap'}
                  className='text-primary-300 hover:underline'>
                  ClickHouse Keeper
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/government?loc=sitemap'}
                  className='text-primary-300 hover:underline'>
                  ClickHouse Government
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/real-time-data-warehouse?loc=sitemap'}
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
                  href={'/blog'}
                  className='text-primary-300 hover:underline'>
                  Blog
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/company/our-story'}
                  className='text-primary-300 hover:underline'>
                  Our story
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/company/careers'}
                  className='text-primary-300 hover:underline'>
                  Careers
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/company/contact'}
                  className='text-primary-300 hover:underline'>
                  Contact us
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/company/events'}
                  className='text-primary-300 hover:underline'>
                  Events
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/company/news'}
                  className='text-primary-300 hover:underline'>
                  News
                </Link>
              </p>
            </div>
            <div>
              <h2
                id='use-cases'
                className='mb-4 font-basier text-2xl font-semibold text-neutral-100'>
                <Link
                  href={'/use-cases'}
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
                  href='/use-cases/observability'
                  className='text-primary-300 hover:underline'>
                  Observability
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href='/use-cases/machine-learning-and-data-science'
                  className='text-primary-300 hover:underline'>
                  Machine learning and GenAI
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href='/use-cases/data-warehousing'
                  className='text-primary-300 hover:underline'>
                  Data warehousing
                </Link>
              </p>
              <p className='pb-2'>
                <Link
                  href={'/user-stories'}
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
                  href={'/pricing'}
                  className='hover:text-primary-300 hover:underline'>
                  Pricing
                </Link>
              </h2>
              <p className='pb-2'>
                <Link
                  href={'/pricing'}
                  className='text-primary-300 hover:underline'>
                  Pricing
                </Link>
              </p>
            </div>
          </div>
          <HRSeparator className='my-20' />
          <div>
            <h2
              id='Resources'
              className='mb-6 font-basier text-2xl font-semibold text-neutral-100'>
              Resources
            </h2>
            <div className='mb-10 grid gap-10 gap-y-4 xl:grid-cols-4'>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/support/program'
                    className='font-semibold hover:underline'>
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://console.clickhouse.cloud/support'
                    className='font text-primary-300 hover:underline'>
                    Open support case
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/docs/knowledgebase'
                    className='font text-primary-300 hover:underline'>
                    Knowledge base
                  </Link>
                </li>
                <li>
                  <Link
                    href='/support/program'
                    className='font text-primary-300 hover:underline'>
                    Support program
                  </Link>
                </li>
              </ul>

              <ul className='space-y-2'>
                <li>
                  <Link
                    href='https://github.com/ClickHouse/ClickHouse'
                    className='font-semibold hover:underline'>
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href='/user-stories'
                    className='font text-primary-300 hover:underline'>
                    User stories
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/slack'
                    prefetch={false}
                    className='font text-primary-300 hover:underline'>
                    Join Slack
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.meetup.com/pro/clickhouse/'
                    className='font text-primary-300 hover:underline'>
                    Meetups
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://github.com/ClickHouse/ClickHouse'
                    className='font text-primary-300 hover:underline'>
                    GitHub
                  </Link>
                </li>
              </ul>

              <ul className='space-y-2'>
                <li>
                  <Link
                    href='https://clickhouse.com/docs'
                    className='font-semibold hover:underline'>
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/docs/en/install'
                    prefetch={false}
                    className='font text-primary-300 hover:underline'>
                    Install ClickHouse
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/docs/en/cloud-quick-start'
                    prefetch={false}
                    className='font text-primary-300 hover:underline'>
                    Cloud quick start
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/docs/en/integrations'
                    prefetch={false}
                    className='font text-primary-300 hover:underline'>
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://clickhouse.com/docs/category/changelog'
                    className='font text-primary-300 hover:underline'>
                    Changelog
                  </Link>
                </li>
              </ul>

              <ul className='space-y-2'>
                <li>
                  <Link href='/learn' className='font-semibold hover:underline'>
                    Learning
                  </Link>
                </li>
                <li>
                  <Link
                    href='/learn'
                    className='font text-primary-300 hover:underline'>
                    ClickHouse Academy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/company/events?category=Live+Training#upcoming-events'
                    className='font text-primary-300 hover:underline'>
                    Upcoming training
                  </Link>
                </li>
                <li>
                  <Link
                    href='/videos?category=how-to'
                    className='font text-primary-300 hover:underline'>
                    How to videos
                  </Link>
                </li>
                <li>
                  <Link
                    href='/company/events'
                    className='font text-primary-300 hover:underline'>
                    Events
                  </Link>
                </li>
              </ul>

              <ul className='space-y-2'>
                <li>
                  <Link href='/blog' className='font-semibold hover:underline'>
                    Blog
                  </Link>
                </li>
                {Object.entries(blogCategories).map(([slug, label]) => {
                  return (
                    <li key={slug}>
                      <Link
                        href={`/blog?category=${slug}`}
                        className='font text-primary-300 hover:underline'>
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <ul className='space-y-2'>
                <li className='font-semibold'>Comparisons</li>
                {comparisons.map((comparison, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`/comparison/${comparison.slug}`}
                        className='font text-primary-300 hover:underline'>
                        {comparison.Title}{' '}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <ul className='space-y-2'>
                <li className='font-semibold'>
                  <Link
                    href='/resources'
                    className='font-semibold hover:underline'>
                    Resources
                  </Link>
                </li>
                {resources.map((resource, resourceIndex) => {
                  return (
                    <li key={resourceIndex}>
                      <Link
                        href={`/resources/${resource.category.slug}/${resource.slug}`}
                        className='font text-primary-300 hover:underline'>
                        {resource.title}{' '}
                      </Link>
                      {resource.date && (
                        <p className='text-sm text-neutral-200'>
                          {[
                            resource.category.name,
                            resource?.date
                              ? `${resource.dateLabel ? `${resource.dateLabel}: ` : ''}${convertDateToString(resource.date)}`
                              : null
                          ]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>

              <ul className='space-y-2'>
                <li>
                  <Link href='/demos' className='font-semibold hover:underline'>
                    Demos
                  </Link>
                </li>
                {demos.map((demo, index) => {
                  return (
                    <li key={index}>
                      {demo.Link && (
                        <Link
                          href={
                            demo.External ? demo.Link : `/demos/${demo.Link}`
                          }
                          target={demo.LinkType}
                          className='font text-primary-300 hover:underline'>
                          {demo.Title}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
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
