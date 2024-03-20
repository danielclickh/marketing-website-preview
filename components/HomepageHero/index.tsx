import { ChevronRightIcon } from '@heroicons/react/solid'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { HomepageHero as HomepageHeroContent } from '../../types/homepage'
import { CUIButton, CUILink } from '../ClickUI'
import { SuiTitle } from '../sui'
import HomePageTerminal from '../Terminal/HomePageTerminal'

interface Props extends React.HTMLProps<HTMLDivElement> {
  hero: HomepageHeroContent
}

export default function HomepageHero({
  hero,
  className = '',
  ...props
}: Props) {
  return (
    <div className={`homepage overflow-hidden bg-grid ${className}`} {...props}>
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
      <div className='clip-inverted-triangle border-b-[5.5rem] border-primary-300'>
        <div className='section-container mt-12 max-w-3xl lg:mt-0'>
          <HomePageTerminal />
        </div>
      </div>
    </div>
  )
}
