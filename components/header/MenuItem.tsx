import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
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
  ClientRectObject,
  FloatingPortal,
  computePosition
} from '@floating-ui/react'
import Option from './Option'
import { HeaderTopNavItem } from './types'
import { createPortal } from 'react-dom'

const MenuItem = ({
  name,
  menuItems,
  padding = false,
  index = 0,
  onHover,
  onHoverLeave,
  activeIndex,
  setActiveIndex,
  dropdownContainerRef
}: {
  name: string
  menuItems: Array<HeaderTopNavItem>
  padding: boolean
  index: number
  onHover: () => void
  onHoverLeave: () => void
  activeIndex?: number
  setActiveIndex: Dispatch<SetStateAction<number | undefined>>
  dropdownContainerRef: RefObject<HTMLElement>
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (value: boolean) => {
    setIsOpen(value)
    if (value) {
      setActiveIndex(index)
    }
  }
  const { x, y, floating, reference, context, elements } = useFloating({
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
        crossAxis: 10
      })
    ]
  })

  const hover = useHover(context, {
    handleClose: safePolygon({
      blockPointerEvents: false
    })
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss
  ])

  useLayoutEffect(() => {
    if (isOpen) {
      setActiveIndex(index)
      if (ref.current) {
        const navContainer = ref.current.closest(
          '#nav-container'
        ) as HTMLDivElement
        Object.assign(navContainer.style, {
          '--menuLeft': x,
          '--menuTop': y
        })
        onHover()
      }
    } else {
      ref.current && ref.current.classList.remove('trigger-enter-active')
      onHoverLeave()
    }
  }, [isOpen, x, y])

  useEffect(() => {
    if (isOpen && activeIndex !== index) setIsOpen(activeIndex !== index)
  }, [isOpen, activeIndex])

  return (
    <li
      ref={ref}
      className={`${isOpen ? `${styles.triggerEnter} trigger-enter` : ''}`}>
      <div
        id={`nav-item-${index}`}
        ref={reference}
        data-open={isOpen && activeIndex === index}
        className={`px-2 lg:px-4 py-2.5 ${styles.headerPopover} group group-hover:text-neutral-400 data-[open=true]:text-neutral-400 hover:text-neutral-400 cursor-pointer`}
        {...getReferenceProps()}>
        {name}
      </div>
      {dropdownContainerRef.current &&
        createPortal(
          <div
            className={`${styles.floatingContent} ${
              isOpen && activeIndex === index
                ? 'opacity-100'
                : 'opacity-0 -z-[1]'
            }`}
            id={`floating-container-${index}`}
            ref={floating}
            style={{
              position: 'absolute',
              top: 0,
              left: 0
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
          </div>,
          dropdownContainerRef.current
        )}
    </li>
  )
}
export default MenuItem
