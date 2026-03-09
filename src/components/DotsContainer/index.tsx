import dots from './dots.png'
import Image from 'next/image'
import React from 'react'

export type DotsAndFormProps = React.HTMLProps<HTMLDivElement>

export default function DotsContainer({
  children,
  className = '',
  ...props
}: DotsAndFormProps) {
  return (
    <div className={`relative bg-neutral-700 py-20 ${className}`} {...props}>
      <Image
        src={dots}
        width={612 / 2}
        height={400 / 2}
        alt='Dots'
        className='pointer-events-none absolute left-0 top-0'
      />
      <Image
        src={dots}
        width={612 / 2}
        height={400 / 2}
        alt='Dots'
        className='pointer-events-none absolute bottom-0 right-0 rotate-180'
      />
      <div className='section-container'>{children}</div>
    </div>
  )
}
