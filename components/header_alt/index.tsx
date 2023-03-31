import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import classNames from 'classnames'
import menuItems from '../header/menuItems.json'
import { MenuItem as MenuItemType } from '../header/types'

const headerMenuItems = menuItems as Array<MenuItemType>
const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className='relative z-[1] flex w-screen justify-center'>
      <NavigationMenu.List className='center m-0 flex list-none p-1'>
        <>
          {headerMenuItems.map((menuItem, index) => {
            if (menuItem.href) {
              return (
                <NavigationMenu.Item>
                  <NavigationMenu.Link
                    className='hover:text-neutral-300 hover:no-underline focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]'
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
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className='hover:text-neutral-300 active:text-neutral-300 hover:no-underline focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
                    {menuItem.name}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className='flex flex-col bg-neutral-725 data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto'>
                    <ul className='one m-0 flex list-none sm:min-w-[500px] sm:grid-cols-[1fr]'>
                      {menuItem.menuItems.map((subMenuItem, index) => {
                        return (
                          <div className='flex grow flex-col w-full'>
                            <div className='bg-neutral-700'>
                              <ListItem href={subMenuItem.href}>
                                {subMenuItem.name}
                              </ListItem>
                            </div>
                            <div>
                              {subMenuItem.menuItems.map(
                                (deepMenuItem, index) => {
                                  return (
                                    <ListItem href={deepMenuItem.href}>
                                      {deepMenuItem.name}
                                    </ListItem>
                                  )
                                }
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            }
          })}
        </>

        <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-neutral-700' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className='perspective-[2000px] absolute top-full left-0 flex w-full justify-center'>
        <NavigationMenu.Viewport className='data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-neutral-725 transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]' />
      </div>
    </NavigationMenu.Root>
  )
}

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] w-full min-w-[10rem] leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
          ref={forwardedRef}>
          <div className='text-violet12 mb-[5px] font-medium leading-[1.2]'>
            {title}
          </div>
          <p className='text-mauve11 leading-[1.4]'>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
)

export default NavigationMenuDemo
