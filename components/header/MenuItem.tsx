import { Fragment, ReactNode, useRef, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import styles from './Header.module.scss'
import {
  autoUpdate,
  autoPlacement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  FloatingArrow,
  arrow,
  offset
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
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ])

  return (
    <Popover className='relative' key={name}>
      <Popover.Button
        ref={reference}
        data-open={isOpen}
        className={`${styles.header_popover} group group-hover:underline data-[open=true]:underline hover:underline`}
        {...getReferenceProps()}>
        <span>{name}</span>
        <ChevronDownIcon className='text-c5 ml-1 h-5 w-5' aria-hidden='true' />
      </Popover.Button>

      <Transition
        as={Fragment}
        show={isOpen}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel
          className='absolute z-10 transform w-max lg:max-w-1xl bg-navDropdown rounded-lg border border-neutral-700/30'
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0
          }}
          {...getFloatingProps()}>
          {({ close }) => (
            <>
              <FloatingArrow ref={arrowEl} context={context} />
              <div
                className='rounded-lg shadow-lg overflow-hidden'
                onClick={() => close()}>
                <div
                  className={`relative flex flex-nowrap gap-6 justify-between lg:justify-start ${
                    padding ? 'px-1 pt-3 pb-4' : ''
                  }`}>
                  {children}
                </div>
              </div>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
export default MenuItem
