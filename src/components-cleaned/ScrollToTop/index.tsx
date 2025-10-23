'use client'

import { useEffect, useState } from 'react'

export interface ScrollToTopProps {
  scrollPercent?: number
}

export default function ScrollToTop({ scrollPercent = 40 }: ScrollToTopProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const top = window.scrollTop
      const height = document.documentElement.clientHeight
      const currentScrollPercent = (height / 100) * top

      setShow(currentScrollPercent >= scrollPercent)
    }
    // window.addEventListener('scroll', scrollHandler)
    // return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollPercent])

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    window.scrollTo({
      top: 0
    })
  }

  return (
    <button
      onClick={clickHandler}
      className={`-tranlsate-x-1/2 fixed bottom-8 left-1/2 z-50 flex gap-2 rounded-full bg-neutral-950/90 px-3 py-1 text-white shadow backdrop-blur transition-opacity ${show ? '' : 'pointer-events-none opacity-0'}`}>
      <span className='-rotate-90'>-&gt;</span>
      Scroll to top
    </button>
  )
}
