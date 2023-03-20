import Markdown from '../Markdown'
import { SuiCodeblock, SuiTitle } from '../sui'
import { GettingStartedData } from './types'
import { CUILink } from '../ClickUI'

export default function FetchGetStarted({ platforms }: GettingStartedData) {
  return (
    <div
      className='flex text-neutral-0 section-container w-full mb-36'
      id='getting_started'>
      <div className='mx-auto flex flex-col justify-center w-full bg-neutral-900/50 border border-neutral-700 py-16 xl:px-24 rounded-lg'>
        <div className='flex flex-col text-center'>
          <SuiTitle type='h2' color='white'>
            Start using{' '}
            <span className='tilted tilted-yellow'>
              <span className='tilted-content'>ClickHouse</span>
            </span>{' '}
            in minutes
          </SuiTitle>
          <div className='text-neutral-200 text-center mb-8 mt-6'>
            Install ClickHouse for MacOs, Linux and FreeBSD
          </div>
        </div>
        <div className='w-11/12 md:w-full self-center border border-rangitoto rounded-lg p-2 px-6 overflow-hidden mb-1'>
          <SuiCodeblock bgColor='bg-transparent'>
            <Markdown>{platforms[0].instructions}</Markdown>
          </SuiCodeblock>
        </div>
        <div className='text-sm font-medium text-neutral-400 px-6 md:px-0 mt-6'>
          Or install for{' '}
          <CUILink
            href='/clickhouse'
            target='_self'
            className='underline hover:text-neutral-0'>
            Windows
          </CUILink>
          ,{' '}
          <CUILink
            href='/clickhouse'
            target='_self'
            className='underline hover:text-neutral-0'>
            Docker
          </CUILink>{' '}
          or see other{' '}
          <CUILink
            href='/clickhouse'
            target='_self'
            className='underline hover:text-neutral-0'>
            install options.
          </CUILink>
        </div>
      </div>
    </div>
  )
}
