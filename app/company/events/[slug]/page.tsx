import React from 'react'
import EventsContainer from '../../../../components/EventsContainer'
import GetStarted from '../../../../components/GetStarted'
import Markdown from '../../../../components/Markdown'
import RecentEvents from '../../../../components/RecentEvents'
import { StrapiImage } from '../../../../components/StrapiElements'
import { SuiText, SuiTitle } from '../../../../components/sui'
import { findAll, getPathsValues } from '../../../../lib/api/strapi'
import { EventType } from './types'
import styles from './Events.module.scss'

async function EventPage({ params: { slug } }: { params: { slug: string } }) {
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

  const {
    agenda,
    hostedBy,
    category,
    title,
    description,
    richDescription,
    form,
    localDatetime,
    recordedVimeoUrl
  }: EventType = data[0]

  return (
    <>
      <div className='flex flex-col px-3'>
        <EventsContainer
          localDatetime={localDatetime}
          form={form}
          recordedVimeoUrl={recordedVimeoUrl}>
          <div className='section_metadata mb-20'>
            <SuiTitle type='h3' color='c6' className='mb-2'>
              {category}
            </SuiTitle>
            <SuiTitle type='h1' className='mb-5'>
              {title}
            </SuiTitle>
            <SuiText
              size='base'
              weight='medium'
              color='secondary'
              className={styles.eventsDescription}>
              {richDescription ? (
                <Markdown encloseByDiv={false}>{richDescription}</Markdown>
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
              <div className='flex flex-col'>
                {hostedBy.hosts.map((host) => (
                  <div className='flex gap-5' key={`${host.name}-${host.role}`}>
                    <StrapiImage
                      {...host.avatarPng}
                      alt={host.avatarPng.caption}
                      width={64}
                      height={64}
                      className='h-11 w-11 rounded-full'
                    />
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
              <SuiTitle type='h2' className='title'>
                {agenda.title}
              </SuiTitle>
              <div className='agenda_items'>
                {agenda.items.map((agendaItem) => (
                  <div className='agenda_item' key={agendaItem.time}>
                    <SuiText size='sm' weight='medium' className='mb-1'>
                      {agendaItem.time}
                    </SuiText>
                    <SuiText
                      size='xs'
                      weight='medium'
                      color='secondary'
                      className='flex-auto'>
                      {agendaItem.topic}
                    </SuiText>
                  </div>
                ))}
              </div>
            </div>
          )}
        </EventsContainer>
        <div className='bg-c2 text-c5'>
          {/* @ts-expect-error Server Component */}
          <RecentEvents excludeEventSlug={slug} />
        </div>
      </div>
      <GetStarted />
    </>
  )
}

export async function generateStaticParams() {
  const params = {
    fields: ['slug']
  }
  const paths = await getPathsValues('events', params)

  return paths
}

export default EventPage
