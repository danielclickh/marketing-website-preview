import { DuplicateIcon } from '@heroicons/react/outline'
import React from 'react'
import { SuiButton } from '../sui/client'
import { ButtonProps } from '../sui/SuiButton'

function CopyUrlButton({
  className = ''
}: {
  className?: ButtonProps['className']
}) {
  const onClick = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  return (
    <SuiButton
      type='custom'
      onClick={onClick}
      className={`border border-neutral-700 bg-neutral-800 shadow hover:bg-primary-300 hover:text-neutral-800 ${className}`}>
      <DuplicateIcon width='16' />
    </SuiButton>
  )
}

export default CopyUrlButton
