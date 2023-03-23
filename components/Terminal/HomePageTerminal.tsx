import React, { useState } from 'react'
import Terminal from '.'

function HomePageTerminal() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <Terminal
      type='terminal'
      showControls={false}
      totalCount={190}
      className='flex flex-col -mt-[100px]'>
      <p
        className={`line terminal-type ${animationCompleted ? 'active' : ''}`}
        onAnimationStart={() => {
          setAnimationCompleted(false)
        }}
        onAnimationEnd={() => {
          setAnimationCompleted(true)
        }}>
        <span className='constant'>SELECT</span> toYear(
        <span className='constant'>date</span>){' '}
        <span className='constant'>AS</span>
        {' year,\n'}
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <span className='keyword'>round</span>(avg(price)){' '}
        <span className='constant'>AS</span>
        {' price,\n'}
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;bar ( price , 0 , 2000000 ,
        100 ) <span className='constant'>AS</span>
        {' average_price\n'}
        <span className='constant'>FROM</span>
        {' uk_price_paid\nWHERE town = '}
        <span className='constant'>'LONDON'</span>
        {'\n'}
        <span className='constant'>GROUP BY</span>
        {' year\n'}
        <span className='constant'>ORDER BY</span>
        {' year\n'}
      </p>
      <br />
      <p className={`fade-in-animation ${animationCompleted ? 'active' : ''}`}>
        13 rows in set. Elapsed:{' '}
        <span className='text-primary-300'>0.823 sec</span> Processed{' '}
        <span className='text-primary-300'>1.07 billion</span> rows, 11.75 GB
        (1.30 billion rows/s., 14.27 GB/s.)
      </p>
    </Terminal>
  )
}

export default HomePageTerminal
