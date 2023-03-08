import React, { HTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'decimal' | 'terminal'
  totalCount: number
}
function Terminal({
  type = 'terminal',
  totalCount,
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`px-6 py-5 bg-noised ${className}`}
      style={{ '--totalCount': totalCount }}
      {...props}>
      <svg
        width='57'
        height='13'
        viewBox='0 0 57 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <ellipse cx='6.5' cy='6.13672' rx='6' ry='6' fill='#F46262' />
        <ellipse cx='28.5' cy='6.13672' rx='6' ry='6' fill='#F3C670' />
        <ellipse cx='50.5' cy='6.13672' rx='6' ry='6' fill='#11EE4F' />
      </svg>
      <div className={`${styles.terminalData} terminal-data`} data-type={type}>
        {children}
      </div>
    </div>
  )
}

export default Terminal
