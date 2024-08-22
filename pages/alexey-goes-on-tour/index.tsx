import { GetStaticProps } from 'next'
import React from 'react'
import EventPost from '../../components/EventPostList/EventPost'
import GetStartedFree from '../../components/GetStartedFree'
import Layout from '../../components/Layout'
import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { findAll } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { EventType } from '../../types/events'
import { CommonProps } from '../../types/homepage'
import banner from './banner.jpg'
import Image from 'next/image'

interface Props extends CommonProps {
  recentEvents: Array<EventType>
}

export const getStaticProps: GetStaticProps<Props> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const { data: recentEvents }: { data: Array<EventType> } = await findAll(
      'events',
      {
        filters: {
          localDatetime: {
            $gte: new Date().toISOString()
          }
        },
        sort: ['localDatetime:ASC'],
        populate: ['thumbnailPng', 'location'],
        pagination: { limit: 3 }
      }
    )

    return {
      props: {
        recentEvents,
        ...commonProps
      }
    }
  }

export default function HomePage({
  seo,
  footerData,
  headerData,
  recentEvents
}: Props) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Page banner */}
      <div className='relative'>
        <Image
          src={banner}
          width={2880}
          height={974}
          alt='Alexey'
          className='absolute left-0 top-0 z-0 h-full w-full object-cover opacity-30'
        />
        <div className='section-container relative z-10 mx-auto max-w-5xl space-y-10 py-24 text-center'>
          <SuiText
            size='sm'
            weight='medium'
            className='inline-block rounded-full bg-primary-300 px-8 py-1 text-primary-900'>
            Upcoming tour
          </SuiText>
          <SuiTitle type='h1' className='text-balance lg:text-wrap'>
            Alexey, ClickHouse creator and CTO, goes on tour!
          </SuiTitle>
          <SuiText
            size='lg'
            className='text-balance md:px-16 lg:text-wrap lg:px-32'>
            From August 25th to September 18th, Alexey Milovidov will embark on
            a 7-city international tour delivering a series of tech talks. Join
            these in-person events to hear him speak and ask questions. Space is
            limited, so register below.
          </SuiText>
        </div>
      </div>

      {/* Locations strip */}
      <div className='space-x-6 border-y border-neutral-600 bg-neutral-700 py-1 text-center font-bold'>
        {['USA', 'EUROPE', 'ASIA'].map((item, index) => {
          return (
            <>
              {index !== 0 && <span>&bull;</span>}
              <span>{item}</span>
            </>
          )
        })}
      </div>

      {/* Timeline */}
      <div className='section-container mx-auto my-24 text-center'>
        [INSERT DATES]
      </div>

      {/* Get started */}
      <div className='section-container mx-auto my-24'>
        <GetStartedFree
          href='https://clickhouse.cloud/signUp?loc=alexey-goes-on-tour'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </div>

      {/* Related content */}
      <div className='bg-shadow-element yellow-shadow align-shadow-right mx-auto mb-40 max-w-7xl px-4 pb-10 sm:px-8 2xl:px-0'>
        <div className='relative z-20'>
          <div className='flex justify-between'>
            <h3 className='mb-10 font-basier text-4xl'>
              Upcoming community events
            </h3>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base hidden border border-primary-300/50 md:inline-block'>
              View all events
            </SuiButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
          <div className='mt-8 text-center md:hidden'>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base border border-primary-300/50'>
              View all events
            </SuiButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}
