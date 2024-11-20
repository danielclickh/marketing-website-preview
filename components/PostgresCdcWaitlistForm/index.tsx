import { useRef, useState } from 'react'
import MarketoForm from '../MarketoForm'

export default function PostgresCdcWaitlistForm() {
  const [formLoaded, setFormLoaded] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const formSuccessRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <MarketoForm
        formId='1293'
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
      {!formLoaded && <div className='text-center'>Loading form...</div>}
      {formSuccess && (
        <div ref={formSuccessRef}>
          <h3 className='text-center text-2xl font-bold'>
            Thank you for your submission!
          </h3>
          <p className='mt-2 text-center text-neutral-200'>
            We will be in touch soon.
          </p>
        </div>
      )}
    </>
  )
}
