import { CUILink } from '../../ClickUI'
import { SuiCodeblock, SuiTitle } from '../../sui'
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
            <span className='tilted tilted-yellow'>
              <span className='tilted-content'>ClickHouse</span>
            </span>{' '}
            は導入が簡単です
          </SuiTitle>
          <div className='mb-8 mt-6 text-center text-neutral-300'>
            MacOS、Linux、FreeBSD用のClickHouseをインストールできます。
          </div>
        </div>
        <SuiCodeblock
          className='overflow-hidden'
          copyValue={platforms[0].instructions}>
          $ {platforms[0].instructions}
        </SuiCodeblock>
        <div className='mt-4 text-sm font-medium text-neutral-500'>
          <CUILink
            href='/docs/install/windows'
            target='_self'
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.windowsInstallSelect'
            )}>
            Windows
          </CUILink>
          ,{'や'}
          <CUILink
            href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
            target='_self'
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.dockerInstallSelect'
            )}>
            Docker
          </CUILink>{' '}
          用もあります。
          <CUILink
            href='https://clickhouse.com/docs/en/install'
            target='_self'
            className='underline hover:text-neutral-0'
            onClick={useGalaxyOnClick(
              'homePage.installSection.otherOptionsSelect'
            )}>
            インストールオプション
          </CUILink>
          はこちら。
          <p className='mt-5'>
            ClickHouse について詳しくは、この
            <Link
              href='/company/events/getting-started-with-clickhouse?loc=getting-started'
              className='text-primary-300'>
              入門ビデオ
            </Link>{' '}
            をご覧ください。
          </p>
        </div>
      </div>
    </div>
  )
}
