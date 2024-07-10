import Image from 'next/image'
import React from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'

export default function NavigationSubNavProducts() {
  return (
    <>
      <ul className='px-4 md-mid:py-4'>
        <li className='flex items-center'>
          <NavigationLink
            href='/cloud'
            onClick={() => galaxyOnClick('topNav.productMenu.cloudSelect')}
            className='group/chCloud !flex w-full items-center gap-4'>
            <Image
              src='/images/nav/icon-clickhouse-cloud.svg'
              alt='ClickHouse Cloud'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>
              ClickHouse Cloud
              <div className='text-xs text-slate-300 group-hover/chCloud:text-white'>
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
            onClick={() => galaxyOnClick('topNav.productMenu.openSourceSelect')}
            className='!flex w-full items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse.svg'
              alt='ClickHouse'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>ClickHouse</span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            href='https://clickhouse.com/docs/en/operations/utilities/clickhouse-local'
            onClick={() => galaxyOnClick('topNav.productMenu.localSelect')}
            className='!flex w-full items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse-local.svg'
              alt='ClickHouse Local'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>ClickHouse Local</span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            href='https://github.com/chdb-io/chdb'
            onClick={() => galaxyOnClick('topNav.productMenu.chdbSelect')}
            className='!flex w-full items-center gap-3'>
            <Image
              src='/images/nav/icon-chdb.svg'
              alt='chDB'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>chDB</span>
          </NavigationLink>
        </li>
        <li className='md-mid:hidden'>
          <NavigationLink
            href='https://clickhouse.com/docs/en/integrations'
            className='!flex w-full items-center gap-3'
            onClick={() =>
              galaxyOnClick('topNav.productMenu.integrationsSelect')
            }>
            <Image
              src='/images/nav/icon-integrations.svg'
              alt='chDB'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>View integrations</span>
          </NavigationLink>
        </li>
      </ul>
      <LinkWithArrow
        href='https://clickhouse.com/docs/en/integrations'
        onClick={() =>
          galaxyOnClick('topNav.productMenu.integrationsHighlightSelect')
        }
        className='hidden w-full rounded-b-lg border-t border-white/5 px-4 py-3 text-center text-sm font-medium md-mid:block'>
        View our integrations
      </LinkWithArrow>
    </>
  )
}
