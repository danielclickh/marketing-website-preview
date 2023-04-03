import { DuplicateIcon } from '@heroicons/react/outline'
import React from 'react'
import { SuiButton } from '../sui/client'

function CopyUrlButton() {
  const onClick = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <SuiButton
      type='custom'
      onClick={onClick}
      className='border border-neutral-700 bg-neutral-800 hover:bg-primary-300 hover:text-neutral-800 shadow'>
      <DuplicateIcon width='16' />
    </SuiButton>
  )
}

export default CopyUrlButton
