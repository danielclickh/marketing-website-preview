'use client'
import React from 'react'
import { SuiButton, SuiTextField } from '../sui'

function NewsLetterForm(props) {
  const onClick = () => {}
  return (
    <div className='flex align-middle items-center space-x-2'>
      <SuiTextField htmlFor='email' placeholder='Email address' />
      <div className='mt-1'>
        <SuiButton type='primary' onClick={onClick}>
          Sign up
        </SuiButton>
      </div>
    </div>
  )
}

export default NewsLetterForm
