import React, { useRef, useState } from 'react'
import useClickOutside from '../../../hooks/useClickOutside'
import NavigationChevron from './NavigationChevron'
import NavigationLink, { NavigationLinkProps } from './NavigationLink'

interface NavigationItemBaseProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'href' | 'onClick'> {
  label: string
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

interface NavigationItemNoLinkProps extends NavigationItemBaseProps {
  href?: never
  link?: never
  children: React.ReactNode
}

interface NavigationItemHrefProps extends NavigationItemBaseProps {
  href: NavigationLinkProps['href']
  link?: never
}

interface NavigationItemLinkProps extends NavigationItemBaseProps {
  link: Omit<NavigationLinkProps, 'children' | 'ref'>
  href?: never
}

export type NavigationItemProps =
  | NavigationItemNoLinkProps
  | NavigationItemHrefProps
  | NavigationItemLinkProps

export default function NavigationItem({
  label,
  href,
  link,
  children,
  className = '',
  onClick = (item, children, isOpen) => {},
  onClickOutside = (item, children, isOpen) => {},
  open = false,
  ...props
}: NavigationItemProps) {
  const hasChildren = !!children
  const itemRef = useRef<null | HTMLDivElement>(null)
  const linkRef = useRef<null | HTMLAnchorElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(open)

  const onClickInside = (event: React.MouseEvent) => {
    let openVal = isOpen
    if (children) {
      if (!openVal) {
        openVal = true
      } else if (linkRef.current?.contains(event.target as Node)) {
        openVal = false
      }
      setIsOpen(openVal)
    }
    onClick(itemRef, children, openVal)
  }

  useClickOutside(itemRef, () => {
    setIsOpen(false)
    onClickOutside(itemRef, children, false)
  })

  const { className: linkClassName, ...linkProps } =
    link || ({ href } as NavigationItemLinkProps['link'])

  return (
    <div
      className={`relative ${className}`}
      ref={itemRef}
      onClick={onClickInside}
      {...props}>
      <NavigationLink
        ref={linkRef}
        {...linkProps}
        className={`items-center ${
          !href && !link && !hasChildren ? 'cursor-default' : ''
        } ${isOpen ? 'text-primary-300' : ''} ${linkClassName}`}>
        <span className='flex-1'>{label}</span>
        {hasChildren && (
          <span className='md-mid:ml-2'>
            {/* Mobile */}
            <NavigationChevron
              className={`md-mid:hidden ${isOpen ? '' : 'text-neutral-500'}`}
              direction={isOpen ? 'down' : 'right'}
            />

            {/* Desktop */}
            <NavigationChevron
              className={`hidden md-mid:block ${
                isOpen ? '' : 'text-neutral-500'
              }`}
              direction={isOpen ? 'up' : 'down'}
            />
          </span>
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
