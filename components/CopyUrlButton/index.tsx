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
      type='custom'
      onClick={onClick}
      className='border border-c2 hover:bg-c2 shadow'>
      <DuplicateIcon width='16' />
      Copy Link
    </SuiButton>
  )
}

export default CopyUrlButton
