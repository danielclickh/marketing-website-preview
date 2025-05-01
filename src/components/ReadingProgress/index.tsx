import { ProgressBar } from '@clickhouse/click-ui'
import React, { useCallback, useEffect, useState } from 'react'

export default function ReadingProgress({
  target
}: {
  target: React.RefObject<HTMLElement>
}) {
  const [readingProgress, setReadingProgress] = useState(0)
  const scrollListener = useCallback(() => {
    if (!target.current) {
      return
    }

    const rect = target.current.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight

    const articleTop = rect.top + window.scrollY
    const articleHeight = target.current.offsetHeight

    const scrollY = window.scrollY
    const scrollStart = articleTop
    const scrollEnd = articleTop + articleHeight - windowHeight

    let percent = ((scrollY - scrollStart) / (scrollEnd - scrollStart)) * 100
    percent = Math.max(0, Math.min(99.9999, percent))

    setReadingProgress(percent)
  }, [target, setReadingProgress])

  useEffect(() => {
    scrollListener() // Apply scroll percent on component mount
    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  })

  return (
    <ProgressBar
      className='top-100 fixed z-[1] h-1'
      type='small'
      dir='start'
      progress={readingProgress}
    />
  )
}
