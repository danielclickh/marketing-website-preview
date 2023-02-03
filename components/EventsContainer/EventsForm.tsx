'use client'
import React, { useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'
import { validateEmail } from '../../lib/form'
import BulletPoint from '../BulletPoint'
import { useAnalytics } from '../Providers/Analytics'
import { SuiButton, SuiPanel, SuiTextField, useSnackbar } from '../sui/client'
import { EventsFormProps } from './types'

function EventsForm({
  submitted,
  onSubmit: onSubmitProp,
  form
}: EventsFormProps) {
  const analytics = useAnalytics()
  const { openSnackBar } = useSnackbar()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { type, firstNameLabel, lastNameLabel, emailLabel, submitButtonLabel } =
    form

  const onChange = (e: any) => {
    const value = e.target.value ?? ''
    const name = e.target.name
    switch (name) {
      case 'firstName':
        setFirstName(value)
        break

      case 'lastName':
        setLastName(value)
        break

      case 'email':
        setEmail(value)
        break

      default:
        break
    }
  }

  const onSubmit = async () => {
    if (loading) {
      return
    }

    const fillAll = 'Please fill in all the required fields'
    const invalidEmail = 'Please enter a valid e-mail address'
    let response
    if (type === 'eventRegistration') {
      if (
        !firstName ||
        !lastName ||
        !email ||
        firstName.length === 0 ||
        lastName.length === 0 ||
        email.length === 0
      ) {
        openSnackBar(fillAll, 'error')
        return
      }

      if (!validateEmail(email)) {
        openSnackBar(invalidEmail, 'error')
        return
      }

      setLoading(true)
      response = await submitWorkatoForm('eventRegistration', {
        firstName,
        lastName,
        email
      })
    } else {
      if (!email || email.length === 0) {
        openSnackBar(fillAll, 'error')
        return
      }
      if (!validateEmail(email)) {
        openSnackBar(invalidEmail, 'error')
        return
      }

      setLoading(true)
      response = await submitWorkatoForm('recordedGatedContent', {
        email
      })
    }

    const userId = response?.cloudId ? response.cloudId : email
    try {
      await analytics.identify(userId, { email, firstName, lastName })
      await analytics.track('Form Submitted', {
        email,
        userId,
        _mkt_trk: response.marketCookie
      })
    } catch (e) {}
    openSnackBar('Thank you, you have been registered to the event', 'success')
    setLoading(false)
    onSubmitProp()
  }
  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <SuiPanel isRounded color='bg-c2' shadow padding='xl' className='ml-auto'>
      {submitted ? (
        <div className='subscribed'>
          <div className='success-container'>
            <BulletPoint className='!pb-0'>
              <p>Successfully subscribed to event</p>
              <p className='flex md:hidden'>(scroll up to view)</p>
            </BulletPoint>
          </div>
        </div>
      ) : (
        <div>
          {type === 'eventRegistration' && (
            <>
              <SuiTextField
                htmlFor='firstName'
                name='firstName'
                label={firstNameLabel}
                value={firstName ?? ''}
                onChange={onChange}
                onBlur={onChange}
                className='w-full mb-6'
                error={
                  typeof firstName === 'string' && firstName.length === 0
                    ? 'Invalid First Name'
                    : ''
                }
              />
              <SuiTextField
                htmlFor='lastName'
                name='lastName'
                label={lastNameLabel}
                value={lastName ?? ''}
                onChange={onChange}
                onBlur={onChange}
                className='w-full mb-6'
                error={
                  typeof lastName === 'string' && lastName.length === 0
                    ? 'Invalid Last Name'
                    : ''
                }
              />
            </>
          )}

          <SuiTextField
            htmlFor='email'
            name='email'
            label={emailLabel}
            value={email ?? ''}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onBlur={onChange}
            className='w-full mb-6'
            error={
              typeof email === 'undefined'
                ? undefined
                : email.length === 0
                ? 'E-mail address cannot be empty'
                : validateEmail(email)
                ? ''
                : 'Invalid E-mail address'
            }
          />

          <SuiButton disabled={loading} type='primary' onClick={onSubmit}>
            {submitButtonLabel}
          </SuiButton>
        </div>
      )}
    </SuiPanel>
  )
}

export default EventsForm
