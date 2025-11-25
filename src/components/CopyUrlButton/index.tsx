import { DuplicateIcon } from '@heroicons/react/outline'

interface CopyUrlButtonProps {
  className?: string
  url?: string
}

function CopyUrlButton({ url, className = '' }: CopyUrlButtonProps) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    navigator.clipboard.writeText(url || window.location.href)
  }
  return (
    <button
      type='button'
      onClick={onClick}
      className={`inline-block rounded-lg border border-neutral-700 bg-neutral-800 px-6 py-2.5 shadow transition-colors hover:bg-primary-300 hover:text-neutral-800 ${className}`}>
      <DuplicateIcon width='16' />
      <span className='sr-only'>Copy URL</span>
    </button>
  )
}

export default CopyUrlButton
