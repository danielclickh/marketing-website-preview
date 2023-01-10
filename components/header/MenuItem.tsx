'use client'
import { Fragment, ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { PopoverButton, PopoverPanel } from '../HeadlessUIClient'
import styles from './Header.module.scss'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

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
        <PopoverButton
          data-open={open}
          className={`${styles.header_popover} group group-hover:text-c4 data-[open=true]:text-c4  hover:text-c4`}>
          <span>{name}</span>
          <ChevronDownIcon
            className={classNames(
              open ? 'text-c4' : 'text-c5',
              'ml-1 h-5 w-5 ease-in-out group-hover:text-c4'
            )}
            aria-hidden='true'
          />
        </PopoverButton>

        <Transition
          as={Fragment}
          show={open}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'>
          <PopoverPanel className='absolute z-10 -ml-4 mt-3 transform w-max max-w-md lg:max-w-1xl'>
            {({ close }) => (
              <div
                className='rounded-lg shadow-lg border border-c2 ring-0 ring-opacity-5 overflow-hidden'
                onClick={() => close()}>
                <div className='relative grid gap-6 bg-c1 px-5 py-6 sm:gap-0 sm:p-0'>
                  {children}
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </>
    )}
  </Popover>
)

export default MenuItem
