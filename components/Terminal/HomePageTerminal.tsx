import React, { CSSProperties, useState } from 'react'

const style = { '--totalCount': 264 } as CSSProperties

function HomePageTerminal() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <div
      className='relative border bg-neutral-900 shadow-codeblock border-neutral-700/80 rounded-xl text-left flex flex-col -mt-[100px] text-neutral-0'
      style={style}>
      <div className='p-8'>
        <span className='block whitespace-pre-wrap font-inconsolata w-full relative'>
          <p
            className={`line terminal-type leading-7 ${
              animationCompleted ? 'active' : ''
            }`}
            onAnimationStart={() => {
              setAnimationCompleted(false)
            }}
            onAnimationEnd={() => {
              setAnimationCompleted(true)
            }}>
            <span className='constant'>SELECT</span>
            {'\n'}
            {'    '}toStartOfMonth
            <span className='bracket-level-1'>(</span>
            upload_date<span className='bracket-level-1'>)</span>{' '}
            <span className='constant'>AS month</span>
            {',\n'}
            {'    '}
            <span className='keyword'>sum</span>
            <span className='bracket-level-1'>(</span>view_count
            <span className='bracket-level-1'>)</span>{' '}
            <span className='constant'>AS</span>{' '}
            <span className='keyword'>`</span>
            <span className='string'>Youtube Views</span>
            <span className='keyword'>`</span>
            {',\n'}
            {'    '}bar(<span className='keyword'>sum</span>
            <span className='bracket-level-2'>(</span>
            has_subtitles
            <span className='bracket-level-2'>)</span> /{' '}
            <span className='keyword'>count</span>
            <span className='bracket-level-2'>(</span>
            <span className='bracket-level-2'>)</span>,{' '}
            <span className='number'>0</span>.<span className='number'>55</span>
            , <span className='number'>0</span>.
            <span className='number'>7</span>,{' '}
            <span className='number'>100</span>){' '}
            <span className='constant'>AS</span>{' '}
            <span className='keyword'>`</span>
            <span className='string'>% Subtitles</span>
            <span className='keyword'>`</span>
            {'\n'}
            <span className='constant'>FROM</span>
            {'  youtube\n'}
            <span className='constant'>WHERE</span>{' '}
            <span className='bracket-level-1'>(</span>
            <span className='constant'>month</span> {`>=`}{' '}
            <span className='keyword'>'</span>
            <span className='string'>2020-08-01</span>
            <span className='keyword'>'</span>
            <span className='bracket-level-1'>)</span>{' '}
            <span className='constant'>AND</span>{' '}
            <span className='bracket-level-1'>(</span>
            <span className='constant'>month</span> {`<=`}{' '}
            <span className='keyword'>'</span>
            <span className='string'>2021-08-01</span>
            <span className='keyword'>'</span>
            <span className='bracket-level-1'>)</span>
            {'\n'}
            <span className='constant'>
              {'GROUP BY month\nORDER BY month ASC'}
            </span>
            {'\n\n'}
          </p>
          <br />
          <p
            className={`fade-in-animation font-medium ${
              animationCompleted ? 'active' : ''
            }`}>
            13 rows in set. Elapsed:{' '}
            <span className='text-primary-300'>0.823 sec</span> Processed{' '}
            <span className='text-primary-300'>1.07 billion</span> rows, 11.75
            GB (1.30 billion rows/s., 14.27 GB/s.)
          </p>
        </span>
      </div>
    </div>
  )
}

export default HomePageTerminal
