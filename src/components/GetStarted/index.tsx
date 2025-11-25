import { CUILink } from '../ClickUI'
import { SuiCodeblock, SuiTitle } from '../sui'
import { GettingStartedData } from './types'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Link from 'next/link'

export default function FetchGetStarted({ platforms }: GettingStartedData) {
  return (
    <div
      className='mx-auto mb-24 flex w-full max-w-7xl px-4 text-neutral-0 xl:px-0'
      id='getting_started'>
      <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-click-grid bg-[length:547px_360px] bg-right bg-no-repeat p-6 md:p-10 lg:p-12 xl:p-16'>
        <div className='flex flex-col text-center'>
          <SuiTitle type='h2' color='white'>
            Start using{' '}
            <span className='tilted tilted-yellow'>
              <span className='tilted-content'>ClickHouse</span>
            </span>{' '}
            in minutes
          </SuiTitle>
          <div className='mb-8 mt-6 text-center text-neutral-300'>
            Install ClickHouse for MacOS, Linux, and FreeBSD.
          </div>
        </div>
        <SuiCodeblock
          copyValue={platforms[0].instructions}
          className='overflow-hidden'>
          $ {platforms[0].instructions}
        </SuiCodeblock>
        <div className='mt-4 text-sm font-medium text-neutral-500'>
          Or install for{' '}
          <CUILink
            href='/docs/integrations/sql-clients/clickhouse-client-local'
            target='_self'
            prefetch={false}
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.windowsInstallSelect'
            )}>
            Windows
          </CUILink>
          ,{' '}
          <CUILink
            href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
            target='_self'
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.dockerInstallSelect'
            )}>
            Docker
          </CUILink>{' '}
          or see other{' '}
          <CUILink
            href='/docs/install'
            target='_self'
            prefetch={false}
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.otherOptionsSelect'
            )}>
            install options.
          </CUILink>
          <p className='mt-5'>
            Watch this{' '}
            <Link
              href='/company/events/getting-started-with-clickhouse?loc=getting-started'
              className='text-primary-300'>
              getting started video
            </Link>{' '}
            to learn more about ClickHouse.
          </p>
        </div>
      </div>
    </div>
  )
}
