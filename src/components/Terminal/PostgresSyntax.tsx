import { useState } from 'react'
import Terminal from './index'

function PostgresSyntax() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <Terminal
      type='decimal'
      totalCount={237}
      showControls={false}
      title='PostgreSQL syntax'>
      <p
        className={`terminal-type ${animationCompleted ? 'active' : ''}`}
        onAnimationStart={() => {
          setAnimationCompleted(false)
        }}
        onAnimationEnd={() => {
          setAnimationCompleted(true)
        }}>
        <span className='line constant'>SELECT DISTINCT </span>
        {'\n'}
        <span className='line'>&ensp;town,</span>
        {'\n'}
        <span className='line'>&ensp;price,</span>
        {'\n'}
        <span className='line'>&ensp;street,</span>
        {'\n'}
        <span className='line constant'>FROM</span>
        {'\n'}
        <span className='line'>&ensp;uk_price_paid</span>
        {'\n'}
        <span className='line'>
          <span className='constant'>WHERE</span>{' '}
          <span className='bracket-level-1'>(</span>town, price
          <span className='bracket-level-1'>)</span>
          {' in\n'}
        </span>
        <span className='line bracket-level-1'> (</span>
        {'\n'}
        <span className='line constant'>&ensp; SELECT </span>
        {'\n'}
        <span className='line'>&ensp;&ensp; town,</span>
        {'\n'}
        <span className='line'>
          <span className='keyword'>&ensp;&ensp; max</span>
          <span className='bracket-level-2'>(</span>price
          <span className='bracket-level-2'>)</span>
        </span>
        {'\n'}
        <span className='line constant'>&ensp; FROM</span>
        {'\n'}
        <span className='line'>&ensp;&ensp; uk_price_paid</span>
        {'\n'}
        <span className='line'>
          <span className='constant'>&ensp; GROUP BY</span>
          {' town\n'}
        </span>
        <span className='line'>
          <span className='constant'>&ensp; ORDER BY</span>{' '}
          <span className='keyword'>max</span>
          <span className='bracket-level-2'>(</span>price
          <span className='bracket-level-2'>)</span>{' '}
          <span className='constant'>DESC</span>
        </span>
        {'\n'}
        <span className='line'>
          <span className='constant'>&ensp; LIMIT</span>{' '}
          <span className='number'>3</span>
        </span>
        {'\n'}
        <span className='line bracket-level-1'> )</span>
        {'\n'}
        <span className='line'>
          <span className='constant'>ORDER BY</span> price{' '}
          <span className='constant'>DESC</span>
        </span>
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

export default PostgresSyntax
