import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { CUIButton, CUILink } from '../ClickUI'
import menuItems from './menuItems.json'
import logoFull from '../../public/logo-full.svg'
import { MenuItem as MenuItemType } from './types'
import styles from './styles.module.scss'
import MenuItem from './MenuItem'
import MobileMenu from './MobileMenu'
import { ClientRectObject } from '@floating-ui/react'

const headerMenuItems = menuItems as Array<MenuItemType>

function Nav() {
  const navRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const handleEnter = (
    floatingCoords: DOMRect,
    refCoords: DOMRect | ClientRectObject
  ) => {
    console.log('aaaaa1')
    if (ref.current) {
      console.log('aaaaa2')
      ref.current.classList.add('open')
      ref.current.style.setProperty('width', `${floatingCoords.width}px`)
      ref.current.style.setProperty('height', `${floatingCoords.height}px`)
      ref.current.style.setProperty(
        'transform',
        `translate(${floatingCoords.left}px, ${floatingCoords.top}px)`
      )
      if (arrowRef.current) {
        console.log('aaaaaC', refCoords)
        arrowRef.current.style.setProperty(
          'transform',
          `translateY(-50%) rotate(45deg)`
        )
        arrowRef.current.style.setProperty(
          'left',
          `${refCoords.left - floatingCoords.left + refCoords.width / 2}px`
        )
      }
    }
  }

  const onHoverLeave = () => {
    setTimeout(() => {
      if (ref.current && navRef.current)
        if (!navRef.current.querySelector('.trigger-enter')) {
          ref.current.classList.remove('open')
        }
    }, 150)
  }
  return (
    <div className='text-neutral-0 shadow-sm bg-neutral-900/11 border-b border-primary-700 h-full backdrop-blur-md sticky top-0 z-50 ease-in-out duration-300'>
      <div className={styles.dropdownBackground} ref={ref}>
        <span className={`${styles.arrow} arrow`} ref={arrowRef}></span>
      </div>

      <nav className='relative flex no-wrap justify-between items-center section-container w-full py-4'>
        <Link href='/' className='flex items-center gap-x-3 hover:no-underline'>
          <Image src={logoFull} width='135' height='40' alt='ClickHouse logo' />
        </Link>
        <div className={styles.navWrapper} ref={navRef}>
          <ul className={`${styles.navList} navList`}>
            {headerMenuItems.map((menuItem, index) => {
              if (menuItem.href) {
                return (
                  <li className='px-2 lg:px-4'>
                    <CUILink
                      key={menuItem.name}
                      href={menuItem.href}
                      target={menuItem.target}
                      segmentEvent={{
                        label: menuItem.name,
                        category: 'website-nav'
                      }}
                      className='inline-flex items-center text-sm font-medium max-w-md hover:text-neutral-400 hover:no-underline'>
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
                    onHover={handleEnter}
                    onHoverLeave={onHoverLeave}
                    padding={(firstSubitem.name || '')?.length > 0}
                    menuItems={menuItem.menuItems}
                    index={index}
                  />
                )
              }
              return null
            })}
          </ul>
        </div>
        <div className='hidden md:flex flex-nowrap gap-4 lg:gap-6 items-center'>
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

              <span className='text-xs font-medium leading-none'>27.6k</span>
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
            href='https://clickhouse.cloud/signUp'
            segmentEvent={{
              label: 'Get Started',
              category: 'website-nav'
            }}
            target='_self'>
            Get Started
          </CUIButton>
        </div>
        <MobileMenu />
      </nav>
    </div>
  )
}

export default Nav
