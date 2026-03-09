import MarketoForm from '../MarketoForm'
import { useRef, useState } from 'react'

function NewsLetterForm() {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1122'}
          disclaimer={false}
          clearbitTracking={true}
          onLoad={() => setFormLoaded(true)}
          onSuccess={() => {
            setFormSuccess(true)

            // Delay needed to allow the ref to update before scrolling
            setTimeout(() => {
              formSuccessRef.current?.scrollIntoView()
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
    </>
  )
}

export default NewsLetterForm
