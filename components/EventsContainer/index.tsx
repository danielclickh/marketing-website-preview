import React, { useState } from 'react'
import EventsForm from './EventsForm'
import { EventsContainerProps } from './types'

function EventsContainer({
  children,
  localDatetime,
  form,
  recordedVimeoUrl,
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
    <div className='px-4 sm:px-8 2xl:px-0 w-full max-w-7xl mx-auto pb-16 pt-24 flex flex-col'>
      {isSubmitted &&
        (!eventEnded || form.type === 'recordedGatedContent') &&
        recordedVimeoUrl && (
          <div className='top w-full mx-auto max-w-7xl flex justify-center px-8 mb-16'>
            <div className='video_display'>
              <iframe
                src={recordedVimeoUrl}
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
                data-ready='true'
                className='video-frame'
                frameBorder='0'
                height='545'
                loading='lazy'
                width='968'></iframe>
            </div>
          </div>
        )}
      <div className='event-container w-full mx-auto block lg:flex lg:justify-between lg:items-start'>
        <div className='mb-16 mr-0 lg:mb-0 lg:mr-16 flex-auto lg:max-w-2xl'>
          {children}
        </div>
        <EventsForm
          submitted={isSubmitted}
          onSubmit={onSubmit}
          form={form}
          featuredImage={featuredImage}
        />
      </div>
    </div>
  )
}

export default EventsContainer
