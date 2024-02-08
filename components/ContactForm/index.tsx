import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarketoForm from '../MarketoForm'
import { useRouter } from 'next/router'

function ContactForm() {
  const router = useRouter()

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [useCase, setUseCase] = useState<string>('')

  useEffect(() => {
    if (router.query.custom) {
      let customPricingQuoteObj = { ...router.query }

      let memory = '16GiB'
      if (
        customPricingQuoteObj.minMemory &&
        customPricingQuoteObj.maxMemory &&
        customPricingQuoteObj.tier
      ) {
        if (customPricingQuoteObj.tier === 'Production') {
          memory = `${customPricingQuoteObj.minMemory}GiB - ${customPricingQuoteObj.maxMemory}GiB`
        }
      }
      setUseCase(`

=== Custom pricing request ===
Service type: ${customPricingQuoteObj.tier}
Provider: ${customPricingQuoteObj.provider}
Region: ${customPricingQuoteObj.region}
Active hours: ${customPricingQuoteObj.hours}
Data volume: ${customPricingQuoteObj.storageSize}GB
Data compressed: ${customPricingQuoteObj.storageCompressed}
Compute: ${memory}
`)
    }
  }, [router.query])
  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1124'}
          onLoad={() => {
            //update values here
            setFormLoaded(true)
          }}
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
        <div ref={formSuccessRef}>
          <ReactMarkdown
            className='text-center'
            children='Thank you for submitting the form'
          />
        </div>
      )}
    </>
  )
}

export default ContactForm
