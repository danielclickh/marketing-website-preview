import {
  SuiButton,
  SuiLink,
  SuiPanel,
  SuiText,
  SuiTitle
} from '../../../components/sui'

import { LocationMarkerIcon } from '@heroicons/react/solid'
import { findAll, findOne } from '../../../lib/api/strapi'
import { StrapiPicture } from '../../../components/StrapiElements'
import RecentEvents from '../../../components/RecentEvents'
import { EventType } from '../events/[slug]/types'
import { NewsAndEventsData } from './types'
import NewsItem from './NewsItem'

export default async function News() {
  const newsEvents: Promise<NewsAndEventsData> = findOne('news-and-event', {
    populate: [
      'hero',
      'newsItems',
      'newsItems.ctaButton',
      'pressReleases',
      'pressReleases.ctaButton'
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
      pressReleases
    },
    { data: allEvents }
  ] = await Promise.all([newsEvents, events])
  let featuredEvent: EventType | undefined
  let featuredEventIndex = allEvents.findIndex((e) => e.featured)
  if (featuredEventIndex !== undefined) {
    featuredEvent = allEvents.splice(featuredEventIndex, 1)?.[0]
  } else {
    featuredEvent = allEvents.shift()
  }

  return (
    <>
      <div className='bg-c1 bg-cover pt-14'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto'>
            <SuiTitle type='h1' className='mb-5'>
              {title}
            </SuiTitle>
            <SuiText
              size='lg'
              color='secondary'
              weight='medium'
              className='max-w-2xl'>
              {description}
            </SuiText>
          </div>

          {featuredEvent && (
            <div className='flex max-w-7xl mx-auto'>
              <SuiPanel
                color='bg-c2 text-c5'
                shadow
                padding='lg'
                className='my-16'>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex flex-col md:w-1/2'>
                    <SuiTitle type='h5' color='c6' className='mb-4'>
                      {featuredEvent.category} • {featuredEvent.location.city}
                    </SuiTitle>

                    <SuiTitle
                      type='h3'
                      weight='bold'
                      className='mb-4 !text-3xl'>
                      {featuredEvent.title}
                    </SuiTitle>

                    <SuiText
                      size='base'
                      weight='medium'
                      color='secondary'
                      className='mb-4'>
                      {featuredEvent.shortDescription}
                    </SuiText>
                    <div className='flex'>
                      <SuiButton
                        type='empty'
                        weight='medium'
                        size='lg'
                        iconRight
                        path={`/company/events/${featuredEvent.slug}`}
                        target='_self'
                        color='primary'
                        className='px-0'>
                        {featuredEvent.viewMoreDetailsText}
                      </SuiButton>
                    </div>
                  </div>
                  <div className='flex md:w-1/2 pt-8 md:pt-0 justify-center items-center md:px-20'>
                    <StrapiPicture
                      light={featuredEvent.lightFeatureImagePng}
                      dark={featuredEvent.darkFeatureImagePng}
                    />
                  </div>
                </div>
              </SuiPanel>
            </div>
          )}
        </div>
      </div>
      <div className='flex w-full bg-c1 pb-8'>
        {/* @ts-expect-error Server Component */}
        <RecentEvents />
      </div>

      <div className='flex w-full bg-c2 text-c5 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row justify-between pb-4 space-x-24'>
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle type='h3' weight='bold' className='mb-6 !text-3xl'>
                {latestNewsTitle}
              </SuiTitle>

              <div className='space-y-8'>
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
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle type='h3' weight='bold' className='mb-6 ml-4 !text-3xl'>
                {upcomingEventsTitle}
              </SuiTitle>
              <div className='space-y-8'>
                {allEvents.map((upcomingEvent) => (
                  <SuiLink
                    href={`/company/events/${upcomingEvent.slug}`}
                    target='_self'
                    className={`grid grid-cols-[4rem_1fr] gap-x-6 p-4 hover:bg-c1 rounded-lg hover:no-underline event-${upcomingEvent.title.replace(
                      ' ',
                      '-'
                    )}`}
                    key={upcomingEvent.title}>
                    <div className='flex items-top justify-start'>
                      <div className='w-16 h-16 bg-c1-light rounded-lg flex items-center p-1 shadow-card'>
                        <StrapiPicture
                          dark={upcomingEvent.darkFeatureImagePng}
                          light={upcomingEvent.lightFeatureImagePng}
                          alt={`Meetup ${upcomingEvent.title}`}
                          className='cursor-pointer w-full h-auto'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <SuiText
                        size='lg'
                        weight='bold'
                        className='mb-2 !text-xl'>
                        {upcomingEvent.title}
                      </SuiText>
                      <SuiText
                        size='sm'
                        weight='medium'
                        color='secondary'
                        className='mb-3'>
                        {upcomingEvent.shortDescription}
                      </SuiText>
                      <div className='flex items-center space-x-2'>
                        <LocationMarkerIcon className='h-3 w-3 text-c4' />
                        <SuiText size='sm' weight='medium' color='secondary'>
                          {[
                            upcomingEvent.location.city,
                            upcomingEvent.location.country
                          ].join(', ')}{' '}
                          {upcomingEvent.localDatetime &&
                            ` • ${new Date(
                              upcomingEvent.localDatetime
                            ).toDateString()}`}
                        </SuiText>
                      </div>
                    </div>
                  </SuiLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-c1 pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <SuiTitle type='h2' className='mb-8 !text-3xl'>
            {pressReleasesTitle}
          </SuiTitle>
          <div className='grid grid-cols-1 md:grid-cols-2 justify-between pb-4 gap-y-6 md:gap-x-8'>
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
      </div>
    </>
  )
}
