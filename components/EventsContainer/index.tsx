import React, { useState } from 'react'
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
  const onSubmit = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  const eventEnded = new Date(localDatetime).valueOf() < Date.now()

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
        />
      </div>
    </div>
  )
}

export default EventsContainer
