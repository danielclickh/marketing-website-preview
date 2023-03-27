import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import SocialIcon from '../SocialIcon'
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
            <SocialIcon
              name='Twitter'
              href='https://twitter.com/ClickhouseDB'
              imgSrc='/socials/twitter.svg'
            />
            <SocialIcon
              name='Slack'
              href='/slack'
              imgSrc='/socials/slack.svg'
            />
          </div>
          <div className='flex gap-6'>
            <SocialIcon
              name='Telegram'
              href='https://telegram.me/clickhouse_en'
              imgSrc='/socials/telegram.svg'
            />
            <SocialIcon
              name='Meetup'
              href='https://www.meetup.com/pro/clickhouse'
              imgSrc='/socials/meetup.svg'
            />
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
