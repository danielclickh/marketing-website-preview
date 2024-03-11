import { useEffect, useRef } from 'react'
import styles from './styles.module.scss'

export default function RollerText({
  phraseList,
  pauseDelay = 3000
}: {
  phraseList: string[]
  pauseDelay?: number
}) {
  const distancePerPhrase = 100 / (phraseList.length * 2)
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
      let startOffset = 50 + distancePerPhrase * loopIteration
      let endOffset = distancePerPhrase * (loopIteration + 1)

      // Move list to start position (WITHOUT animating)
      setOffset(listElement.current, 0 - startOffset, false)

      // Start looping animation after pause delay
      timeout = setTimeout(() => {
        // Move list to end position (WITH animation)
        setOffset(listElement.current, 0 - endOffset, true)

        // Set new iteration for next loop
        const newIteration = loopIteration + 1
        loopIteration = newIteration < phraseList.length ? newIteration : 0
      }, pauseDelay)
    }

    if (listElement.current) {
      listElement.current.addEventListener('transitionend', startLoop)
      setOffset(listElement.current, -50, true)
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
      className={`relative -my-[0.75em] inline-block h-[2.75em] w-full overflow-visible ${styles.rollerMask}`}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
      <div
        ref={listElement}
        className='ease-[cubic-bezier(0.09, 0.24, 0.09, 1)] absolute top-0 left-0 right-0 flex -translate-y-full flex-col duration-[2000ms]'>
        {[...phraseList, ...phraseList].map((phrase, index) => {
          return (
            <div
              key={index}
              className='flex h-[2.75em] items-center whitespace-nowrap'>
              <span>{phrase}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
