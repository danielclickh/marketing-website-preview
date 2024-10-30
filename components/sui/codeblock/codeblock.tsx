import { DuplicateIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useRef,
  useState
} from 'react'
import { FullyQualifiedEvent } from '../../../lib/galaxy/client'
import { useGalaxyOnClick } from '../../../lib/galaxy/galaxy'
import styles from './styles.module.scss'

export interface CodeblockProps extends HTMLAttributes<HTMLPreElement> {
  bgColor?: string | undefined
  children: ReactElement
  showCopy?: boolean
  galaxyEvent?: FullyQualifiedEvent
}

export const SuiCodeblock: FunctionComponent<CodeblockProps> = ({
  bgColor,
  children,
  className = '',
  showCopy = true,
  galaxyEvent,
  ...CodeblockProps
}) => {
  const ref = useRef<HTMLPreElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const galaxyOnClick = useGalaxyOnClick(galaxyEvent || 'default.event.name')

  const useOnClick = () => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText)

      if (galaxyEvent && window.galaxy) {
        galaxyOnClick()
      }

      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }
  }

  return (
    <>
      <pre
        className={`${styles.codePre}  ${className}`}
        ref={ref}
        {...CodeblockProps}>
        {showCopy && (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root open={isOpen}>
              <Tooltip.Trigger asChild>
                <button
                  className={`${styles.copyBtn} codeblock-copy-btn hidden md:block`}
                  onClick={useOnClick}>
                  <DuplicateIcon className='h-4 w-4' />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className='rounded-lg bg-neutral-750 px-3 py-2 shadow-click-card'
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
