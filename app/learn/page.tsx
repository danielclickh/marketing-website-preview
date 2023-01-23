import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  TableIcon
} from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StrapiImage } from '../../components/StrapiElements'
import {
  SuiButton,
  SuiCard,
  SuiLink,
  SuiText,
  SuiTitle
} from '../../components/sui'
import VimeoPlayer from '../../components/VimeoPlayer'
import { findAll } from '../../lib/api/strapi'
import { EventType } from '../company/events/[slug]/types'
import styles from './Learn.module.scss'

const popularCourses = [
  {
    icon: <TableIcon width={27} height={27} />,
    title: 'Getting started',
    description:
      'Get up and running quickly with ClickHouse! In this course, you will learn how to create a new service, an understanding of how primary keys work in ClickHouse, how to define a table, how to insert data, and how to run queries on your tables.',
    time: '25 minutes',
    url: 'https://learn.clickhouse.com/visitor_catalog_class/show/913420/'
  },
  {
    icon: <TableIcon width={27} height={27} />,
    title: 'Data ingestion',
    description:
      'In this course, you will learn techniques for getting data into your ClickHouse service, including how to insert a CSV/TSV file, how to insert data from another database, and how to use the various table functions and table engines for ingesting data.',
    time: '20 minutes',
    url: 'https://learn.clickhouse.com/visitor_catalog_class/show/912833/'
  },
  {
    icon: <EyeIcon width={27} height={27} />,
    title: 'Materialized views',
    description:
      'Creating views is an important step in optimizing your OLAP applications. In this course, you will learn how to define materialized views, including views that use the SummingMergeTree and AggregatingMergeTree table engines.',
    time: '25 minutes',
    url: 'https://learn.clickhouse.com/visitor_catalog_class/show/1043451/'
  }
]

const learningCourses = [
  {
    pretitle: 'Learning path',
    title: 'ClickHouse Developer Learning Path',
    description:
      'Become a ClickHouse Developer expert, from getting started to a deep dive into the architecture of ClickHouse to advanced topics like deduplication, materialized views, and projections.',
    time: '2 hours',
    url: 'https://learn.clickhouse.com/visitor_catalog_class/show/1049584/'
  },
  {
    pretitle: 'Learning path',
    title: 'ClickHouse Cloud Onboarding',
    description:
      'Start your journey to becoming a ClickHouse Cloud expert by learning how to get started in the Cloud, the architecture of ClickHouse, how to create tables, and how to ingest data.',
    time: '1.5 hours',
    url: 'https://learn.clickhouse.com/visitor_catalog_class/show/913421/'
  }
]
async function LearnPage() {
  const { data: upcomingEvents } = await findAll('events', {
    filters: {
      localDatetime: {
        $gt: new Date().toISOString()
      },
      category: {
        $eqi: 'Free Training'
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
    ],
    pagination: { limit: 3 }
  })

  const gridCol = `grid-cols-${upcomingEvents.length}`
  return (
    <div>
      <div className='hero-container bg-c1-light'>
        <div className='hero-content relative text-center'>
          <div className={styles.learnBg}>
            <SuiTitle
              type='h1'
              color='white'
              className='pt-16 md:pt-30 pb-4 md:!text-6xl'>
              ClickHouse <span className='gradient_title'>Academy</span>
            </SuiTitle>
            <SuiText size='lg' weight='normal' color='white' className='pb-20'>
              Become a ClickHouse expert with our free official ClickHouse
              training
            </SuiText>
          </div>
          <div className='relative px-6'>
            <div className={styles.videoPlaceHolder}>
              <div>
                <VimeoPlayer url='https://player.vimeo.com/video/756877867?h=c58e171729&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-10 mx-auto w-fit'>
        <SuiButton
          type='primary'
          path='https://learn.clickhouse.com/visitor_class_catalog'>
          Find a course
        </SuiButton>
      </div>
      <div className='container max-w-screen-lg mx-auto px-16 pb-20 pt-10'>
        <SuiTitle type='h6' className='mb-6' color='secondary'>
          POPULAR FREE COURSES
        </SuiTitle>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto'>
          {popularCourses.map((course) => (
            <Link
              href={course.url}
              key={course.title}
              className={`course-${course.title} w-full h-full hover:no-underline`}>
              <SuiCard
                direction='left'
                icon={course.icon}
                title={course.title}
                description={course.description}
                color='empty'>
                <SuiText
                  color='secondary'
                  size='sm'
                  weight='normal'
                  className='flex gap-2 border-t mt-5 pt-4 border-c4/10'>
                  <ClockIcon width='20' height='20' />
                  {course.time}
                </SuiText>
              </SuiCard>
            </Link>
          ))}
        </div>
        <SuiLink
          size='base'
          weight='bold'
          href='https://learn.clickhouse.com/visitor_class_catalog'
          className='flex gap-2 mt-10 items-center mx-auto w-fit'>
          Browse more free training
          <ArrowRightIcon width={16} height={16} />
        </SuiLink>
      </div>
      <div className='flex flex-col md:flex-row items-center py-32 px-16 lg:px-32 bg-c2 gap-x-16 lg:gap-x-20 gap-y-12'>
        <div className='flex flex-col'>
          <SuiTitle type='h6' weight='bold' color='secondary' className='mb-4'>
            STEP-BY-STEP
          </SuiTitle>
          <SuiTitle type='h2' weight='semibold' className='!text-5xl'>
            Learning paths
          </SuiTitle>
          <SuiText
            size='base'
            weight='normal'
            className='mt-10 max-w-screen-sm'>
            Become a subject matter expert through our recommended series of
            courses that will best help you build knowledge progressively.
          </SuiText>
        </div>
        <div className='flex gap-4 flex-col sm:grid sm:grid-cols-2 max-w-screen-sm w-auto'>
          {learningCourses.map((course) => (
            <Link
              href={course.url}
              key={course.title}
              className={`learning-course-${course.title} w-full hover:no-underline`}>
              <SuiCard
                direction='left'
                pretitle={course.pretitle}
                title={course.title}
                description={course.description}
                color='bg-c1'>
                <SuiText
                  color='secondary'
                  size='sm'
                  weight='normal'
                  className='flex gap-2 border-t mt-5 pt-4 border-c4/10'>
                  <ClockIcon width='20' height='20' />
                  {course.time}
                </SuiText>
              </SuiCard>
            </Link>
          ))}
        </div>
      </div>
      <div className='container mx-auto px-3 text-center max-w-screen-md pt-30 pb-20'>
        <SuiTitle
          type='h6'
          color='white'
          className='mx-auto py-2 px-5 bg-alerts-danger-text w-fit rounded-full'>
          COMING SOON
        </SuiTitle>
        <SuiTitle type='h2' className='mt-6 mb-10 !text-5xl'>
          Professional certification
        </SuiTitle>
        <SuiText
          size='base'
          weight='normal'
          color='secondary'
          className='mb-14'>
          Let the world know you’re a ClickHouse subject matter expect! We’re
          working on building the first official ClickHouse certification
          program, and we will share the news on social media when the exams are
          ready for beta testers.
        </SuiText>
        <SuiButton type='secondary' path='https://twitter.com/clickhousedb'>
          Follow us on Twitter{' '}
          <Image
            alt='image'
            src='/images/logo_twitter.svg'
            width={24}
            height={20}
          />
        </SuiButton>
      </div>
      <div className='container mx-auto max-w-screen-lg px-4 pt-30'>
        <SuiTitle type='h2' className='mb-20 text-center !text-5xl'>
          Upcoming live events
        </SuiTitle>
        <div className='events-container flex flex-col md:flex-row gap-16 mx-auto'>
          {upcomingEvents.map((event: EventType) => (
            <div
              className='flex flex-col justify-between h-auto mx-auto md:w-1/3'
              key={event.title}>
              <div className='event-item--image'>
                <div>
                  {event.thumbnailPng ? (
                    <StrapiImage
                      {...event.thumbnailPng}
                      alt='image'
                      width={342}
                      height={196}
                      className='w-full h-48 object-cover object-center'
                    />
                  ) : (
                    <Image
                      alt='image'
                      src={`/images/clickhouse_workshop.png`}
                      width={342}
                      height={196}
                      className='w-full h-48 object-cover object-center'
                    />
                  )}
                </div>
                <SuiText
                  size='lg'
                  weight='bold'
                  className='mt-8 mb-4 md:min-h-[3.5rem]'>
                  {event.title}
                </SuiText>
                <SuiText
                  size='base'
                  weight='normal'
                  className='whitespace-pre-wrap mb-6'>
                  {event.shortDescription}
                </SuiText>
              </div>
              <div>
                <SuiText
                  size='sm'
                  weight='normal'
                  className='flex flex-col gap-2.5 mb-6'>
                  <div className='flex gap-2'>
                    <CalendarIcon width='20' height='20' />
                    {[event.location.city, event.location.country].join(', ')}
                  </div>
                  {event.localDatetime && (
                    <div className='flex gap-2'>
                      <ClockIcon width='20' height='20' />
                      {new Date(event.localDatetime).toDateString()}
                    </div>
                  )}
                </SuiText>
                <Link
                  href={`/company/events/${event.slug}`}
                  className='flex items-center w-fit gap-2 border-b-4 border-c6 py-1 hover:no-underline group'>
                  Register now{' '}
                  <ArrowRightIcon
                    height='16'
                    className='group-hover:translate-x-2'
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='mx-auto mb-16 mt-36 w-fit'>
          <SuiButton
            type='empty'
            size='lg'
            color='primary'
            path='/company/news-events'>
            View all live events
            <ArrowRightIcon height='16' className='group-hover:translate-x-2' />
          </SuiButton>
        </div>
      </div>
    </div>
  )
}

export default LearnPage
