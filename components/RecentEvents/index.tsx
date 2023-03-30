import React from 'react'
import { EventType } from '../../types/events'
import EventPost from '../EventPostList/EventPost'

function RecentEvents({ events }: { events: Array<EventType> }) {
  return (
    <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-12 pb-8 px-4 sm:px-8 2xl:px-0 mt-10'>
      <h2 className='text-xl font-semibold font-basier mb-10 text-neutral-100'>
        Recent events
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
        {events.map((event) => (
          <EventPost key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}

export default RecentEvents
