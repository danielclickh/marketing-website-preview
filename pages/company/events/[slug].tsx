import { GetStaticProps } from 'next'
import React from 'react'
import EventsContainer from '../../../components/EventsContainer'
import GetStarted from '../../../components/GetStarted'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import RecentEvents from '../../../components/RecentEvents'
import { StrapiImage } from '../../../components/StrapiElements'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ParamsType } from '../../../types/homepage'
import { EventProps, EventType } from '../../../types/events'

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

    const filters: Record<string, any> = {
      localDatetime: {
        $lt: new Date().toISOString()
      },
      slug: {
        $ne: slug
      }
    }
    const { data: recentEvents }: { data: Array<EventType> } = await findAll(
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
    const page = data[0]
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
      }
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
  headerData,
  footerData,
  getStartedData,
  recentEvents,
  seo
}: EventProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='flex flex-col px-4 sm:px-8'>
        <EventsContainer
          localDatetime={localDatetime}
          form={form}
          recordedVimeoUrl={recordedVimeoUrl}>
          <div className='section_metadata mb-20'>
            <SuiTitle type='h3' color='c6' className='mb-2 !text-lg'>
              {category}
            </SuiTitle>
            <SuiTitle type='h1' className='mb-5'>
              {title}
            </SuiTitle>
            <SuiText
              size='base'
              weight='medium'
              color='secondary'
              className='whitespace-pre-wrap'>
              {richDescription ? (
                <Markdown className='rich-text-content'>
                  {richDescription}
                </Markdown>
              ) : (
                description
              )}
            </SuiText>
          </div>

          {hostedBy && (
            <div className='hosted_by mb-16'>
              <SuiTitle type='h2' className='mb-7'>
                {hostedBy.title}
              </SuiTitle>
              <div className='grid grid-cols-1 sm:grid-cols-2 flex-wrap gap-6'>
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
                      <SuiText size='sm' weight='medium' className='mb-1'>
                        {host.name}
                      </SuiText>
                      <SuiText
                        size='xs'
                        weight='medium'
                        color='secondary'
                        className='flex-auto'>
                        {host.role}
                      </SuiText>
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
        <div className='bg-c2 text-c5'>
          <RecentEvents events={recentEvents} />
        </div>
      </div>
      <GetStarted {...getStartedData} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const params = {
    fields: ['slug']
  }
  const paths = await getPathsValues('events', params)

  return {
    paths,
    fallback: false
  }
}

export default EventPage
