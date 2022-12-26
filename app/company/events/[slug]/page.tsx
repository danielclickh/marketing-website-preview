import React from 'react'
import EventsContainer from '../../../../components/EventsContainer'
import GetStarted from '../../../../components/GetStarted'
import Markdown from '../../../../components/Markdown'
import RecentEvents from '../../../../components/RecentEvents'
import { StrapiImage } from '../../../../components/StrapiElements'
import { findAll, getPathsValues } from '../../../../lib/api/strapi'

async function EventPage({ params: { slug } }) {
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
  } = data[0]

  return (
    <>
      <div className='flex flex-col'>
        <EventsContainer
          localDatetime={localDatetime}
          form={form}
          recordedVimeoUrl={recordedVimeoUrl}>
          <div className='section_metadata'>
            <div className='pretitle'>{category}</div>
            <div className='title'>{title}</div>
            <div className='description'>
              {richDescription ? (
                <Markdown>{richDescription}</Markdown>
              ) : (
                description
              )}
            </div>
          </div>

          {hostedBy && (
            <div className='hosted_by mb-16'>
              <div className='title'>{hostedBy.title}</div>
              <div className='hosts'>
                {hostedBy.hosts.map((host) => (
                  <div className='host' key={`${host.name}-${host.role}`}>
                    <StrapiImage {...host.avatarPng} />
                    <div className='content'>
                      <div className='name'>{host.name}</div>
                      <div className='role'>{host.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {agenda && (
            <div className='agenda'>
              <div className='title'>{agenda.title}</div>
              <div className='agenda_items'>
                {agenda.items.map((agendaItem) => (
                  <div className='agenda_item' key={agendaItem.time}>
                    <div className='time'>{agendaItem.time}</div>
                    <div className='flex-auto'>{agendaItem.topic}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </EventsContainer>
        <div className='container-light-color'>
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
