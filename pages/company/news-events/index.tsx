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
import { CUIButton, CUILink } from '../../../components/ClickUI'
import { StrapiImage } from '../../../components/StrapiElements'
import { CalendarIcon } from '@heroicons/react/outline'
import EventPost from '../../../components/EventPostList/EventPost'

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
  recentEvents,
  seo
}: NewsEventProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div>
        <h1 className='pt-10 lg:pt-20 mb-10 lg:mb-16 mx-auto text-center font-basier text-4xl md:text-5.5xl text-neutral-100'>
          {title}
        </h1>
        <div className='flex mx-auto flex-col px-4 sm:px-8 2xl:px-0'>
          {featuredEvent && (
            <div>
              <CUILink
                href={`/company/events/${featuredEvent.slug}`}
                className='mt-2 flex flex-col md:flex-row mb-16 gap-10 section-container hover:no-underline'>
                <div className='flex flex-col lg:flex-row-reverse rounded-xl gap-8 lg:gap-12 xl:gap-24'>
                  {featuredEvent.thumbnailPng && (
                    <StrapiImage
                      {...featuredEvent.thumbnailPng}
                      className='w-full lg:w-1/2 rounded-lg object-cover h-fit'
                    />
                  )}
                  <div className='grid w-full border-l-8 border-primary-300 pl-6'>
                    <div className='flex flex-col justify-between'>
                      <div>
                        <SuiTitle type='h2' className='text-neutral-100'>
                          {featuredEvent.title}
                        </SuiTitle>
                        <div className='mt-8 text-neutral-200 font-normal mb-8'>
                          {featuredEvent.shortDescription}
                        </div>
                        <div className='flex items-center space-x-3 mb-4'>
                          <CalendarIcon className='w-6 h-6 text-neutral-200 stroke-1' />
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
                        <div className='flex items-center space-x-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            className='w-6 h-6 text-neutral-200'>
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
                        <div className='mt-4 md:mt-0 rounded py-2 px-6 font-semibold inline-block bg-primary-300 hover:bg-primary-400 transition'>
                          <span className='flex justify-center items-center gap-2 text-black text-base'>
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

      <div className='max-w-7xl mx-auto px-4 sm:px-8 2xl:px-0'>
        <h2 className='text-4xl font-semibold font-basier text-neutral-100 mb-10'>
          {upcomingEventsTitle}
        </h2>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
            {allEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>

      <div className='pb-8 bg-shadow-element'>
        <RecentEvents events={recentEvents} />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-8 2xl:px-0'>
        <h2 className='text-4xl font-semibold font-basier mb-6 text-neutral-100'>
          {latestNewsTitle}
        </h2>
        <div className='grid md:grid-cols-2 gap-12 '>
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
      <div className='max-w-7xl mx-auto my-24 px-4 sm:px-8 2xl:px-0'>
        <h2 className='text-4xl font-semibold font-basier mb-6 text-neutral-100'>
          {pressReleasesTitle}
        </h2>
        <div className='grid md:grid-cols-2 gap-12'>
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
