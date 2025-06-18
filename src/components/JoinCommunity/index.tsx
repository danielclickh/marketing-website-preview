import SocialIcon from '../SocialIcon'
import { SuiTitle } from '../sui'
import { HeaderProps } from '@/components/Header/types'
import formatStat from '@/lib/utils/numbers'

interface Props {
  github: HeaderProps['github']
}
function JoinCommunity({ github: { stars, contributors, prs } }: Props) {
  return (
    <div className='section-container flex w-full flex-col items-center justify-between gap-8 pb-16 md:flex-row md:px-8 md:pb-16 2xl:px-0'>
      <div className='flex max-w-xl flex-col items-start gap-10'>
        <SuiTitle type='h2' className='w-full text-center md:text-left'>
          Join the{' '}
          <span className='tilted tilted-yellow'>
            <span className='tilted-content'>100k+</span>
          </span>{' '}
          developers using ClickHouse today
        </SuiTitle>
        <div className='mx-auto flex flex-wrap gap-6 md:mx-0'>
          <div className='mx-auto flex gap-6'>
            <SocialIcon
              name='X'
              href='https://x.com/ClickhouseDB'
              imgSrc='/socials/x.svg'
            />
            <SocialIcon
              name='Slack'
              href='/slack'
              prefetch={false}
              imgSrc='/socials/slack.svg'
            />
          </div>
          <div className='mx-auto flex gap-6'>
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
      <div className='mx-auto flex w-full max-w-lg flex-col gap-8 bg-click-grid bg-bottom pb-24 text-right font-medium md:items-end md:pb-0'>
        <div className='md:text-7.5xl absolute right-14 pt-4 font-basier text-5xl leading-none md:relative md:right-auto md:pt-0'>
          {formatStat(contributors)}+
          <span className='absolute left-0 top-full text-xl leading-snug text-primary-300 md:text-2.75xl'>
            Contributors
          </span>
        </div>
        <div className='md:text-7.5xl absolute left-14 mr-auto pt-14 text-left font-basier text-5xl leading-none md:relative md:left-auto md:pt-0'>
          {formatStat(prs)}+
          <span className='absolute left-0 top-full text-xl leading-snug text-primary-300 md:text-2.75xl'>
            PRs
          </span>
        </div>
        <div className='md:text-7.5xl absolute right-30 pt-32 font-basier text-5xl leading-none md:relative md:right-auto md:pt-0'>
          {formatStat(stars)}+
          <span className='absolute left-0 top-full text-xl leading-snug text-primary-300 md:text-2.75xl'>
            Stars
          </span>
        </div>
      </div>
    </div>
  )
}

export default JoinCommunity
