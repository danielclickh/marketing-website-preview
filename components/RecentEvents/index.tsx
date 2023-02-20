import React from 'react'
import { EventType } from '../../types/events'
import { SuiRecentCard, SuiTitle } from '../sui'

function RecentEvents({ events }: { events: Array<EventType> }) {
  return (
    <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-8 2xl:px-0'>
      <SuiTitle type='h2' className='pb-8 text-left !text-3xl'>
        Recent events
      </SuiTitle>
      <div className='flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0'>
        {events.map((event) => (
          <SuiRecentCard
            key={event.id}
            pretitle={event.category}
            title={event.title}
            target={event.eventVideoUrl ? '_blank' : '_self'}
            url={
              event.eventVideoUrl
                ? event.eventVideoUrl
                : `/company/events/${event.slug}`
            }
            description={
              event.form.type !== 'recordedGatedContent'
                ? event.datetimeAndTimezoneString
                : undefined
            }
            className='w-full md:w-1/3'
          />
        ))}
      </div>
    </div>
  )
}

export default RecentEvents
