import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
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
            <CUILink
              href='https://twitter.com/ClickhouseDB'
              className='w-16 h-16 bg-eerie-black/40 hover:bg-eerie-black/70 rounded grid place-items-center'>
              <Image
                src='/socials/twitter.svg'
                width={32}
                height={32}
                alt='Twitter image'
              />
            </CUILink>
            <CUILink
              href='https://join.slack.com/t/clickhousedb/shared_invite/zt-1gh9ds7f4-PgDhJAaF8ad5RbWBAAjzFg'
              className='w-16 h-16 bg-eerie-black/40 hover:bg-eerie-black/70 rounded grid place-items-center'>
              <Image
                src='/socials/slack.svg'
                width={32}
                height={32}
                alt='Slack image'
              />
            </CUILink>
          </div>
          <div className='flex gap-6'>
            <CUILink
              href='/'
              className='w-16 h-16 bg-eerie-black/40 hover:bg-eerie-black/70 rounded grid place-items-center'>
              <Image
                src='/socials/discord.svg'
                width={32}
                height={32}
                alt='Discord image'
              />
            </CUILink>
            <CUILink
              href='https://www.meetup.com/pro/clickhouse'
              className='w-16 h-16 bg-eerie-black/40 hover:bg-eerie-black/70 rounded grid place-items-center'>
              <Image
                src='/socials/meetup.svg'
                width={32}
                height={32}
                alt='Meetup image'
              />
            </CUILink>
          </div>
        </div>
      </div>
      <div className='w-full mx-auto flex flex-col gap-4 items-end text-right font-semibold max-w-lg'>
        <div className='relative font-basier text-8xl leading-none w-fit'>
          1.2k+
          <span className='absolute top-full left-0 text-primary text-xl leading-snug'>
            Contributors
          </span>
        </div>
        <div className='relative font-basier text-8xl leading-none mr-auto text-left'>
          32k+
          <span className='absolute top-full left-0 text-primary text-xl leading-snug'>
            PRs
          </span>
        </div>
        <div className='relative font-basier text-8xl leading-none'>
          27k+
          <span className='absolute top-full left-0 text-primary text-xl leading-snug'>
            Stars
          </span>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunity
