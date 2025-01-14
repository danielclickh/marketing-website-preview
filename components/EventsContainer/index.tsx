import { useEffect, useState } from 'react'
import EventsForm from './EventsForm'
import { EventsContainerProps } from './types'

function EventsContainer({
  children,
  localDatetime,
  form,
  recordedVimeoUrl = '',
  featuredImage
}: EventsContainerProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eventEnded, setEventEnded] = useState(false)

  useEffect(() => {
    const checkEventEnded = () => {
      const hasEnded = new Date(localDatetime).valueOf() < Date.now()
      setEventEnded(hasEnded)
    }

    checkEventEnded()
    // Optionally, you can set up an interval to periodically check if the event has ended
    // const intervalId = setInterval(checkEventEnded, 60000) // Check every minute

    // return () => clearInterval(intervalId)
  }, [localDatetime])

  const onSubmit = () => {
    setIsSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-24 sm:px-8 2xl:px-0'>
      <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
        <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
          {children}
        </div>
        <EventsForm
          submitted={isSubmitted}
          onSubmit={onSubmit}
          form={form}
          featuredImage={featuredImage}
          recordedVimeoUrl={recordedVimeoUrl}
          eventEnded={eventEnded}
        />
      </div>
    </div>
  )
}

export default EventsContainer
