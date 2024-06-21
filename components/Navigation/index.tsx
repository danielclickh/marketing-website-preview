import Link, { LinkProps } from 'next/link'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import ClickHouseCloud from '../icons/ClickHouseCloud'
import LinkWithArrow from '../LinkWithArrow'
import {
  MenuLinkProps,
  TopLevelItemProps,
  NavigationProps,
  MenuQuoteProps
} from './types'

export default function Navigation({
  onTopLevelClick,
  onTopLevelClickOutside,
  ...props
}: NavigationProps) {
  const topLevelEvents: Pick<TopLevelItemProps, 'onClick' | 'onClickOutside'> =
    {
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
        <ul className='grid grid-cols-1 md-mid:flex md-mid:flex-row'>
          <li>
            <TopLevelItem {...topLevelEvents} label='Products'>
              <ul className='px-4 md-mid:grid md-mid:grid-cols-5 md-mid:grid-rows-3 md-mid:py-4'>
                <li className='col-span-3 row-span-full flex items-center'>
                  <MenuLink
                    href='#'
                    className='!flex w-full items-center gap-4'>
                    <ClickHouseCloud className='flex-grow-1 h-auto w-5 flex-shrink-0 stroke-[4] text-primary-300 md-mid:w-auto md-mid:stroke-[1.75]' />
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
                  <MenuLink
                    href='#'
                    className='!flex w-full items-center gap-3'>
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
                  <MenuLink
                    href='#'
                    className='!flex w-full items-center gap-3'>
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
                  <MenuLink
                    href='#'
                    className='!flex w-full items-center gap-3'>
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
                <li className='md-mid:hidden'>
                  <MenuLink
                    href='#'
                    className='!flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-integrations.svg'
                      alt='chDB'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>View integrations</span>
                  </MenuLink>
                </li>
              </ul>
              <LinkWithArrow
                href='#'
                className='hidden w-full rounded-b-lg bg-primary-300 px-4 py-2 text-center text-sm font-medium text-primary-900 md-mid:block'>
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
              <ul className='px-4 md-mid:py-4'>
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
              <ul className='px-4 md-mid:grid md-mid:grid-cols-5 md-mid:grid-rows-5 md-mid:py-4'>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    Real-time analytics
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    Logs, events and traces
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    Business intelligence
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    Machine learning and GenAI
                  </MenuLink>
                </li>
                <li className='col-span-2'>
                  <MenuLink href='#' className='block w-full'>
                    All use cases
                  </MenuLink>
                </li>
                <li className='col-span-3 col-start-3 row-span-full'>
                  <MenuQuote
                    className='md-mid:max-w-[336px]'
                    author='Harlow Ward'
                    jobTitle='CTO, Clearbit'
                    link={{ href: '#', text: 'View more user stories' }}>
                    There's that feeling of new tech where everything just feels
                    like it's going right. Can we get the data in there quick
                    enough? Yes. Can we query the data in a way that is going to
                    have a responsive UI? Yes.
                  </MenuQuote>
                </li>
              </ul>
            </TopLevelItem>
          </li>
          <li>
            <TopLevelItem {...topLevelEvents} label='Pricing'>
              <ul className='px-4 md-mid:py-4'>
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

function MenuLink({ className = '', children, ...props }: MenuLinkProps) {
  return (
    <Link
      {...props}
      className={`block rounded px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/75 hover:text-primary-300 md-mid:inline-block md-mid:py-2 ${className}`}>
      {children}
    </Link>
  )
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
  const hasChildren = !!children
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
      className={`relative ${className}`}
      ref={itemRef}
      onMouseEnter={() => onMouseEnter(itemRef, children, isOpen)}
      onMouseLeave={() => onMouseLeave(itemRef, children, isOpen)}
      onClick={onClickInside}
      {...props}>
      <MenuLink
        href={href}
        className={`${!href && !hasChildren ? 'cursor-default' : ''} ${
          isOpen ? 'text-primary-300' : ''
        }`}>
        <div className='flex items-center'>
          <span className='flex-1'>{label}</span>
          {hasChildren && <MenuChevron isOpen={isOpen} />}
        </div>
      </MenuLink>
      {hasChildren && (
        <div
          className={`transition-all md-mid:absolute md-mid:-left-12 md-mid:top-full md-mid:-z-50 md-mid:block md-mid:w-max md-mid:min-w-60 md-mid:origin-[top_center] md-mid:whitespace-nowrap md-mid:pt-6 md-mid:shadow ${
            isOpen
              ? 'pointer-events-auto block md-mid:z-10 md-mid:scale-100 md-mid:opacity-100'
              : 'pointer-events-none hidden md-mid:scale-90 md-mid:opacity-0'
          }`}>
          <div className='md-mid:rounded-lg md-mid:bg-neutral-750'>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function MenuChevron({ isOpen = false }: { isOpen?: boolean }) {
  return (
    <span
      className={`flex w-2.5 flex-shrink-0 flex-grow-0 items-center justify-center transition-all md-mid:hidden ${
        isOpen ? 'rotate-90' : 'text-neutral-500'
      }`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='6'
        height='10'
        fill='none'
        viewBox='0 0 6 10'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='m1 9 4-4-4-4'
        />
      </svg>
    </span>
  )
}

function MenuQuote({
  children,
  author,
  jobTitle,
  link,
  ...props
}: MenuQuoteProps) {
  return (
    <div {...props}>
      <blockquote
        className={`${link ? 'rounded-t-md' : 'rounded-md'} bg-white p-4`}>
        <div className='mb-4 text-wrap text-sm font-bold text-slate-900'>
          {children}
        </div>
        <footer className='flex items-center gap-4'>
          <span className='flex flex-1 flex-col text-xs text-neutral-500'>
            <strong className='font-bold'>{author}</strong>
            {!!jobTitle && (
              <cite className='font-normal italic'>{jobTitle}</cite>
            )}
          </span>
          <span className='flex aspect-square w-9 flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-950 text-primary-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='21'
              fill='none'
              viewBox='0 0 26 21'>
              <path
                fill='currentColor'
                d='M12.7.5v6a14 14 0 0 1-1 5.1 21.6 21.6 0 0 1-6 8.6l-5.5-3c.8-1.4 1.5-2.9 2.2-4.6a18 18 0 0 0 1-6V.5h9.3ZM26 .5v6a14 14 0 0 1-1 5.1 21.5 21.5 0 0 1-6 8.6l-5.5-3c.8-1.4 1.5-2.9 2.2-4.6a18 18 0 0 0 1-6V.5H26Z'
              />
            </svg>
          </span>
        </footer>
      </blockquote>
      {link && (
        <LinkWithArrow
          {...link}
          className='block w-full rounded-b-md bg-primary-300 px-4 py-2 text-left text-sm font-medium text-primary-900'>
          {link.text}
        </LinkWithArrow>
      )}
    </div>
  )
}
