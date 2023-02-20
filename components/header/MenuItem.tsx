import { Fragment, ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import styles from './Header.module.scss'

const MenuItem = ({
  name,
  children
}: {
  name: string
  children: ReactNode
}) => (
  <Popover className='relative' key={name}>
    {({ open }) => (
      <>
        <Popover.Button
          data-open={open}
          className={`${styles.header_popover} group group-hover:underline data-[open=true]:underline hover:underline`}>
          <span>{name}</span>
          <ChevronDownIcon
            className='text-c5 ml-1 h-5 w-5'
            aria-hidden='true'
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          show={open}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'>
          <Popover.Panel className='absolute z-10 -ml-4 mt-3 transform w-max max-w-md lg:max-w-1xl'>
            {({ close }) => (
              <div
                className='rounded-lg shadow-lg border border-c2 ring-0 ring-opacity-5 overflow-hidden'
                onClick={() => close()}>
                <div className='relative grid gap-6 bg-c1 px-5 py-6 sm:gap-0 sm:p-0'>
                  {children}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
)

export default MenuItem
