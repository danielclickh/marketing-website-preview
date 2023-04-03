import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { GetStaticProps } from 'next'
import Tilt from 'react-parallax-tilt'

import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'

import Layout from '../../components/Layout'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiText, SuiTitle } from '../../components/sui'
import { findAll } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { EventType } from '../../types/events'
import styles from './Learn.module.scss'
import { LearnProps } from '../../types/learn'
import { CUIButton, CUICard } from '../../components/ClickUI'
import FollowUs from '../../components/FollowUs'
import HRSeparator from '../../components/HRSeparator'
import VideoPlayer from '../../components/VideoPlayer'

const popularCourses = [
  {
    icon: '/learn/steps.svg',
    title: 'Getting started',
    description:
      'Get up and running quickly with ClickHouse! In this course, you will learn how to create a new service, an understanding of how primary keys work in ClickHouse, how to define a table, how to insert data, and how to run queries on your tables.',
    time: '25 minutes',
    url: '913420'
  },
  {
    icon: '/learn/waves.svg',
    title: 'Data ingestion',
    description:
      'In this course, you will learn techniques for getting data into your ClickHouse service, including how to insert a CSV/TSV file, how to insert data from another database, and how to use the various table functions and table engines for ingesting data.',
    time: '20 minutes',
    url: '912833/'
  },
  {
    icon: '/learn/eye.svg',
    title: 'Materialized views',
    description:
      'Creating views is an important step in optimizing your OLAP applications. In this course, you will learn how to define materialized views, including views that use the SummingMergeTree and AggregatingMergeTree table engines.',
    time: '25 minutes',
    url: '1043451/'
  }
]

const learningCourses = [
  {
    pretitle: 'Learning path',
    title: 'ClickHouse Developer Learning Path',
    description:
      'Become a ClickHouse Developer expert, from getting started to a deep dive into the architecture of ClickHouse to advanced topics like deduplication, materialized views, and projections.',
    time: '2 hours',
    url: '1049584/'
  },
  {
    pretitle: 'Learning path',
    title: 'ClickHouse Cloud Onboarding',
    description:
      'Start your journey to becoming a ClickHouse Cloud expert by learning how to get started in the Cloud, the architecture of ClickHouse, how to create tables, and how to ingest data.',
    time: '1.5 hours',
    url: '913421/'
  }
]

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const { data } = await findAll('events', {
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
    const commonProps = await getCommonProps()
    return {
      props: {
        upcomingEvents: data,
        seo: {
          title: 'Learn | ClickHouse'
        },
        ...commonProps
      }
    }
  }

function LearnPage({ upcomingEvents, footerData, seo }: LearnProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='relative text-center'>
        <SuiTitle
          type='h1'
          color='white'
          className='pt-16 md:pt-20 pb-6 md:!text-6xl'>
          ClickHouse Academy
        </SuiTitle>
        <SuiText color='secondary' className='pb-10'>
          Become a ClickHouse expert with our free official ClickHouse training
        </SuiText>

        <CUIButton
          type='primary'
          size='lg'
          weight='semibold'
          href='https://learn.clickhouse.com/visitor_class_catalog'
          className='mx-auto px-4 w-56'>
          Find a course
        </CUIButton>

        <div className='relative px-6 pt-10'>
          <div className={styles.videoPlaceHolder}>
            <VideoPlayer videoId='756877867' provider='vimeo' />
          </div>
        </div>
      </div>

      <div className='container max-w-screen-xl mx-auto pb-16 pt-24 text-center bg-shadow-element-right yellow-shadow'>
        <SuiTitle type='h2' className='mb-6'>
          Popular free courses
        </SuiTitle>
        <SuiText
          size='base'
          weight='normal'
          color='secondary'
          className='pb-16'>
          Learn the basics of ClickHouse with our online courses.
        </SuiText>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto pb-10 px-8 md:px-8'>
          {popularCourses.map((course) => (
            <Link
              key={course.title}
              href={`https://learn.clickhouse.com/visitor_catalog_class/show/${course.url}`}
              className='hover:no-underline transition ease-in-out'>
              <CUICard className='grid p-8 group bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat w-full min-h-[22.5rem]'>
                <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                  <Image
                    src={course.icon}
                    alt={`${course.title}`}
                    width={64}
                    height={64}
                  />
                  <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-4'>
                    <div className='text-xl leading-tight cursor-pointer font-semibold'>
                      {course.title}
                    </div>
                    <div className='text-sm text-neutral-200 flex gap-2 pb-4 group-hover:text-neutral-0'>
                      <ClockIcon width={12} /> {course.time}
                    </div>
                    <div className='text-neutral-200 text-center text-sm group-hover:text-neutral-0'>
                      {course.description}
                    </div>
                  </div>
                </CUICard.Body>
              </CUICard>
            </Link>
          ))}
        </div>
        <CUIButton
          type='secondary'
          className='w-auto mx-auto flex'
          href='https://learn.clickhouse.com/visitor_class_catalog'>
          Browse more free training
        </CUIButton>
      </div>

      <div className='clip-inverted-triangle-top flex flex-col items-center text-center lg:px-32 gap-x-16 lg:gap-x-20 gap-y-12'>
        <div className='flex-col pt-24 md:pt-40 relative px-8'>
          <SuiTitle type='h2' color='text-default'>
            Learning paths
          </SuiTitle>
          <SuiText
            size='base'
            weight='normal'
            color='text-default'
            className='mt-6 max-w-screen-sm mx-auto'>
            Become a subject matter expert through our recommended series of
            courses that will best help you build knowledge progressively.
          </SuiText>
          <div className='flex mt-8 pb-24 gap-12 md:gap-16 flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 w-full'>
            {learningCourses.map((course) => (
              <Link
                key={course.title}
                href={`https://learn.clickhouse.com/visitor_catalog_class/show/${course.url}`}
                className='hover:no-underline group bg-opacity-90 bg-neutral-750 transition ease-in-out rounded-lg'>
                <CUICard className='p-8 bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat w-full md:max-w-[22.5rem]'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-4'>
                      <div className='text-xl leading-tight cursor-pointer font-semibold px-4'>
                        {course.title}
                      </div>
                      <div className='text-sm text-neutral-200 flex gap-2 pb-4'>
                        <ClockIcon width={12} /> {course.time}
                      </div>
                      <div className='text-neutral-200 text-center text-sm group-hover:text-neutral-0'>
                        {course.description}
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='container mx-auto px-3 text-center max-w-screen-md pt-24 bg-shadow-element-left red-shadow'>
        <Image
          src='/learn/icon_pro_cert.svg'
          alt='Professional Certificate Icon'
          className='mx-auto'
          width={72}
          height={72}
        />
        <SuiTitle type='h2' className='mt-8 mb-6'>
          Professional certification
        </SuiTitle>
        <SuiText
          size='base'
          weight='normal'
          color='secondary'
          className='mb-10'>
          Let the world know you’re a ClickHouse subject matter expect! We’re
          working on building the first official ClickHouse certification
          program, and we will share the news on social media when the exams are
          ready for beta testers.
        </SuiText>

        <CUIButton
          type='secondary'
          className='w-auto mx-auto'
          href='https://twitter.com/clickhousedb'
          target='_blank'
          iconLeft={
            <Image
              alt='Twitter icon'
              src='/learn/icon_twitter_outline.svg'
              width={24}
              height={20}
            />
          }>
          Follow us on Twitter
        </CUIButton>
      </div>
      <HRSeparator className='my-24' />
      <div className='container mx-auto max-w-screen-xl px-8'>
        <Image
          src='/learn/icon_video.svg'
          alt='Live ClickHouse events icon'
          className='mx-auto'
          width={72}
          height={72}
        />
        <SuiTitle type='h2' className='mt-8 mb-6 text-center'>
          Upcoming live events
        </SuiTitle>
        <SuiText
          size='base'
          weight='normal'
          color='secondary'
          className='mb-10 max-w-3xl text-center mx-auto'>
          Join our community and attend our events to learn more about
          ClickHouse! Our team is always happy to support and answer any
          questions you may have about ClickHouse development. You can also
          <Link
            href='/company/news-events/'
            className='underline ml-2 hover:text-neutral-0 font-semibold'>
            access our list of older events
          </Link>{' '}
          hosted by us.
        </SuiText>

        <div className='flex flex-col md:flex-row mx-auto gap-12 md:gap-16 justify-center w-full md:w-auto '>
          {upcomingEvents.map((event: EventType) => (
            <Link
              href={`/company/events/${event.slug}`}
              className='flex hover:no-underline flex-col justify-between w-full h-auto rounded-lg bg-neutral-900/70 border border-neutral-700/80 shadow-card md:max-w-[22.5rem]'
              key={event.title}>
              <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor='rgba(251, 255, 70, 0.08)'
                glarePosition='all'
                className='h-full'>
                <div>
                  {event.thumbnailPng ? (
                    <StrapiImage
                      {...event.thumbnailPng}
                      alt='image'
                      width={342}
                      height={196}
                      className='w-full h-48 object-cover object-center rounded-t-lg'
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

                  <div className='p-4'>
                    <p className='font-inconsolata text-primary-300'>
                      {event.category}
                    </p>
                    <SuiText
                      size='lg'
                      weight='bold'
                      className='mt-2 mb-4 md:min-h-[3.5rem]'>
                      {event.title}
                    </SuiText>

                    <SuiText
                      size='sm'
                      color='secondary'
                      className='flex flex-col gap-2.5 mb-6'>
                      {event.localDatetime && (
                        <div className='flex gap-2'>
                          <CalendarIcon width='20' height='20' />
                          {new Date(event.localDatetime).toDateString()}
                        </div>
                      )}

                      <div className='flex gap-2'>
                        <LocationMarkerIcon width='20' height='20' />
                        {[event.location.city, event.location.country].join(
                          ', '
                        )}
                      </div>
                    </SuiText>
                  </div>
                </div>
              </Tilt>
            </Link>
          ))}
        </div>
      </div>
      <FollowUs />
    </Layout>
  )
}

export default LearnPage
