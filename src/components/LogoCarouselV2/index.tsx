import styles from './styles.module.scss'
import EyebrowText from '@/components/EyebrowText'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

export interface LogoItem extends ImageProps {
  link?: Omit<
    LinkProps & React.HTMLProps<HTMLAnchorElement>,
    'className' | 'children' | 'ref'
  >
  component?: React.ReactNode
}

export interface LogoCarouselV2Props extends React.HTMLProps<HTMLDivElement> {
  logos: Array<LogoItem>
  invert?: boolean
  heading?: string
  initialSlide?: number | Array<number>
  numberOfRows?: number
}

export default function LogoCarouselV2({
  logos,
  className = 'my-16',
  invert = false,
  heading = '',
  initialSlide = 0, // Index of initial slide, can be an array of indexes for each row of logos
  numberOfRows = 2,
  ...props
}: LogoCarouselV2Props) {
  const [logoScale, setLogoScale] = useState(1)
  const [swiperInstances, setSwiperInstances] = useState<
    Record<number, SwiperClass>
  >({})

  // Split logos array into X number of groups/rows
  const logoRows = useMemo(() => {
    const result: Array<LogoCarouselV2Props['logos']> = []

    const minLogosPerRow = 15
    let logosArray = logos
    if (logosArray.length < numberOfRows * minLogosPerRow) {
      const repeatCount = Math.ceil(
        (numberOfRows * minLogosPerRow) / logosArray.length
      )
      if (repeatCount) {
        logosArray = Array(repeatCount).fill(logosArray).flat()
      }
    }

    for (let i = numberOfRows; i > 0; i--) {
      result.push(logosArray.splice(0, Math.ceil(logosArray.length / i)))
    }

    return result
  }, [logos, numberOfRows])

  // Trigger all carousel to go back
  const goPrev = useCallback(() => {
    Object.values(swiperInstances).forEach((instance) => {
      instance.slidePrev()
    })
  }, [swiperInstances])

  // Trigger all carousel to go forward
  const goNext = useCallback(() => {
    Object.values(swiperInstances).forEach((instance) => {
      instance.slideNext()
    })
  }, [swiperInstances])

  useEffect(() => {
    // Scale logos down on smaller devices, else set to the default scale
    const resizeListener = () =>
      window.innerWidth < 640 ? setLogoScale(0.7) : setLogoScale(1)

    // Resize on mount
    resizeListener()

    // Bind event listeners
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <div className={`text-primary-300 ${className}`} {...props}>
      <EyebrowText className='mb-10 text-center text-primary-300'>
        {heading}
      </EyebrowText>
      <div
        className={`group/container relative ${styles.maskCarousel}`}
        style={{ '--logo-scale': logoScale } as React.CSSProperties}>
        <div className='carousel-container -my-2 text-black sm:-my-3'>
          {logoRows.map((logoRow, index) => {
            return (
              <CarouselRow
                key={index}
                logos={logoRow}
                invert={invert}
                initialSlide={
                  Array.isArray(initialSlide)
                    ? initialSlide?.[index] || 0
                    : initialSlide
                }
                onInit={(newInstance) => {
                  setSwiperInstances((prevState) => {
                    prevState[index] = newInstance
                    return prevState
                  })
                }}
              />
            )
          })}
        </div>
        <button
          onClick={goPrev}
          className='group/button absolute bottom-0 left-0 top-0 z-10 hidden w-24 appearance-none items-center justify-center opacity-0 transition-opacity group-hover/container:opacity-100 sm:flex'>
          <svg
            className='transition-transform sm:group-hover/button:-translate-x-1'
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
          <span className='sr-only'>Previous slide</span>
        </button>
        <button
          onClick={goNext}
          className='group/button absolute bottom-0 right-0 top-0 z-10 hidden w-24 appearance-none items-center justify-center opacity-0 transition-opacity group-hover/container:opacity-100 sm:flex'>
          <svg
            className='transition-transform sm:group-hover/button:translate-x-1'
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
          <span className='sr-only'>Next slide</span>
        </button>
      </div>
    </div>
  )
}

function CarouselRow({
  logos,
  onInit = () => {},
  invert = true,
  initialSlide = 1
}: {
  logos: LogoCarouselV2Props['logos']
  onInit?: (swiper: SwiperClass) => void
  invert?: boolean
  initialSlide?: number
}) {
  return (
    <Swiper
      onSwiper={onInit}
      modules={[FreeMode]}
      slidesPerView={'auto'}
      slidesPerGroup={1}
      spaceBetween={32}
      speed={600}
      centeredSlides={true}
      centeredSlidesBounds={true}
      loop={true}
      loopAddBlankSlides={false}
      loopPreventsSliding={true}
      allowTouchMove={true}
      touchEventsTarget={'container'}
      lazyPreloadPrevNext={6}
      initialSlide={initialSlide}
      freeMode={{
        enabled: true,
        sticky: false
      }}
      breakpoints={{
        500: {
          slidesPerGroup: 2,
          spaceBetween: 64,
          speed: 1200,
          allowTouchMove: false,
          freeMode: false
        },
        800: {
          slidesPerGroup: 3,
          spaceBetween: 64,
          speed: 1200,
          allowTouchMove: false,
          freeMode: false
        }
      }}
      className={styles.customSwiperStyles}>
      {logos.map((logo, index) => {
        const { link, component, className = '', ...image } = logo
        return (
          <SwiperSlide key={index} className='!w-auto'>
            <div
              className={`inline-block py-2 sm:py-3 ${
                invert ? 'opacity-90 grayscale invert' : ''
              }`}
              style={{
                width: `calc(${logo.width}px * var(--logo-scale, 1))`
              }}>
              {link ? (
                <Link {...link} className='inline'>
                  {component}
                  {!component && (
                    <Image {...image} className={`max-w-full ${className}`} />
                  )}
                </Link>
              ) : (
                <>
                  {component}
                  {!component && (
                    <Image {...image} className={`max-w-full ${className}`} />
                  )}
                </>
              )}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
