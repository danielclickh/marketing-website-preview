import React, { FocusEvent, FormEvent, useRef, useState } from 'react'
import { submitWorkatoForm } from '../../lib/api/workato'
import { validateEmail } from '../../lib/form'
import { ContactFormProps } from '../../types/contact'
import ReactMarkdown from 'react-markdown'

import {
  SuiButton,
  SuiTextField,
  SuiTextFieldArea,
  useSnackbar
} from '../sui/client'

function ContactForm({
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  companyLabel,
  messageLabel,
  submitButtonLabel,
  thankYouMessage
}: ContactFormProps) {
  const { openSnackBar } = useSnackbar()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [company, setCompany] = useState<string>()
  const submitRef = useRef(false)
  const [useCase, setUseCase] = useState<string>('')
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  const onChange = (
    e:
      | FormEvent<HTMLInputElement | HTMLTextAreaElement>
      | FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = (e.target as any).value ?? ''
    const name = (e.target as any).name
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

      case 'company':
        setCompany(value)
        break

      case 'useCase':
        setUseCase(value)
        break

      default:
        break
    }
  }

  const onSubmit = async () => {
    if (submitRef.current) {
      return
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !company ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      company.length === 0
    ) {
      openSnackBar('Please fill in all the required fields', 'error')
      return
    }

    if (!validateEmail(email)) {
      openSnackBar('Please enter a valid e-mail address', 'error')
      return
    }

    try {
      submitRef.current = true
      const requestData = {
        firstName,
        lastName,
        email,
        company,
        message: useCase
      }
      const response = await submitWorkatoForm('websiteContact', requestData)
      const userId = response?.cloudId ? response.cloudId : email
      try {
        await window.analytics.track('Form Submitted', {
          email,
          userId,
          _mkt_trk: response.marketCookie
        })
        await window.analytics.identify(userId, requestData)
      } catch (e) {}
      //openSnackBar(thankYouMessage, 'success')
      setSubmissionSuccessful(true)
      setFirstName(undefined)
      setLastName(undefined)
      setEmail(undefined)
      setCompany(undefined)
      setUseCase('')
    } catch (e: any) {
      setSubmissionSuccessful(false)
      openSnackBar(e.message, 'error')
    }

    submitRef.current = false
  }
  return (
    <>
      <div className={submissionSuccessful ? 'hidden' : ''}>
        <div className='flex space-x-8'>
          <SuiTextField
            htmlFor='firstName'
            name='firstName'
            label={firstNameLabel}
            value={firstName ?? ''}
            onChange={onChange}
            onBlur={onChange}
            className='w-full'
            error={
              typeof firstName === 'string' && firstName.length === 0
                ? 'Invalid First Name'
                : ''
            }
            required
          />
          <SuiTextField
            htmlFor='lastName'
            name='lastName'
            value={lastName ?? ''}
            onChange={onChange}
            onBlur={onChange}
            label={lastNameLabel}
            error={
              typeof lastName === 'string' && lastName.length === 0
                ? 'Invalid Last Name'
                : ''
            }
            className='w-full'
            required
          />
        </div>
        <div className='flex w-full'>
          <SuiTextField
            htmlFor='email'
            name='email'
            type='email'
            value={email ?? ''}
            onChange={onChange}
            onBlur={onChange}
            label={emailLabel}
            error={
              typeof email === 'undefined'
                ? undefined
                : email.length === 0
                ? 'E-mail address cannot be empty'
                : validateEmail(email)
                ? ''
                : 'Invalid E-mail address'
            }
            className='w-full'
            required
          />
        </div>
        <div className='flex'>
          <SuiTextField
            htmlFor='company'
            name='company'
            value={company ?? ''}
            onChange={onChange}
            onBlur={onChange}
            label={companyLabel}
            error={
              typeof company === 'string' && company.length === 0
                ? 'Company name cannot be empty'
                : ''
            }
            className='w-full'
            required
          />
        </div>
        <div className='flex'>
          <SuiTextFieldArea
            htmlFor='useCase'
            name='useCase'
            value={useCase}
            onChange={onChange}
            onBlur={onChange}
            label={messageLabel}
            className='w-full'
          />
        </div>

        <div className='mx-auto flex w-full'>
          <SuiButton
            type='primary'
            onClick={onSubmit}
            className='w-full rounded-md hover:translate-y-0 hover:bg-primary-400 hover:no-underline'>
            {submitButtonLabel}
          </SuiButton>
        </div>
      </div>
      {submissionSuccessful && <ReactMarkdown className='text-center' children={thankYouMessage} />}
    </>
  )
}

export default ContactForm
