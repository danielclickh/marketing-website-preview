import { SuiLink, SuiText } from '../sui'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { StrapiImage } from '../StrapiElements'
import MenuItem from './MenuItem'
import styles from './Header.module.scss'
import { Hind_Siliguri } from 'next/font/google'
import { HeaderData } from './types'
import MobilePopoverPanel from './MobilePopoverPanel'
import { CUIButton } from '../ClickUI'
import LogoSvg from '../icons/LogoSvg'

const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '500',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

export default function Header({
  menuItems = [],
  ctaSecondaryButton,
  ctaButton
}: HeaderData) {
  return (
    <Popover className='shadow-sm bg-neutral-900/11 border-b border-primary-700 h-full backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300'>
      <div className='container flex mx-auto w-full px-4 sm:px-8 2xl:px-0 max-w-7xl h-16 items-center'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <Link
              href='/'
              className='flex items-center gap-x-3 hover:no-underline'>
              <LogoSvg className='h-6' />
            </Link>
            <div className='flex justify-center'>
              <div className='flex justify-between items-center md:justify-start'>
                <div className='-mr-2 -my-2 min-[930px]:hidden'>
                  <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-neutral-0 hover:text-c4 hover:bg-c2 focus:outline-none'>
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
                          className='inline-flex items-center text-sm font-medium text-neutral-0'>
                          {menuItem.name}
                        </SuiLink>
                      )
                    })}
                    <SuiLink
                      key={'github-stars-nav'}
                      href={
                        'https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
                      }
                      target={'blank'}
                      className={`hidden lg:block`}
                      segmentEvent={{
                        label: 'GitHub Stars',
                        category: 'website-nav'
                      }}
                      weight='normal'>
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
                    </SuiLink>

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
                          className='inline-flex items-center text-sm font-medium text-neutral-0 ease-in-out'>
                          {ctaSecondaryButton.text}
                        </SuiLink>
                      )}
                      {ctaButton && (
                        <CUIButton
                          type='primary'
                          href={ctaButton.href}
                          segmentEvent={{
                            label: ctaButton.text,
                            category: 'website-nav'
                          }}
                          target={ctaButton.target}>
                          {ctaButton.text}
                        </CUIButton>
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
                                className='menu-item w-full hover:no-underline flex items-center text-sm font-medium text-neutral-0 relative'>
                                {item.icon && (
                                  <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-c4 mr-4'>
                                    <StrapiImage
                                      {...item.icon}
                                      className='h-10 w-10 text-neutral-0'
                                      aria-hidden='true'
                                    />
                                  </div>
                                )}
                                <div className='text-sm font-medium text-neutral-0'>
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
                          className='menu-item w-full hover:no-underline flex items-start text-sm font-medium text-neutral-0 relative'>
                          {item.icon && (
                            <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-c4 mr-4'>
                              <StrapiImage
                                {...item.icon}
                                className='h-10 w-10 text-neutral-0'
                                aria-hidden='true'
                              />
                            </div>
                          )}
                          <div className='text-sm font-medium text-neutral-0'>
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
                        className='menu-item text-sm hover:no-underline font-medium text-neutral-0'>
                        {menuItem.name}
                      </SuiLink>
                    )
                  })}
                </nav>
              </div>
              <div>
                <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-neutral-0 hover:text-c4 ease-in-out focus:outline-none'>
                  <span className='sr-only'>Close menu</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className='py-6 px-5 grid gap-4 w-full grid-cols-2'>
            {ctaSecondaryButton && (
              <CUIButton
                type='secondary'
                href={ctaSecondaryButton.href}
                target={ctaSecondaryButton.target}
                segmentEvent={{
                  label: ctaSecondaryButton.text,
                  category: 'website-nav'
                }}
                className='w-full'>
                {ctaSecondaryButton.text}
              </CUIButton>
            )}
            {ctaButton && (
              <CUIButton
                type='primary'
                href={ctaButton.href}
                target={ctaButton.target}
                segmentEvent={{
                  label: ctaButton.text,
                  category: 'website-nav'
                }}
                className='w-full'>
                {ctaButton.text}
              </CUIButton>
            )}
          </div>
        </MobilePopoverPanel>
      </Transition>
    </Popover>
  )
}
