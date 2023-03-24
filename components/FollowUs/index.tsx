import Image from 'next/image'
import { CUILink } from '../ClickUI'
function FollowUs() {
  return (
    <div className='bg-primary-300 text-neutral flex flex-col items-center justify-center mt-20'>
      <div className='mt-8 mb-4 font-bold'>Follow us</div>
      <div className='flex flex-wrap gap-6 mb-12 justify-center'>
        <CUILink
          href='https://twitter.com/ClickhouseDB'
          className='w-16 h-16 bg-neutral-900 hover:bg-neutral-900/90 rounded grid place-items-center'>
          <Image
            src='/socials/twitter.svg'
            width={32}
            height={32}
            alt='Twitter image'
          />
        </CUILink>
        <CUILink
          href='/slack'
          className='w-16 h-16 bg-neutral-900 hover:bg-neutral-900/90 rounded grid place-items-center'>
          <Image
            src='/socials/slack.svg'
            width={32}
            height={32}
            alt='Slack image'
          />
        </CUILink>
        <CUILink
          href='/'
          className='w-16 h-16 bg-neutral-900 hover:bg-neutral-900/90 rounded grid place-items-center'>
          <Image
            src='/socials/discord.svg'
            width={32}
            height={32}
            alt='Discord image'
          />
        </CUILink>
        <div className='flex gap-6 justify-center'>
          <CUILink
            href='https://www.meetup.com/pro/clickhouse'
            className='w-16 h-16 bg-neutral-900 hover:bg-neutral-900/90 rounded grid place-items-center'>
            <Image
              src='/socials/meetup.svg'
              width={32}
              height={32}
              alt='Meetup image'
            />
          </CUILink>
          <CUILink
            key='blog-categories-nav'
            href='/rss.xml'
            segmentEvent={{
              label: 'Blog RSS link',
              category: 'blog-categories-nav'
            }}
            target='blank'
            className='w-16 h-16 bg-neutral-900 hover:bg-neutral-900/90 rounded grid place-items-center'>
            <Image
              src='/socials/rss.svg'
              width={32}
              height={32}
              alt='Meetup image'
            />
          </CUILink>
        </div>
      </div>
    </div>
  )
}

export default FollowUs
