import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  autoUpdate,
  ClientRectObject,
  FloatingDelayGroup,
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
import { MenuItem as MenuItemType } from './types'
import styles from './styles.module.scss'
import MenuItem from './MenuItem'
import MobileMenuItem from './MobileMenuItem'

const headerMenuItems = menuItems as Array<MenuItemType>

export default function Header() {
  const navBarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | undefined>()
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

  const onHover = (
    height: number,
    width: number,
    referenceCoords: DOMRect | ClientRectObject | undefined
  ) => {
    if (dropdownRef.current) {
      const reference = navRef.current?.querySelector(
        `#nav-item-${activeIndex}`
      )
      dropdownRef.current.classList.add('open')
      dropdownRef.current.style.setProperty('width', `${width}px`)
      dropdownRef.current.style.setProperty('height', `${height}px`)
      if (arrowRef.current && referenceCoords) {
        arrowRef.current.classList.add('open')
        arrowRef.current.style.setProperty(
          'transform',
          `translateY(-50%) rotate(45deg)`
        )
        arrowRef.current.style.setProperty('top', `61px`)
        arrowRef.current.style.setProperty(
          'left',
          `${referenceCoords.left + referenceCoords.width / 2}px`
        )
      }
    }
  }

  const onHoverLeave = () => {
    setTimeout(() => {
      if (dropdownRef.current && navRef.current)
        if (!navRef.current.querySelector('.trigger-enter')) {
          arrowRef.current && arrowRef.current.classList.remove('open')
          dropdownRef.current.classList.remove('open')
        }
    }, 150)
  }

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
        <div className='relative'>
          <span className={`${styles.arrow} arrow`} ref={arrowRef}></span>
          <div className={styles.dropdownBackground} ref={dropdownRef}>
            <div id='dropdown-container' ref={dropdownContainerRef}></div>
          </div>
        </div>
        <nav className='relative flex no-wrap justify-between items-center section-container w-full py-4'>
          <Link
            href='/'
            className='flex items-center gap-x-3 hover:no-underline lg:min-w-[264px] '>
            <Image
              src={logoFull}
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
          </Link>
          <FloatingDelayGroup delay={{ open: 1000, close: 200 }}>
            <div className={styles.navWrapper} ref={navRef}>
              <ul className={`${styles.navList} navList`}>
                {headerMenuItems.map((menuItem, index) => {
                  if (menuItem.href) {
                    return (
                      <li className='px-2 lg:px-4' key={menuItem.name}>
                        <CUILink
                          id={`nav-item-${index}`}
                          key={menuItem.name}
                          href={menuItem.href}
                          target={menuItem.target}
                          segmentEvent={{
                            label: menuItem.name,
                            category: 'website-nav'
                          }}
                          className='inline-flex items-center text-sm max-w-md hover:text-neutral-400 hover:no-underline font-medium'>
                          {menuItem.name}
                        </CUILink>
                      </li>
                    )
                  } else if (
                    menuItem.menuItems &&
                    (menuItem?.menuItems ?? []).length > 0
                  ) {
                    const firstSubitem = menuItem.menuItems[0]
                    return (
                      <MenuItem
                        key={menuItem.name}
                        name={menuItem.name}
                        onHover={onHover}
                        onHoverLeave={onHoverLeave}
                        padding={(firstSubitem.name || '')?.length > 0}
                        menuItems={menuItem.menuItems}
                        index={index}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        dropdownContainerRef={dropdownContainerRef}
                      />
                    )
                  }
                  return null
                })}
              </ul>
            </div>
          </FloatingDelayGroup>
          <div className='hidden md:flex flex-nowrap gap-4 lg:gap-6 items-center'>
            <div className='hidden lg:block'>
              <CUILink
                key='github-stars-nav'
                href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
                target='_blank'
                className='hover:text-neutral-400 hover:no-underline'
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
                    27.8k
                  </span>
                </div>
              </CUILink>
            </div>
            <CUILink
              href='https://clickhouse.cloud/signIn?loc=website-nav'
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
                label: 'Get Started',
                category: 'website-nav'
              }}
              target='_self'>
              Get Started
            </CUIButton>
          </div>

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
        </nav>
      </div>
      {isOpen && (
        <div
          className='flex flex-col justify-between bg-menu-options divide-y divide-neutral-900/11 w-full backdrop-blur-[10px] z-30'
          ref={floating}
          style={{
            position: strategy,
            top: 72,
            left: 0,
            height: 'calc(100vh - 72px)'
          }}
          {...getFloatingProps()}>
          <div className='pt-8 mb-6 overflow-auto h-[stretch]'>
            <div className='flex items-top justify-between w-full'>
              <nav className='flex flex-col w-full'>
                {headerMenuItems.map((menuItem) => {
                  if ((menuItem.menuItems ?? []).length > 0) {
                    return (
                      <Disclosure as='div'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full justify-between rounded-lg text-left text-lg font-medium focus:outline-none focus-visible:ring-opacity-75 px-4 sm:px-8 py-2'>
                              <span>{menuItem.name}</span>
                              <ChevronRightIcon
                                className={`${
                                  open ? 'rotate-90 transform' : ''
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className='text-md text-neutral-400 mt-2 mb-2'>
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
                        className='menu-item hover:no-underline text-lg font-medium px-4 sm:px-8 py-2'>
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
              href='https://clickhouse.cloud/signUp?loc=website-nav-mobile'
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
              href='https://clickhouse.cloud/signIn?loc=website-nav-mobile'
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
