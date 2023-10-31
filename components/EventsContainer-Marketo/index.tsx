import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { CUIButton } from '../ClickUI'
import CopyUrlButton from '../CopyUrlButton'
import Markdown from '../Markdown'
import MarketoForm from '../MarketoForm'
import SocialButton from '../SocialButton'
import { SuiPanel } from '../sui'
import VideoPlayer from '../VideoPlayer'
import { EventsContainerProps } from './types'
import { CheckCircleIcon } from '@heroicons/react/outline'

interface MarketoEventsContainerProps extends EventsContainerProps {
  mktoFormId: string
}

function EventsContainerMarketo({
  children,
  localDatetime,
  form,
  mktoFormId,
  recordedVimeoUrl,
  featuredImage
}: MarketoEventsContainerProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  const onSubmit = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  const eventEnded = new Date(localDatetime).valueOf() < Date.now()
  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-24 sm:px-8 2xl:px-0'>
      {isSubmitted &&
        (!eventEnded || form.type === 'recordedGatedContent') &&
        recordedVimeoUrl && (
          <div className='mb-10 flex w-full items-start'>
            <VideoPlayer videoId={recordedVimeoUrl} provider='vimeo' />
          </div>
        )}
      <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
        <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
          {children}
        </div>
        <div className='ml-auto w-full lg:max-w-lg'>
          {featuredImage && (
            <Image
              src={featuredImage.url}
              width={512}
              height={293}
              alt='Featured image'
              className='mb-20 hidden h-auto w-full rounded-lg object-cover lg:block'
            />
          )}
          <SuiPanel
            isRounded
            color='bg-neutral-900'
            shadow
            padding='xl'
            className='w-full border border-neutral-800'>
            {!formSuccess && (
              <MarketoForm
                formId={mktoFormId}
                onLoad={() => setFormLoaded(true)}
                onSuccess={() => {
                  setFormSuccess(true)

                  // Delay needed to allow the ref to update before scrolling
                  setTimeout(() => {
                    formSuccessRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }, 10)

                  return false // Stops page from reloading
                }}
              />
            )}

            {formLoaded && !formSuccess && (
              <div className='disclaimer-text mt-8 text-center text-sm font-medium text-neutral-200'>
                <Markdown>
                  By registering, you acknowledge that ClickHouse will process
                  your personal information in accordance with our [Privacy
                  Policy](/legal/privacy-policy).
                </Markdown>
              </div>
            )}

            {!formLoaded && <div className='text-center'>Loading form...</div>}

            {formSuccess && (
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <div className='subscribed'>
                  <div className='success-container text-center'>
                    <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
                    <p className='mb-12 px-10 text-xl font-bold'>
                      Thanks for registering!
                    </p>
                    <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                      Share the event
                    </p>
                    <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                      <CopyUrlButton />
                      {['twitter', 'facebook', 'linkedin'].map((social) => (
                        <SocialButton
                          key={social}
                          type={social}
                          title='title'
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SuiPanel>
        </div>
      </div>
    </div>
  )
}

export default EventsContainerMarketo
