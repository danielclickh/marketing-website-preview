import EventsForm from './EventsForm'
import { EventsContainerProps } from './types'

function EventsContainer({
  children,
  form,
  recordedVimeoUrl = '',
  featuredImage
}: EventsContainerProps) {
  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-24 sm:px-8 2xl:px-0'>
      <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
        <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
          {children}
        </div>
        <EventsForm
          form={form}
          featuredImage={featuredImage}
          recordedVimeoUrl={recordedVimeoUrl}
        />
      </div>
    </div>
  )
}

export default EventsContainer
