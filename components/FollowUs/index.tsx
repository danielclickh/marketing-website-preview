import SocialIcon from '../SocialIcon'

function FollowUs() {
  return (
    <div className='mt-24 flex flex-col items-center justify-center bg-primary-300 text-neutral'>
      <div className='mb-4 mt-8 font-bold'>Follow us</div>
      <div className='mb-12 flex flex-wrap justify-center gap-6'>
        <SocialIcon
          name='Twitter'
          href='https://twitter.com/ClickhouseDB'
          imgSrc='/socials/twitter.svg'
        />
        <SocialIcon name='Slack' href='/slack' imgSrc='/socials/slack.svg' />
        <SocialIcon
          name='GitHub'
          href='https://github.com/ClickHouse/ClickHouse'
          imgSrc='/socials/github.svg'
        />
        <div className='flex justify-center gap-6'>
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
          <SocialIcon
            key='blog-categories-nav'
            name='Rss'
            href='/rss.xml'
            imgSrc='/socials/rss.svg'
          />
        </div>
      </div>
    </div>
  )
}

export default FollowUs
