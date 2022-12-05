'use client'
import React, { useRef, useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'

type StatusType = {
  loading: boolean
  error?: string
  success?: boolean
}
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface ServiceUnavailableFormProps {
  tosCheckboxRichText: string
  emailLabel: string
  success: string
  btnText: string
}

function ServiceUnavailableForm({
  tosCheckboxRichText,
  emailLabel,
  success: successMsg,
  btnText
}: ServiceUnavailableFormProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<StatusType>({
    loading: false
  })
  const onSubmit = async () => {
    setStatus({ loading: true })
    if (emailRef.current && emailRef.current.value.length === 0) {
      setStatus({
        loading: false,
        error: 'Please fill the email field.'
      })
    } else if (emailRef.current && emailRef.current.value.match(emailRegex)) {
      submitWorkatoForm('serviceUnavailableCountry', {
        email: emailRef.current.value
      })
      setStatus({
        loading: false,
        success: true
      })
    } else {
      setStatus({
        loading: false,
        error: 'Kindly use a valid email address'
      })
    }
    setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus()
      }
      setStatus({ loading: false })
    }, 5000)
  }
  return (
    <>
      <div className='email'>
        <label className='seed_label'>{emailLabel}</label>
        <input
          className='seed_input email_input'
          name='email'
          type='email'
          ref={emailRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit()
            }
          }}
        />
        {status?.error && (
          <div className='seed_error'>Invalid e-mail address</div>
        )}
        {status?.success && (
          <div className='seed_success'>
            <p></p>
            <p>{successMsg}</p>
          </div>
        )}
      </div>
      <div className='bottom'>
        <div
          dangerouslySetInnerHTML={{ __html: tosCheckboxRichText }}
          className='disclaimer'
        />
        <button
          disabled={
            status.loading || (emailRef.current?.value ?? '').length === 0
          }
          className='submit_button primary_button'
          onClick={onSubmit}>
          {btnText}
        </button>
      </div>
    </>
  )
}

export default ServiceUnavailableForm
