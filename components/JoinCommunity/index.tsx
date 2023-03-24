import Image from 'next/image'
import React from 'react'
import { CUIButton } from '../ClickUI'
import { SuiTitle } from '../sui'

function JoinCommunity() {
  return (
    <div className='flex flex-col items-center pb-16 md:pb-36 md:flex-row justify-between w-full section-container gap-8'>
      <div className='flex flex-col items-start max-w-xl gap-10'>
        <SuiTitle type='h2' className='w-full'>
          Join the{' '}
          <span className='tilted tilted-yellow'>
            <span className='tilted-content'>100k+</span>
          </span>{' '}
          developers using ClickHouse today
        </SuiTitle>
        <div className='flex flex-wrap gap-6'>
          <div className='flex gap-6'>
            <CUIButton
              href='https://twitter.com/ClickhouseDB'
              className='w-16 !h-16 rounded grid place-items-center !border-neutral-700/50'
              type='secondary'>
              <Image
                src='/socials/twitter.svg'
                width={32}
                height={32}
                alt='Twitter image'
              />
            </CUIButton>
            <CUIButton
              href='/slack'
              className='w-16 !h-16 rounded grid place-items-center !border-neutral-700/50'
              type='secondary'>
              <Image
                src='/socials/slack.svg'
                width={32}
                height={32}
                alt='Slack image'
              />
            </CUIButton>
          </div>
          <div className='flex gap-6'>
            <CUIButton
              href='/'
              className='w-16 !h-16 rounded grid place-items-center !border-neutral-700/50'
              type='secondary'>
              <Image
                src='/socials/discord.svg'
                width={32}
                height={32}
                alt='Discord image'
              />
            </CUIButton>
            <CUIButton
              href='https://www.meetup.com/pro/clickhouse'
              className='w-16 !h-16 rounded grid place-items-center !border-neutral-700/50'
              type='secondary'>
              <Image
                src='/socials/meetup.svg'
                width={32}
                height={32}
                alt='Meetup image'
              />
            </CUIButton>
          </div>
        </div>
      </div>
      <div className='w-full mx-auto flex flex-col gap-4 items-end text-right font-medium max-w-lg bg-click-grid bg-bottom'>
        <div className='relative font-basier text-7.5xl leading-none w-fit'>
          1.2k+
          <span className='absolute top-full left-0 text-primary text-2.75xl leading-snug'>
            Contributors
          </span>
        </div>
        <div className='relative font-basier text-7.5xl leading-none mr-auto text-left'>
          32k+
          <span className='absolute top-full left-0 text-primary text-2.75xl leading-snug'>
            PRs
          </span>
        </div>
        <div className='relative font-basier text-7.5xl leading-none'>
          27k+
          <span className='absolute top-full left-0 text-primary text-2.75xl leading-snug'>
            Stars
          </span>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunity
