import React, { useState } from 'react'
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
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false)
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false)

  return (
    <>
      {/* Mega menu backdrop */}
      <div
        className={`pointer-events-none fixed inset-0 z-40 bg-neutral-700/70 transition-opacity ${
          showBackdrop ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Announcement banner */}
      {!false && (
        <LinkWithArrow
          href='/blog/clickhouse-cloud-is-now-on-azure-in-public-beta?loc=eyebrow'
          className='relative z-50 block w-full bg-primary-300 px-4 py-1 text-center text-sm font-medium text-primary-900'>
          ClickHouse Cloud on Microsoft Azure: Now in Beta
        </LinkWithArrow>
      )}

      <header className='sticky top-0 z-50 bg-neutral-900/80 backdrop-blur'>
        {/* Logo, navigtation, CTAs... */}
        <div className='no-wrap section-container relative flex h-[72px] items-center'>
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
          <div className='fixed inset-0 top-[72px] flex flex-1 flex-col bg-neutral-900 p-4 md-mid:relative md-mid:top-0 md-mid:ml-8 md-mid:flex-row md-mid:items-center md-mid:bg-transparent md-mid:p-0 xl:ml-20'>
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
            <div className='mt-auto flex flex-col flex-nowrap items-center gap-4 md-mid:ml-auto md-mid:mt-0 md-mid:flex-row lg:gap-6'>
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
                className='w-full text-center text-sm font-medium hover:text-neutral-400 md-mid:hidden md-mid:w-auto lg:inline-block'
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
