import React, { HTMLAttributes } from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import classNames from 'classnames'
import menuItems from '../menuItems.json'
import { MenuItem as MenuItemType } from '../types'
import Image from 'next/image'
import styles from './styles.module.scss'
import { SuiText } from '../../sui'
import Link from 'next/link'

const headerMenuItems = menuItems as Array<MenuItemType>
const GlobalMenu = () => {
  return (
    <NavigationMenu.Root
      className='relative z-[1] mx-auto flex w-screen justify-center'
      delayDuration={0}>
      <NavigationMenu.List className='center m-0 hidden list-none p-1 md:flex'>
        <>
          {headerMenuItems.map((menuItem) => {
            if (menuItem.href) {
              return (
                <NavigationMenu.Item key={menuItem.name}>
                  <NavigationMenu.Link
                    className={styles.topLevelNavItem}
                    href={menuItem.href}>
                    {menuItem.name}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              )
            } else if (
              menuItem.menuItems &&
              (menuItem?.menuItems ?? []).length > 0
            ) {
              return (
                <NavigationMenu.Item key={menuItem.name}>
                  <NavigationMenu.Trigger className={styles.topLevelNavItem}>
                    {menuItem.name}
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className='absolute top-0 left-0 flex w-full flex-col overflow-hidden rounded-md pb-4 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight sm:w-auto'>
                    <div className='one m-0 flex list-none sm:min-w-[500px] sm:grid-cols-[1fr]'>
                      {menuItem.menuItems.map((subMenuItem, index) => {
                        return (
                          <div
                            key={index}
                            className='flex w-full grow flex-col'>
                            {subMenuItem.name !== 'Use cases' ? (
                              <div className='mb-4 border-b border-neutral-700 border-opacity-40 bg-neutral-725 bg-opacity-90'>
                                <ListItem
                                  href={subMenuItem.href}
                                  className='group rounded-none bg-opacity-10 pl-4 lg:min-w-[9.5rem]'>
                                  <SuiText
                                    size='sm'
                                    className='text-neutral-100 group-hover:text-neutral-0'
                                    weight='semibold'>
                                    {subMenuItem.name}
                                  </SuiText>
                                </ListItem>
                              </div>
                            ) : (
                              <div className='pt-3'></div>
                            )}
                            <div>
                              {subMenuItem.menuItems.map(
                                (deepMenuItem, index) => {
                                  return (
                                    <div key={index}>
                                      {deepMenuItem.icon ? (
                                        <ListItem
                                          href={deepMenuItem.href}
                                          key={deepMenuItem.name}
                                          className='group mx-auto rounded-none'>
                                          <div className='flex gap-4'>
                                            <Image
                                              src={deepMenuItem.icon}
                                              alt={deepMenuItem.name}
                                              width={24}
                                              height={24}
                                            />
                                            <div className='flex flex-col gap-0.5'>
                                              <SuiText
                                                weight='medium'
                                                size='sm'>
                                                {deepMenuItem.name}
                                              </SuiText>
                                              <SuiText
                                                weight='normal'
                                                size='sm'
                                                className='text-neutral-300 group-hover:text-neutral-0'>
                                                {deepMenuItem.description}
                                              </SuiText>
                                            </div>
                                          </div>
                                        </ListItem>
                                      ) : (
                                        <ListItem
                                          href={deepMenuItem.href}
                                          key={deepMenuItem.name}
                                          target={deepMenuItem.target}
                                          className='group w-full pl-4'>
                                          <SuiText
                                            weight='medium'
                                            size='sm'
                                            className='whitespace-nowrap text-neutral-300 group-hover:text-neutral-0'>
                                            {deepMenuItem.name}
                                          </SuiText>
                                        </ListItem>
                                      )}
                                    </div>
                                  )
                                }
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            }
          })}
        </>

        <NavigationMenu.Indicator className='top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut'>
          <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-neutral-725 bg-opacity-90 group-hover:bg-neutral-700 group-hover:bg-opacity-40' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className='perspective-[2000px] absolute top-full left-0 flex w-full justify-center'>
        <NavigationMenu.Viewport className='relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] border border-neutral-700 border-opacity-50 bg-navigation-background transition-[width,_height] duration-300 data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut sm:w-[var(--radix-navigation-menu-viewport-width)]' />
      </div>
    </NavigationMenu.Root>
  )
}
interface ListItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string
  target?: string
}
const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, href, target, ...props }, forwardedRef) => {
    if (href) {
      return (
        <NavigationMenu.Link asChild>
          {href.includes('blog') ||
          href.includes('.com') ||
          href.includes('.cloud') ? (
            <a
              className={classNames(
                'block w-full select-none rounded px-3 py-2 text-sm leading-none !no-underline outline-none transition-all hover:bg-neutral-700 hover:bg-opacity-40 hover:text-neutral-0 focus:shadow-[0_0_0_2px] focus:shadow-neutral-750 focus:outline-none',
                className
              )}
              href={href}
              target={target}
              {...props}
              ref={forwardedRef}>
              <div className='font-medium'>{title}</div>
              <span className=''>{children}</span>
            </a>
          ) : (
            <Link
              className={classNames(
                'block w-full select-none rounded px-3 py-2 text-sm leading-none !no-underline outline-none transition-all hover:bg-neutral-700 hover:bg-opacity-40 hover:text-neutral-0 focus:shadow-[0_0_0_2px] focus:shadow-neutral-750 focus:outline-none',
                className
              )}
              href={href}
              target={target}
              {...props}
              ref={forwardedRef}>
              <div className='font-medium'>{title}</div>
              <span className=''>{children}</span>
            </Link>
          )}
        </NavigationMenu.Link>
      )
    }
    return null
  }
)

export default GlobalMenu
