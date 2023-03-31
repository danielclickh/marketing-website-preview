import { arrow, FloatingArrow, offset, useFloating } from '@floating-ui/react'
import { DuplicateIcon } from '@heroicons/react/outline'
import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useRef,
  useState
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
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const onClick = () => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText)
      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    }
  }

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    strategy: 'fixed',
    placement: 'top-end',
    middleware: [
      arrow({
        element: arrowRef
      }),
      offset({
        mainAxis: 10
      })
    ]
  })

  return (
    <>
      <pre
        className={`${styles.codePre}  ${className}`}
        ref={ref}
        {...CodeblockProps}>
        {showCopy && (
          <button
            ref={refs.setReference}
            className={`${styles.copyBtn} codeblock-copy-btn`}
            onClick={onClick}>
            <DuplicateIcon className='h-4 w-4' />
          </button>
        )}
        {children}
      </pre>
      {isOpen && (
        <div
          ref={refs.setFloating}
          className='bg-neutral-750 shadow-click-card px-3 py-2 rounded-lg'
          style={{ top: y ?? 0, left: x ?? 0, position: strategy }}>
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className='fill-neutral-750'
          />
          Copied Successfully
        </div>
      )}
    </>
  )
}
