import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { CUIButton, CUILink } from '../ClickUI'
import logoFull from '../../public/logo-pride.svg'
import GitHub from '../icons/GitHub'
import LinkWithArrow from '../LinkWithArrow'
import { HeaderProps } from './types'
import Navigation from '../Navigation'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'

export default function Header({ github: { stars } }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false)
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false)
  const [headerHeight, setHeaderHeight] = useState<number>(72)

  useEffect(() => {
    const resizeHandler = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight)
    }

    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    return () => window.removeEventListener('resize', resizeHandler)
  }, [headerRef])

  return (
    <>
      {/* Mega menu backdrop */}
      <div
        className={`pointer-events-none fixed inset-0 z-40 hidden bg-neutral-700/70 transition-opacity md-mid:block  ${
          showBackdrop ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Add empty space for fixed header */}
      <div style={{ height: headerHeight }} />

      <header
        ref={headerRef}
        className={`${
          burgerMenuIsOpen ? 'bg-neutral-900' : 'bg-neutral-900/80'
        } fixed top-0 z-50 w-full backdrop-blur md-mid:bg-neutral-900/80`}>
        {/* Announcement banner */}
        {false && (
          <LinkWithArrow
            href='/blog/clickhouse-cloud-is-now-on-azure-in-public-beta?loc=eyebrow'
            className='relative z-50 block w-full bg-primary-300 px-4 py-1 text-center text-sm font-medium text-primary-900'>
            ClickHouse Cloud on Microsoft Azure: Now in Beta
          </LinkWithArrow>
        )}

        {/* Logo, navigtation, CTAs... */}
        <div className='no-wrap section-container relative flex items-center py-4'>
          {/* Logo */}
          <Link href='/' onClick={galaxyOnClick('topNav.logo.select')}>
            <Image
              src={logoFull}
              priority
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
          </Link>

          {/* Mobile Burger */}
          <button
            className='ml-auto inline-flex items-center justify-center rounded-md bg-slate p-2 text-neutral-200 hover:text-neutral-0 focus:outline-none md-mid:hidden'
            onClick={() => setBurgerMenuIsOpen(!burgerMenuIsOpen)}>
            {burgerMenuIsOpen ? (
              <>
                <span className='sr-only'>Close menu</span>
                <XIcon className='h-4 w-4' aria-hidden='true' />
              </>
            ) : (
              <>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-4 w-4' aria-hidden='true' />
              </>
            )}
          </button>

          {/* Nav container */}
          <div
            style={{
              top: headerHeight,
              height: `calc(100dvh - ${headerHeight}px)`
            }}
            className={`${
              burgerMenuIsOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            } fixed inset-0 flex h-dvh flex-1 flex-col bg-neutral-900 p-4 transition-opacity md-mid:pointer-events-auto md-mid:relative md-mid:!top-0 md-mid:ml-8 md-mid:!h-auto md-mid:flex-row md-mid:items-center md-mid:bg-transparent md-mid:p-0 md-mid:opacity-100 xl:ml-20`}>
            <Navigation
              className='w-full md-mid:w-auto'
              onTopLevelClick={(item, children, isOpen) => {
                setShowBackdrop(isOpen)
              }}
              onTopLevelClickOutside={(item, children, isOpen) => {
                setShowBackdrop(isOpen)
              }}
            />

            {/* CTAs */}
            <div className='mt-auto flex flex-col-reverse flex-nowrap items-center gap-4 md-mid:ml-auto md-mid:mt-0 md-mid:flex-row lg:gap-6'>
              <CUILink
                href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
                target='_blank'
                className='hidden items-center gap-2 text-sm font-medium hover:text-neutral-400 lg:flex'
                onClick={galaxyOnClick('topNav.navItems.githubSelect')}>
                <GitHub />
                <span className='hidden lg-mid:inline'>
                  {Intl.NumberFormat('en', {
                    notation: 'compact',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  })
                    .format(stars)
                    .toLowerCase()}
                </span>
              </CUILink>
              <CUILink
                href='https://clickhouse.cloud/signIn'
                className='w-full rounded border border-neutral-500 py-3 text-center text-sm font-medium leading-none hover:text-neutral-400 md-mid:hidden md-mid:w-auto md-mid:border-0 md-mid:py-0 lg:inline-block'
                onClick={galaxyOnClick('topNav.navItems.signInSelect')}>
                Sign in
              </CUILink>
              <CUIButton
                type='primary'
                weight='medium'
                href='https://clickhouse.cloud/signUp?loc=nav-get-started'
                className='w-full md-mid:w-auto'
                linkClass='w-full md-mid:w-auto'
                onClick={galaxyOnClick('topNav.navItems.getStartedSelect')}>
                Get started
              </CUIButton>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
