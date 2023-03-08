import GitHubButton from 'react-github-btn'
import { ReactNode } from 'react'
import Markdown from '../Markdown'
import { SuiCodeblock, SuiLink, SuiText, SuiTitle } from '../sui'
import { GettingStartedData } from './types'
interface Props extends GettingStartedData {
  customHeader?: ReactNode
}

export default function FetchGetStarted({ platforms }: Props) {
  return (
    <div className='flex bg-grid text-neutral-0' id='getting_started'>
      <div className='container mx-auto justify-center py-12 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center md:w-5/12 mx-auto '>
          <GitHubButton
            href='https://github.com/Clickhouse/Clickhouse'
            data-color-scheme='dark'
            data-size='large'
            data-show-count='true'
            aria-label='Star Clickhouse/Clickhouse on GitHub'
          />
          <SuiTitle type='h2' className='text-4xl' color='white'>
            Start using ClickHouse in minutes
          </SuiTitle>
          <SuiText size='base' weight='medium' color='c4-dark'>
            Install ClickHouse for MacOs, Linux and FreeBSD
          </SuiText>
        </div>
        <div className='bg-c2-dark w-11/12 md:w-full self-center border border-c5-light rounded-lg p-2 px-6 overflow-hidden mb-1'>
          <SuiCodeblock bgColor='bg-transparent'>
            <Markdown ignoreAnchor>{platforms[0].instructions}</Markdown>
          </SuiCodeblock>
        </div>
        <SuiText
          size='sm'
          weight='medium'
          color='white'
          className='px-6 md:px-0 mt-6'>
          Or install for{' '}
          <SuiLink
            href='/clickhouse'
            target='_self'
            color='primary'
            weight='bold'>
            Windows
          </SuiLink>
          ,{' '}
          <SuiLink
            href='/clickhouse'
            target='_self'
            color='primary'
            weight='bold'>
            Docker
          </SuiLink>{' '}
          or see other{' '}
          <SuiLink
            href='/clickhouse'
            target='_self'
            color='primary'
            weight='bold'>
            install options.
          </SuiLink>
        </SuiText>
      </div>
    </div>
  )
}
