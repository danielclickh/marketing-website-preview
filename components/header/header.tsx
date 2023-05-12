import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

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
import { CUIButton, CUILink } from '../ClickUI'
import menuItems from './menuItems.json'
import logoFull from '../../public/logo-full.svg'
import { HeaderProps, MenuItem as MenuItemType } from './types'
import MobileMenuItem from './MobileMenuItem'
import GlobalMenu from './GlobalMenu'
import Banner from './Banner'
const headerMenuItems = menuItems as Array<MenuItemType>

export default function Header({ header, github: { stars } }: HeaderProps) {
  const navBarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { strategy, floating, reference, context } = useFloating({
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

  const onscroll = function () {
    if (navBarRef.current) {
      if (window.pageYOffset > 0) {
        // pageYOffset or scrollY
        navBarRef.current.classList.add('scrolled')
      } else {
        navBarRef.current.classList.remove('scrolled')
      }
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', onscroll)
    return () => {
      document.removeEventListener('scroll', onscroll)
    }
  }, [])

  return (
    <>
      <div
        className={styles.navBarContainer}
        ref={navBarRef}
        id='nav-container'>
        <Banner content={header?.banner ?? ''} />
        <nav className='no-wrap section-container relative flex w-full items-center justify-between py-4'>
          <Link
            href='/'
            className='absolute z-10 flex items-center gap-x-3 hover:no-underline'>
            <Image
              src={logoFull}
              priority
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
          </Link>

          <GlobalMenu />

          <div className='absolute right-8 z-10 hidden flex-nowrap items-center gap-4 md:flex lg:gap-6 2xl:right-0'>
            <CUILink
              key='github-stars-nav'
              href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
              target='_blank'
              className='hidden hover:text-neutral-400 hover:no-underline lg:flex '
              segmentEvent={{
                label: 'GitHub Stars',
                category: 'website-nav'
              }}>
              <div className='flex items-center gap-2  hover:no-underline'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8 1.75C4.27062 1.75 1.25 4.77062 1.25 8.5C1.25 11.4869 3.18219 14.0097 5.86531 14.9041C6.20281 14.9631 6.32937 14.7606 6.32937 14.5834C6.32937 14.4231 6.32094 13.8916 6.32094 13.3263C4.625 13.6384 4.18625 12.9128 4.05125 12.5331C3.97531 12.3391 3.64625 11.74 3.35938 11.5797C3.12312 11.4531 2.78562 11.1409 3.35094 11.1325C3.8825 11.1241 4.26219 11.6219 4.38875 11.8244C4.99625 12.8453 5.96656 12.5584 6.35469 12.3813C6.41375 11.9425 6.59094 11.6472 6.785 11.4784C5.28312 11.3097 3.71375 10.7275 3.71375 8.14563C3.71375 7.41156 3.97531 6.80406 4.40563 6.33156C4.33812 6.16281 4.10187 5.47094 4.47312 4.54281C4.47312 4.54281 5.03844 4.36563 6.32937 5.23469C6.86937 5.08281 7.44313 5.00687 8.01688 5.00687C8.59063 5.00687 9.16438 5.08281 9.70438 5.23469C10.9953 4.35719 11.5606 4.54281 11.5606 4.54281C11.9319 5.47094 11.6956 6.16281 11.6281 6.33156C12.0584 6.80406 12.32 7.40312 12.32 8.14563C12.32 10.7359 10.7422 11.3097 9.24031 11.4784C9.485 11.6894 9.69594 12.0944 9.69594 12.7272C9.69594 13.63 9.6875 14.3556 9.6875 14.5834C9.6875 14.7606 9.81406 14.9716 10.1516 14.9041C12.8178 14.0097 14.75 11.4784 14.75 8.5C14.75 4.77062 11.7294 1.75 8 1.75Z'
                    fill='currentColor'
                  />
                </svg>

                <span className='text-sm font-medium leading-none'>
                  {Intl.NumberFormat('en', {
                    notation: 'compact',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  })
                    .format(stars)
                    .toLowerCase()}
                </span>
              </div>
            </CUILink>
            <CUILink
              href='https://clickhouse.cloud/signIn'
              target='_self'
              segmentEvent={{
                label: 'Sign in',
                category: 'website-nav'
              }}
              className='inline-flex items-center text-sm font-medium ease-in-out hover:text-neutral-400 hover:no-underline'>
              Sign in
            </CUILink>
            <CUIButton
              type='primary'
              weight='medium'
              href='https://clickhouse.cloud/signUp?loc=nav-get-started'
              segmentEvent={{
                label: 'Get started',
                category: 'website-nav'
              }}
              target='_self'>
              Get started
            </CUIButton>
          </div>

          <div
            className='inline-flex items-center justify-center rounded-md bg-slate p-2 text-neutral-200 hover:text-neutral-0 focus:outline-none md:hidden'
            ref={reference}
            {...getReferenceProps()}>
            <span className='sr-only'>Open menu</span>
            {isOpen ? (
              <XIcon className='h-4 w-4' aria-hidden='true' />
            ) : (
              <MenuIcon className='h-4 w-4' aria-hidden='true' />
            )}
          </div>
        </nav>
      </div>
      {isOpen && (
        <div
          className='divide-neutral-900/11 z-30 flex w-full flex-col justify-between divide-y bg-menu-options backdrop-blur-[10px]'
          ref={floating}
          style={{
            position: strategy,
            top: 64,
            left: 0,
            height: 'calc(100vh - 64px)'
          }}
          {...getFloatingProps()}>
          <div className='mb-6 h-[stretch] overflow-auto pt-8'>
            <div className='items-top flex w-full justify-between'>
              <nav className='flex w-full flex-col'>
                {headerMenuItems.map((menuItem) => {
                  if ((menuItem.menuItems ?? []).length > 0) {
                    return (
                      <Disclosure as='div'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full justify-between rounded-lg px-4 py-2 text-left text-lg font-medium focus:outline-none focus-visible:ring-opacity-75 sm:px-8'>
                              <span>{menuItem.name}</span>
                              <ChevronRightIcon
                                className={`${
                                  open ? 'rotate-90 transform' : ''
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className='text-md mt-2 mb-2 text-neutral-400'>
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
                        className='menu-item px-4 py-2 text-lg font-medium hover:no-underline sm:px-8'>
                        {menuItem.name}
                      </CUILink>
                    )
                  }
                })}
              </nav>
            </div>
          </div>

          <div className='grid w-full grid-cols-2 gap-4 py-6 px-5'>
            <CUIButton
              type='primary'
              href='https://clickhouse.cloud/signUp'
              target='_self'
              segmentEvent={{
                label: 'Get started',
                category: 'website-nav'
              }}
              className='w-full'>
              Get started
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
