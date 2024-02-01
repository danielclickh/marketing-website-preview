import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarketoForm from '../MarketoForm'

function ContactForm() {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1124'}
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
        <div ref={formSuccessRef}>
          <ReactMarkdown className='text-center' children='Thank you for submitting the form' />
        </div>
      )}
    </>
  )
}

export default ContactForm
