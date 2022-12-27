import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../../components/sui'

import { ArrowRightIcon, MapIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { findAll, findOne } from '../../../lib/api/strapi'
import { StrapiPicture } from '../../../components/StrapiElements'
import RecentEvents from '../../../components/RecentEvents'

const NewsItem = ({ source, date, title, abstract }) => {
  return (
    <div className='flex flex-col py-4'>
      <SuiTitle type='h6' color='secondary' className='mb-1'>
        {source} • {date}
      </SuiTitle>
      <SuiTitle type='h4' className='mb-2'>
        {title}
      </SuiTitle>
      <SuiText size='sm' weight='medium' color='secondary'>
        {abstract}
      </SuiText>
      <Link href='#'>
        <div className='flex items-center cursor-pointer'>
          <SuiText size='sm' weight='medium' color='c6'>
            Read more
          </SuiText>
          <ArrowRightIcon className='ml-2 w-4 text-primary' />
        </div>
      </Link>
    </div>
  )
}

export default async function News() {
  const newsEvents = findOne('news-and-event', {
    populate: [
      'hero',
      'newsItems',
      'newsItems.ctaButton',
      'pressReleases',
      'pressReleases.ctaButton'
    ]
  })

  const events = findAll('events', {
    filters: {
      localDatetime: {
        $gte: new Date().toISOString()
      }
    },
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
  let featuredEvent: Event | undefined
  let featuredEventIndex = allEvents.findIndex((e) => e.featured)
  if (featuredEventIndex !== undefined) {
    featuredEvent = allEvents.splice(featuredEventIndex, 1)?.[0]
  } else {
    featuredEvent = allEvents.shift()
  }

  return (
    <>
      <div className='bg-white dark:bg-gunmetal bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle type='h1' className='mb-2'>
              {title}
            </SuiTitle>
            <div className='max-w-2xl'>
              <SuiText size='lg' color='secondary' weight='medium'>
                {description}
              </SuiText>
            </div>
          </div>

          {featuredEvent && (
            <div className='flex max-w-5xl mx-auto'>
              <SuiPanel
                color='container-light-color'
                shadow
                padding='lg'
                className='my-8'>
                <div className='flex flex-col md:flex-row'>
                  <div className='flex flex-col md:w-1/2'>
                    <SuiTitle type='h6' color='c6' className='mb-2'>
                      {featuredEvent.category} • {featuredEvent.location.city}
                    </SuiTitle>

                    <SuiTitle type='h4'>{featuredEvent.title}</SuiTitle>

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
                        iconRight
                        path={`/company/events/${featuredEvent.slug}`}
                        target='self'
                        color='primary'
                        title={featuredEvent.viewMoreDetailsText}
                        className='px-0'
                      />
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
      <div className='flex w-full bg-white dark:bg-gunmetal pb-8'>
        <RecentEvents />
      </div>

      <div className='flex w-full container-light-color pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row justify-between pb-4 space-x-24'>
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle type='h3' className='mb-4'>
                {latestNewsTitle}
              </SuiTitle>

              {newsItems.map((newsItem) => (
                <NewsItem
                  key={newsItem.headline}
                  source={newsItem.publication}
                  date={newsItem.date}
                  title={newsItem.headline}
                  abstract={newsItem.shortIntro}
                />
              ))}
            </div>
            <div className='flex flex-col md:w-1/2'>
              <SuiTitle type='h3' className='mb-4'>
                {upcomingEventsTitle}
              </SuiTitle>
              {allEvents.map((upcomingEvent) => (
                <div className='flex space-x-4 pt-4' key={upcomingEvent.title}>
                  <div className='flex w-44 items-top justify-start'>
                    <div>
                      <StrapiPicture
                        dark={upcomingEvent.darkFeatureImagePng}
                        light={upcomingEvent.lightFeatureImagePng}
                        alt='Meetup'
                        width='128'
                        height='128'
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <SuiTitle type='h4' className='mb-2'>
                      {upcomingEvent.title}
                    </SuiTitle>
                    <SuiText size='sm' weight='medium' color='secondary'>
                      {upcomingEvent.shortDescription}
                    </SuiText>
                    <div className='flex items-center space-x-2'>
                      <MapIcon className='h-16 w-16' />
                      <div>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-white dark:bg-gunmetal pb-8'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
          <SuiTitle type='h3' className='mb-4'>
            {pressReleasesTitle}
          </SuiTitle>
          <div className='grid grid-cols-1 md:grid-cols-2 justify-between pb-4 md:gap-x-24'>
            {pressReleases.map((pressRelease) => (
              <NewsItem
                key={pressRelease.headline}
                source={pressRelease.publication}
                date={pressRelease.date}
                title={pressRelease.headline}
                abstract={pressRelease.shortIntro}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
