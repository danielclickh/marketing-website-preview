import { NavigationLink } from '../parts'
import LinkWithArrow from '@/components/LinkWithArrow'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Image from 'next/image'

export default function NavigationSubNavProducts() {
  return (
    <>
      <ul className='px-4 md-mid:py-2'>
        <li className='flex items-center'>
          <NavigationLink
            href='/jp/cloud'
            onClick={useGalaxyOnClick('topNav.productMenu.cloudSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse-cloud.svg'
              alt='ClickHouse Cloud'
              width={24}
              height={24}
              className='flex-shrink-0 flex-grow-0'
            />
            <span>
              ClickHouse Cloud
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                ClickHouseを使用する最良の方法。
                <br />
                AWS、GCP、Azureで利用可能。
              </div>
            </span>
          </NavigationLink>
        </li>
        {/* <li className='flex items-center'>
          <NavigationLink
            href='/cloud/bring-your-own-cloud'
            onClick={galaxyOnClick('topNav.productMenu.byocSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-byoc.svg'
              alt='ClickHouse BYOC'
              width={24}
              height={24}
              className='flex-grow-1 flex-shrink-0'
            />
            <span>
              Bring Your Own Cloud
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                A fully managed ClickHouse Cloud service,
                <br /> deployed in your own AWS account.
              </div>
            </span>
          </NavigationLink>
        </li> */}
        <li>
          <NavigationLink
            href='/jp/clickhouse'
            onClick={useGalaxyOnClick('topNav.productMenu.openSourceSelect')}
            className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
            <Image
              src='/images/nav/icon-clickhouse.svg'
              alt='ClickHouse'
              width={24}
              height={24}
              className='flex-shrink-0 flex-grow-0'
            />
            <span>
              ClickHouse
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                オープンソースのClickHouseでデータベースを立ち上げる。
              </div>
            </span>
          </NavigationLink>
        </li>

        <li className='md-mid:hidden'>
          <NavigationLink
            href='/jp/integrations'
            className='!flex w-full !flex-nowrap items-center gap-3'
            onClick={useGalaxyOnClick(
              'topNav.productMenu.integrationsHighlightSelect'
            )}>
            <Image
              src='/images/nav/icon-integrations.svg'
              alt='integrations'
              width={24}
              height={24}
              className='flex-shrink-0 flex-grow-0'
            />
            <span>100を超えるインテグレーションを紹介します。</span>
          </NavigationLink>
        </li>
      </ul>
      <LinkWithArrow
        prefetch={false}
        href='/jp/integrations'
        onClick={useGalaxyOnClick(
          'topNav.productMenu.integrationsHighlightSelect'
        )}
        className='hidden w-full rounded-b-lg border-t border-neutral-700 px-[60px] py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
        100を超えるインテグレーションを紹介します。
      </LinkWithArrow>
    </>
  )
}
