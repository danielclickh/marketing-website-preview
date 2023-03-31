import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import SocialIcon from '../SocialIcon'
import { SuiTitle } from '../sui'

function JoinCommunity() {
  return (
    <div className='flex flex-col items-center pb-16 md:pb-16 md:px-8 2xl:px-0 md:flex-row justify-between w-full section-container gap-8'>
      <div className='flex flex-col items-start max-w-xl gap-10'>
        <SuiTitle type='h2' className='w-full text-center md:text-left'>
          Join the{' '}
          <span className='tilted tilted-yellow'>
            <span className='tilted-content'>100k+</span>
          </span>{' '}
          developers using ClickHouse today
        </SuiTitle>
        <div className='flex flex-wrap gap-6 mx-auto md:mx-0'>
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
      <div className='w-full pb-24 md:pb-0 mx-auto flex flex-col gap-8 md:items-end text-right font-medium max-w-lg bg-click-grid bg-bottom'>
        <div className='font-basier text-5xl md:text-7.5xl leading-none right-14 pt-4 md:pt-0 md:right-auto absolute md:relative'>
          1.2k+
          <span className='absolute top-full left-0 text-primary text-xl md:text-2.75xl leading-snug'>
            Contributors
          </span>
        </div>
        <div className='font-basier text-5xl md:text-7.5xl leading-none mr-auto text-left absolute md:relative left-14 md:left-auto pt-14 md:pt-0'>
          32k+
          <span className='absolute top-full left-0 text-primary text-xl md:text-2.75xl leading-snug'>
            PRs
          </span>
        </div>
        <div className='font-basier text-5xl md:text-7.5xl leading-none pt-32 md:pt-0 right-30 md:right-auto absolute md:relative'>
          27k+
          <span className='absolute top-full left-0 text-primary text-xl md:text-2.75xl leading-snug'>
            Stars
          </span>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunity
