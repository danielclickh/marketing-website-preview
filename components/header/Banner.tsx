import React, { useEffect, useState } from 'react'
import Markdown from '../Markdown'
import styles from './styles.module.scss'
import { XIcon } from '@heroicons/react/solid'

const components = {
  a: ({ node, children, className, ...props }: any) => {
    return (
      <a
        {...props}
        className={`${
          className ?? ''
        } !hover:text-primary-900 group inline-block`}>
        {children}
        <span className='inline-block pl-0.5 transition group-hover:translate-x-1/2'>
          {'->'}
        </span>
      </a>
    )
  }
}

function Banner({ content }: { content: string }) {
  const [isClosed, setClosed] = useState(true)

  useEffect(() => {
    const closed =
      window.sessionStorage.getItem('banner') === 'closed' ||
      content.length === 0
    if (!isClosed || closed !== isClosed) {
      setClosed(closed)
    }
  }, [])

  if (isClosed) {
    return null
  }

  return (
    <div className='relative'>
      <Markdown
        className={`${styles.banner} ignore-anchor`}
        components={components}>
        {content}
      </Markdown>
      <button
        className='absolute right-4 top-0 flex h-full cursor-pointer items-center text-primary-900'
        onClick={() => {
          setClosed(true)
          window.sessionStorage.setItem('banner', 'closed')
        }}>
        <XIcon className='h-4 w-4' aria-hidden='true' />
      </button>
    </div>
  )
}

export default Banner
