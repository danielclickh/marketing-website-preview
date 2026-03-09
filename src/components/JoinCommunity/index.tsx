import SocialIcon from '../SocialIcon'
import { SuiTitle } from '../sui'
import GithubStats from '@/components-cleaned/GithubStats'
import { HeaderProps } from '@/components/Header/types'
import ScaleToContainer from '@/components/ScaleToContainer'
import TiltedText from '@/components/TiltedText'
import formatStat from '@/lib/utils/numbers'
import React from 'react'

interface Props {
  github: HeaderProps['github']
}
function JoinCommunity({ github }: Props) {
  return (
    <div className='section-container flex w-full flex-col-reverse items-center justify-between gap-x-8 gap-y-16 lg:flex-row'>
      <div className='w-full max-w-xl space-y-8 text-center lg:text-left'>
        <SuiTitle type='h2'>
          Join the{' '}
          <TiltedText type='black-on-yellow' className='px-2'>
            100k+
          </TiltedText>{' '}
          developers using ClickHouse today
        </SuiTitle>
        <ul className='mx-auto flex flex-wrap justify-center gap-6 sm:max-w-max lg:mx-0'>
          <li className='flex items-center justify-center'>
            <SocialIcon
              name='X'
              href='https://x.com/ClickhouseDB'
              imgSrc='/socials/x.svg'
            />
          </li>
          <li className='flex items-center justify-center'>
            <SocialIcon
              name='Slack'
              href='/slack'
              imgSrc='/socials/slack.svg'
            />
          </li>
          <li className='flex items-center justify-center'>
            <SocialIcon
              name='Telegram'
              href='https://telegram.me/clickhouse_en'
              imgSrc='/socials/telegram.svg'
            />
          </li>
          <li className='flex items-center justify-center'>
            <SocialIcon
              name='Meetup'
              href='https://www.meetup.com/pro/clickhouse'
              imgSrc='/socials/meetup.svg'
            />
          </li>
          <li className='flex items-center justify-center'>
            <SocialIcon
              name='LinkedIn'
              href='https://www.linkedin.com/company/clickhouseinc'
              imgSrc='/socials/linkedin.svg'
            />
          </li>
        </ul>
      </div>
      <GithubStats {...github} />
    </div>
  )
}

export default JoinCommunity
