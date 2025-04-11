import { EventType } from '@/types/events'
import EventPost from '../EventPostList/EventPost'

function RecentEvents({ events }: { events: Array<EventType> }) {
  return (
    <div className='container mx-auto mt-10 flex max-w-7xl flex-col bg-opacity-10 px-4 pb-8 pt-12 sm:px-8 md:bg-no-repeat 2xl:px-0'>
      <h2 className='mb-10 font-basier text-xl font-semibold text-neutral-100'>
        Recent events
      </h2>
      <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {events.map((event) => (
          <EventPost key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}

export default RecentEvents
