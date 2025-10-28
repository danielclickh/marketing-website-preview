'use client'

import { useEffect, useState } from 'react'

export interface ScrollToTopProps {
  showFrom: number
  hideAt?: number
}

export default function ScrollToTop({ showFrom, hideAt }: ScrollToTopProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollBottom = scrollTop + window.innerHeight
      const isShowFrom = scrollTop >= showFrom
      const isHideAt = hideAt && scrollBottom >= hideAt
      setShow(isShowFrom && !isHideAt)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [showFrom, hideAt])

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    window.scrollTo({
      top: 0
    })
  }

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-1/2 z-50 -translate-x-1/2 pb-4 transition duration-500 ${show ? '' : 'translate-y-full opacity-0'}`}>
      <span className='absolute -inset-x-20 -inset-y-10 rounded-full bg-black/40 blur-3xl' />
      <button
        onClick={clickHandler}
        className={`flex gap-2 rounded-full border border-neutral-700/90 bg-neutral-950/90 px-3 py-1 text-sm text-neutral-200 shadow-lg backdrop-blur transition-colors hover:bg-neutral-900/90 ${show ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <span className='-rotate-90'>-&gt;</span>
        Scroll to top
      </button>
    </div>
  )
}
