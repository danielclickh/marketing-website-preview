import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { DuplicateIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

export interface CodeblockProps extends HTMLAttributes<HTMLPreElement> {
  bgColor?: string | undefined
  children: React.ReactNode
  showCopy?: boolean
  galaxyEvent?: FullyQualifiedEvent
  copyValue?: string
}

export const SuiCodeblock: FunctionComponent<CodeblockProps> = ({
  bgColor,
  children,
  className = '',
  showCopy = true,
  copyValue,
  galaxyEvent,
  ...CodeblockProps
}) => {
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
    <>
      <pre
        className={`relative break-all rounded-lg border border-neutral-700/40 bg-neutral-725 px-8 py-6 font-inconsolata font-semibold text-neutral-0 shadow-xl backdrop-blur-sm ${className}`}
        ref={ref}
        {...CodeblockProps}>
        {showCopy && (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root open={copied}>
              <Tooltip.Trigger asChild>
                <button
                  type='button'
                  className='absolute right-0 top-0 z-30 mr-8 mt-6 hidden h-6 w-6 place-items-center rounded text-neutral-400 hover:bg-neutral-800 hover:text-neutral-500 md:grid'
                  onClick={handleClick}>
                  <DuplicateIcon className='h-4 w-4' />
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
    </>
  )
}
