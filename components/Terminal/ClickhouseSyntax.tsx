import React, { useState } from 'react'
import Terminal from '.'

function ClickhouseSyntax() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <Terminal
      type='decimal'
      totalCount={120}
      showControls={false}
      title='ClickHouse syntax'>
      <p
        className={`terminal-type ${animationCompleted ? 'active' : ''}`}
        onAnimationStart={() => {
          setAnimationCompleted(false)
        }}
        onAnimationEnd={() => {
          setAnimationCompleted(true)
        }}>
        <span className='line text-indigo-300'>SELECT</span>
        {'\n'}
        <span className='line'> town,</span>
        {'\n'}
        <span className='line'>
          {' '}
          <span className='keyword'>max</span>
          <span className='bracket-level-1'>(</span>price
          <span className='bracket-level-1'>)</span>,
        </span>
        {'\n'}
        <span className='line'>
          {' '}
          argMax<span className='bracket-level-1'>(</span>street, price
          <span className='bracket-level-1'>)</span>
        </span>
        {'\n'}
        <span className='line constant'>FROM</span>
        {'\n'}
        <span className='line'> uk_price_paid</span>
        {'\n'}
        <span className='line'>
          <span className='constant'>GROUP BY</span> town
        </span>
        {'\n'}
        <span className='line'>
          <span className='constant'>ORDER BY</span>{' '}
          <span className='keyword'>max</span>
          <span className='bracket-level-1'>(</span>price
          <span className='bracket-level-1'>)</span>{' '}
          <span className='constant'>DESC</span>
        </span>
        {'\n'}
        <span className='line'>
          <span className='constant'>LIMIT</span> 3
        </span>
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
        {'\n'}
        <span className='line' />
      </p>
    </Terminal>
  )
}

export default ClickhouseSyntax
