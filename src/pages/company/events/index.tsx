import PillFilters from '@/components-cleaned/PillFilters'
import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUILink } from '@/components/ClickUI'
import EventPost from '@/components/EventPostList/EventPost'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import { eventsService, getUnlistedFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateEventsArchiveSchema } from '@/lib/schema'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryEvent } from '@/types/strapi'
import { CalendarIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

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

interface PageProps extends CommonProps {
  featuredEvent: EntryEvent | null
  events: Array<EntryEvent>
  recentEvents: Array<EntryEvent>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const eventsRequest = eventsService.findAll({
      filters: {
        $and: [
          {
            localDatetime: {
              $gte: new Date().toISOString()
            }
          },
          {
            $or: getUnlistedFilters()
          }
        ]
      },
      sort: ['localDatetime:ASC']
    })

    const [commonProps, events] = await Promise.all([
      getCommonProps(),
      eventsRequest
    ])

    let featuredEvent: EntryEvent | undefined
    let featuredEventIndex = events.findIndex((e) => e.featured)
    if (featuredEventIndex !== -1) {
      featuredEvent = events.splice(featuredEventIndex, 1)?.[0]
    } else {
      featuredEvent = events.shift()
    }

    const recentEvents = await eventsService.findMany({
      filters: {
        $and: [
          {
            localDatetime: {
              $lt: new Date().toISOString()
            }
          },
          {
            $or: getUnlistedFilters()
          }
        ]
      },
      sort: ['localDatetime:DESC'],
      pagination: { limit: 4 }
    })

    return {
      props: {
        ...commonProps,
        featuredEvent: featuredEvent || null,
        events,
        recentEvents,
        seo: {
          title: 'Events - ClickHouse',
          description:
            'Get all of the latest ClickHouse events, trainings, and webinars.',
          path: '/company/events',
          schema: generateEventsArchiveSchema({ path: '/company/events' })
        }
      }
    }
  }

export default function News({
  featuredEvent,
  events,
  footerData,
  headerData,
  recentEvents,
  seo
}: PageProps) {
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
    return selectedCategoryObject?.value
      ? events.filter((event) => {
          return [
            selectedCategoryObject.value,
            ...selectedCategoryObject.aliases
          ].includes(event.category)
        })
      : events
  }, [events, selectedCategoryObject])

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
              className='group/featuredEvent mb-16 mt-2 flex w-full flex-col gap-y-8 rounded-xl lg:flex-row-reverse lg:gap-x-12 xl:gap-x-24'>
              {featuredEvent.thumbnailPng && (
                <div className='lg:w-1/2'>
                  <StrapiImage
                    entry={featuredEvent.thumbnailPng}
                    alt={featuredEvent.title}
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
        className='mx-auto my-20 max-w-7xl px-4 sm:px-8 2xl:px-0'
        id='upcoming-events'>
        <div className='flex flex-col justify-between md:flex-row'>
          <h2 className='mb-10 font-basier text-4xl font-semibold text-neutral-100'>
            Upcoming
          </h2>
          <PillFilters
            className='mb-6 lg:mb-0'
            options={CATEGORIES.map((category) => {
              return {
                kind: 'button',
                label: category.label,
                active: [category.value, ...category.aliases].includes(
                  selectedCategory
                ),
                onClick(event) {
                  event.preventDefault()
                  handleCategoryClick(category.value)
                }
              }
            })}
          />
        </div>

        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredEvents.map((event) => (
            <EventPost key={event.id} {...event} />
          ))}
          {!filteredEvents.length && (
            <p className='col-span-full mt-12 w-full text-center'>No results</p>
          )}
        </div>
      </div>

      {/* Recent posts */}
      {recentEvents.length > 0 && (
        <section className='section-container my-20 flex flex-col'>
          <div className='flex justify-between pb-8'>
            <SuiTitle
              type='h2'
              className='!text-3xl text-neutral-100'
              weight='semibold'>
              Recent events
            </SuiTitle>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((recentEvent, recentEventIndex) => {
              return (
                <div
                  key={recentEventIndex}
                  className={
                    recentEventIndex > 2 ? 'hidden md:block lg:hidden' : ''
                  }>
                  <EventPost {...recentEvent} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </Layout>
  )
}
