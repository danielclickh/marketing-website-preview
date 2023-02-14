import { SuiButton, SuiLink, SuiText } from '../sui'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { StrapiImage } from '../StrapiElements'
import MenuItem from './MenuItem'
import styles from './Header.module.scss'
import { Hind_Siliguri } from '@next/font/google'
import { HeaderData } from './types'
import MobilePopoverPanel from './MobilePopoverPanel'

const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '500',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

export default function Header({
  logoIcon,
  menuItems = [],
  ctaSecondaryButton,
  ctaButton
}: HeaderData) {
  return (
    <Popover className='bg-c1/80 shadow-sm  dark:border-b dark:border-c2-dark h-full backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300'>
      <div className='container flex mx-auto w-full px-4 sm:px-8 2xl:px-0 max-w-7xl h-16 items-center'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <Link
              href='/'
              className='flex items-center gap-x-3 hover:no-underline'>
              {logoIcon && <StrapiImage {...logoIcon} width={32} height={32} />}
              <span className={`text-2xl ${hind.className}`}>ClickHouse</span>
            </Link>
            <div className='flex justify-center'>
              <div className='flex justify-between items-center md:justify-start'>
                <div className='-mr-2 -my-2 min-[930px]:hidden'>
                  <Popover.Button className='bg-c1 rounded-md p-2 inline-flex items-center justify-center text-c5 hover:text-c4 hover:bg-c2 focus:outline-none'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
                <div className='hidden md:flex-1 min-[930px]:flex min-[930px]:items-center min-[930px]:justify-between'>
                  <Popover.Group
                    as='nav'
                    className='flex items-center space-x-4 lg:space-x-6 xl:space-x-10'>
                    {menuItems.map((menuItem) => {
                      if (menuItem.menuItems.length > 0) {
                        return (
                          <MenuItem key={menuItem.name} name={menuItem.name}>
                            {menuItem.menuItems.map((item) => (
                              <SuiLink
                                key={item.name}
                                href={item.href}
                                segmentEvent={{
                                  label: item.name,
                                  category: 'website-nav'
                                }}
                                className='flex items-start hover:no-underline'>
                                <div
                                  className={styles.menuItem}
                                  data-icon={item.icon ? 'true' : 'false'}>
                                  {item.icon && (
                                    <div
                                      className={`
                                      flex-shrink-0 flex justify-center h-10 w-10 rounded-md
                                      items-center text-c4
                                      sm:h-12 sm:w-12 md:mr-4
                                      `}>
                                      <StrapiImage
                                        {...item.icon}
                                        className='h-8 w-8'
                                        width={32}
                                        height={32}
                                        aria-hidden='true'
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <SuiText
                                      size={item.icon ? 'base' : 'sm'}
                                      color='primary'
                                      weight={item.icon ? 'normal' : 'medium'}>
                                      {item.name}
                                    </SuiText>
                                    <SuiText
                                      size='sm'
                                      color='secondary'
                                      weight='normal'
                                      className='mt-1'>
                                      {item.description}
                                    </SuiText>
                                  </div>
                                </div>
                              </SuiLink>
                            ))}
                          </MenuItem>
                        )
                      }

                      return (
                        <SuiLink
                          key={menuItem.name}
                          href={menuItem.href}
                          target={menuItem.target}
                          segmentEvent={{
                            label: menuItem.name,
                            category: 'website-nav'
                          }}
                          className='inline-flex items-center text-sm font-medium text-c5'>
                          {menuItem.name}
                        </SuiLink>
                      )
                    })}
                    <div className='flex items-center border-r border-c2 pr-2'>
                      <ThemeSwitcher />
                    </div>

                    <div className='flex items-center md:ml-12 space-x-2 lg:space-x-4'>
                      {ctaSecondaryButton && (
                        <SuiLink
                          key={ctaSecondaryButton.text}
                          href={ctaSecondaryButton.href}
                          target={ctaSecondaryButton.target}
                          segmentEvent={{
                            label: ctaSecondaryButton.text,
                            category: 'website-nav'
                          }}
                          className='inline-flex items-center text-sm font-medium text-c5 ease-in-out'>
                          {ctaSecondaryButton.text}
                        </SuiLink>
                      )}
                      {ctaButton && (
                        <SuiButton
                          type='primary'
                          path={ctaButton.href}
                          segmentEvent={{
                            label: ctaButton.text,
                            category: 'website-nav'
                          }}
                          target={ctaButton.target}>
                          {ctaButton.text}
                        </SuiButton>
                      )}
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
        <MobilePopoverPanel>
          <div className='pt-5 pb-6 px-5'>
            <div className='flex items-top justify-between'>
              <div className='mt-6 w-full'>
                <nav className='grid gap-4 grid-cols-2 w-full'>
                  {menuItems.map((menuItem, index) => {
                    if (index === 0) {
                      return (
                        <Fragment key={menuItem.name}>
                          <div className='flex flex-col col-span-2 gap-y-6 '>
                            {menuItem.menuItems.map((item) => (
                              <SuiLink
                                key={item.name}
                                href={item.href}
                                target={item.target}
                                segmentEvent={{
                                  label: item.name,
                                  category: 'website-nav'
                                }}
                                className='menu-item w-full hover:no-underline flex items-center text-sm font-medium text-c5 relative'>
                                {item.icon && (
                                  <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-c4 mr-4'>
                                    <StrapiImage
                                      {...item.icon}
                                      className='h-10 w-10 text-c5'
                                      aria-hidden='true'
                                    />
                                  </div>
                                )}
                                <div className='text-sm font-medium text-c5'>
                                  {item.name}
                                </div>
                              </SuiLink>
                            ))}
                          </div>
                          <hr className={styles.mobileHeader} />
                        </Fragment>
                      )
                    }
                    if (menuItem.menuItems.length > 0) {
                      return menuItem.menuItems.map((item) => (
                        <SuiLink
                          key={item.name}
                          href={item.href}
                          target={item.target}
                          segmentEvent={{
                            label: item.name,
                            category: 'website-nav'
                          }}
                          className='menu-item w-full hover:no-underline flex items-start text-sm font-medium text-c5 relative'>
                          {item.icon && (
                            <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-c4 mr-4'>
                              <StrapiImage
                                {...item.icon}
                                className='h-10 w-10 text-c5'
                                aria-hidden='true'
                              />
                            </div>
                          )}
                          <div className='text-sm font-medium text-c5'>
                            {item.name}
                          </div>
                        </SuiLink>
                      ))
                    }
                    return (
                      <SuiLink
                        key={menuItem.name}
                        href={menuItem.href}
                        target={menuItem.target}
                        segmentEvent={{
                          label: menuItem.name,
                          category: 'website-nav'
                        }}
                        className='menu-item text-sm hover:no-underline font-medium text-c5'>
                        {menuItem.name}
                      </SuiLink>
                    )
                  })}
                </nav>
              </div>
              <div>
                <Popover.Button className='bg-c1 rounded-md p-2 inline-flex items-center justify-center text-c5 hover:text-c4 ease-in-out focus:outline-none'>
                  <span className='sr-only'>Close menu</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className='py-6 px-5 grid gap-4 w-full grid-cols-2'>
            {ctaSecondaryButton && (
              <SuiButton
                type='secondary'
                path={ctaSecondaryButton.href}
                target={ctaSecondaryButton.target}
                segmentEvent={{
                  label: ctaSecondaryButton.text,
                  category: 'website-nav'
                }}
                className='w-full'>
                {ctaSecondaryButton.text}
              </SuiButton>
            )}
            {ctaButton && (
              <SuiButton
                type='primary'
                path={ctaButton.href}
                target={ctaButton.target}
                segmentEvent={{
                  label: ctaButton.text,
                  category: 'website-nav'
                }}
                className='w-full'>
                {ctaButton.text}
              </SuiButton>
            )}
          </div>
        </MobilePopoverPanel>
      </Transition>
    </Popover>
  )
}
