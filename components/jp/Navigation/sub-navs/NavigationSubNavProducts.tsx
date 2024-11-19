import Image from 'next/image'
import { useGalaxyOnClick } from '../../../../lib/galaxy/galaxy'
import { NavigationLink } from '../parts'

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
              className='flex-grow-1 flex-shrink-0'
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
              Bring Your Own Cloud (Private Preview)
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
              className='flex-grow-1 flex-shrink-0'
            />
            <span>
              ClickHouse
              <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                オープンソースのClickHouseでデータベースを立ち上げる。
              </div>
            </span>
          </NavigationLink>
        </li>
      </ul>
    </>
  )
}
