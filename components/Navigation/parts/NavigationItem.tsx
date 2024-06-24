import { LinkProps } from 'next/link'
import React, { useRef, useState } from 'react'
import useClickOutside from '../../../hooks/useClickOutside'
import NavigationChevron from './NavigationChevron'
import NavigationLink from './NavigationLink'

export interface NavigationItemProps
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'href' | 'onMouseEnter' | 'onMouseLeave' | 'onClick'
  > {
  label: string
  href?: LinkProps['href']
  children?: React.ReactNode
  open?: boolean
  onClick?: (
    item: React.Ref<HTMLDivElement>,
    children: NavigationItemProps['children'],
    open: boolean
  ) => void
  onClickOutside?: (
    item: React.Ref<HTMLDivElement>,
    children: NavigationItemProps['children'],
    open: boolean
  ) => void
}

export default function NavigationItem({
  label,
  href = '',
  children,
  className = '',
  onClick = (item, children, isOpen) => {},
  onClickOutside = (item, children, isOpen) => {},
  open = false,
  ...props
}: NavigationItemProps) {
  const hasChildren = !!children
  const itemRef = useRef<null | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(open)

  const onClickInside = () => {
    let openVal = isOpen
    if (children && !openVal) {
      openVal = true
      setIsOpen(openVal)
    }
    onClick(itemRef, children, openVal)
  }

  useClickOutside(itemRef, () => {
    setIsOpen(false)
    onClickOutside(itemRef, children, false)
  })

  return (
    <div
      className={`relative ${className}`}
      ref={itemRef}
      onClick={onClickInside}
      {...props}>
      <NavigationLink
        href={href}
        className={`items-center ${
          !href && !hasChildren ? 'cursor-default' : ''
        } ${isOpen ? 'text-primary-300' : ''}`}>
        <span className='flex-1'>{label}</span>
        {hasChildren && (
          <NavigationChevron
            className={`md-mid:hidden ${isOpen ? '' : 'text-neutral-500'}`}
            direction={isOpen ? 'down' : 'right'}
          />
        )}
      </NavigationLink>
      {hasChildren && (
        <div
          className={`transition-all md-mid:absolute md-mid:-left-12 md-mid:top-full md-mid:-z-50 md-mid:block md-mid:w-max md-mid:min-w-60 md-mid:origin-[top_center] md-mid:whitespace-nowrap md-mid:pt-6  ${
            isOpen
              ? 'pointer-events-auto block md-mid:z-10 md-mid:scale-100 md-mid:opacity-100'
              : 'pointer-events-none hidden md-mid:scale-90 md-mid:opacity-0'
          }`}>
          <div className='md-mid:rounded-lg md-mid:bg-neutral-750 md-mid:shadow'>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
