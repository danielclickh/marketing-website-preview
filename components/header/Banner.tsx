import React, { useEffect, useState } from 'react'
import Markdown from '../Markdown'
import styles from './styles.module.scss'

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
  const [isClosed, setClosed] = useState(false)

  content =
    '<a href="/reinvent-2023?loc=eyebrow">Visiting re:Invent Nov 27 - Dec 1? We\'d love to meet. Let us know here </a>'

  useEffect(() => {
    const closed = content.length === 0
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
    </div>
  )
}

export default Banner
