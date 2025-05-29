import logoClickhouse from './assets/clickhouse.svg'
import logoHyperdx from './assets/hyperdx.svg'
import logoOpentelemetry from './assets/opentelemetry.svg'
import styles from './styles.module.scss'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { useCallback } from 'react'

type CallbackStack = 'hyperdx' | 'clickhouse' | 'opentelemetry'

export interface ClickStackProps {
  hyperdx?: boolean
  clickhouse?: boolean
  opentelemetry?: boolean
  onClick?: (stack: CallbackStack) => void
}

export default function ClickStack({
  hyperdx = true,
  clickhouse = true,
  opentelemetry = true,
  onClick
}: ClickStackProps) {
  const clickHandler = useCallback(
    (stack: CallbackStack) => {
      if (onClick) {
        onClick(stack)
      }
    },
    [onClick]
  )
  return (
    <div className='aspect-[14/18] w-[245px] px-6'>
      <div className='relative aspect-square'>
        <Layer
          logo={logoHyperdx}
          color='#4FFA7A'
          active={hyperdx}
          className='z-30'
          onClick={() => clickHandler('hyperdx')}
        />
        <Layer
          logo={logoClickhouse}
          color='#FAFF69'
          active={clickhouse}
          className='z-20 translate-y-1/3'
          onClick={() => clickHandler('clickhouse')}
        />
        <Layer
          logo={logoOpentelemetry}
          color='#F5A800'
          active={opentelemetry}
          className='z-10 translate-y-2/3'
          onClick={() => clickHandler('opentelemetry')}
        />
      </div>
    </div>
  )
}

function Layer({
  logo,
  color,
  className,
  active = true,
  onClick
}: {
  logo: string | StaticImport
  color: string
  className?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${styles.layerPerspective} ${className}`}
      style={
        {
          '--color': color
        } as React.CSSProperties
      }>
      <div
        onClick={onClick}
        className={`flex items-center justify-center overflow-hidden rounded-[8%] border-2 bg-gradient-to-br from-[rgba(38,38,35,0.9)] to-[rgba(16,16,16,0.9)] backdrop-blur-sm transition duration-300 ${onClick ? 'pointer-events-auto cursor-pointer' : ''} ${active ? '' : `opacity-15 ${onClick ? 'hover:opacity-40' : ''}`} ${styles.layer}`}>
        <Image
          src={logo}
          width={180}
          height={180}
          alt=''
          className='w-full max-w-none'
        />
      </div>
    </div>
  )
}
