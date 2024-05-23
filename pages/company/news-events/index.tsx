import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SuiTitle } from '../../../components/sui'
import { findAll, findOne } from '../../../lib/api/strapi'
import RecentEvents from '../../../components/RecentEvents'
import { EventType } from '../../../types/events'
import { NewsAndEventsData, NewsEventProps } from '../../../types/newsEvents'
import NewsItem from '../../../components/NewsItem'
import Layout from '../../../components/Layout'
import { GetStaticProps } from 'next'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { convertDateToString } from '../../../lib/utils/dateUtils'
import { CUILink } from '../../../components/ClickUI'
import { StrapiImage } from '../../../components/StrapiElements'
import { CalendarIcon } from '@heroicons/react/outline'
import EventPost from '../../../components/EventPostList/EventPost'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import CategorySelector from '../../../components/CategorySelector'

export const getStaticProps: GetStaticProps<NewsEventProps> =
  async function getStaticProps() {
    const newsEvents: Promise<NewsAndEventsData> = findOne('news-and-event', {
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

    const events: Promise<{ data: EventType[] }> = findAll('events', {
      filters: {
        localDatetime: {
          $gte: new Date().toISOString()
        }
      },
      sort: ['localDatetime:ASC'],
      populate: [
        'thumbnailPng',
        'hostedBy',
        'hostedBy.hosts',
        'hostedBy.hosts.avatarPng',
        'agenda',
        'agenda.items',
        'location',
        'darkFeatureImagePng',
        'lightFeatureImagePng',
        'form'
      ]
    })

    const [
      {
        hero: { title, description },
        newsItems,
        latestNewsTitle,
        upcomingEventsTitle,
        pressReleasesTitle,
        pressReleases,
        seo
      },
      { data: allEvents }
    ] = await Promise.all([newsEvents, events])

    seo.path = '/company/news-events'

    let featuredEvent: EventType | undefined
    let featuredEventIndex = allEvents.findIndex((e) => e.featured)
    if (featuredEventIndex !== undefined) {
      featuredEvent = allEvents.splice(featuredEventIndex, 1)?.[0]
    } else {
      featuredEvent = allEvents.shift()
    }

    const filters: Record<string, any> = {
      localDatetime: {
        $lt: new Date().toISOString()
      }
    }
    const { data: recentEvents }: { data: EventType[] } = await findAll(
      'events',
      {
        filters: filters,
        sort: ['localDatetime:DESC'],
        populate: [
          'thumbnailPng',
          'hostedBy',
          'hostedBy.hosts',
          'hostedBy.hosts.avatarPng',
          'agenda',
          'agenda.items',
          'location',
          'darkFeatureImagePng',
          'lightFeatureImagePng',
          'form'
        ],
        pagination: { limit: 3 }
      }
    )

    const commonProps = await getCommonProps()
    return {
      props: {
        title,
        description,
        featuredEvent,
        newsItems,
        latestNewsTitle,
        upcomingEventsTitle,
        pressReleasesTitle,
        pressReleases,
        allEvents,
        recentEvents,
        seo,
        ...commonProps
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function News({
  title,
  description,
  featuredEvent,
  newsItems,
  latestNewsTitle,
  upcomingEventsTitle,
  pressReleasesTitle,
  pressReleases,
  allEvents,
  footerData,
  headerData,
  recentEvents,
  seo
}: NewsEventProps) {
  galaxyOnPage('newsEventsPage')

  const router = useRouter()
  const { category } = router.query
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category ? category.toString() : null
  )

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toString())
    }
  }, [category])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)

    router.push(
      {
        query: { ...router.query, category }
      },
      undefined,
      { shallow: true }
    )
  }

  const filteredEvents = selectedCategory
    ? allEvents.filter((event) => event.category === selectedCategory)
    : allEvents

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div>
        <h1 className='mx-auto mb-10 pt-10 text-center font-basier text-4xl text-neutral-100 md:text-5.5xl lg:mb-16 lg:pt-20'>
          {title}
        </h1>
        <div className='mx-auto flex flex-col px-4 sm:px-8 2xl:px-0'>
          {featuredEvent && (
            <div>
              <CUILink
                href={`/company/events/${featuredEvent.slug}`}
                className='section-container group mt-2 mb-16 flex flex-col gap-10 hover:no-underline md:flex-row'>
                <div className='flex flex-col gap-8 rounded-xl lg:flex-row-reverse lg:gap-12 xl:gap-24'>
                  {featuredEvent.thumbnailPng && (
                    <StrapiImage
                      {...featuredEvent.thumbnailPng}
                      className='h-fit w-full rounded-lg object-cover lg:w-1/2'
                    />
                  )}
                  <div className='grid w-full border-l-8 border-primary-300 pl-6'>
                    <div className='flex flex-col justify-between'>
                      <div>
                        <SuiTitle type='h2' className='text-neutral-100'>
                          {featuredEvent.title}
                        </SuiTitle>
                        <div className='mt-8 mb-8 font-normal text-neutral-200'>
                          {featuredEvent.shortDescription}
                        </div>

                        {featuredEvent.category !== 'On-Demand Webinar' ? (
                          <div className='mb-4 flex items-center space-x-3'>
                            <CalendarIcon className='h-6 w-6 stroke-1 text-neutral-200' />
                            <div className=' text-neutral-200'>
                              {featuredEvent.localDatetime && (
                                <div className='text-sm text-neutral-300'>
                                  {convertDateToString(
                                    featuredEvent.localDatetime
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className='flex h-10'></div>
                        )}
                        <div className='flex items-center space-x-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='h-6 w-6 text-neutral-200'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                            />
                          </svg>
                          <div className=' text-neutral-200'>
                            {featuredEvent.location && (
                              <div className='text-sm text-neutral-300'>
                                <span>
                                  {featuredEvent.location.city} (
                                  {featuredEvent.location.country})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='mt-8'>
                        <div className='mt-4 inline-block rounded bg-primary-300 py-2 px-6 font-semibold transition hover:bg-primary-400 group-hover:bg-primary-400 md:mt-0'>
                          <span className='flex items-center justify-center gap-2 text-base text-black'>
                            Register
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CUILink>
            </div>
          )}
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-8 2xl:px-0'>
        <h2 className='mb-10 font-basier text-4xl font-semibold text-neutral-100'>
          {upcomingEventsTitle}
        </h2>

        <div>
          <div className='mb-6'>
            <CategorySelector
              options={[
                {
                  text: 'Event',
                  selected: selectedCategory === 'Event',
                  onClick: () => handleCategoryClick('Event')
                },
                {
                  text: 'Free Training',
                  selected: selectedCategory === 'Free Training',
                  onClick: () => handleCategoryClick('Free Training')
                },
                {
                  text: 'Meetup',
                  selected: selectedCategory === 'Meetup',
                  onClick: () => handleCategoryClick('Meetup')
                },
                {
                  text: 'Webinar',
                  selected: selectedCategory === 'Webinar',
                  onClick: () => handleCategoryClick('Webinar')
                },
                {
                  text: 'On-Demand Webinar',
                  selected: selectedCategory === 'On-Demand Webinar',
                  onClick: () => handleCategoryClick('On-Demand Webinar')
                }
              ]}
            />
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {filteredEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>

      <div className='bg-shadow-element pb-8'>
        <RecentEvents events={recentEvents} />
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-8 2xl:px-0'>
        <h2 className='mb-6 font-basier text-4xl font-semibold text-neutral-100'>
          {latestNewsTitle}
        </h2>
        <div className='grid gap-12 md:grid-cols-2 '>
          {newsItems.map((newsItem) => (
            <NewsItem
              key={newsItem.headline}
              source={newsItem.publication}
              date={newsItem.date}
              title={newsItem.headline}
              abstract={newsItem.shortIntro}
              ctaButton={newsItem.ctaButton}
            />
          ))}
        </div>
      </div>
      <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'>
        <h2 className='mb-6 font-basier text-4xl font-semibold text-neutral-100'>
          {pressReleasesTitle}
        </h2>
        <div className='grid gap-12 md:grid-cols-2'>
          {pressReleases.map((pressRelease) => (
            <NewsItem
              key={pressRelease.headline}
              source={pressRelease.publication}
              date={pressRelease.date}
              title={pressRelease.headline}
              abstract={pressRelease.shortIntro}
              ctaButton={pressRelease.ctaButton}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
