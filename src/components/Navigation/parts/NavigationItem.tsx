import NavigationChevron from './NavigationChevron'
import NavigationLink, { NavigationLinkProps } from './NavigationLink'
import useClickOutside from '@/hooks/useClickOutside'
import React, { useEffect, useRef, useState } from 'react'

interface NavigationItemBaseProps
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'href' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
  > {
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
  onMouseEnter?: (
    item: React.Ref<HTMLDivElement>,
    children: NavigationItemProps['children'],
    open: boolean
  ) => void
  onMouseLeave?: (
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
  link: Omit<NavigationLinkProps, 'children' | 'ref' | 'isHovered'>
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
  onMouseEnter = (item, children, isOpen) => {},
  onMouseLeave = (item, children, isOpen) => {},
  open = false,
  ...props
}: NavigationItemProps) {
  const hasChildren = !!children
  const itemRef = useRef<null | HTMLDivElement>(null)
  const linkRef = useRef<null | HTMLAnchorElement>(null)
  const childrenRef = useRef<null | HTMLDivElement>(null)
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

  const mouseEnter = (event: React.MouseEvent) => {
    setIsOpen(true)
    onMouseEnter(itemRef, children, true)
  }

  const mouseLeave = (event: React.MouseEvent) => {
    setIsOpen(false)
    onMouseEnter(itemRef, children, false)
  }

  const { className: linkClassName, ...linkProps } =
    link || ({ href } as NavigationItemLinkProps['link'])

  useEffect(() => {
    const resizeHandler = () => {
      if (childrenRef.current && isOpen) {
        childrenRef.current.style.left = ''

        const rect = childrenRef.current?.getBoundingClientRect()

        if (rect.right > window.innerWidth) {
          childrenRef.current.style.left = `${
            childrenRef.current.offsetLeft -
            (rect.right - window.innerWidth + 5)
          }px`
        }
      }
    }

    window.addEventListener('resize', resizeHandler)
    if (isOpen) resizeHandler()

    return () => window.removeEventListener('resize', resizeHandler)
  }, [childrenRef, isOpen])

  return (
    <div
      className={`relative ${className}`}
      ref={itemRef}
      onClick={onClickInside}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      {...props}>
      <NavigationLink
        ref={linkRef}
        {...linkProps}
        isHovered={isOpen}
        className={`group/navItem items-center md-mid:!px-4 ${
          !href && !link && !hasChildren ? 'cursor-default' : ''
        } ${hasChildren ? 'md-mid:pointer-events-none' : ''} ${
          isOpen ? 'text-primary-300' : ''
        } ${linkClassName}`}>
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
                isOpen ? '' : 'text-neutral-500 group-hover/navItem:text-white'
              }`}
              direction='down'
            />
          </span>
        )}
      </NavigationLink>
      {hasChildren && (
        <div
          ref={childrenRef}
          className={`md-mid:absolute md-mid:-left-12 md-mid:top-full md-mid:-z-50 md-mid:block md-mid:w-max md-mid:min-w-60 md-mid:whitespace-nowrap md-mid:pt-6 ${
            isOpen
              ? 'pointer-events-auto block md-mid:z-10'
              : 'pointer-events-none hidden'
          }`}>
          <div
            className={`origin-[top_center] transition-all md-mid:rounded-lg md-mid:bg-neutral-750 md-mid:shadow ${
              isOpen
                ? 'md-mid:scale-100 md-mid:opacity-100'
                : 'md-mid:scale-90 md-mid:opacity-0'
            }`}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
