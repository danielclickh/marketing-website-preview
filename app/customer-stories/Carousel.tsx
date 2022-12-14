'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState, useRef, useEffect } from 'react'

const Carousel = ({ children }) => {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef(null)

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className='relative flex items-center w-full'>
      <button
        onClick={movePrev}
        className='text-web-light-c4 hover:brightness-50 w-10 h-full text-center disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
        disabled={isDisabled('prev')}>
        <ChevronLeftIcon className='h-28 w-auto -ml-5' />
        <span className='sr-only'>Prev</span>
      </button>
      {/* <div className='flex justify-between top left w-full h-full'>
      </div> */}
      <div
        ref={carousel}
        className='carousel-container relative flex gap-10 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 container'>
        {children}
      </div>
      <button
        onClick={moveNext}
        className='text-web-light-c4 hover:brightness-50 w-10 h-full text-center disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
        disabled={isDisabled('next')}>
        <ChevronRightIcon className='h-28 w-auto -ml-5' />
        <span className='sr-only'>Next</span>
      </button>
    </div>
  )
}

export default Carousel
