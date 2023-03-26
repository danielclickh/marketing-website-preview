import { useRef, useState } from 'react'
import styles from './styles.module.scss'
import {
  autoUpdate,
  autoPlacement,
  shift,
  size,
  useHover,
  useDismiss,
  useFloating,
  useInteractions,
  offset,
  safePolygon,
  ClientRectObject
} from '@floating-ui/react'
import Option from './Option'
import { HeaderTopNavItem } from './types'

const MenuItem = ({
  name,
  menuItems,
  padding = false,
  index = 0,
  onHover,
  onHoverLeave
}: {
  name: string
  menuItems: Array<HeaderTopNavItem>
  padding: boolean
  index: number
  onHover: (
    floatingCoords: DOMRect,
    refCoords: DOMRect | ClientRectObject
  ) => void
  onHoverLeave: () => void
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (value: boolean) => {
    setIsOpen(value)
    if (value) {
      if (ref.current) {
        setTimeout(
          () =>
            ref.current &&
            ref.current.classList.contains('trigger-enter') &&
            ref.current.classList.add('trigger-enter-active'),
          150
        )
        const floatingCoords =
          context.refs.floating.current?.getBoundingClientRect()
        const refCoords =
          context.refs.reference.current?.getBoundingClientRect()
        floatingCoords && refCoords && onHover(floatingCoords, refCoords)
      }
    } else if (ref.current) {
      ref.current.classList.remove('trigger-enter-active')
      onHoverLeave()
    }
  }
  const { x, y, strategy, floating, reference, context } = useFloating({
    open: isOpen,
    onOpenChange,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`
          })
        }
      }),
      shift(),
      autoPlacement(),
      offset({
        crossAxis: 60,
        mainAxis: 10
      })
    ]
  })

  const hover = useHover(context, {
    handleClose: safePolygon({
      restMs: 50
    })
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss
  ])

  return (
    <li
      ref={ref}
      className={isOpen ? `${styles.triggerEnter} trigger-enter` : ''}>
      <div
        ref={reference}
        data-open={isOpen}
        className={`${styles.headerPopover} group group-hover:text-neutral-400 data-[open=true]:text-neutral-400 hover:text-neutral-400 cursor-pointer px-2 lg:px-4 py-2.5`}
        {...getReferenceProps()}>
        {name}
      </div>
      <div
        className={`${styles.floatingContent} ${isOpen ? 'flex' : 'hidden'}`}
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0
        }}
        {...getFloatingProps()}>
        <div className='overflow-hidden'>
          <div
            className={`relative flex flex-nowrap gap-6 justify-between lg:justify-start ${
              padding ? 'px-1 pt-3 pb-4' : ''
            } ${styles.dropdown} dropdown ${
              styles.dropdownText
            } dropdown-${index}`}>
            {menuItems.map((subitem) => (
              <div className='flex flex-col' key={subitem.name}>
                <div className='mb-7 pl-3 font-semibold text-sm min-h-[1lh]'>
                  {subitem.name}
                </div>
                <div className='h-full'>
                  {subitem.menuItems.map((item) => (
                    <Option key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}
export default MenuItem
