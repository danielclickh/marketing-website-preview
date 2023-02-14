import React, { useState } from 'react'
import EventsForm from './EventsForm'
import { EventsContainerProps } from './types'

function EventsContainer({
  children,
  localDatetime,
  form,
  recordedVimeoUrl
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
    <div className='container mx-auto pb-16 pt-24 flex flex-col'>
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
                frameBorder='0'
                height='545'
                loading='lazy'
                width='968'></iframe>
            </div>
          </div>
        )}
      <div className='event-container mx-auto block lg:flex lg:justify-between lg:items-start max-w-7xl'>
        <div className={`mb-16 mr-0 lg:mb-0 lg:mr-16 container flex-auto`}>
          {children}
        </div>
        <EventsForm submitted={isSubmitted} onSubmit={onSubmit} form={form} />
      </div>
    </div>
  )
}

export default EventsContainer
