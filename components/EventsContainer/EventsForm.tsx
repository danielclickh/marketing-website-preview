import { CheckCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import CopyUrlButton from '../CopyUrlButton'
import MarketoForm from '../MarketoForm'
import SocialButton from '../SocialButton'
import { SuiPanel } from '../sui/client'
import VideoPlayerCustom from '../VideoPlayerCustom'
import { EventsFormProps } from './types'

function EventsForm({
  featuredImage,
  form,
  recordedVimeoUrl = ''
}: EventsFormProps) {
  const { submitButtonLabel } = form

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const checkVimeoCode = (video: string) => {
    const regex = /\/video\/(\d+)/
    const match = video?.match(regex)
    if (match) {
      return match[1]
    } else {
      return video
    }
  }
  return (
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
            formId={'1127'}
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

        {!formLoaded && <div className='text-center'>Loading form...</div>}

        {formSuccess && (
          <div className='subscribed' ref={formSuccessRef}>
            <div className='success-container text-center'>
              <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
              <p className='mb-12 px-10 text-xl font-bold'>
                {form.type === 'recordedGatedContent' ? (
                  <>Thanks for registering! </>
                ) : submitButtonLabel === 'Request your spot' ? (
                  <>
                    Thanks for your interest, we'll be in touch to let you know
                    if a space is available
                  </>
                ) : (
                  <>You've been successfully registered. See you there!</>
                )}
              </p>
              {form.type === 'recordedGatedContent' && (
                <div className='my-10' id='custom-video-container-player'>
                  <p className='mb-4'>Watch recording below</p>
                  <VideoPlayerCustom
                    fullWidth={true}
                    videos={[
                      {
                        videoId: checkVimeoCode(recordedVimeoUrl),
                        type: 'vimeo',
                        vimeoCode: '979264b085',
                        image: featuredImage?.url
                      }
                    ]}
                  />
                </div>
              )}

              <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                {form.type == 'recordedGatedContent' ? (
                  <>Share the recording</>
                ) : (
                  <>Share the event</>
                )}
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <CopyUrlButton />
                {['twitter', 'facebook', 'linkedin'].map((social) => (
                  <SocialButton key={social} type={social} title='title' />
                ))}
              </div>
            </div>
          </div>
        )}
      </SuiPanel>
    </div>
  )
}

export default EventsForm
