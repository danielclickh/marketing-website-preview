import Markdown from '../Markdown'
import { SuiCodeblock, SuiTitle } from '../sui'
import { GettingStartedData } from './types'
import { CUILink } from '../ClickUI'

export default function FetchGetStarted({ platforms }: GettingStartedData) {
  return (
    <div
      className='flex text-neutral-0 section-container w-full mb-24 md:px-12'
      id='getting_started'>
      <div className='mx-auto flex flex-col justify-center w-full bg-neutral-900/50 border border-neutral-700/80 py-16 px-4 xl:px-24 rounded-xl bg-click-grid bg-[length:547px_360px] bg-right bg-no-repeat'>
        <div className='flex flex-col text-center'>
          <SuiTitle type='h2' color='white'>
            Start using{' '}
            <span className='tilted tilted-yellow'>
              <span className='tilted-content'>ClickHouse</span>
            </span>{' '}
            in minutes
          </SuiTitle>
          <div className='text-neutral-300 text-center mb-8 mt-6'>
            Install ClickHouse for MacOs, Linux and FreeBSD
          </div>
        </div>
        <SuiCodeblock className='w-full md:w-full self-center overflow-hidden show-copy-paste'>
          <Markdown>{platforms[0].instructions}</Markdown>
        </SuiCodeblock>
        <div className='text-sm font-medium text-neutral-500 mt-4'>
          Or install for{' '}
          <CUILink
            href='https://clickhouse.com/docs/en/integrations/sql-clients/clickhouse-client-local'
            target='_self'
            className='underline hover:text-neutral-0'>
            Windows
          </CUILink>
          ,{' '}
          <CUILink
            href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
            target='_self'
            className='underline hover:text-neutral-0'>
            Docker
          </CUILink>{' '}
          or see other{' '}
          <CUILink
            href='https://clickhouse.com/docs/en/install'
            target='_self'
            className='underline hover:text-neutral-0'>
            install options.
          </CUILink>
        </div>
      </div>
    </div>
  )
}
