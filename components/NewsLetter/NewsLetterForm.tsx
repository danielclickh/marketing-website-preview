import React, { useRef, useState } from 'react'
import Markdown from '../Markdown'
import MarketoForm from '../MarketoForm'

function NewsLetterForm() {

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <div>
      {!formSuccess && (
        <MarketoForm
          formId={'1122'}
          disclaimer={false}
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
          <p>Thanks for registering to our newsletter!</p>
        </div>
      )}
    </div>
  )
}

export default NewsLetterForm
