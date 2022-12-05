'use client'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { SuiButton } from '../sui'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, CloudIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { LogoClickHouse } from '../icons/logo_clickhouse'

const products = [
  {
    name: 'ClickHouse Cloud',
    description: 'Fully-managed, autonomous ClickHouse services in the Cloud.',
    href: '/clickhouse-cloud/',
    icon: CloudIcon
  },
  {
    name: 'ClickHouse',
    description: 'Open source column-orientated database management system.',
    href: '/clickhouse/',
    icon: null
  }
]

const company = [
  {
    name: 'Blog',
    description: 'Stay up to date with the latest news and releases.',
    href: '/blog/'
  },
  {
    name: 'Our story',
    description: 'Who we are and what we stand for.',
    href: '/company/our-story/'
  },
  {
    name: 'Careers',
    description: 'Come and help us create something amazing.',
    href: '/company/careers/'
  },
  {
    name: 'Contact us',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '/company/contact/'
  },
  {
    name: 'News and events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '/company/news-events/'
  }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <Popover
      className={`bg-web-light-c1 dark:bg-web-dark-c1 shadow-sm  dark:border-b dark:border-web-dark-c2 pt-2 bg-opacity-100 dark:opacity-100 h-16 backdrop-blur-lg dark:backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300 ${
        true ? 'pt-2 shadow-sm bg-opacity-80 dark:bg-opacity-80' : ''
      }`}>
      <div className='container flex mx-auto md:pt-0 w-full px-4 mt-1 sm:px-8 2xl:px-0 max-w-7xl'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <div className='md:w-3/12'>
              <a href='/'>
                <LogoClickHouse />
              </a>
            </div>
            <div className='md:w-6/12 flex justify-center'>
              <div className='flex justify-between items-center md:justify-start'>
                <div className='-mr-2 -my-2 md:hidden'>
                  <Popover.Button className='bg-web-light-c1 dark:bg-web-dark-c1 rounded-md p-2 inline-flex items-center justify-center text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 hover:dark:text-web-dark-c4 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 focus:outline-none'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
                <div className='hidden md:flex-1 md:flex md:items-center md:justify-between'>
                  <Popover.Group as='nav' className='flex space-x-10'>
                    <Popover className='relative'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'text-web-light-c4 dark:text-web-dark-c4'
                                : 'text-web-light-c5 dark:text-web-dark-c5 ease-in-out hover:text-web-light-c4 dark:hover:text-web-dark-c4',
                              'group rounded-md inline-flex items-center text-sm font-semibold focus:outline-none group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4'
                            )}>
                            <span>Products</span>
                            <ChevronDownIcon
                              className={classNames(
                                open
                                  ? 'text-web-light-c4 dark:text-web-dark-c4'
                                  : 'text-web-light-c5 dark:text-web-dark-c5',
                                'ml-1 h-5 w-5 ease-in-out group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4'
                              )}
                              aria-hidden='true'
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'>
                            <Popover.Panel className='absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-1xl'>
                              <div className='rounded-lg shadow-lg border border-web-light-c2 dark:border-web-dark-c2 ring-0 ring-opacity-5 overflow-hidden'>
                                <div className='relative grid gap-6 bg-web-light-c1 dark:bg-web-dark-c1 px-5 py-6 sm:gap-0 sm:p-0'>
                                  {products.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      className='flex items-start'>
                                      <div className='flex rounded-lg hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 p-3 md:px-6 md:pt-4 cursor-pointer'>
                                        <div className='flex-shrink-0 flex justify-center h-10 w-10 rounded-md text-light-purple3 sm:h-12 sm:w-12 md:mr-4'>
                                          {item.icon ? (
                                            <item.icon
                                              className='h-10 w-10 text-web-light-c5 dark:text-web-dark-c5'
                                              aria-hidden='true'
                                            />
                                          ) : (
                                            <Image
                                              src='/icon_clickhouse.svg'
                                              alt='ClickHouse'
                                              width='32'
                                              height='32'
                                            />
                                          )}
                                        </div>
                                        <div className=''>
                                          <p className='text-base font-medium text-web-light-c5 dark:text-web-dark-c5'>
                                            {item.name}
                                          </p>
                                          <p className='mt-1 text-sm text-web-light-c4 dark:text-web-dark-c4'>
                                            {item.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                    <a
                      href='https://clickhouse.com/docs/'
                      className='inline-flex items-center text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out'>
                      Docs
                    </a>
                    <div className='hidden lg:flex items-center text-sm font-semibold text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out'>
                      <Link href='/customer-stories/'>Use cases</Link>
                    </div>

                    <Popover className='relative'>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'text-web-light-c4 dark:text-web-dark-c4'
                                : 'text-web-light-c5 dark:text-web-dark-c5 ease-in-out hover:text-web-light-c4 dark:hover:text-web-dark-c4',
                              'group rounded-md inline-flex items-center text-sm font-semibold focus:outline-none group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4'
                            )}>
                            <span>Company</span>
                            <ChevronDownIcon
                              className={classNames(
                                open
                                  ? 'text-web-light-c4 dark:text-web-dark-c4'
                                  : 'text-web-light-c5 dark:text-web-dark-c5',
                                'ml-1 h-5 w-5 ease-in-out group-hover:text-web-light-c4 dark:group-hover:text-web-dark-c4'
                              )}
                              aria-hidden='true'
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'>
                            <Popover.Panel className='absolute z-10 left-1/2 md:left-full leftransform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs md:w-52 sm:px-0'>
                              <div className='rounded-lg shadow-lg border border-web-light-c2 dark:border-web-dark-c2 ring-0 overflow-hidden'>
                                <div className='relative grid gap-4 bg-web-light-c1 dark:bg-web-dark-c1 px-5 py-6 sm:gap-0 sm:p-0 sm:py-2'>
                                  {company.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className='py-2 px-6 block w-full hover:bg-web-light-c2 hover:dark:bg-web-dark-c2'>
                                      <p className='text-sm font-medium text-web-light-c5 dark:text-web-dark-c5 '>
                                        {item.name}
                                      </p>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </Popover.Group>
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
                  className='absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
                  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-web-light-c1 dark:bg-web-dark-c1 divide-y-2 divide-web-light-c2 dark:divide-web-dark-c2'>
                    <div className='pt-5 pb-6 px-5'>
                      <div className='flex items-top justify-between'>
                        <div className='mt-6'>
                          <nav className='grid gap-6'>
                            {products.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className='-m-3 p-3 flex items-center rounded-lg hover:bg-web-light-c2 hover:dark:bg-web-dark-c2'>
                                <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md text-web-light-c4 dark:text-web-dark-c4'>
                                  {item.icon ? (
                                    <item.icon
                                      className='h-10 w-10'
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <Image
                                      src='/icon_clickhouse.svg'
                                      alt='ClickHouse'
                                      width='32'
                                      height='32'
                                    />
                                  )}
                                </div>
                                <div className='ml-4 text-base font-medium text-web-light-c5 dark:text-web-dark-c5'>
                                  {item.name}
                                </div>
                              </a>
                            ))}
                          </nav>
                        </div>
                        <div className='-mr-2'>
                          <Popover.Button className='bg-web-light-c1 dark:bg-web-dark-c2 rounded-md p-2 inline-flex items-center justify-center text-web-light-c5 dark:text-web-dark-c5 hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out focus:outline-none'>
                            <span className='sr-only'>Close menu</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className='py-6 px-5'>
                      <div className='grid grid-cols-2 gap-4'>
                        <a
                          href='#'
                          className='text-base font-medium text-web-light-c5 dark:text-web-dark-c5'>
                          Docs
                        </a>

                        <a
                          href='#'
                          className='text-base font-medium text-web-light-c5 dark:text-web-dark-c5'>
                          Use cases
                        </a>

                        {company.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className='text-base font-medium text-web-light-c5 dark:text-web-dark-c5'>
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className='mt-6'>
                        <SuiButton
                          path='https://clickhouse.cloud/signIn'
                          title='Learn more'></SuiButton>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>

            <div className='hidden md:w-3/12 md:flex justify-end'>
              <div className='flex items-center'>
                {theme === 'dark' ? (
                  <div className='flex space-x-4'>
                    <SunIcon
                      className='w-4 h-4 text-web-dark-c5 cursor-pointer'
                      onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }
                    />
                    <MoonIcon className='w-4 h-4 text-web-dark-c4' />
                  </div>
                ) : (
                  <div className='flex space-x-4'>
                    <SunIcon className='w-4 h-4 text-web-light-c4' />
                    <MoonIcon
                      className='w-4 h-4 text-web-light-c5 cursor-pointer'
                      onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }
                    />
                  </div>
                )}
              </div>

              <div className='flex items-center md:ml-12'>
                <SuiButton path='/clickhouse/' title='Learn more'></SuiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  )
}
