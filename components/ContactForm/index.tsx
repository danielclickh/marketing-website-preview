'use client'
import React from 'react'
import { SuiButton, SuiTextField } from '../sui'

interface Props {
  firstNameLabel: string
  lastNameLabel: string
  emailLabel: string
  companyLabel: string
  messageLabel: string
  submitButtonLabel: string
}

function ContactForm({
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  companyLabel,
  messageLabel,
  submitButtonLabel
}: Props) {
  return (
    <>
      <div className='flex space-x-8'>
        <SuiTextField
          htmlFor='firstName'
          label={firstNameLabel}
          className='w-full'
        />
        <SuiTextField
          htmlFor='lastName'
          label={lastNameLabel}
          className='w-full'
        />
      </div>
      <div className='flex w-full'>
        <SuiTextField htmlFor='email' label={emailLabel} className='w-full' />
      </div>
      <div className='flex'>
        <SuiTextField
          htmlFor='company'
          label={companyLabel}
          className='w-full'
        />
      </div>
      <div className='flex'>
        <SuiTextField
          htmlFor='useCase'
          label={messageLabel}
          className='w-full'
        />
      </div>

      <div className='flex w-64 mx-auto'>
        <SuiButton type='primary'>{submitButtonLabel}</SuiButton>
      </div>
    </>
  )
}

export default ContactForm
