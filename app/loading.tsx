import React from 'react'

function LoadingPage() {
  return (
    <div className='flex flex-auto w-full items-center justify-center'>
      <div className='loading-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingPage
