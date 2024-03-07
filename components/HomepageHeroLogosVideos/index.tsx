import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { HomepageCustomerStories, HomepageHero } from '../../types/homepage'
import { CUIButton, CUILink } from '../ClickUI'
import HomepageCustomerVideos from '../HomepageVideos'
import LogoCarousel from '../LogoCarousel'
import { SuiTitle } from '../sui'
import HomePageTerminal from '../Terminal/HomePageTerminal'

export default function HomepageHeroLogosVideos({
  hero,
  customerStories
}: {
  hero: HomepageHero
  customerStories: HomepageCustomerStories
}) {
  // Split the customerStories.logos array into two separate arrays
  const logos1 = customerStories.logos.slice(
    0,
    Math.ceil(customerStories.logos.length / 2)
  )
  const logos2 = customerStories.logos.slice(
    Math.ceil(customerStories.logos.length / 2)
  )

  return (
    <div className='homepage overflow-hidden bg-grid'>
      <div className='relative flex flex-col justify-center gap-24 px-8 pb-20 pt-16 md:px-0 md:pt-20 lg:pb-44 '>
        <div className='mx-auto flex w-full max-w-2xl flex-col'>
          <div className='mx-auto flex-col items-center justify-center md:mr-0 md:mt-8'>
            <SuiTitle type='h1' className='text-center' color='primary'>
              Query{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>billions</span>
              </span>{' '}
              of rows in milliseconds
            </SuiTitle>
            <div className='mx-auto flex max-w-md flex-col items-center md:max-w-2xl'>
              <div className='mt-6 mb-10 text-center text-lg text-neutral-0 md:text-xl md:leading-relaxed'>
                ClickHouse is the fastest and most resource efficient
                open-source database for real-time apps and analytics.
              </div>

              <div className='flex w-full flex-col items-center justify-center gap-6 md:flex-row'>
                <CUIButton
                  type='primary'
                  size='lg'
                  weight='semibold'
                  href={hero.ctaButton.href}
                  linkClass='w-full max-w-[14rem]'
                  onClick={galaxyOnClick('homePage.hero.startTrial')}
                  className='w-full'>
                  Start free trial
                </CUIButton>
                <CUIButton
                  type='secondary'
                  weight='semibold'
                  size='lg'
                  href='https://clickhouse.com/docs/en/intro'
                  linkClass='w-full max-w-[14rem]'
                  onClick={galaxyOnClick('homePage.hero.viewDocsSelect')}
                  className='w-full'>
                  View documentation
                </CUIButton>
              </div>
              <CUILink
                href='#getting_started'
                target='_self'
                className='arrow-link mt-5 hidden items-center gap-1 whitespace-nowrap text-neutral-200 hover:text-neutral-0 md:flex'
                onClick={galaxyOnClick('homePage.hero.openSourceSelect')}>
                Or download open-source ClickHouse{' '}
                <ChevronRightIcon height='18' className='arrow pt-0.5' />
              </CUILink>
            </div>
          </div>
        </div>
      </div>
      <div className='clip-inverted-triangle'>
        <div className='section-container mt-12 max-w-3xl lg:mt-0'>
          <HomePageTerminal />
        </div>
      </div>
      <div className='flip-selection -mt-1 bg-primary-300 pt-16 '>
        <div className='mx-auto'>
          <div className='mx-auto mb-8 w-fit max-w-4xl px-4 py-6 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
            Trusted by developers that work with data at{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content leading-8'>scale</span>
            </span>
          </div>
          <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
            <div className='absolute left-0 z-10 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
            <div className='absolute right-0 z-10 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
            <LogoCarousel
              logos={logos1}
              speedClass1='animate-marqueeLeft'
              speedClass2='animate-marqueeLeft2'
            />
            <LogoCarousel
              logos={logos2}
              speedClass1='animate-marqueeLeft3'
              speedClass2='animate-marqueeLeft4'
            />
          </div>
          <div className='mx-auto w-fit max-w-4xl px-4 py-6 pb-0 pt-10 text-center text-base leading-normal text-primary-800 md:px-0'>
            Don't take our word for it.{' '}
            <Link href='/user-stories' className='font-bold hover:underline'>
              Read our user stories{' '}
              <ChevronRightIcon
                height='20'
                className='-mt-0.5 inline-block transition group-hover:translate-x-1/2'
              />
            </Link>
          </div>
          <div className='mx-auto max-w-7xl py-24 px-3 text-black xl:px-0'>
            <HomepageCustomerVideos
              videos={[
                {
                  videoId: '863656593',
                  type: 'vimeo',
                  vimeoCode: 'ff50bb0ffb',
                  quote:
                    'Moving over to ClickHouse we were basically able to cut that (Redshift) bill in half.',
                  personName: 'Brooke McKim',
                  personTitleAndCompany: 'Co-founder and CTO, Vantage',
                  image: '/images/vantage-tile.png'
                },
                {
                  videoId: '863656379',
                  type: 'vimeo',
                  vimeoCode: 'ec5de7be6d',
                  quote:
                    "There is that feeling of new tech where everything just feels like it's going right.",
                  personName: 'Harlow Ward',
                  personTitleAndCompany: 'Co-founder and CTO, Clearbit',
                  image: '/images/clearbit-tile.png'
                },
                {
                  videoId: '863656471',
                  type: 'vimeo',
                  vimeoCode: '72825b3c5e',
                  quote:
                    'We wanted something not only just simple to use, but also simple to manage.',
                  personName: 'Jason Wang',
                  personTitleAndCompany: 'Software Engineer, Statsig',
                  image: '/images/statsig-tile.png'
                },
                {
                  videoId: '903236689',
                  type: 'vimeo',
                  vimeoCode: '62b37e3795',
                  quote:
                    'ClickHouse has been great for us. It has solved all the use cases we have thrown at it',
                  personName: 'Ritesh Varyani',
                  personTitleAndCompany: 'Senior Software Engineer, Lyft',
                  image: '/images/lyft-tile.png'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
