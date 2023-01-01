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
import { SuiButton, SuiCard, SuiText, SuiTitle } from '../../components/sui'
import VimeoPlayer from '../../components/VimeoPlayer'
import { findAll } from '../../lib/api/strapi'
import { EventType } from '../company/events/[slug]/types'

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
  const imagePrefix = ''

  return (
    <div>
      <div className='hero-container bg-hero'>
        <div className='hero-background' />
        <div className='hero-content'>
          <SuiTitle type='h1' size='6xl'>
            ClickHouse <span className='gradient_title'>Academy</span>
          </SuiTitle>
          <div className='hero-subtitle'>
            Become a ClickHouse expert with our free official ClickHouse
            training
          </div>
          <div className='video-placeholder'>
            <VimeoPlayer url='https://player.vimeo.com/video/756877867?h=c58e171729&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' />
          </div>
        </div>
      </div>
      <SuiButton
        type='primary'
        path='https://learn.clickhouse.com/visitor_class_catalog'>
        Find a course
      </SuiButton>
      <div className='container'>
        <SuiTitle type='h5'>POPULAR FREE COURSES</SuiTitle>
        <div className='card-inner-container flex gap-4'>
          {popularCourses.map((course) => (
            <Link
              href={course.url}
              key={course.title}
              className='w-full md:w-1/3'>
              <SuiCard
                icon={course.icon}
                title={course.title}
                description={course.description}
                color='empty'>
                <div className='flex gap-2'>
                  <ClockIcon width='20' height='20' />
                  {course.time}
                </div>
              </SuiCard>
            </Link>
          ))}
        </div>
        <div className='cta-browse-more-courses'>
          <Link href='https://learn.clickhouse.com/visitor_class_catalog'>
            Browse more free training -&gt;
          </Link>
        </div>
      </div>
      <div className='section section-learning-paths'>
        <div className='section-learning-paths--content'>
          <div className='section-category' style={{ marginBottom: '16px' }}>
            <div>STEP-BY-STEP</div>
          </div>
          <div className='section-title'>
            <div>Learning paths</div>
          </div>
          <div className='section-description' style={{ marginTop: '40px' }}>
            Become a subject matter expert through our recommended series of
            courses that will best help you build knowledge progressively.
          </div>
        </div>
        <div className='section-learning-paths--cards flex gap-4'>
          {learningCourses.map((course) => (
            <Link
              href={course.url}
              key={course.title}
              className='w-full md:w-1/3'>
              <SuiCard
                pretitle={course.pretitle}
                title={course.title}
                description={course.description}
                color='empty'>
                <div className='flex gap-2'>
                  <ClockIcon width='20' height='20' />
                  {course.time}
                </div>
              </SuiCard>
            </Link>
          ))}
        </div>
      </div>
      <div
        className='container section-professional-cert text-center'
        style={{ marginTop: '120px' }}>
        <div>
          <div className='badge'>COMING SOON</div>
        </div>
        <SuiTitle type='h2' className='my-10'>
          Professional certification
        </SuiTitle>
        <SuiText size='base' weight='normal' color='secondary'>
          Let the world know you’re a ClickHouse subject matter expect! We’re
          working on building the first official ClickHouse certification
          program, and we will share the news on social media when the exams are
          ready for beta testers.
        </SuiText>
        <SuiButton
          type='secondary'
          className='mt-10'
          path='https://twitter.com/clickhousedb'>
          Follow us on Twitter{' '}
          <Image
            alt='image'
            src='/images/logo_twitter.svg'
            width={24}
            height={20}
          />
        </SuiButton>
      </div>
      <div className='container mx-auto px-4' style={{ marginTop: '120px' }}>
        <SuiTitle type='h2' className='mb-20'>
          Upcoming live events
        </SuiTitle>
        <div className='events-container flex gap-4'>
          {upcomingEvents.map((event: EventType) => (
            <div className='event-item' key={event.title}>
              <div className='event-item--image'>
                {event.thumbnailPng ? (
                  <StrapiImage
                    {...event.thumbnailPng}
                    alt='image'
                    width={342}
                    height={196}
                  />
                ) : (
                  <Image
                    alt='image'
                    src={`/images/clickhouse_workshop.png`}
                    width={342}
                    height={196}
                  />
                )}
              </div>
              <div className='event-item--title'>{event.title}</div>
              <div className='event-item--description whitespace-pre-wrap'>
                {event.shortDescription}
              </div>
              <div className='event-item--details'>
                <div className='event-item--date flex gap-2'>
                  <CalendarIcon width='24' height='24' />
                  {[event.location.city, event.location.country].join(', ')}
                </div>
                {event.localDatetime && (
                  <div className='event-item--time flex gap-2'>
                    <ClockIcon width='24' height='24' />
                    {new Date(event.localDatetime).toDateString()}
                  </div>
                )}
              </div>
              <Link
                href={`/company/events/${event.slug}`}
                className='flex items-center gap-2'>
                Register now <ArrowRightIcon height='16' />
              </Link>
            </div>
          ))}
        </div>
        <Link href='/company/news-events'>
          <div style={{ marginTop: '70px', marginBottom: '150px' }}>
            <button className='button'>View all live events</button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LearnPage
