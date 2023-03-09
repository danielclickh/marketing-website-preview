import React, { HTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'decimal' | 'terminal'
  totalCount: number
  showControls?: boolean
}
function Terminal({
  type = 'terminal',
  totalCount,
  children,
  className,
  style,
  showControls = true,
  title,
  ...props
}: Props) {
  const currentStyle = { '--totalCount': totalCount, ...style }
  return (
    <div
      className={`relative bg-noised rounded text-left ${className} text-neutral-0`}
      style={currentStyle}
      {...props}>
      <div
        className={`${styles.terminalHeader} terminal-title-bar`}
        data-terminal={type === 'terminal'}
        data-controls={showControls}>
        {showControls && (
          <svg
            width='57'
            height='13'
            viewBox='0 0 57 13'
            fill='none'
            className='my-2'
            xmlns='http://www.w3.org/2000/svg'>
            <ellipse cx='6.5' cy='6.13672' rx='6' ry='6' fill='#F46262' />
            <ellipse cx='28.5' cy='6.13672' rx='6' ry='6' fill='#F3C670' />
            <ellipse cx='50.5' cy='6.13672' rx='6' ry='6' fill='#11EE4F' />
          </svg>
        )}
        {title}
      </div>
      <div className={`${type === 'terminal' ? 'px-4' : 'px-6'} pt-4 pb-8`}>
        <span
          className={`${styles.terminalData} terminal-data`}
          data-type={type}>
          {children}
        </span>
      </div>
    </div>
  )
}

export default Terminal
