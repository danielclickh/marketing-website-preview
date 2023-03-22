import { DuplicateIcon } from '@heroicons/react/outline'
import {
  ClipboardCopyIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/solid'
import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useRef
} from 'react'
import styles from './styles.module.scss'

export interface CodeblockProps extends HTMLAttributes<HTMLPreElement> {
  bgColor?: string | undefined
  children: ReactElement
  showCopy?: boolean
}

export const SuiCodeblock: FunctionComponent<CodeblockProps> = ({
  bgColor,
  children,
  className = '',
  showCopy = true,
  ...CodeblockProps
}) => {
  const ref = useRef<HTMLPreElement>(null)
  const onClick = () => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText)
    }
  }
  return (
    <pre
      className={`${styles.codePre}  ${className}`}
      ref={ref}
      {...CodeblockProps}>
      {showCopy && (
        <button
          className={`${styles.copyBtn} codeblock-copy-btn`}
          onClick={onClick}>
          <DuplicateIcon className='h-4 w-4' />
        </button>
      )}
      {children}
    </pre>
  )
}
