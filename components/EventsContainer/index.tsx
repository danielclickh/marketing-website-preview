'use client'
import React, { useState } from 'react'
import EventsForm from './EventsForm'
import VimeoPlayer from '../VimeoPlayer'
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
  }

  const eventEnded = new Date(localDatetime).valueOf() < Date.now()

  return (
    <div className='container mx-auto pb-16 pt-24 flex flex-col md:flex-row'>
      {isSubmitted &&
        (!eventEnded || form.type === 'recordedGatedContent') &&
        recordedVimeoUrl && (
          <div className='top w-full mx-auto max-w-7xl flex justify-center px-8 mb-16'>
            <div className='video_display'>
              <VimeoPlayer url={recordedVimeoUrl} />
            </div>
          </div>
        )}
      <div className='event-container mx-auto block md:flex md:justify-between md:items-start'>
        <div
          className={`mb-16 mr-0 lg:mb-0 lg:mr-16 container flex-auto ${
            eventEnded && form.type !== 'recordedGatedContent'
              ? 'max-w-3xl'
              : 'max-w-md'
          }
          `}>
          {children}
        </div>
        <EventsForm submitted={isSubmitted} onSubmit={onSubmit} form={form} />
      </div>
    </div>
  )
}

export default EventsContainer
