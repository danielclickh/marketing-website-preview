import Image from 'next/image'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton } from '../ClickUI'
import RollerText from '../RollerText'
import { SuiText, SuiTitle } from '../sui'

export default function HomepageHeroAlt() {
  return (
    <div className='relative overflow-x-hidden border-primary-300 lg:border-t-[38px]'>
      <div className='absolute top-0 left-0 bottom-0 z-10 w-4 bg-primary-300 sm:w-8 lg:w-1/2'></div>
      <div className='section-container relative z-20 grid lg:grid-cols-2'>
        {/* Text column */}
        <div className='relative z-30 order-last rounded-br-2xl bg-primary-300 pr-4 pb-12 text-black sm:pr-8 md:pr-0 md:pb-24 lg:order-first lg:rounded-br-none lg:py-24 xl:py-32'>
          <SuiTitle
            type='h1'
            className='!text-[2rem] md:!text-[2.85rem] xl:!text-[3.85rem]'>
            The{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>real-time</span>
            </span>{' '}
            <br />
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
          <div className='inline-block w-auto'>
            <SuiText
              size='lg'
              className='mt-6 mb-8 w-auto lg:mb-16 lg:!text-[20px]'>
              Unlock faster queries without skyrocketing costs.
            </SuiText>
            <div className='flex w-auto flex-wrap gap-6 md:flex-nowrap'>
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
        <div className='relative order-first lg:order-last'>
          {/* Horizontal angle separator */}
          <div className='absolute left-0 bottom-0 right-0 z-20 aspect-[608/142] text-primary-300 lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='auto'
              viewBox='0 0 608 142'>
              <path
                fill='currentColor'
                d='M.01516757.76743.0055 141.757124h607.989001v-1.7469c0-28.0458-18.654029-41.3032869-45.034001-44.9027238L32.383 45.2474298C13.1345 39.27443.0152294 21.46743.01516921 1.31443l-.00000164-.547Z'
              />
            </svg>
          </div>
          {/* Verticle angle separator */}
          <div className='absolute top-0 left-0 bottom-0 z-20 hidden aspect-[272/608] text-primary-300 lg:block'>
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
          <div className='mt-4 sm:mt-8 lg:absolute lg:top-0 lg:left-8 lg:bottom-0 lg:right-0 lg:z-10 lg:mt-0'>
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
  )
}
