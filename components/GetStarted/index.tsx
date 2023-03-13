import Markdown from '../Markdown'
import { SuiCodeblock, SuiTitle } from '../sui'
import { GettingStartedData } from './types'
import { CUILink } from '../ClickUI'

export default function FetchGetStarted({ platforms }: GettingStartedData) {
  return (
    <div className='flex bg-grid text-neutral-0' id='getting_started'>
      <div className='container mx-auto justify-center py-32 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center mx-auto '>
          <SuiTitle type='h2' color='white'>
            Start using ClickHouse in minutes
          </SuiTitle>
          <div className='text-neutral-200 text-center mb-8 mt-6'>
            Install ClickHouse for MacOs, Linux and FreeBSD
          </div>
        </div>
        <div className='bg-noised w-11/12 md:w-full self-center border border-rangitoto rounded-lg p-2 px-6 overflow-hidden mb-1'>
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
