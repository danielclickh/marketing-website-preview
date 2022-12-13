'use client'
import React, { useRef, useState } from 'react'
import { validateEmail } from '../../lib/form'
import BulletPoint from '../BulletPoint'
import { SuiTextField } from '../sui'

interface Props {
  submitted: boolean
  onSubmit: () => void
  form: {
    type: string
    firstNameLabel: string
    lastNameLabel: string
    emailLabel: string
    submitButtonLabel: string
  }
}

type ErrorType = {
  firstName?: boolean
  lastName?: boolean
  email?: boolean
}

function EventsForm({ submitted, onSubmit: onSubmitProp, form }: Props) {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const { type, firstNameLabel, lastNameLabel, emailLabel, submitButtonLabel } =
    form
  const [errors, setErrors] = useState<ErrorType>({})
  const onBlur = (e: KeyboardEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value ?? ''

    if (name === 'email') {
      setErrors((error) => ({ ...error, [name]: validateEmail(value) }))
    } else {
      setErrors((error) => ({ ...error, [name]: value.length === 0 }))
    }
    // setErrors()
  }
  const onSubmit = () => {
    setLoading(true)
    onSubmitProp()
  }
  return (
    <div className='right' data-a={errors.firstName}>
      {submitted ? (
        <div className='subscribed'>
          <div className='success-container'>
            <BulletPoint>
              <p>Successfully subscribed to event</p>
              <p className='flex md:hidden'>(scroll up to view)</p>
            </BulletPoint>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className='form'>
          {type === 'eventRegistration' && (
            <>
              <SuiTextField
                htmlFor='firstName'
                name='firstName'
                label={firstNameLabel}
                className='w-full'
                error={errors.firstName ? 'Invalid first name' : undefined}
                onBlur={onBlur}
              />
              <SuiTextField
                htmlFor='lastName'
                name='lastName'
                label={lastNameLabel}
                className='w-full'
                error={errors.lastName ? 'Invalid last name' : undefined}
                onBlur={onBlur}
              />
            </>
          )}

          <SuiTextField
            htmlFor='email'
            name='email'
            label={emailLabel}
            className='w-full'
            error={errors.email ? 'Invalid e-mail name' : undefined}
            onBlur={onBlur}
          />

          <button disabled={loading} className='submit_button primary_button'>
            {submitButtonLabel}
          </button>
        </form>
      )}
    </div>
  )
}

export default EventsForm
