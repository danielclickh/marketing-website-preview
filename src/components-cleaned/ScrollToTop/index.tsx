'use client'

import { useEffect, useState } from 'react'

type ShowFromNone = {
  showFrom?: never
  showFromTopRef?: never
}

type ShowFromNumber = {
  showFrom: number
  showFromTopRef?: never
}

type ShowFromRef = {
  showFrom?: never
  showFromTopRef: React.RefObject<HTMLElement>
}

type HideAtNone = {
  hideAt?: never
  hideAtBottomRef?: never
}

type HideAtNumber = {
  hideAt: number
  hideAtBottomRef?: never
}

type HideAtRef = {
  hideAt?: never
  hideAtBottomRef: React.RefObject<HTMLElement>
}

export type ScrollToTopProps = (ShowFromNone | ShowFromNumber | ShowFromRef) &
  (HideAtNone | HideAtNumber | HideAtRef)

export default function ScrollToTop({
  showFrom,
  showFromTopRef,
  hideAt,
  hideAtBottomRef
}: ScrollToTopProps) {
  const [show, setShow] = useState(false)
  const [showFromValue, setShowFromValue] = useState<number>(0)
  const [hideAtValue, setHideAtValue] = useState<null | number>(null)

  useEffect(() => {
    const showFromEl = showFromTopRef?.current
    const hideAtEl = hideAtBottomRef?.current

    if (!showFromEl) setShowFromValue(showFrom ?? 0)
    if (!hideAtEl) setHideAtValue(hideAt ?? null)

    const resizeObserver = new ResizeObserver(() => {
      if (showFromEl) {
        setShowFromValue(showFromEl.offsetTop)
      }
      if (hideAtEl) {
        setHideAtValue(hideAtEl.offsetTop + hideAtEl.clientHeight)
      }
    })

    if (showFromEl) resizeObserver.observe(showFromEl)
    if (hideAtEl) resizeObserver.observe(hideAtEl)

    return () => resizeObserver.disconnect()
  }, [showFrom, showFromTopRef?.current, hideAt, hideAtBottomRef?.current])

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollBottom = scrollTop + window.innerHeight
      const isShowFrom = scrollTop >= showFromValue
      const isHideAt =
        typeof hideAtValue === 'number' && scrollBottom >= hideAtValue
      setShow(isShowFrom && !isHideAt)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [showFromValue, hideAtValue])

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
