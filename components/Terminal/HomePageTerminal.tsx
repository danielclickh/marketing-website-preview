import React, { useState } from 'react'
import Terminal from '.'

function HomePageTerminal() {
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <Terminal
      type='terminal'
      totalCount={190}
      className='section-container flex flex-col -mt-[100px]'>
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
        Elapsed:{' '}
        <span className='tilted tilted-yellow'>
          <span className='tilted-content'>0.928 sec</span>
        </span>{' '}
        Processed{' '}
        <span className='tilted tilted-yellow'>
          <span className='tilted-content'>27.45 million</span>
        </span>{' '}
        rows,
        <br />
        103.80 MB (29.56 million rows/s., 111.80 MB/s.)
      </p>
    </Terminal>
  )
}

export default HomePageTerminal
