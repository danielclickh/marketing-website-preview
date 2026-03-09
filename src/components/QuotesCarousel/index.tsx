import { CUICard } from '../ClickUI'
import Markdown from '../Markdown'
import iconQuote from './icon-quote.svg'
import styles from './styles.module.scss'
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

export interface QuotesCarousel {
  quotes: Array<{
    quote: string | React.ReactNode
    logo?: Omit<ImageProps, 'className'>
  }>
}

export default function QuotesCarousel({ quotes }: QuotesCarousel) {
  const [swiperInstance, setSwiperInstance] = useState<null | SwiperClass>(null)

  const hasNav = quotes.length > 3

  return (
    <div className='group/quotes relative my-10 xl:my-24'>
      <div className='section-container relative z-0'>
        <Swiper
          onInit={(instance: SwiperClass) => setSwiperInstance(instance)}
          spaceBetween={32}
          breakpoints={{
            1024: {
              slidesPerView: 3
            }
          }}
          loop={true}
          className={`sm:!-mx-8 sm:!px-8 ${styles.quotesMask}`}>
          {quotes.map(({ quote, logo }, index) => {
            const quoteIsString = typeof quote === 'string'
            return (
              <SwiperSlide key={index} className='group !h-auto !self-stretch'>
                <CUICard className='p-6 lg:p-12'>
                  <div className='flex h-full flex-col'>
                    <Image
                      src={iconQuote}
                      alt='Quote'
                      width={36}
                      height={28}
                      className='mb-6'
                    />
                    <div className='text-lg lg:mb-10'>
                      {quoteIsString && (
                        <Markdown encloseByDiv={false}>{quote}</Markdown>
                      )}
                      {!quoteIsString && quote}
                    </div>
                    {logo && (
                      <Image
                        {...logo}
                        className='mt-6 lg:mt-auto'
                        alt='Quote'
                      />
                    )}
                  </div>
                </CUICard>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      {hasNav && (
        <div className='pointer-events-none z-10 mt-10 flex justify-center gap-10 xl:absolute xl:left-0 xl:right-0 xl:top-1/2 xl:mt-0 xl:-translate-y-1/2 xl:justify-between xl:px-4 2xl:px-12'>
          <button
            className='pointer-events-auto opacity-40 transition-opacity hover:!opacity-90 group-hover/quotes:opacity-70'
            onClick={() => swiperInstance?.slidePrev()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='24'
              fill='none'
              viewBox='0 0 14 24'>
              <path
                fill='#fff'
                d='M13.06 20.94a1.5 1.5 0 1 1-2.12 2.12l-10-10a1.5 1.5 0 0 1 0-2.12l10-10a1.5 1.5 0 0 1 2.12 2.12L4.13 12l8.93 8.94Z'
              />
            </svg>
          </button>
          <button
            className='pointer-events-auto opacity-40 transition-opacity hover:!opacity-90 group-hover/quotes:opacity-70'
            onClick={() => swiperInstance?.slideNext()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='24'
              fill='none'
              viewBox='0 0 14 24'>
              <path
                fill='#fff'
                d='m13.06 13.06-10 10a1.5 1.5 0 0 1-2.12-2.12L9.87 12 .94 3.06A1.5 1.5 0 0 1 3.06.94l10 10a1.5 1.5 0 0 1 0 2.12Z'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
