import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton } from '../ClickUI'
import CycleText from '../CycleText'
import { SuiText, SuiTitle } from '../sui'
import Typewriter from 'typewriter-effect'
import styles from './styles.module.scss'

export default function HomepageHeroAlt() {
  const router = useRouter()

  const [isTypewritter, setIsTypewritter] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    if (queryParams.has('typewriter')) {
      setIsTypewritter(true)
    }
  }, [router])
  return (
    <div className='relative overflow-x-hidden border-primary-300 lg:border-t-[38px]'>
      <div className='absolute top-0 left-0 bottom-0 z-10 w-full bg-primary-300 lg:w-1/2'></div>
      <div className='section-container relative z-20 grid lg:grid-cols-2'>
        {/* Text column */}
        <div className='relative z-30 bg-primary-300 py-12 text-center text-black lg:py-24 lg:text-left xl:py-32'>
          <SuiTitle
            type='h1'
            className='!text-[2rem] md:!text-[2.85rem] xl:!text-[3.85rem]'>
            The{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>real-time</span>
            </span>{' '}
            <br />
            data warehouse for <br />
            {!isTypewritter && (
              <CycleText
                pauseDelay={2000}
                phraseClasses='justify-center lg:justify-start'
                phrases={[
                  'analytics',
                  'observability',
                  'ML & GenAI',
                  'business intelligence',
                  'financial services',
                  'fraud & cybersecurity',
                  'gaming'
                ]}
              />
            )}
            {isTypewritter && (
              <Typewriter
                options={{
                  strings: [
                    'analytics',
                    'observability',
                    'ML & GenAI',
                    'business intelligence',
                    'financial services',
                    'fraud & cybersecurity',
                    'gaming'
                  ],
                  cursor: '_',
                  autoStart: true,
                  loop: true
                }}
              />
            )}
          </SuiTitle>
          <div className='lg:inline-block lg:w-auto'>
            <SuiText className='mt-6 mb-8 w-auto lg:!text-[20px]'>
              Unlock faster queries without skyrocketing costs.
            </SuiText>
            <div className='flex w-auto flex-wrap gap-4 sm:gap-8 md:flex-nowrap md:gap-6'>
              <CUIButton
                type='primary-dark'
                size='lg'
                weight='semibold'
                href='https://clickhouse.cloud/signUp'
                target='_blank'
                linkClass='w-full'
                className='w-full'>
                Start free cloud trial
              </CUIButton>
              <CUIButton
                type='secondary-dark'
                weight='semibold'
                size='lg'
                href='https://clickhouse.com/docs/en/getting-started/quick-start'
                target='_blank'
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
          <div
            className={`absolute -top-px -left-px bottom-0 z-20 hidden aspect-[272/608] text-primary-300 lg:block ${styles.angleShadow}`}>
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
          <div className='absolute top-0 left-4 bottom-0 right-0 z-10 hidden lg:block'>
            <Image
              src='/images/homepage/home-hero-product-ui.png'
              width={3006}
              height={1815}
              alt='ClickHouse Product Screenshot'
              className='aspect-[3006/1815] h-auto w-full lg:h-full lg:w-auto lg:max-w-none'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
