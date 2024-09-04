import Image from 'next/image'
import React from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'

export default function NavigationSubNavProducts() {
  return (
    <>
      <ul className='px-4 md-mid:py-2'>
        <li className='flex items-center'>
          <NavigationLink
            href='/cloud'
            onClick={galaxyOnClick('topNav.productMenu.cloudSelect')}
            className='group/nav-with-icon !flex w-full items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse-cloud.svg'
              alt='ClickHouse Cloud'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>
              ClickHouse Cloud
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                The best way to use ClickHouse.
                <br />
                Available on AWS, GCP, and Azure.
              </div>
            </span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            href='/clickhouse'
            onClick={galaxyOnClick('topNav.productMenu.openSourceSelect')}
            className='group/nav-with-icon !flex w-full items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse.svg'
              alt='ClickHouse'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>
              ClickHouse
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                Spin up a database with open-
                <br />
                source ClickHouse.
              </div>
            </span>
          </NavigationLink>
        </li>

        <li className='md-mid:hidden'>
          <NavigationLink
            href='/integrations'
            className='!flex w-full items-center gap-3'
            onClick={galaxyOnClick(
              'topNav.productMenu.integrationsHighlightSelect'
            )}>
            <Image
              src='/images/nav/icon-integrations.svg'
              alt='chDB'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>View 100+ integrations</span>
          </NavigationLink>
        </li>
      </ul>
      <LinkWithArrow
        href='/integrations'
        onClick={galaxyOnClick(
          'topNav.productMenu.integrationsHighlightSelect'
        )}
        className='hidden w-full rounded-b-lg border-t border-neutral-700 px-[60px] py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
        View 100+ integrations
      </LinkWithArrow>
    </>
  )
}
