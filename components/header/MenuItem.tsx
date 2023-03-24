import { ReactNode, useRef, useState } from 'react'
import styles from './Header.module.scss'
import {
  autoUpdate,
  autoPlacement,
  shift,
  size,
  useHover,
  useDismiss,
  useFloating,
  useInteractions,
  FloatingArrow,
  arrow,
  offset,
  safePolygon
} from '@floating-ui/react'

const MenuItem = ({
  name,
  children,
  padding = false
}: {
  name: string
  children: ReactNode
  padding: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowEl = useRef(null)
  const { x, y, strategy, floating, reference, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth - 40}px`,
            maxHeight: `${availableHeight}px`
          })
        }
      }),
      arrow({
        element: arrowEl
      }),
      shift(),
      autoPlacement(),
      offset({
        crossAxis: 20,
        mainAxis: 10
      })
    ]
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss
  ])

  return (
    <div className='relative' key={name}>
      <div
        ref={reference}
        data-open={isOpen}
        className={`${styles.header_popover} group group-hover:underline data-[open=true]:underline hover:underline`}
        {...getReferenceProps()}>
        {name}
      </div>
      {isOpen && (
        <>
          <FloatingArrow ref={arrowEl} context={context} />
          <div
            className='absolute z-10 transform w-max lg:max-w-1xl bg-navDropdown rounded-lg border border-t-0 border-neutral-700/30'
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}>
            <div className='rounded-lg shadow-lg overflow-hidden'>
              <div
                className={`relative flex flex-nowrap gap-6 justify-between lg:justify-start ${
                  padding ? 'px-1 pt-3 pb-4' : ''
                }`}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default MenuItem
