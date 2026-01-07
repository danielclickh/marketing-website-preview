'use client'

import { CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import { PageModuleWaitlistForm } from '@/types/strapi'
import React, { useRef, useState } from 'react'

export default function PageModulesWaitlistForm({
  introduction,
  formIntroduction,
  marketoFormId,
  formButtonLabel,
  formSuccessMessage,
  formSuccessRedirect,
  showPrivacyPolicy
}: PageModuleWaitlistForm) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <DotsContainer>
      <div className='mx-auto w-full lg:max-w-4xl'>
        {introduction && (
          <div className='mb-16 text-center'>
            <Markdown
              allowDirectives={false}
              className='rich-text-content leading-6'
              allowHeaderLink={false}>
              {introduction}
            </Markdown>
          </div>
        )}
        <div className='mx-auto lg:max-w-xl'>
          <CUICard className='bg-neutral-900/80'>
            <CUICard.Body className='p-4 lg:p-6'>
              {!formSuccess && (
                <>
                  {formIntroduction && (
                    <div className='mb-8 mt-4 space-y-4 text-center lg:mb-12 lg:mt-4'>
                      <Markdown
                        allowDirectives={false}
                        className='rich-text-content leading-6'
                        allowHeaderLink={false}>
                        {formIntroduction}
                      </Markdown>
                    </div>
                  )}
                  <MarketoForm
                    formId={marketoFormId}
                    onLoad={() => setFormLoaded(true)}
                    disclaimer={showPrivacyPolicy ? undefined : null}
                    submitButtonLabel={formButtonLabel}
                    onSuccess={() => {
                      if (formSuccessRedirect) {
                        window.location.assign(formSuccessRedirect)
                      } else {
                        setFormSuccess(true)

                        // Delay needed to allow the ref to update before scrolling
                        setTimeout(() => {
                          formSuccessRef.current?.scrollIntoView()
                        }, 10)
                      }

                      return false // Stops page from reloading
                    }}
                  />
                </>
              )}

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef} className='text-center'>
                  <Markdown
                    allowDirectives={false}
                    className='rich-text-content leading-6'
                    allowHeaderLink={false}>
                    {formSuccessRedirect
                      ? 'Redirecting...'
                      : formSuccessMessage}
                  </Markdown>
                </div>
              )}
            </CUICard.Body>
          </CUICard>
        </div>
      </div>
    </DotsContainer>
  )
}
