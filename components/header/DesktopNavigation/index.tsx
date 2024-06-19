import {
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuProps
} from '@radix-ui/react-navigation-menu'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { forwardRef, useState } from 'react'

interface MenuItemLinkProps extends NavigationMenuLinkProps {}

function MenuItemLink({
  children,
  className = '',
  ...props
}: MenuItemLinkProps) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        className={`inline-block rounded px-4 py-2 text-sm font-bold transition-colors hover:bg-neutral-725 hover:text-primary-300 ${className}`}
        {...props}>
        {children}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  )
}

interface MenuItemDropdownProps extends NavigationMenuContentProps {
  label: string
}

const MenuItemDropdown = forwardRef<HTMLButtonElement, MenuItemDropdownProps>(
  ({ label, children, className = '', ...props }, forwardedRef) => {
    return (
      <NavigationMenu.Item value={label}>
        <NavigationMenu.Trigger
          ref={forwardedRef}
          className='inline-block rounded px-4 py-2 text-sm font-bold transition-colors hover:bg-neutral-725 hover:text-primary-300'>
          {label}
        </NavigationMenu.Trigger>
        <NavigationMenu.Content
          className={`group relative data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft ${className}`}
          {...props}>
          <div className='rounded bg-neutral-750'>{children}</div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    )
  }
)

export default function DesktopNavigation(props: React.HTMLProps<HTMLElement>) {
  const [offset, setOffset] = useState<null | number>(null)
  const [value, setValue] = useState<null | string>()

  const onNodeUpdate = (
    trigger: HTMLButtonElement | null,
    itemValue: string
  ) => {
    if (trigger && value) {
      if (value === itemValue) {
        setOffset(trigger.offsetLeft)
      }
    } else {
      setOffset(null)
    }
    return trigger
  }
  return (
    <nav {...props}>
      <NavigationMenu.Root
        className='relative'
        delayDuration={0}
        onValueChange={setValue}>
        <NavigationMenu.List className='flex'>
          <MenuItemDropdown
            label='Products'
            ref={(node) => onNodeUpdate(node, 'Products')}>
            Placeholder 1
          </MenuItemDropdown>
          <MenuItemLink href='/docs'>Docs</MenuItemLink>
          <MenuItemDropdown
            label='Resources'
            ref={(node) => onNodeUpdate(node, 'Resources')}>
            Placeholder 2
          </MenuItemDropdown>
          <MenuItemDropdown
            label='Use cases'
            ref={(node) => onNodeUpdate(node, 'Use cases')}>
            Placeholder 3
          </MenuItemDropdown>
          <MenuItemDropdown
            label='Pricing'
            ref={(node) => onNodeUpdate(node, 'Pricing')}>
            Placeholder 4
          </MenuItemDropdown>
          <MenuItemLink href='/company/contact?loc=nav'>
            Contact us
          </MenuItemLink>
        </NavigationMenu.List>

        <NavigationMenu.Viewport
          style={{
            transform: `translateX(${offset}px)`
          }}
          className='absolute top-full bg-red-300 pt-6 transition-all data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn'
        />
      </NavigationMenu.Root>
    </nav>
  )
}
