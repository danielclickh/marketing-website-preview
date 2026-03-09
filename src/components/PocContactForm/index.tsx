import MarketoForm from '../MarketoForm'
import { useRef, useState } from 'react'

export default function PocContactForm() {
  const [formLoaded, setFormLoaded] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const formSuccessRef = useRef<HTMLDivElement>(null)
  return (
    <div className='relative'>
      <div
        className={`transition ${
          formSuccess ? 'pointer-events-none opacity-10 blur-sm' : ''
        }`}>
        <MarketoForm
          formId='1302'
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
      </div>
      {!formLoaded && <div className='text-center'>Loading form...</div>}
      {formSuccess && (
        <div className='absolute inset-0 flex' ref={formSuccessRef}>
          <div className='my-auto w-full text-center'>
            <h3 className='text-2xl font-bold'>
              Thank you for your submission!
            </h3>
            <p className='mt-2 text-neutral-200'>We will be in touch soon.</p>
          </div>
        </div>
      )}
    </div>
  )
}
