import {
  SuiButton,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../../components/sui'

import { ArrowRightIcon, MapIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { findAll, findOne } from '../../../lib/api/strapi'
import { StrapiPicture } from '../../../components/StrapiElements'
import RecentEvents from '../../../components/RecentEvents'

const NewsItem = ({ source, date, title, abstract }) => {
  return (
    <div className='flex flex-col py-4'>
      <SuiTitle size='xs' color='dark'>
        <h4>
          {source} • {date}
        </h4>
      </SuiTitle>
      <SuiSpacer size='xs' />
      <SuiTitle>
        <h3>{title}</h3>
      </SuiTitle>
      <SuiSpacer size='sm' />
      <SuiText color='dark' padding_0>
        <p>{abstract}</p>
      </SuiText>
      <Link href='#'>
        <div className='flex items-center cursor-pointer'>
          <SuiText weight='medium' color='primary' className='hover:underline'>
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
            <SuiTitle size='4xl'>
              <h1>{title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
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
                    <SuiTitle size='xs' color='primary' dark_color='primary'>
                      <h4>
                        {featuredEvent.category} • {featuredEvent.location.city}
                      </h4>
                    </SuiTitle>
                    <SuiSpacer size='sm' />

                    <SuiTitle>
                      <h3>{featuredEvent.title}</h3>
                    </SuiTitle>

                    <SuiText color='dark'>
                      <p>{featuredEvent.shortDescription}</p>
                    </SuiText>
                    <div className='flex'>
                      <SuiButton
                        iconRight
                        path={`/company/events/${featuredEvent.slug}`}
                        target='self'
                        color='empty'
                        textColor='darkest'
                        title={featuredEvent.viewMoreDetailsText}
                        size='md'
                        className='px-0'
                      />
                    </div>
                  </div>
                  <div className='flex md:w-1/2 pt-8 md:pt-0 justify-center items-center md:px-20'>
                    <StrapiPicture
                      light={featuredEvent.lightFeatureImagePng.data}
                      dark={featuredEvent.darkFeatureImagePng.data}
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
              <SuiTitle size='lg'>
                <h4>{latestNewsTitle}</h4>
              </SuiTitle>
              <SuiSpacer />

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
              <SuiTitle size='lg'>
                <h4>{upcomingEventsTitle}</h4>
              </SuiTitle>
              <SuiSpacer />
              {allEvents.map((upcomingEvent) => (
                <div className='flex space-x-4 pt-4' key={upcomingEvent.title}>
                  <div className='flex w-44 items-top justify-start'>
                    <div>
                      <StrapiPicture
                        dark={upcomingEvent.darkFeatureImagePng.data}
                        light={upcomingEvent.lightFeatureImagePng.data}
                        alt='Meetup'
                        width='128'
                        height='128'
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <SuiTitle>
                      <h3>{upcomingEvent.title}</h3>
                    </SuiTitle>
                    <SuiSpacer size='sm' />
                    <SuiText color='dark' padding_0>
                      {upcomingEvent.shortDescription}
                    </SuiText>
                    <div className='flex items-center space-x-2'>
                      <MapIcon className='h-16 w-16' />
                      <div>
                        <SuiText color='dark'>
                          <p>
                            {[
                              upcomingEvent.location.city,
                              upcomingEvent.location.country
                            ].join(', ')}{' '}
                            {upcomingEvent.localDatetime &&
                              ` • ${new Date(
                                upcomingEvent.localDatetime
                              ).toDateString()}`}
                          </p>
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
          <SuiTitle size='lg'>
            <h4>{pressReleasesTitle}</h4>
          </SuiTitle>
          <SuiSpacer />
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
