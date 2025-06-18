import iconContributors from './assets/icon-contributors.svg'
import iconDataWarehousing from './assets/icon-data-warehousing.svg'
import iconDevelopers from './assets/icon-developers.svg'
import iconLiveTraining from './assets/icon-live-training.svg'
import iconMlGenAi from './assets/icon-ml-genai.svg'
import iconObservability from './assets/icon-observability.svg'
import iconOnDemand from './assets/icon-on-demand.svg'
import iconPrs from './assets/icon-prs.svg'
import iconRealTimeAnalytics from './assets/icon-real-time-analytics.svg'
import iconStars from './assets/icon-stars.svg'
import LearningPathCard from '@/components-cleaned/LearningPathCard'
import YouTubeVideo from '@/components-cleaned/YouTubeVideo'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiSearchField, SuiText, SuiTitle } from '@/components/sui'
import { useDebounce } from '@/hooks'
import {
  findAll,
  findOne,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import formatStat from '@/lib/utils/numbers'
import { EventType } from '@/types/events'
import { LearnProps } from '@/types/learn'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useMemo, useState } from 'react'

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const data = await findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    const { data: events }: { data: EventType[] } = await findAll('events', {
      filters: {
        $and: [
          {
            localDatetime: {
              $gte: new Date().toISOString()
            },
            category: {
              $in: ['Live Training', 'Free Training', 'Paid Training']
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
      populate: ['location']
    })

    return {
      props: {
        seo: {
          title:
            'ClickHouse Training | How to Use ClickHouse | Database Tutorial',
          description:
            'Master the art of data analysis with ClickHouse. Our seamless, easy to use database management platform can help you to unlock powerful insights. Try for free.',
          path: '/learn',
          imageUrl: 'https://clickhouse.com/images/clickhouse-learning-og.png'
        },
        events,
        ...data,
        ...commonProps
      }
    }
  }

export default function LearnPage({
  footerData,
  headerData,
  customerStories,
  events,
  seo
}: LearnProps) {
  useGalaxyOnPage('learnPage')

  const [eventsSearch, setEventsSearch] = useState('')

  const filteredEvents = useMemo(() => {
    const searchTerm = eventsSearch.trim().toLowerCase()

    if (!searchTerm.length) {
      return events
    }

    const includesSearch = (value: string) => {
      return searchTerm.split(/\s+/).filter((part) => {
        return value.toLowerCase().includes(part)
      }).length
    }

    const weightedEvents: Array<{
      event: EventType
      weight: number
    }> = []

    events.forEach((event) => {
      let weight = 0
      if (includesSearch(event.title)) {
        weight++
      }
      if (event.shortDescription) {
        weight += includesSearch(event.shortDescription)
      }
      if (event.richDescription) {
        weight += includesSearch(event.richDescription)
      }
      if (event.location.city) {
        weight += includesSearch(event.location.city)
      }
      if (event.location.country) {
        weight += includesSearch(event.location.country)
      }

      if (weight > 0) {
        weightedEvents.push({
          event,
          weight
        })
      }
    })

    // weightedEvents.sort((a, b) => {
    //   return a.weight - b.weight
    // })

    return weightedEvents.map(({ event }) => event)
  }, [events, eventsSearch])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-24'>
        <div className='section-container flex items-center gap-16'>
          <div className='space-y-4'>
            <SuiTitle type='h1'>ClickHouse training</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Master ClickHouse with expert-led training designed for every
              skill level and delivered through self-paced paths, live sessions,
              or certification.
            </SuiText>
            <div className='!my-8 flex gap-4'>
              <CUIButton
                href='/learn#on-demand'
                type='primary'
                size='lg'
                className='px-8'>
                On-demand training
              </CUIButton>
              <CUIButton
                href='#live'
                type='secondary-dark'
                size='lg'
                className='px-8'>
                Live training
              </CUIButton>
            </div>
            <LinkWithArrow
              href='/learn/certification'
              className='font-bold text-primary-300 hover:underline'>
              Get ClickHouse Certified
            </LinkWithArrow>
          </div>
          <div className='w-full max-w-xl'>
            <YouTubeVideo
              id='V6C6zyR4rq0'
              thumbnail='/images/clickhouse-learning-og.png'
              playButtonEyebrow='New to ClickHouse?'
              playButtonLabel='Watch the introduction'
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className='bg-white/10 py-8'>
        <div className='section-container'>
          <ul className='flex items-center justify-between text-xl font-bold'>
            <li className='flex items-center gap-4'>
              <Image
                src={iconDevelopers}
                alt='Developers'
                width={32}
                height={32}
              />
              100k+ developers
            </li>
            <li className='flex items-center gap-4'>
              <Image src={iconStars} alt='Stars' width={32} height={32} />
              {formatStat(headerData.github.stars)}+ GitHub stars
            </li>
            <li className='flex items-center gap-4'>
              <Image
                src={iconContributors}
                alt='Contributors'
                width={32}
                height={32}
              />
              {formatStat(headerData.github.contributors)}+ contributors
            </li>
            <li className='flex items-center gap-4'>
              <Image src={iconPrs} alt='PRs' width={32} height={32} />
              {formatStat(headerData.github.prs)}+ PRs
            </li>
          </ul>
        </div>
      </section>

      {/* On-demand */}
      <section id='on-demand' className='py-24'>
        <div className='section-container'>
          <div className='mx-auto mb-24 max-w-xl space-y-4 text-center'>
            <Image
              src={iconOnDemand}
              width={72}
              height={72}
              alt='On demand'
              className='inline-block'
            />
            <SuiTitle type='h2'>Choose a learning path</SuiTitle>
            <SuiText className='opacity-70'>
              Build real-world skills with curated learning paths aligned to
              your goals. Self-paced and beginner-friendly.
            </SuiText>
          </div>
          <div className='grid grid-cols-4 gap-8'>
            <LearningPathCard
              icon={iconRealTimeAnalytics}
              title='Real-time analytics'
              description='Learn how to power real-time dashboards, alerts, and event-driven apps with ClickHouse.'
              href='/learn/real-time-analytics'
              duration='2.5 hours'
              modules='3 modules'
            />
            <LearningPathCard
              icon={iconMlGenAi}
              title='ML and GenAI'
              description='Use ClickHouse to prepare data, feed models, and support GenAI workflows at scale.'
              href='/learn/machine-learning-and-data-science'
              duration='1 hour'
              modules='2 modules'
            />
            <LearningPathCard
              icon={iconDataWarehousing}
              title='Data warehousing'
              description='Design, build, and optimize modern data warehouses using ClickHouse.'
              href='/learn/data-warehousing'
              duration='4.5 hours'
              modules='6 modules'
            />
            <LearningPathCard
              icon={iconObservability}
              title='Observability'
              description='Ingest logs, metrics, and traces to monitor systems and power observability dashboards.'
              href='/learn/observability'
              duration='2.5 hours'
              modules='4 modules'
            />
          </div>
        </div>
      </section>

      {/* Live training */}
      <section
        id='live-training'
        className='bg-primary-300 py-24 text-neutral-950'>
        <div className='section-container'>
          <div className='mx-auto mb-24 max-w-xl space-y-4 text-center'>
            <Image
              src={iconLiveTraining}
              width={72}
              height={72}
              alt='Live training'
              className='inline-block'
            />
            <SuiTitle type='h2'>Instructor-led training</SuiTitle>
            <SuiText className='opacity-70'>
              Join live, instructor-led sessions led by our head of training,
              Rich Raposa, and supported by ClickHouse engineers. Get hands-on
              with real labs, ask questions in real time, and build the skills
              you need.
            </SuiText>
          </div>
          <div className='rounded-xl border border-neutral-600 bg-neutral-900/80 p-4 text-white'>
            <div className='mb-4 flex items-center'>
              <SuiTitle type='h3'>Upcoming live training</SuiTitle>
              <SuiSearchField
                placeholder='Search live training...'
                htmlFor='search'
                className='ml-auto w-full md:max-w-sm'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEventsSearch(event.target.value)
                }}
              />
            </div>
            <div>
              {filteredEvents.length > 0 ? (
                <ul className='space-y-2'>
                  {filteredEvents.map((event, eventIndex) => {
                    return (
                      <li
                        key={eventIndex}
                        className='relative flex justify-between rounded bg-neutral-900/30 px-4 py-2'>
                        <Link
                          href={`/company/events/${event.slug}`}
                          className='font-bold text-primary-300 hover:underline'>
                          <span className='absolute inset-0' />
                          {event.title}
                        </Link>
                        <span>{convertDateToString(event.localDatetime)}</span>
                        <span>
                          {event.location.city} ({event.location.country})
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div>No results found.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section id='certification' className='bg-neutral-600 py-24'>
        <div className='section-container'>
          <div className='mx-auto mb-24 max-w-xl space-y-4 text-center'>
            <SuiTitle type='h2'>Get ClickHouse Certified</SuiTitle>
            <SuiText>
              Become a recognized ClickHouse expert by validating your skills
              with our official ClickHouse Certification.
            </SuiText>
          </div>
        </div>
      </section>
    </Layout>
  )
}
