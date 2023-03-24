import { SuiButton, SuiLink } from '../sui'

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
import { MenuItem as MenuItemType } from './types'
import Option from './Option'

const headerMenuItems = menuItems as Array<MenuItemType>
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
                          {headerMenuItems.map((menuItem) => {
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
                                  {menuItem.menuItems.map((subitem) => (
                                    <div className='flex flex-col'>
                                      <div className='mb-7 pl-3 text-c4 font-semibold text-sm min-h-[1lh]'>
                                        {subitem.name}
                                      </div>
                                      <div className='h-full'>
                                        {subitem.menuItems.map((item) => (
                                          <Option key={item.name} {...item} />
                                        ))}
                                      </div>
                                    </div>
                                  ))}
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
                          <div className='flex items-center gap-2'>
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M8 1.75C4.27062 1.75 1.25 4.77062 1.25 8.5C1.25 11.4869 3.18219 14.0097 5.86531 14.9041C6.20281 14.9631 6.32937 14.7606 6.32937 14.5834C6.32937 14.4231 6.32094 13.8916 6.32094 13.3263C4.625 13.6384 4.18625 12.9128 4.05125 12.5331C3.97531 12.3391 3.64625 11.74 3.35938 11.5797C3.12312 11.4531 2.78562 11.1409 3.35094 11.1325C3.8825 11.1241 4.26219 11.6219 4.38875 11.8244C4.99625 12.8453 5.96656 12.5584 6.35469 12.3813C6.41375 11.9425 6.59094 11.6472 6.785 11.4784C5.28312 11.3097 3.71375 10.7275 3.71375 8.14563C3.71375 7.41156 3.97531 6.80406 4.40563 6.33156C4.33812 6.16281 4.10187 5.47094 4.47312 4.54281C4.47312 4.54281 5.03844 4.36563 6.32937 5.23469C6.86937 5.08281 7.44313 5.00687 8.01688 5.00687C8.59063 5.00687 9.16438 5.08281 9.70438 5.23469C10.9953 4.35719 11.5606 4.54281 11.5606 4.54281C11.9319 5.47094 11.6956 6.16281 11.6281 6.33156C12.0584 6.80406 12.32 7.40312 12.32 8.14563C12.32 10.7359 10.7422 11.3097 9.24031 11.4784C9.485 11.6894 9.69594 12.0944 9.69594 12.7272C9.69594 13.63 9.6875 14.3556 9.6875 14.5834C9.6875 14.7606 9.81406 14.9716 10.1516 14.9041C12.8178 14.0097 14.75 11.4784 14.75 8.5C14.75 4.77062 11.7294 1.75 8 1.75Z'
                                fill='white'
                              />
                            </svg>

                            <span className='text-xs font-medium text-neutral-0 leading-none'>
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
                        {headerMenuItems.map((menuItem) => {
                          if ((menuItem.menuItems ?? []).length > 0) {
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
