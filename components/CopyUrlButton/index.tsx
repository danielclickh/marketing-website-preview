'use client'
import { DuplicateIcon } from '@heroicons/react/outline'
import React from 'react'
import { SuiButton } from '../sui'

function CopyUrlButton() {
  const onClick = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <SuiButton
      size='sm'
      type='secondary'
      onClick={onClick}
      className='hover:bg-light-grey3'>
      <DuplicateIcon width='16' />
      Copy
    </SuiButton>
  )
}

export default CopyUrlButton
