'use client'

import { useSmartBack } from '@/components-cleaned/SmartBackProvider'

export interface SmartBackButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type'> {
  fallbackPath: string
}

export default function SmartBackButton({
  fallbackPath,
  children,
  onClick,
  ...props
}: SmartBackButtonProps) {
  const { goBack } = useSmartBack()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    goBack(fallbackPath)
    onClick?.(event)
  }

  return (
    <button type='button' onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
