import { useEffect, useRef, useState } from 'react'
import { SuiTitle } from '../sui'
import styles from './styles.module.scss'

export default function HomepageHeroAlt() {
  const phraseList = [
    'Whimsical Moonlit Symphony',
    'Sapphire Whispering Breeze',
    'Celestial Enigma Echo',
    'Velvet Serenade Cascade',
    'Ethereal Twilight Mirage',
    'Radiant Oasis Harmony',
    'Midnight Elixir Reverie',
    'Enchanted Echoing Meadow',
    'Serendipitous Lullaby Dream',
    'Mystic Cascade Radiance'
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
      // Start looping animation after pause delay
      timeout = setTimeout(() => {
        // Calculate new offsets
        let startOffset = 50 + distancePerPhrase * loopIteration
        let endOffset = distancePerPhrase * (loopIteration + 1)

        // Move list to start position (WITHOUT animating)
        setOffset(listElement.current, 0 - startOffset, false)

        // Move list to end position (WITH animation)
        setTimeout(() => {
          setOffset(listElement.current, 0 - endOffset, true)
        }, 1000) // Matches transition duration

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
    <div className='section-container my-48'>
      <SuiTitle type='h1'>Lorem ipsum blah</SuiTitle>
      <div className={`relative h-40 overflow-hidden ${styles.rollerMask}`}>
        <div
          ref={listElement}
          className='absolute top-0 left-0 right-0 flex -translate-y-full flex-col duration-1000'>
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
  )
}
