import Link, { LinkProps } from 'next/link'
import React, { useRef, useState } from 'react'
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
    'href' | 'onMouseEnter' | 'onMouseLeave'
  > {
  label: string
  href?: LinkProps['href']
  children?: React.ReactNode
  onMouseEnter?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children']
  ) => void
  onMouseLeave?: (
    item: React.Ref<HTMLDivElement>,
    children: TopLevelItemProps['children']
  ) => void
}

function TopLevelItem({
  label,
  href = '',
  children,
  className = '',
  onMouseEnter = (item, children) => {},
  onMouseLeave = (item, children) => {},
  ...props
}: TopLevelItemProps) {
  const itemRef = useRef<null | HTMLDivElement>(null)
  return (
    <div
      className={`group/topLevelItem relative ${className}`}
      ref={itemRef}
      onMouseEnter={() => onMouseEnter(itemRef, children)}
      onMouseLeave={() => onMouseLeave(itemRef, children)}
      {...props}>
      <MenuLink
        href={href}
        className={`group-hover/topLevelItem:text-primary-300 ${
          !href ? 'cursor-default' : ''
        }`}>
        {label}
      </MenuLink>
      {!!children && (
        <div className='pointer-events-none absolute left-1/2 top-full -z-50 w-max -translate-x-1/2 whitespace-nowrap pt-6 opacity-0 shadow transition-opacity delay-75 group-hover/topLevelItem:pointer-events-auto group-hover/topLevelItem:z-10 group-hover/topLevelItem:opacity-100'>
          <div className='rounded bg-neutral-750'>{children}</div>
        </div>
      )}
    </div>
  )
}

export interface NavigationProps extends React.HTMLProps<HTMLElement> {
  onTopLevelMouseEnter?: TopLevelItemProps['onMouseEnter']
  onTopLevelMouseLeave?: TopLevelItemProps['onMouseLeave']
}

export default function Navigation({
  onTopLevelMouseEnter,
  onTopLevelMouseLeave,
  ...props
}: NavigationProps) {
  const topLevelEvents: Pick<
    TopLevelItemProps,
    'onMouseEnter' | 'onMouseLeave'
  > = {
    onMouseEnter(item, children) {
      if (onTopLevelMouseEnter) onTopLevelMouseEnter(item, children)
    },
    onMouseLeave(item, children) {
      if (onTopLevelMouseLeave) onTopLevelMouseLeave(item, children)
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
                  <MenuLink href='#' className='block w-full'>
                    ClickHouse Cloud
                    <div className='text-xs text-slate-300'>
                      The best way to use ClickHouse.
                      <br />
                      Available on AWS, GCP, and Azure.
                    </div>
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    ClickHouse
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    ClickHouse Local
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    chDB
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
            <TopLevelItem {...topLevelEvents} label='Docs' href='/docs' />
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
