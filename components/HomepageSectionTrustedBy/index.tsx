import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import type { Swiper as SwiperClass } from 'swiper/types'
import { HomepageCustomerStories } from '../../types/homepage'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'
import styles from './styles.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function HomepageSectionTrustedBy({
  customerStories
}: {
  customerStories: HomepageCustomerStories
}) {
  const resizeImageDimension = (size: number) =>
    parseFloat((size * 0.8).toFixed(2))

  // Hacky way of resizing the logos
  // First we clone the array so not to modify else where
  // Then we alter the strapi data which gets used by the LogoCarousel component
  const logos = structuredClone(customerStories.logos).map((logo) => {
    if (logo.darkLogoPng?.width && logo.darkLogoPng?.height) {
      logo.darkLogoPng.width = resizeImageDimension(logo.darkLogoPng.width)
      logo.darkLogoPng.height = resizeImageDimension(logo.darkLogoPng.height)
    }
    if (logo.lightLogoPng?.width && logo.lightLogoPng?.height) {
      logo.lightLogoPng.width = resizeImageDimension(logo.lightLogoPng.width)
      logo.lightLogoPng.height = resizeImageDimension(logo.lightLogoPng.height)
    }
    return logo
  })

  // Reverse array without mutating original
  //const logosReversed = [...logos].reverse()

  const logos1 = logos.slice(0, Math.ceil(logos.length / 2))
  const logos2 = logos.slice(Math.ceil(logos.length / 2))

  const [swiperCarousel1, setSwiperCarousel1] = useState<SwiperClass>(null)
  const [swiperCarousel2, setSwiperCarousel2] = useState<SwiperClass>(null)

  const goPrev = () => {
    if (swiperCarousel1) swiperCarousel1.slidePrev()
    if (swiperCarousel2) swiperCarousel2.slidePrev()
  }

  const goNext = () => {
    if (swiperCarousel1) swiperCarousel1.slideNext()
    if (swiperCarousel2) swiperCarousel2.slideNext()
  }

  return (
    <div className='my-16'>
      <SuiText
        weight='bold'
        size='sm'
        className='mb-10 text-center uppercase tracking-[0.0875rem] text-primary-300'>
        ClickHouse is Trusted by
      </SuiText>
      <div className={`group/container relative ${styles.maskCarousel}`}>
        <div className='mask-carousel space-y-6 text-black'>
          <Swiper
            onSwiper={setSwiperCarousel1}
            slidesPerView={'auto'}
            slidesPerGroup={3}
            spaceBetween={48}
            centeredSlides={true}
            centeredSlidesBounds={true}
            loop={true}
            loopAddBlankSlides={false}
            loopPreventsSliding={true}
            allowTouchMove={false}
            className={styles.customSwiperStyles}>
            {logos1.map((customer, index) => {
              return (
                <SwiperSlide key={index} className='!w-auto'>
                  <div
                    className='inline-block opacity-90 grayscale invert'
                    style={{ width: customer.darkLogoPng.width || 'auto' }}>
                    {customer.href ? (
                      <Link href={customer.href} className='inline'>
                        <StrapiImage {...customer.darkLogoPng} />
                      </Link>
                    ) : (
                      <StrapiImage {...customer.darkLogoPng} />
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <Swiper
            onSwiper={setSwiperCarousel2}
            slidesPerView={'auto'}
            slidesPerGroup={3}
            spaceBetween={48}
            centeredSlides={true}
            centeredSlidesBounds={true}
            loop={true}
            loopAddBlankSlides={false}
            loopPreventsSliding={true}
            allowTouchMove={false}
            className={styles.customSwiperStyles}>
            {logos2.map((customer, index) => {
              return (
                <SwiperSlide key={index} className='!w-auto'>
                  <div
                    className='inline-block opacity-90 grayscale invert'
                    style={{ width: customer.darkLogoPng.width || 'auto' }}>
                    {customer.href ? (
                      <Link href={customer.href} className='inline'>
                        <StrapiImage {...customer.darkLogoPng} />
                      </Link>
                    ) : (
                      <StrapiImage {...customer.darkLogoPng} />
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <button
          onClick={goPrev}
          className='group/button absolute top-0 left-0 bottom-0 z-10 flex w-24 items-center justify-center text-primary-300 opacity-0 transition-opacity group-hover/container:opacity-100'>
          <svg
            className='transition-transform group-hover/button:-translate-x-1'
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='15'
            fill='none'
            viewBox='0 0 23 15'>
            <path
              fill='currentColor'
              d='M7.22354.204545 8.87127 1.84517 4.54599 6.16335H22.4082v2.40057H4.54599l4.32528 4.32528-1.64773 1.6335L.0644531 7.36364 7.22354.204545Z'
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          className='group/button absolute top-0 right-0 bottom-0 z-10 flex w-24 items-center justify-center text-primary-300 opacity-0 transition-opacity group-hover/container:opacity-100'>
          <svg
            className='transition-transform group-hover/button:translate-x-1'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='15'
            fill='none'
            viewBox='0 0 24 15'>
            <path
              fill='currentColor'
              d='m15.8751 14.7955-1.6477-1.6407 4.3252-4.31815H.69043V6.43608H18.5526L14.2274 2.1108 15.8751.477273l7.1591 7.159087-7.1591 7.15914Z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
