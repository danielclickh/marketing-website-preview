'use client'
import React, { useState } from 'react'
import EventsForm from './EventsForm'
import Player from '@vimeo/player'

function EventsContainer({ children, localDatetime, form, recordedVimeoUrl }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const onSubmit = () => {
    setIsSubmitted(true)
  }

  const eventEnded = new Date(localDatetime).valueOf() < Date.now()

  return (
    <div className='pb-16 pt-24 flex flex-col md:flex-row'>
      {isSubmitted && (!eventEnded || form.type === 'recordedGatedContent') && (
        <div className='top w-full mx-auto max-w-7xl flex justify-center mx-8 mb-16'>
          <div className='video_display'>
            <iframe
              src={recordedVimeoUrl}
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
              data-ready='true'
              frameBorder='0'
              height='545'
              loading='lazy'
              width='968'
              className='max-lg:h-auto max-lg:w-11/12'
            />
          </div>
        </div>
      )}
      <div className='event-container block md:flex md:justify-between md:items-start'>
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
