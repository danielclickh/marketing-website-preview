import Image from 'next/image'
import Link from 'next/link'
import { CUILink } from '../ClickUI'
function FollowUs() {
  return (
    <div className='bg-primary-300 text-neutral py-12 text-center'>
      <h3 className='text-lg font-bold pb-4'>Follow Us</h3>
      <div className='grid grid-cols-3 content-center md:grid-cols-5 md:max-w-lg md:mx-auto'>
        <div className='mx-auto pb-4'>
          <div className='bg-neutral-725 w-16 h-16 rounded-md flex items-center justify-center'>
            <a
              href='https://twitter.com/clickhousedb'
              target='_blank'
              className='text-center content-center'>
              <Image
                src='/socials/twitter.svg'
                width={32}
                height={32}
                alt='Twitter image'
              />{' '}
            </a>
          </div>
        </div>
        <div className='mx-auto'>
          <div className='bg-neutral-725 w-16 h-16 rounded-md flex items-center justify-center'>
            <Link href='/slack' target='_blank'>
              <Image
                src='/socials/slack.svg'
                width={32}
                height={32}
                alt='Slack image'
              />
            </Link>
          </div>
        </div>
        <div className='mx-auto'>
          <div className='bg-neutral-725 w-16 h-16 rounded-md flex items-center justify-center'>
            <a href='https://github.com/ClickHouse/ClickHouse' target='_blank'>
              <svg viewBox='0 0 16 16' className='fill-neutral-0 w-8 h-8'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z' />
              </svg>
            </a>
          </div>
        </div>
        <div className='mx-auto'>
          <div className='bg-neutral-725 w-16 h-16 rounded-md flex items-center justify-center'>
            <a href='https://www.meetup.com/pro/clickhouse/' target='_blank'>
              <Image
                src='/socials/meetup.svg'
                width={32}
                height={32}
                alt='Meetup image'
              />{' '}
            </a>
          </div>
        </div>
        <div className='mx-auto'>
          <div className='bg-neutral-725 w-16 h-16 rounded-md flex items-center justify-center'>
            <CUILink
              key='blog-categories-nav'
              href='/rss.xml'
              segmentEvent={{
                label: 'Blog RSS link',
                category: 'blog-categories-nav'
              }}
              target='blank'
              className='grid place-items-center'>
              <Image src='/socials/rss.svg' width={32} height={32} alt='RSS' />
            </CUILink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowUs
