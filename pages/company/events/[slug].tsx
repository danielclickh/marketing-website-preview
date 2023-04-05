import { GetStaticProps } from 'next'
import React from 'react'
import EventsContainer from '../../../components/EventsContainer'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import { StrapiImage } from '../../../components/StrapiElements'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ParamsType } from '../../../types/homepage'
import { EventProps, EventType } from '../../../types/events'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { CalendarIcon } from '@heroicons/react/outline'
import EventPost from '../../../components/EventPostList/EventPost'
import Link from 'next/link'

export const getStaticProps: GetStaticProps<EventProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('events', {
      filters: {
        slug: {
          $eq: slug
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

    const { data: recentEvents }: { data: Array<EventType> } = await findAll(
      'events',
      {
        filters: {
          localDatetime: {
            $gte: new Date().toISOString()
          },
          slug: {
            $notContains: slug
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
      }
    )

    const commonProps = await getCommonProps()
    const page = data[0]
    if (!page) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    if (page.eventVideoUrl) {
      return {
        props: {},
        redirect: {
          destination: page.eventVideoUrl,
          permanent: false
        }
      }
    }
    return {
      props: {
        ...page,
        seo: {
          title: page.title,
          description: page.shortDescription,
          image: [data[0].thumbnailPng],
          type: 'website',
          siteName: 'ClickHouse'
        },
        recentEvents,
        ...commonProps
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

function EventPage({
  agenda,
  hostedBy,
  category,
  title,
  description,
  richDescription,
  form,
  localDatetime,
  recordedVimeoUrl,
  footerData,
  platforms,
  recentEvents,
  datetimeAndTimezoneString,
  lightFeatureImagePng,
  seo
}: EventProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='flex flex-col'>
        <EventsContainer
          localDatetime={localDatetime}
          form={form}
          recordedVimeoUrl={recordedVimeoUrl}
          featuredImage={lightFeatureImagePng}>
          <div className='section_metadata mb-20'>
            <h4 className='text-primary-300 text-base font-semibold mb-2'>
              <Link
                className='hover:text-primary-400'
                href='/company/news-events'>
                News &amp; Events
              </Link>{' '}
              / {category}
            </h4>
            <h1
              className='mb-8 text-4xl md:text-5.5xl font-semibold leading-tight font-basier
            '>
              {title}
            </h1>

            {/* {category !== 'On-Demand Webinar' && (
              <div className='mb-10'>
                <div className='flex space-x-3 items-center'>
                  <CalendarIcon className='stroke-1 text-primary-300 w-6 h-6' />
                  <span className='text-base font-normal'>
                    {datetimeAndTimezoneString}
                  </span>
                </div>
              </div>
            )} */}

            {richDescription && (
              <div className='prose prose-neutral'>
                <Markdown encloseByDiv={false}>{richDescription}</Markdown>
              </div>
            )}
          </div>

          {hostedBy && (
            <div className='hosted_by mb-16'>
              <h3 className='mb-7 text-xl font-bold'>{hostedBy.title}</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 flex-wrap gap-3'>
                {hostedBy.hosts.map((host) => (
                  <div className='flex gap-5' key={`${host.name}-${host.role}`}>
                    {host.avatarPng && (
                      <StrapiImage
                        {...host.avatarPng}
                        alt={host.avatarPng.caption}
                        width={64}
                        height={64}
                        className='h-11 w-11 rounded-full'
                      />
                    )}
                    <div className='flex flex-col'>
                      <p className='text-base mb-1 font-medium'>{host.name}</p>
                      <p className='text-sm font-medium flex-auto text-neutral-300'>
                        {host.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {agenda && (
            <div className='agenda'>
              <SuiTitle type='h2' className='mb-7'>
                {agenda.title}
              </SuiTitle>
              <div className='agenda_items gap-1'>
                {agenda.items.map((agendaItem) => (
                  <div
                    className='agenda_item flex items-start'
                    key={agendaItem.time}>
                    <SuiText
                      size='base'
                      color='secondary'
                      weight='medium'
                      className='mb-1 w-16'>
                      {agendaItem.time}
                    </SuiText>
                    <SuiText size='base' weight='medium' className='flex-auto'>
                      {agendaItem.topic}
                    </SuiText>
                  </div>
                ))}
              </div>
            </div>
          )}
        </EventsContainer>
      </div>
      <div className='px-4 sm:px-8 2xl:px-0 pb-10 max-w-7xl mx-auto mb-40 bg-shadow-element yellow-shadow align-shadow-right'>
        <div className='relative z-20'>
          <h3 className='font-basier mb-10 text-4xl'>Upcoming events</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const params = {
    fields: ['slug'],
    filters: {
      $or: [
        {
          eventVideoUrl: {
            $null: true
          }
        },
        {
          eventVideoUrl: {
            $eq: ''
          }
        }
      ]
    }
  }
  const paths = await getPathsValues('events', params)

  return {
    paths,
    fallback: 'blocking'
  }
}

export default EventPage
