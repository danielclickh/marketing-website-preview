import styles from './styles.module.scss'
import { useEffect, useRef } from 'react'

export default function CycleText({
  phrases,
  pauseDelay = 3000,
  phraseClasses
}: {
  phrases: string[]
  pauseDelay?: number
  phraseClasses?: string
}) {
  const distancePerPhrase = 100 / (phrases.length * 2)
  const listElement = useRef<HTMLDivElement>(null)

  // Start the initial animation on mount
  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null
    let loopIteration = 0

    const setOffset = (
      element: null | HTMLDivElement,
      offset: number,
      animate: boolean
    ) => {
      if (element) {
        if (animate) {
          element.classList.remove('transition-none')
          element.classList.add('transition-transform')
        } else {
          element.classList.add('transition-none')
          element.classList.remove('transition-transform')
        }

        // Timeout allows transition to be added/removed
        element.style.setProperty('--tw-translate-y', `${offset}%`)
      }
    }

    const startLoop = () => {
      // Calculate new offsets
      let startOffset = distancePerPhrase * loopIteration
      let endOffset = distancePerPhrase * (loopIteration + 1)

      // Move list to start position (WITHOUT animating)
      setOffset(listElement.current, 0 - startOffset, false)

      // Start looping animation after pause delay
      timeout = setTimeout(() => {
        // Move list to end position (WITH animation)
        setOffset(listElement.current, 0 - endOffset, true)

        // Set new iteration for next loop
        const newIteration = loopIteration + 1
        loopIteration = newIteration < phrases.length ? newIteration : 0
      }, pauseDelay)
    }

    if (listElement.current) {
      listElement.current.addEventListener('transitionend', startLoop)
      // Set initial position
      setOffset(listElement.current, -50, false)

      // Start the cycle
      startLoop()
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (listElement.current) {
        listElement.current.removeEventListener('transitionend', startLoop)
      }
    }
  }, [])

  return (
    <div
      className={`relative -my-[0.75em] inline-block h-[2.75em] w-full overflow-hidden ${styles.cycleMask}`}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
      <div
        ref={listElement}
        className='ease-[cubic-bezier(0.09, 0.24, 0.09, 1)] absolute left-0 right-0 top-0 flex -translate-y-full flex-col duration-[2000ms]'>
        {[...phrases, ...phrases].map((phrase, index) => {
          return (
            <div
              key={index}
              className={`flex h-[2.75em] items-center whitespace-nowrap ${
                phraseClasses || ''
              }`}>
              <span>{phrase}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
