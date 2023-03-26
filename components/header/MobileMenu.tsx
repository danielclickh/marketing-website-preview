import {
  autoUpdate,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon, MenuIcon, XIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { CUIButton, CUILink } from '../ClickUI'
import MobileMenuItem from './MobileMenuItem'
import menuItems from './menuItems.json'
import { MenuItem as MenuItemType } from './types'

const headerMenuItems = menuItems as Array<MenuItemType>
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { y, strategy, floating, reference, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    strategy: 'fixed',
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 20
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
    <>
      <div
        className='bg-slate text-neutral-200 rounded-md p-2 inline-flex items-center justify-center hover:text-neutral-0 focus:outline-none md:hidden'
        ref={reference}
        {...getReferenceProps()}>
        <span className='sr-only'>Open menu</span>
        {isOpen ? (
          <XIcon className='h-4 w-4' aria-hidden='true' />
        ) : (
          <MenuIcon className='h-4 w-4' aria-hidden='true' />
        )}
      </div>
      {isOpen && (
        <div
          className='flex flex-col justify-between bg-menu-options divide-y divide-neutral-900/11 w-full backdrop-blur-[10px]'
          ref={floating}
          style={{
            position: strategy,
            top: 72,
            left: 0,
            height: 'calc(100vh - 72px)'
          }}
          {...getFloatingProps()}>
          <div className='pt-8 mb-6 overflow-auto h-[stretch]'>
            <div className='flex items-top justify-between mt-6 w-full'>
              <nav className='flex flex-col w-full'>
                {headerMenuItems.map((menuItem) => {
                  if ((menuItem.menuItems ?? []).length > 0) {
                    return (
                      <Disclosure as='div'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full justify-between rounded-lg text-left text-sm font-medium focus:outline-none focus-visible:ring-opacity-75 px-4 sm:px-8 mb-2'>
                              <span>{menuItem.name}</span>
                              <ChevronRightIcon
                                className={`${
                                  open ? 'rotate-90 transform' : ''
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className='text-sm text-gray-500 mb-2'>
                              <MobileMenuItem
                                {...menuItem}
                                close={() => setIsOpen(false)}
                              />
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  } else if (menuItem.href) {
                    return (
                      <CUILink
                        key={menuItem.name}
                        href={menuItem.href}
                        target={menuItem?.target}
                        onClick={() => setIsOpen(false)}
                        segmentEvent={{
                          label: menuItem.name,
                          category: 'website-nav'
                        }}
                        className='menu-item text-sm hover:no-underline font-medium px-4 sm:px-8 mb-2'>
                        {menuItem.name}
                      </CUILink>
                    )
                  }
                })}
              </nav>
            </div>
          </div>
          <div className='py-6 px-5 grid gap-4 w-full grid-cols-2'>
            <CUIButton
              type='primary'
              href='https://clickhouse.cloud/signUp'
              target='_self'
              segmentEvent={{
                label: 'Get Started',
                category: 'website-nav'
              }}
              className='w-full'>
              Get Started
            </CUIButton>
            <CUIButton
              type='secondary'
              href='https://clickhouse.cloud/signIn'
              target='_self'
              segmentEvent={{
                label: 'Sign in',
                category: 'website-nav'
              }}
              className='w-full'>
              Sign in
            </CUIButton>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
