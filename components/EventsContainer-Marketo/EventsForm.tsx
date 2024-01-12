import React, { useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'
import { validateEmail } from '../../lib/form'
import BulletPoint from '../BulletPoint'
import { SuiButton, SuiPanel, SuiTextField, useSnackbar } from '../sui/client'
import { EventsFormProps } from './types'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/outline'
import CopyUrlButton from '../CopyUrlButton'
import SocialButton from '../SocialButton'

function EventsForm({
  submitted,
  onSubmit: onSubmitProp,
  featuredImage,
  form
}: EventsFormProps) {
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

    openSnackBar('Thank you, you have been registered to the event', 'success')
    setEmail(undefined)
    if (type === 'eventRegistration') {
      setFirstName(undefined)
      setLastName(undefined)
    }
    setLoading(false)
    onSubmitProp()
  }
  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className='ml-auto w-full lg:max-w-lg'>
      {featuredImage && (
        <Image
          src={featuredImage.url}
          width={512}
          height={293}
          alt='Featured image'
          className='mb-20 hidden h-auto w-full rounded-lg object-cover lg:block'
        />
      )}

      <SuiPanel
        isRounded
        color='bg-neutral-900'
        shadow
        padding='xl'
        className='w-full border border-neutral-800'>
        {submitted ? (
          <div className='subscribed'>
            <div className='success-container text-center'>
              <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
              <p className='mb-12 px-10 text-xl font-bold'>
                {form.type === 'recordedGatedContent' ? (
                  <>Thanks for registering!</>
                ) : submitButtonLabel === 'Request your spot' ? (
                  <>
                    Thanks for your interest, we'll be in touch to let you know
                    if a space is available
                  </>
                ) : (
                  <>You've been successfully registered. See you there!</>
                )}
              </p>
              <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                {form.type == 'recordedGatedContent' ? (
                  <>Share the recording</>
                ) : (
                  <>Share the event</>
                )}
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <CopyUrlButton />
                {['twitter', 'facebook', 'linkedin'].map((social) => (
                  <SocialButton key={social} type={social} title='title' />
                ))}
              </div>
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
                  className='mb-6 w-full'
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
                  className='mb-6 w-full'
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
              className='mb-6 w-full'
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
            <SuiButton
              disabled={loading}
              type='primary'
              className='rounded-md hover:translate-y-0 hover:bg-primary-400 hover:no-underline'
              onClick={onSubmit}>
              {submitButtonLabel == 'Register to event' ||
              submitButtonLabel == 'Register for event'
                ? 'Register now'
                : submitButtonLabel}
            </SuiButton>
          </div>
        )}
      </SuiPanel>
    </div>
  )
}

export default EventsForm
