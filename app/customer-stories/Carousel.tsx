'use client'
import React, { ReactNode } from 'react'
import Glider from 'react-glider'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import 'glider-js/glider.min.css'

const Carousel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-full w-full'>
      <Glider
        hasArrows
        slidesToShow={1}
        draggable
        slidesToScroll={1}
        itemWidth={320}
        iconLeft={<ChevronLeftIcon className='h-16 w-auto -ml-5' />}
        iconRight={<ChevronRightIcon className='h-16 w-auto -ml-5' />}
        rewind
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]}>
        {children}
      </Glider>
    </div>
  )
}

export default Carousel
