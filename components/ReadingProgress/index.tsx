import { ProgressBar } from '@clickhouse/click-ui'
import React, { useEffect, useState } from 'react'

export default function ReadingProgress({
  target
}: {
  target: React.RefObject<HTMLElement>
}) {
  const [readingProgress, setReadingProgress] = useState(0)
  const scrollListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }

    if (windowScrollTop >= totalHeight) {
      // value 100 set the bar to empty.
      return setReadingProgress(99.9999)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  })

  return (
    <ProgressBar
      className='top-100 z-100 fixed h-1'
      type='small'
      dir='start'
      progress={readingProgress}
    />
  )
}
