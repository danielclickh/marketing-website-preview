import logoFull from '../../../../public/logo-full.svg'
import { CUIButton, CUILink } from '../../ClickUI'
import { HeaderProps } from '../../Header/types'
import HeaderRegionSelector from '../../HeaderRegionSelector'
import GitHub from '../../icons/GitHub'
import Navigation from '../Navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import useResizeObserverSsr from '@/hooks/useResizeObserverSsr'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Header({ github, eyebrow }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  // Eyebrow default settings
  const [headerBannerEnabled, setHeaderBannerEnabled] = useState(true)
  const [headerBannerArrow, setHeaderBannerArrow] = useState(true)
  const [headerBannerText, setHeaderBannerText] = useState<
    string | React.ReactNode
  >('ClickHouse、Japan Cloudと提携し日本法人設立を発表')
  const [headerBannerUrl, setHeaderBannerUrl] = useState(
    '/jp/blog/japan-cloud-jp?loc=eyebrow'
  )
  const [headerBannerExpires, setHeaderBannerExpires] = useState<
    undefined | Date
  >(undefined)

  const scrollHandler = () => {
    setIsScrolled(window.scrollY > 0)
  }

  useResizeObserverSsr(headerRef, (el) => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${el.target.clientHeight}px`
    )
  })

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    scrollHandler()

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [headerRef])

  return (
    <>
      {/* Add empty space for fixed header */}
      <div style={{ height: 'calc(var(--header-height, 72px) + 1px)' }} />

      <header
        ref={headerRef}
        className={`${
          burgerMenuIsOpen
            ? '!bg-neutral-900'
            : isScrolled
              ? 'bg-neutral-900/80'
              : 'bg-neutral-900/10'
        } ${
          isScrolled ? 'md-mid:bg-neutral-900/80' : 'md-mid:bg-neutral-900/10'
        } fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur transition-colors`}>
        {/* Announcement banner */}
        <AnnouncementBar
          enabled={headerBannerEnabled}
          link={headerBannerUrl}
          text={headerBannerText}
          expires={headerBannerExpires}
          dismissible={true}
          className={eyebrow?.className || ''}
          arrow={headerBannerArrow}
        />

        {/* Logo, navigtation, CTAs... */}
        <div className='no-wrap section-container relative flex items-center py-4'>
          {/* Logo */}
          <Link
            href='/jp/'
            prefetch={false}
            onClick={useGalaxyOnClick('topNav.logo.select')}>
            <Image
              src={logoFull}
              priority
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
          </Link>

          {/* Mobile region selector */}
          <HeaderRegionSelector className='z-10 ml-auto mr-4 md-mid:hidden' />

          {/* Mobile Burger */}
          <button
            className='inline-flex items-center justify-center rounded-md bg-slate p-2 text-neutral-200 hover:text-neutral-0 focus:outline-none md-mid:hidden'
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
              top: 'var(--header-height, 72px)',
              height: 'calc(100dvh - var(--header-height, 72px))'
            }}
            className={`${
              burgerMenuIsOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            } fixed inset-0 flex h-dvh flex-1 flex-col overflow-y-auto bg-neutral-900 p-4 transition-opacity md-mid:pointer-events-auto md-mid:relative md-mid:!top-0 md-mid:ml-0 md-mid:!h-auto md-mid:flex-row md-mid:items-center md-mid:overflow-y-visible md-mid:bg-transparent md-mid:p-0 md-mid:opacity-100 lg:ml-8 xl:ml-20`}>
            <Navigation className='w-full md-mid:w-auto md-mid:flex-shrink-0' />

            {/* CTAs */}
            <div className='mt-auto flex flex-col-reverse flex-nowrap items-center gap-4 md-mid:ml-auto md-mid:mt-0 md-mid:flex-row lg:gap-6'>
              {/* Desktop region selector */}
              <HeaderRegionSelector className='hidden md-mid:block' />

              <CUILink
                href='https://github.com/ClickHouse/ClickHouse?utm_source=clickhouse&utm_medium=website&utm_campaign=website-nav'
                target='_blank'
                className='hidden items-center gap-2 text-sm font-medium hover:text-primary-300 lg-mid:flex'
                onClick={useGalaxyOnClick('topNav.navItems.githubSelect')}>
                <GitHub />
                {Intl.NumberFormat('en', {
                  notation: 'compact',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1
                })
                  .format(github?.stars ?? 38000)
                  .toLowerCase()}
              </CUILink>
              <CUILink
                href='https://console.clickhouse.cloud/signIn'
                target='_blank'
                className='w-full rounded border border-neutral-500 py-3 text-center text-sm font-medium leading-none hover:text-primary-300 md-mid:hidden md-mid:w-auto md-mid:border-0 md-mid:py-0 lg-mid:inline-block'
                onClick={useGalaxyOnClick('topNav.navItems.signInSelect')}>
                サインイン
              </CUILink>
              <CUIButton
                type='primary'
                target='_blank'
                weight='medium'
                href='https://console.clickhouse.cloud/signUp?loc=nav-get-started'
                className={`w-full md-mid:w-auto ${eyebrow?.className || ''}`}
                linkClass='w-full md-mid:w-auto'
                onClick={useGalaxyOnClick('topNav.navItems.getStartedSelect')}>
                <span id='nav-bar-cta-button'>開始する</span>
              </CUIButton>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
