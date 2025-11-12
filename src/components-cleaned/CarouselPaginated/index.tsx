import styles from './styles.module.scss'
import { Children, useRef } from 'react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

export interface CarouselPaginatedProps
  extends Omit<SwiperProps, 'navigation' | 'pagination'> {
  children: React.ReactNode
  carouselClass?: string
}

export default function CarouselPaginated({
  children,
  className = '',
  carouselClass,
  ...swiperOptions
}: CarouselPaginatedProps) {
  const prevRef = useRef<null | HTMLButtonElement>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  const paginationRef = useRef<null | HTMLDivElement>(null)

  const mergedOptions: SwiperProps = {
    // User options
    ...swiperOptions,

    // Defaults
    modules: [Pagination, Navigation, ...(swiperOptions.modules || [])],
    pagination: {
      enabled: true,
      clickable: true,
      dynamicBullets: true,
      el: paginationRef.current
    },
    navigation: {
      enabled: true,
      prevEl: prevRef.current,
      nextEl: nextRef.current
    },
    className: carouselClass
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <Swiper {...mergedOptions}>
        {Children.map(children, (child) => {
          return <SwiperSlide>{child}</SwiperSlide>
        })}
      </Swiper>
      <div className='swiper-controls'>
        <button ref={prevRef} type='button' className='swiper-button-prev'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='7'
            height='12'
            fill='none'
            viewBox='0 0 7 12'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5.75 10.5 1 5.75 5.75 1'
            />
          </svg>
        </button>
        <div ref={paginationRef} className='swiper-pagination' />
        <button ref={nextRef} type='button' className='swiper-button-next'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='7'
            height='12'
            fill='none'
            viewBox='0 0 7 12'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 10.5 4.75-4.75L1 1'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
