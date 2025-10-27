'use client'

import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { BlogModuleMarketoForm } from '@/types/strapi'
import React, { useRef, useState } from 'react'

export default function BlogModulesMarketoForm({
  title,
  description,
  formId,
  successRedirect,
  successMessage,
  showPrivacyPolicy
}: BlogModuleMarketoForm) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <div className='toc-ignore rounded bg-white/5 p-4 md:flex-row md:items-center md:p-6'>
      <SuiTitle type='h3' className='mb-2.5'>
        {title}
      </SuiTitle>
      <SuiText size='sm' weight='medium' color='secondary'>
        {description}
      </SuiText>
      <div className='mt-6'>
        {!formSuccess && (
          <MarketoForm
            formId={formId}
            onLoad={() => setFormLoaded(true)}
            disclaimer={showPrivacyPolicy ? undefined : null}
            onSuccess={() => {
              if (successRedirect) {
                window.location.assign(successRedirect)
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
        )}

        {!formLoaded && <div>Loading form...</div>}

        {formSuccess && (
          <div ref={formSuccessRef}>
            <Markdown
              allowDirectives={false}
              className='rich-text-content leading-6'
              allowHeaderLink={false}>
              {successRedirect ? 'Redirecting...' : successMessage}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  )
}
