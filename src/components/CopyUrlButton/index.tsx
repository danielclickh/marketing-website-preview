import { ButtonProps } from '../sui/SuiButton'
import { SuiButton } from '../sui/client'
import { DuplicateIcon } from '@heroicons/react/outline'

interface CopyUrlButtonProps {
  className?: ButtonProps['className']
  url?: string
}

function CopyUrlButton({ url, className = '' }: CopyUrlButtonProps) {
  const onClick = () => {
    navigator.clipboard.writeText(url || window.location.href)
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
