import SocialIcon from '../SocialIcon'

function FollowUs() {
  return (
    <div className='bg-primary-300 text-neutral flex flex-col items-center justify-center mt-20'>
      <div className='mt-8 mb-4 font-bold'>Follow us</div>
      <div className='flex flex-wrap gap-6 mb-12 justify-center'>
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
        <div className='flex gap-6 justify-center'>
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
            segmentEvent={{
              label: 'Blog RSS link',
              category: 'blog-categories-nav'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FollowUs
