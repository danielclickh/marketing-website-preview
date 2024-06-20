import Link, { LinkProps } from 'next/link'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import ClickHouseCloud from '../icons/ClickHouseCloud'
import LinkWithArrow from '../LinkWithArrow'

interface MenuLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

function MenuLink({ className = '', children, ...props }: MenuLinkProps) {
  return (
    <Link
      {...props}
      className={`inline-block rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-700/75 hover:text-primary-300 ${className}`}>
      {children}
    </Link>
  )
}

interface TopLevelItemProps
  extends Omit<
    React.HTMLProps<HTMLDivElement>,
    'href' | 'onMouseEnter' | 'onMouseLeave' | 'onClick'
  > {
  label: string
  href?: LinkProps['href']
  children?: React.ReactNode
  open?: boolean
  onMouseEnter?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onMouseLeave?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onClick?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
  onClickOutside?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children'],
    open: boolean
  ) => void
}

function TopLevelItem({
  label,
  href = '',
  children,
  className = '',
  onMouseEnter = (item, children, isOpen) => {},
  onMouseLeave = (item, children, isOpen) => {},
  onClick = (item, children, isOpen) => {},
  onClickOutside = (item, children, isOpen) => {},
  open = false,
  ...props
}: TopLevelItemProps) {
  const itemRef = useRef<null | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(open)

  const onClickInside = () => {
    let openVal = isOpen
    if (children) openVal = !openVal
    setIsOpen(openVal)
    onClick(itemRef, children, openVal)
  }

  useClickOutside(itemRef, () => {
    setIsOpen(false)
    onClickOutside(itemRef, children, false)
  })

  return (
    <div
      style={{
        perspective: '600px'
      }}
      className={`relative ${className}`}
      ref={itemRef}
      onMouseEnter={() => onMouseEnter(itemRef, children, isOpen)}
      onMouseLeave={() => onMouseLeave(itemRef, children, isOpen)}
      onClick={onClickInside}
      {...props}>
      <MenuLink
        href={href}
        className={`${!href && !children ? 'cursor-default' : ''} ${
          isOpen ? 'text-primary-300' : ''
        }`}>
        {label}
      </MenuLink>
      {!!children && (
        <div
          className={`pointer-events-none absolute left-1/2 top-full -z-50 w-max origin-[top_center] -translate-x-1/2 whitespace-nowrap pt-6 opacity-0 shadow transition-all ${
            isOpen
              ? 'pointer-events-auto z-10 scale-100 opacity-100'
              : 'scale-90'
          }`}>
          <div className='rounded bg-neutral-750'>{children}</div>
        </div>
      )}
    </div>
  )
}

export interface NavigationProps extends React.HTMLProps<HTMLElement> {
  onTopLevelMouseEnter?: TopLevelItemProps['onMouseEnter']
  onTopLevelMouseLeave?: TopLevelItemProps['onMouseLeave']
  onTopLevelClick?: TopLevelItemProps['onClick']
  onTopLevelClickOutside?: TopLevelItemProps['onClickOutside']
}

export default function Navigation({
  onTopLevelMouseEnter,
  onTopLevelMouseLeave,
  onTopLevelClick,
  onTopLevelClickOutside,
  ...props
}: NavigationProps) {
  const topLevelEvents: Pick<
    TopLevelItemProps,
    'onMouseEnter' | 'onMouseLeave' | 'onClick' | 'onClickOutside'
  > = {
    onMouseEnter(...args) {
      if (onTopLevelMouseEnter) onTopLevelMouseEnter(...args)
    },
    onMouseLeave(...args) {
      if (onTopLevelMouseLeave) onTopLevelMouseLeave(...args)
    },
    onClick(...args) {
      if (onTopLevelClick) onTopLevelClick(...args)
    },
    onClickOutside(...args) {
      if (onTopLevelClickOutside) onTopLevelClickOutside(...args)
    }
  }
  return (
    <nav {...props}>
      <div className='relative'>
        <ul className='flex'>
          <li>
            <TopLevelItem {...topLevelEvents} label='Products'>
              <ul className='grid grid-cols-5 grid-rows-3 p-4'>
                <li className='col-span-3 row-span-full flex items-center'>
                  <MenuLink href='#' className='flex w-full items-center gap-4'>
                    <ClickHouseCloud className='flex-grow-1 flex-shrink-0 text-primary-300' />
                    <span>
                      ClickHouse Cloud
                      <div className='text-xs text-slate-300'>
                        The best way to use ClickHouse.
                        <br />
                        Available on AWS, GCP, and Azure.
                      </div>
                    </span>
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-clickhouse.svg'
                      alt='ClickHouse'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>ClickHouse</span>
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-clickhouse-local.svg'
                      alt='ClickHouse Local'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>ClickHouse Local</span>
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-chdb.svg'
                      alt='chDB'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>chDB</span>
                  </MenuLink>
                </li>
              </ul>
              <LinkWithArrow
                href='/integrations?loc=nav'
                className='block w-full rounded-b bg-primary-300 px-4 py-2 text-center text-sm font-medium text-primary-900'>
                View our integrations
              </LinkWithArrow>
            </TopLevelItem>
          </li>
          <li>
            <TopLevelItem
              {...topLevelEvents}
              label='Docs'
              href='https://clickhouse.com/docs'
            />
          </li>
          <li>
            <TopLevelItem {...topLevelEvents} label='Resources'>
              <ul className='p-4'>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Blog
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    User stories
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    News and events
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Learning
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Support
                  </MenuLink>
                </li>
              </ul>
            </TopLevelItem>
          </li>
          <li>
            <TopLevelItem {...topLevelEvents} label='Use cases'>
              <ul className='p-4'>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Real-time analytics
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Logs, events and traces
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Business intelligence
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Machine learning and GenAI
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    All use cases
                  </MenuLink>
                </li>
              </ul>
            </TopLevelItem>
          </li>
          <li>
            <TopLevelItem {...topLevelEvents} label='Pricing'>
              <ul className='p-4'>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    ClickHouse Cloud pricing
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Cost estimator
                  </MenuLink>
                </li>
                <li>
                  <MenuLink href='#' className='block w-full'>
                    Dedicated services
                  </MenuLink>
                </li>
              </ul>
            </TopLevelItem>
          </li>
          <li>
            <TopLevelItem
              {...topLevelEvents}
              label='Contact us'
              href='/company/contact?loc=nav'
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
