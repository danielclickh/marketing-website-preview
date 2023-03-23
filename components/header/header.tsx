import { SuiButton, SuiLink, SuiText } from '../sui'

import { Fragment } from 'react'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import MenuItem from './MenuItem'
import Image from 'next/image'
import menuItems from './menuItems.json'
import MobileMenuItem from './MobileMenuItem'
import { ChevronRightIcon } from '@heroicons/react/solid'
import logoFull from '../../public/logo-full.svg'
import { CUILink } from '../ClickUI'
import { HeaderLinkItem, MenuItem as MenuItemType } from './types'
import Option from './Option'

export default function Header() {
  return (
    <Popover className='shadow-sm bg-neutral-900/11 border-b border-primary-700 h-full backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300'>
      {({ open }) => (
        <>
          <div className='flex mx-auto w-full px-4 sm:px-8 2xl:px-0 max-w-7xl h-16 items-center relative z-50 shadow-sm dark:border-b dark:border-c2-dark backdrop-blur-lg'>
            <div className='flex flex-col w-full'>
              <div className='grid grid-cols-[auto_1fr] items-center w-full'>
                <Link
                  href='/'
                  className='flex items-center gap-x-3 hover:no-underline'>
                  <Image
                    src={logoFull}
                    width='135'
                    height='40'
                    alt='ClickHouse logo'
                  />
                </Link>
                <div className='flex justify-center w-full'>
                  <div className='flex justify-between items-center md:justify-start w-full'>
                    <div className='-mr-2 -my-2 min-[930px]:hidden ml-auto'>
                      <Popover.Button className='bg-slate text-neutral-200 rounded-md p-2 inline-flex items-center justify-center hover:text-neutral-0 focus:outline-none'>
                        <span className='sr-only'>Open menu</span>
                        {open ? (
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        ) : (
                          <MenuIcon className='h-6 w-6' aria-hidden='true' />
                        )}
                      </Popover.Button>
                    </div>
                    <div className='hidden md:flex-1 min-[930px]:flex min-[930px]:items-center min-[930px]:justify-between w-full'>
                      <Popover.Group
                        as='nav'
                        className='flex items-center space-x-4 lg:space-x-6 xl:space-x-10 w-full'>
                        <div className='flex space-x-4 mx-auto'>
                          {menuItems.map((menuItem) => {
                            if (
                              menuItem?.menuItems &&
                              menuItem?.menuItems.length > 0
                            ) {
                              const firstSubitem = menuItem.menuItems[0]
                              return (
                                <MenuItem
                                  key={menuItem.name}
                                  name={menuItem.name}
                                  padding={
                                    (firstSubitem.name || '')?.length > 0
                                  }>
                                  {menuItem.menuItems.map((subitem) => {
                                    if (
                                      subitem.menuItems &&
                                      subitem.menuItems.length > 0
                                    ) {
                                      return (
                                        <div className='flex flex-col'>
                                          {subitem.name && (
                                            <div className='mb-3 pl-3 text-c4 font-semibold text-sm'>
                                              {subitem.name}
                                            </div>
                                          )}
                                          {subitem.menuItems.map(
                                            (item: HeaderLinkItem) => (
                                              <Option
                                                key={item.name}
                                                {...item}
                                              />
                                            )
                                          )}
                                        </div>
                                      )
                                    } else if (subitem?.href) {
                                      return (
                                        <Option
                                          key={subitem.name}
                                          {...subitem}
                                        />
                                      )
                                    }
                                    return null
                                  })}
                                </MenuItem>
                              )
                            } else if (menuItem?.href) {
                              return (
                                <SuiLink
                                  key={menuItem.name}
                                  href={menuItem.href}
                                  target={menuItem.target}
                                  segmentEvent={{
                                    label: menuItem.name,
                                    category: 'website-nav'
                                  }}
                                  className='inline-flex items-center text-sm font-medium text-c5 max-w-md'>
                                  {menuItem.name}
                                </SuiLink>
                              )
                            }
                            return null
                          })}
                        </div>
                        <CUILink
                          key='github-stars-nav'
                          href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
                          target='_blank'
                          className='hidden lg:block'
                          segmentEvent={{
                            label: 'GitHub Stars',
                            category: 'website-nav'
                          }}>
                          <div className='flex items-center '>
                            <svg
                              viewBox='0 0 24 24'
                              aria-hidden='true'
                              className='h-6 w-6 dark:fill-neutral-0 fill-neutral-0 mr-1'>
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z'></path>
                            </svg>
                            <span className='text-xs font-medium text-neutral-0'>
                              27.6k
                            </span>
                          </div>
                        </CUILink>
                        <div className='flex items-center md:ml-12 space-x-2 lg:space-x-4'>
                          <SuiButton
                            type='primary'
                            path='https://clickhouse.cloud/signUp'
                            segmentEvent={{
                              label: 'Get Started',
                              category: 'website-nav'
                            }}
                            target='_self'>
                            Get Started
                          </SuiButton>
                          <SuiLink
                            href='https://clickhouse.cloud/signIn'
                            target='_self'
                            segmentEvent={{
                              label: 'Sign in',
                              category: 'website-nav'
                            }}
                            className='inline-flex items-center text-sm font-medium text-c5 ease-in-out'>
                            Sign in
                          </SuiLink>
                        </div>
                      </Popover.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <Popover.Panel
              focus
              className='fixed inset-0 z-10 inset-x-0 transition transform origin-top-right min-[930px]:hidden h-screen bg-neutral-750'>
              {({ close }) => (
                <div className='h-full flex flex-col justify-between rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-c2'>
                  <div className='mt-16 mb-6 px-4 sm:px-8 overflow-auto h-[stretch]'>
                    <div className='flex items-top justify-between mt-6 w-full'>
                      <nav className='flex flex-col gap-2 w-full'>
                        {menuItems.map((menuItem: MenuItemType) => {
                          if ((menuItem.menuItems ?? []).length > 0) {
                            if (!menuItem.name) {
                              return (
                                <MobileMenuItem {...menuItem} close={close} />
                              )
                            }
                            return (
                              <Disclosure as='div'>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className='flex w-full justify-between rounded-lg text-left text-sm font-medium focus:outline-none focus-visible:ring-opacity-75'>
                                      <span>{menuItem.name}</span>
                                      <ChevronRightIcon
                                        className={`${
                                          open ? 'rotate-90 transform' : ''
                                        } h-5 w-5`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className='text-sm text-gray-500'>
                                      <MobileMenuItem
                                        {...menuItem}
                                        close={close}
                                      />
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            )
                          } else if (menuItem.href) {
                            return (
                              <SuiLink
                                key={menuItem.name}
                                href={menuItem.href}
                                target={menuItem?.target}
                                segmentEvent={{
                                  label: menuItem.name,
                                  category: 'website-nav'
                                }}
                                className='menu-item text-sm hover:no-underline font-medium text-c5'>
                                {menuItem.name}
                              </SuiLink>
                            )
                          }
                        })}
                      </nav>
                    </div>
                  </div>
                  <div className='py-6 px-5 grid gap-4 w-full grid-cols-2'>
                    <SuiButton
                      type='primary'
                      path='https://clickhouse.cloud/signUp'
                      target='_self'
                      segmentEvent={{
                        label: 'Get Started',
                        category: 'website-nav'
                      }}
                      className='w-full'>
                      Get Started
                    </SuiButton>
                    <SuiButton
                      type='secondary'
                      path='https://clickhouse.cloud/signIn'
                      target='_self'
                      segmentEvent={{
                        label: 'Sign in',
                        category: 'website-nav'
                      }}
                      className='w-full'>
                      Sign in
                    </SuiButton>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
