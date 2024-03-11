import { useEffect, useRef, useState } from 'react'
import { SuiTitle } from '../sui'
import styles from './styles.module.scss'

export default function HomepageHeroAlt() {
  const phraseList = [
    'analytics',
    'observability',
    'ML & GenAI',
    'business intelligence',
    'financial services',
    'fraud & cybersecurity',
    'gaming'
  ]

  const distancePerPhrase = 100 / (phraseList.length * 2)
  const pauseDelay = 3000 // 3 seconds between loop

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
    <div className='bg-primary-300 py-48 text-black'>
      <div className='section-container'>
        <SuiTitle type='h1'>
          The{' '}
          <span className='tilted tilted-black'>
            <span className='tilted-content text-white'>real-time</span>
          </span>{' '}
          <br />
          data warehouse for{' '}
        </SuiTitle>
        <div
          className={`relative h-40 overflow-hidden ${styles.rollerMask} -mt-10`}>
          <div
            ref={listElement}
            className='ease-[cubic-bezier(0.09, 0.24, 0.09, 1)] absolute top-0 left-0 right-0 flex -translate-y-full flex-col duration-[2000ms]'>
            {[...phraseList, ...phraseList].map((phrase, index) => {
              return (
                <div
                  key={index}
                  className='flex h-40 items-center text-[4rem] font-bold leading-none'>
                  <span>{phrase}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
