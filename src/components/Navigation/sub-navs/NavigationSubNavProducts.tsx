import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Image from 'next/image'

export default function NavigationSubNavProducts() {
  return (
    <>
      <ul className='px-4 md-mid:py-2'>
        <li className='flex items-center'>
          <NavigationLink
            href='/cloud'
            onClick={useGalaxyOnClick('topNav.productMenu.cloudSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse-cloud.svg'
              alt='ClickHouse Cloud'
              width='0'
              height='0'
              className='flex-grow-1 h-auto w-6 flex-shrink-0'
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
        <li className='flex items-center'>
          <NavigationLink
            href='/cloud/bring-your-own-cloud'
            onClick={useGalaxyOnClick('topNav.productMenu.byocSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-byoc.svg'
              alt='ClickHouse BYOC'
              width='0'
              height='0'
              className='flex-grow-1 h-auto w-6 flex-shrink-0'
            />
            <span>
              Bring Your Own Cloud
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                A fully managed ClickHouse Cloud service,
                <br /> deployed in your own AWS account.
              </div>
            </span>
          </NavigationLink>
        </li>
        <li>
          <NavigationLink
            href='/clickhouse'
            onClick={useGalaxyOnClick('topNav.productMenu.openSourceSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse.svg'
              alt='ClickHouse'
              width='0'
              height='0'
              className='flex-grow-1 h-auto w-6 flex-shrink-0'
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
            onClick={useGalaxyOnClick(
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
        prefetch={false}
        href='/integrations'
        onClick={useGalaxyOnClick(
          'topNav.productMenu.integrationsHighlightSelect'
        )}
        className='hidden w-full rounded-b-lg border-t border-neutral-700 px-[60px] py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
        View 100+ integrations
      </LinkWithArrow>
    </>
  )
}
