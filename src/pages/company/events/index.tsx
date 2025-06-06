import CategorySelector from '@/components/CategorySelector'
import { CUILink } from '@/components/ClickUI'
import EventPost from '@/components/EventPostList/EventPost'
import Layout from '@/components/Layout'
import RecentEvents from '@/components/RecentEvents'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { SuiTitle } from '@/components/sui'
import {
  findAll,
  findOne,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventType } from '@/types/events'
import { NewsAndEventsData, EventsPageProps } from '@/types/newsEvents'
import { CalendarIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

const CATEGORIES: Array<{
  label: string
  value: null | string
  aliases: Array<string>
}> = [
  {
    label: 'View all',
    value: null,
    aliases: []
  },
  {
    label: 'Event',
    value: 'Event',
    aliases: []
  },
  {
    label: 'Live Training',
    value: 'Live Training',
    aliases: ['Free Training', 'Paid Training']
  },
  {
    label: 'Meetup',
    value: 'Meetup',
    aliases: []
  },
  {
    label: 'Webinar',
    value: 'Webinar',
    aliases: []
  },
  {
    label: 'On-Demand Webinar',
    value: 'On-Demand Webinar',
    aliases: []
  }
]

export const getStaticProps: GetStaticProps<EventsPageProps> =
  async function getStaticProps() {
    const newsEvents: Promise<NewsAndEventsData> = findOne('news-and-event', {
      populate: ['seo', 'seo.image']
    })

    const events: Promise<{ data: EventType[] }> = findAll('events', {
      filters: {
        $and: [
          {
            localDatetime: {
              $gte: new Date().toISOString()
            }
          },
          {
            $or: getStagingOnlyFilters()
          },
          {
            $or: getUnlistedFilters()
          }
        ]
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
        'form'
      ]
    })

    const [{ seo }, { data: allEvents }] = await Promise.all([
      newsEvents,
      events
    ])

    seo.title = 'Events - ClickHouse'
    seo.path = '/company/events'

    let featuredEvent: EventType | undefined
    let featuredEventIndex = allEvents.findIndex((e) => e.featured)
    if (featuredEventIndex !== undefined) {
      featuredEvent = allEvents.splice(featuredEventIndex, 1)?.[0]
    } else {
      featuredEvent = allEvents.shift()
    }

    const filters: Record<string, any> = {
      $and: [
        {
          localDatetime: {
            $lt: new Date().toISOString()
          }
        },
        {
          $or: getStagingOnlyFilters()
        },
        {
          $or: getUnlistedFilters()
        }
      ]
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
          'form'
        ],
        pagination: { limit: 3 }
      }
    )

    const commonProps = await getCommonProps()
    return {
      props: {
        featuredEvent: featuredEvent || null,
        allEvents,
        recentEvents,
        seo,
        ...commonProps
      }
    }
  }

export default function News({
  featuredEvent,
  allEvents,
  footerData,
  headerData,
  recentEvents,
  seo
}: EventsPageProps) {
  useGalaxyOnPage('eventsPage')

  const router = useRouter()
  const { category } = router.query
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category ? category.toString() : null
  )
  const selectedCategoryObject = useMemo(() => {
    return CATEGORIES.find((category) => category.value === selectedCategory)
  }, [selectedCategory, CATEGORIES])

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toString())
    }
  }, [category])

  const handleCategoryClick = (category: null | string) => {
    if (!category) {
      setSelectedCategory(null)
      router.push(
        {
          query: null
        },
        undefined,
        { shallow: true }
      )
    } else {
      setSelectedCategory(category)
      router.push(
        {
          query: { ...router.query, category }
        },
        undefined,
        { shallow: true }
      )
    }
  }

  const filteredEvents = useMemo(() => {
    return selectedCategoryObject
      ? allEvents.filter((event) => {
          return [
            selectedCategoryObject.value,
            ...selectedCategoryObject.aliases
          ].includes(event.category)
        })
      : allEvents
  }, [allEvents, selectedCategoryObject])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div>
        <h1 className='mx-auto mb-10 pt-10 text-center font-basier text-4xl text-neutral-100 md:text-5.5xl lg:mb-16 lg:pt-20'>
          Events
        </h1>
        {featuredEvent && (
          <div className='section-container'>
            <CUILink
              href={`/company/events/${featuredEvent.slug}`}
              className='group/featuredEvent mb-16 mt-2 flex w-full flex-col gap-y-8 rounded-xl hover:no-underline hover:shadow-card lg:flex-row-reverse lg:gap-x-12 xl:gap-x-24'>
              {featuredEvent.thumbnailPng && (
                <div className='lg:w-1/2'>
                  <StrapiImageUrl
                    {...featuredEvent.thumbnailPng}
                    loading='eager'
                    width={640}
                    height={640}
                    className='h-auto w-full overflow-hidden rounded-lg'
                  />
                </div>
              )}
              <div className='flex w-full flex-col justify-start border-l-8 border-primary-300 pl-6 lg:w-1/2 lg:flex-1'>
                <SuiTitle type='h2' className='text-neutral-100'>
                  {featuredEvent.title}
                </SuiTitle>
                <div className='mb-8 mt-8 font-normal text-neutral-200'>
                  {featuredEvent.shortDescription}
                </div>

                {featuredEvent.category !== 'On-Demand Webinar' ? (
                  <div className='mb-4 flex items-center space-x-3'>
                    <CalendarIcon className='h-6 w-6 stroke-1 text-neutral-200' />
                    <div className='text-neutral-200'>
                      {featuredEvent.localDatetime && (
                        <div className='text-sm text-neutral-300'>
                          {convertDateToString(featuredEvent.localDatetime)}
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
                  <div className='text-neutral-200'>
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

                <div className='mt-8'>
                  <div className='mt-8 inline-block rounded bg-primary-300 px-6 py-2 font-semibold text-black transition group-hover/featuredEvent:bg-primary-400 md:mt-0'>
                    Register
                  </div>
                </div>
              </div>
            </CUILink>
          </div>
        )}
      </div>

      <div
        className='mx-auto max-w-7xl px-4 sm:px-8 2xl:px-0'
        id='upcoming-events'>
        <div className='flex flex-col justify-between md:flex-row'>
          <h2 className='mb-10 font-basier text-4xl font-semibold text-neutral-100'>
            Upcoming
          </h2>
          <CategorySelector
            className='mb-6 lg:mb-0'
            options={CATEGORIES.map((category) => {
              return {
                text: category.label,
                selected: [category.value, ...category.aliases].includes(
                  selectedCategory
                ),
                onClick: () => handleCategoryClick(category.value)
              }
            })}
          />
        </div>

        <div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {filteredEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
            {!filteredEvents.length && (
              <p className='col-span-full mt-12 w-full text-center'>
                No results
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='bg-shadow-element pb-8'>
        <RecentEvents events={recentEvents} />
      </div>
    </Layout>
  )
}
