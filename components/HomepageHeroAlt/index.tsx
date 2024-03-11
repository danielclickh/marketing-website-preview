import Image from 'next/image'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton } from '../ClickUI'
import RollerText from '../RollerText'
import { SuiText, SuiTitle } from '../sui'

export default function HomepageHeroAlt() {
  return (
    <>
      {/* Content columns */}
      <div className='relative overflow-x-hidden border-primary-300 lg:border-t-[38px]'>
        <div className='absolute top-0 left-0 bottom-0 z-10 w-4 bg-primary-300 sm:w-8 lg:w-1/2'></div>
        <div className='section-container relative z-20 grid lg:grid-cols-2'>
          {/* Text column */}
          <div className='relative z-30 bg-primary-300 pr-4 pt-8 text-black sm:pt-16 sm:pr-8 lg:py-24 lg:pt-24 lg:pr-0 xl:py-32'>
            <SuiTitle
              type='h1'
              className='!text-[2rem] md:!text-[2.85rem] xl:!text-[3.85rem]'>
              The{' '}
              <span className='tilted tilted-black'>
                <span className='tilted-content text-white'>real-time</span>
              </span>{' '}
              <br className='sm:hidden lg:block' />
              data warehouse for <br />
              <RollerText
                phraseList={[
                  'analytics',
                  'observability',
                  'ML & GenAI',
                  'business intelligence',
                  'financial services',
                  'fraud & cybersecurity',
                  'gaming'
                ]}
              />
            </SuiTitle>
            <div className='lg:inline-block lg:w-auto'>
              <SuiText
                size='lg'
                className='mb-4 w-auto sm:mt-6 sm:mb-8 md:mt-6 md:mb-16 lg:!text-[20px]'>
                Unlock faster queries without skyrocketing costs.
              </SuiText>
              <div className='flex w-auto flex-wrap gap-4 sm:gap-8 md:flex-nowrap md:gap-6'>
                <CUIButton
                  type='primary-dark'
                  size='lg'
                  weight='semibold'
                  href='#'
                  linkClass='w-full'
                  className='w-full'>
                  Start free cloud trial
                </CUIButton>
                <CUIButton
                  type='secondary-dark'
                  weight='semibold'
                  size='lg'
                  href='https://clickhouse.com/docs/en/intro'
                  linkClass='w-full'
                  className='w-full !border-black !text-black !transition-all hover:!text-white'>
                  Download open-source
                </CUIButton>
              </div>
            </div>
          </div>

          {/* Graphic column */}
          <div className='relative'>
            {/* Desktop angle separator */}
            <div className='absolute top-0 -left-px bottom-0 z-20 hidden aspect-[272/608] text-primary-300 lg:block'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='auto'
                height='100%'
                fill='none'
                viewBox='0 0 272 608'>
                <path
                  fill='currentColor'
                  d='M272 .00966757 0 0v607.989h1.7469c28.0458.006 52.8287-18.248 61.1401-45.034L227.52 32.3775C233.493 13.129 251.3.0097294 271.453.00966921L272 .00966757Z'
                />
              </svg>
            </div>

            {/* Hero image */}
            <div className='absolute top-0 left-8 bottom-0 right-0 z-10 hidden lg:block'>
              <Image
                src='/images/homepage/home-hero-product-ui.png'
                width={3000}
                height={1931}
                alt='ClickHouse Product Screenshot'
                className='aspect-[3000/1931] h-auto w-full lg:h-full lg:w-auto lg:max-w-none'
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile bottom angle separator */}
      <div className='relative -mt-px mr-4 aspect-[608/141] text-primary-300 sm:mr-8 lg:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='auto'
          viewBox='0 0 608 141'>
          <path
            fill='currentColor'
            d='M.00966757 140.989694 0 0h607.989001v1.7469c0 28.0458-18.654029 41.3032869-45.034001 44.9027238L32.3775 96.5096942C13.129 102.482694.0097294 120.289694.00966921 140.442694l-.00000164.547Z'
          />
        </svg>
      </div>
    </>
  )
}
