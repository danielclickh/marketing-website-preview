import EventPost from '../EventPostList/EventPost'
import { SuiTitle } from '@/components/sui'
import { EventType } from '@/types/events'

function RecentEvents({ events }: { events: Array<EventType> }) {
  return (
    <div className='container mx-auto mt-10 flex max-w-7xl flex-col bg-opacity-10 px-4 pb-8 pt-12 sm:px-8 md:bg-no-repeat 2xl:px-0'>
      <SuiTitle type='h2' className='mb-10'>
        Recent events
      </SuiTitle>
      <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {events.map((event) => (
          <EventPost key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}

export default RecentEvents
