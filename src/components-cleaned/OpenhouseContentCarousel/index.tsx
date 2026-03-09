import navigationArrow from './assets/carousel-nav-arrow.svg'
import Image from 'next/image'
import { Children, isValidElement, useEffect, useRef } from 'react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

export interface OpenhouseCarouselProps {
  children: React.ReactNode
  mode?: 'dark' | 'light'
}

export default function OpenhouseCarousel({
  children,
  mode = 'light'
}: OpenhouseCarouselProps) {
  const prevRef = useRef<null | HTMLButtonElement>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  const swiperRef = useRef<null | SwiperClass>(null)

  const modeButtonClasses: Record<'dark' | 'light', string> = {
    dark: 'bg-ch-yellow ring-neutral-900 ring-offset-neutral-900',
    light: 'bg-neutral-900 ring-neutral-900 ring-offset-ch-yellow'
  }

  const modeArrowClasses: Record<'dark' | 'light', string> = {
    dark: 'saturate-0 brightness-0',
    light: ''
  }

  useEffect(() => {
    const swiperClass = swiperRef.current
    const prev = prevRef.current
    const next = nextRef.current
    if (
      swiperClass &&
      swiperClass.params &&
      swiperClass.params.navigation &&
      swiperClass.navigation &&
      prev &&
      next
    ) {
      // Assign the navigation elements
      if (swiperClass.params.navigation === true) {
        swiperClass.params.navigation = {}
      }
      swiperClass.params.navigation.prevEl = prevRef.current
      swiperClass.params.navigation.nextEl = nextRef.current

      // Initialize navigation
      swiperClass.navigation.destroy()
      swiperClass.navigation.init()
      swiperClass.navigation.update()
    }
  }, [swiperRef, prevRef, nextRef])

  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={6}
        speed={600}
        watchSlidesProgress={true}
        allowTouchMove={true}
        breakpoints={{
          480: {
            slidesPerView: 1.25,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        }}
        navigation={true}
        className='!overflow-visible'
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return (
              <SwiperSlide key={index} className='!h-auto'>
                {({ isVisible }) => (
                  <div
                    className={`h-full transition-opacity ${isVisible ? '' : 'pointer-events-none opacity-50'}`}>
                    {child}
                  </div>
                )}
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
      <div className='pointer-events-none z-10 mt-4 flex items-center justify-center gap-4 lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:justify-between'>
        <button
          ref={prevRef}
          type='button'
          className={`pointer-events-auto flex aspect-square w-12 rounded-full ring-0 transition hover:ring hover:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 lg:w-14 lg:-translate-x-2/3 lg:disabled:opacity-0 ${modeButtonClasses[mode]}`}>
          <span className='sr-only'>Previous slide</span>
          <Image
            src={navigationArrow}
            width={24}
            height={16}
            alt='Previous slide'
            className={`m-auto w-5 rotate-180 lg:w-6 ${modeArrowClasses[mode]}`}
          />
        </button>
        <button
          ref={nextRef}
          type='button'
          className={`pointer-events-auto flex aspect-square w-12 rounded-full ring-0 transition hover:ring hover:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 lg:w-14 lg:translate-x-2/3 lg:disabled:opacity-0 ${modeButtonClasses[mode]}`}>
          <span className='sr-only'>Next slide</span>
          <Image
            src={navigationArrow}
            width={24}
            height={16}
            alt='Next slide'
            className={`m-auto w-5 lg:w-6 ${modeArrowClasses[mode]}`}
          />
        </button>
      </div>
    </div>
  )
}
