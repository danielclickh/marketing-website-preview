import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { DuplicateIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

export interface CodeblockProps extends HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
  showCopy?: boolean
  galaxyEvent?: FullyQualifiedEvent
  copyValue?: string
}

export default function SuiCodeblock({
  children,
  className = '',
  showCopy = true,
  copyValue,
  galaxyEvent,
  ...props
}: CodeblockProps) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  // Reset tooltip
  useEffect(() => {
    if (copied) {
      const timer = window.setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => window.clearTimeout(timer)
    }
  }, [copied])

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    const copyTextValue =
      typeof copyValue === 'string' ? copyValue : ref.current?.textContent || ''

    if (galaxyEvent) useGalaxyOnClick(galaxyEvent)()

    window.navigator.clipboard
      .writeText(copyTextValue)
      .then(() => {
        setCopied(true)
      })
      .catch((err) => {
        window.prompt(
          'Failed to copy. Please copy from the input below.',
          copyTextValue
        )
        console.error('Error copying to clipboard:', err)
      })
  }

  return (
    <pre
      className={`relative w-full overflow-auto break-all rounded-lg border border-neutral-700/40 bg-neutral-725 px-4 py-6 font-inconsolata font-semibold text-neutral-0 shadow-xl lg:px-8 ${className}`}
      ref={ref}
      {...props}>
      {showCopy && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root open={copied}>
            <Tooltip.Trigger asChild>
              <button
                type='button'
                className='absolute inset-0 z-30 grid place-items-center md:bottom-auto md:left-auto md:right-8 md:top-6 md:h-6 md:w-6 md:rounded md:text-neutral-400 md:hover:bg-neutral-800 md:hover:text-neutral-500'
                onClick={handleClick}>
                <DuplicateIcon className='hidden h-4 w-4 md:block' />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className='relative z-50 rounded-lg bg-neutral-750 px-3 py-2 shadow-click-card'
                sideOffset={5}
                side='top'>
                Copied
                <Tooltip.Arrow className='fill-neutral-750' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
      {children}
    </pre>
  )
}
