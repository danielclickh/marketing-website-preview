import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import { findAll } from '../../lib/api/strapi'
import { SuiSpacer, SuiText, SuiTitle } from '../sui'

function RecentEvents({ excludeEventSlug }: { excludeEventSlug?: string }) {
  const filters = {
    localDatetime: {
      $lt: new Date().toISOString()
    }
  }
  if (excludeEventSlug) {
    filters['slug'] = {
      $ne: excludeEventSlug
    }
  }
  const { data } = use(
    findAll('events', {
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
    })
  )

  return (
    <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
      <div className='flex justify-between pb-4'>
        <SuiTitle size='lg'>
          <h4>Recent events</h4>
        </SuiTitle>
      </div>
      <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
        {data.map((event) => (
          <Link
            target={event.eventVideoUrl ? '_blank' : '_self'}
            href={
              event.eventVideoUrl
                ? event.eventVideoUrl
                : `/company/events/${event.slug}`
            }
            className='flex flex-col'
            key={event.id}>
            <Image
              src='/news/webinar.png'
              alt='Release webinar'
              width='328'
              height='214'
              className='cursor-pointer'
            />

            <div className='flex flex-col px-4'>
              <SuiTitle size='xxs' color='primary' dark_color='primary'>
                <h4>{event.category}</h4>
              </SuiTitle>
              <SuiSpacer size='xs' />
              <SuiTitle>
                <h3>{event.title}</h3>
              </SuiTitle>
              <SuiText color='dark' padding_0>
                <p>
                  {event.form.type !== 'recordedGatedContent'
                    ? event.datetimeAndTimezoneString
                    : undefined}
                </p>
              </SuiText>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentEvents
