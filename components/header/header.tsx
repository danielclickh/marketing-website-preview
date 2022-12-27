import { colorCalculator, SuiButton, SuiLink, SuiText } from '../sui'

import { Fragment } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  PopoverGroup
} from '../HeadlessUIClient'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import { StrapiImage } from '../StrapiElements'
import MenuItem from './MenuItem'
import { findOne } from '../../lib/api/strapi'
import styles from './Header.module.scss'
import { Hind_Siliguri } from '@next/font/google'
import { HeaderData } from './types'

const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '500'
})

export async function Header() {
  const { logoIcon, menuItems, ctaSecondaryButton, ctaButton }: HeaderData =
    await findOne('header', {
      populate: [
        'logoIcon',
        'ctaButton',
        'ctaSecondaryButton',
        'href',
        'target',
        'menuItems.menuItems',
        'menuItems.menuItems.icon'
      ]
    })

  return (
    <Popover
      className={`bg-white dark:bg-gunmetal shadow-sm  dark:border-b dark:border-onyx bg-opacity-100 dark:opacity-100 h-full backdrop-blur-lg dark:backdrop-blur-lg sticky top-0 z-50 ease-in-out duration-300 ${
        true ? 'shadow-sm bg-opacity-80 dark:bg-opacity-80' : ''
      }`}>
      <div className='text-center bg-primary text-raisin_black text-sm font-medium w-full'>
        <Link href='/company/events/clickhouse-workshop'>
          Free ClickHouse Workshop - Sign up now
        </Link>
      </div>
      <div className='pt-2 container flex mx-auto md:pt-0 w-full px-4 mt-1 sm:px-8 2xl:px-0 max-w-7xl h-16 items-center'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center w-full'>
            <Link
              href='/'
              className='flex items-center gap-x-3 hover:no-underline'>
              <StrapiImage {...logoIcon} />
              <span className={`text-2xl ${hind.className}`}>ClickHouse</span>
            </Link>
            <div className='flex justify-center'>
              <div className='flex justify-between items-center md:justify-start'>
                <div className='-mr-2 -my-2 min-[930px]:hidden'>
                  <PopoverButton className='bg-white dark:bg-gunmetal rounded-md p-2 inline-flex items-center justify-center text-gunmetal dark:text-white hover:text-web-light-c4 hover:dark:text-web-dark-c4 hover:bg-cultured hover:dark:bg-onyx focus:outline-none'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </PopoverButton>
                </div>
                <div className='hidden md:flex-1 min-[930px]:flex min-[930px]:items-center min-[930px]:justify-between'>
                  <PopoverGroup
                    as='nav'
                    className='flex items-center space-x-4 lg:space-x-10'>
                    {menuItems.map((menuItem) => {
                      if (menuItem.menuItems.length > 0) {
                        return (
                          <MenuItem key={menuItem.name} name={menuItem.name}>
                            {menuItem.menuItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className='flex items-start hover:no-underline'>
                                <div
                                  className={`${styles.menuItem} hover:bg-cultured dark:hover:bg-onyx`}
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
                                      size='base'
                                      color='primary'
                                      weight='normal'>
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
                              </Link>
                            ))}
                          </MenuItem>
                        )
                      }

                      return (
                        <Link
                          key={menuItem.name}
                          href={menuItem.href}
                          target={menuItem.target}
                          className='inline-flex hover:no-underline items-center text-sm font-medium text-gunmetal dark:text-white hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out'>
                          {menuItem.name}
                        </Link>
                      )
                    })}
                    <div className='flex items-center border-r border-cultured dark:border-onyx pr-2'>
                      <ThemeSwitcher />
                    </div>

                    <div className='flex items-center md:ml-12 space-x-2'>
                      {ctaSecondaryButton && (
                        <SuiLink
                          href={ctaSecondaryButton.href}
                          color='primary'
                          target={ctaSecondaryButton.target}>
                          {ctaSecondaryButton.text}
                        </SuiLink>
                      )}
                      {ctaButton && (
                        <SuiButton
                          path={ctaButton.href}
                          target={ctaButton.target}
                          title={ctaButton.text}
                        />
                      )}
                    </div>
                  </PopoverGroup>
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
                <PopoverPanel
                  focus
                  className='absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top-right min-[930px]:hidden'>
                  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gunmetal divide-y-2 divide-cultured dark:divide-onyx'>
                    <div className='pt-5 pb-6 px-5'>
                      <div className='flex items-top justify-between'>
                        <div className='mt-6 w-full'>
                          <nav className='grid gap-4 grid-cols-2 w-full'>
                            {menuItems.map((menuItem, index) => {
                              if (index === 0) {
                                return (
                                  <>
                                    <div
                                      key={menuItem.name}
                                      className='flex flex-col col-span-2 gap-y-6 '>
                                      {menuItem.menuItems.map((item) => (
                                        <Link
                                          key={item.name}
                                          href={item.href}
                                          target={item.target}
                                          className='w-full hover:no-underline flex items-center text-sm font-medium text-gunmetal dark:text-white relative'>
                                          {item.icon && (
                                            <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-web-light-c4 dark:text-web-dark-c4 mr-4'>
                                              <StrapiImage
                                                {...item.icon}
                                                className='h-10 w-10 text-gunmetal dark:text-white'
                                                aria-hidden='true'
                                              />
                                            </div>
                                          )}
                                          <div className='text-sm font-medium text-gunmetal dark:text-white'>
                                            {item.name}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                    <hr className={styles.mobileHeader} />
                                  </>
                                )
                              }
                              if (menuItem.menuItems.length > 0) {
                                return menuItem.menuItems.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    target={item.target}
                                    className='w-full hover:no-underline flex items-start text-sm font-medium text-gunmetal dark:text-white relative'>
                                    {item.icon && (
                                      <div className='flex-shrink-0 flex items-center justify-center h-10 w-10 text-web-light-c4 dark:text-web-dark-c4 mr-4'>
                                        <StrapiImage
                                          {...item.icon}
                                          className='h-10 w-10 text-gunmetal dark:text-white'
                                          aria-hidden='true'
                                        />
                                      </div>
                                    )}
                                    <div className='text-sm font-medium text-gunmetal dark:text-white'>
                                      {item.name}
                                    </div>
                                  </Link>
                                ))
                              }
                              return (
                                <Link
                                  key={menuItem.name}
                                  href={menuItem.href}
                                  target={menuItem.target}
                                  className='text-sm hover:no-underline font-medium text-gunmetal dark:text-white'>
                                  {menuItem.name}
                                </Link>
                              )
                            })}
                          </nav>
                        </div>
                        <div>
                          <PopoverButton className='bg-white dark:bg-onyx rounded-md p-2 inline-flex items-center justify-center text-gunmetal dark:text-white hover:text-web-light-c4 dark:hover:text-web-dark-c4 ease-in-out focus:outline-none'>
                            <span className='sr-only'>Close menu</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </PopoverButton>
                        </div>
                      </div>
                    </div>
                    <div className='py-6 px-5 grid gap-4 w-full grid-cols-2'>
                      {ctaSecondaryButton && (
                        <SuiButton
                          color='secondary'
                          path={ctaSecondaryButton.href}
                          target={ctaSecondaryButton.target}
                          title={ctaSecondaryButton.text}
                          widthFull
                          className='text-primary-text'
                        />
                      )}
                      {ctaButton && (
                        <SuiButton
                          path={ctaButton.href}
                          target={ctaButton.target}
                          title={ctaButton.text}
                          widthFull
                          className='w-full'
                        />
                      )}
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  )
}
