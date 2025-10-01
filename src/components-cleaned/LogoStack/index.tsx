import styles from './styles.module.scss'
import ScaleToContainer from '@/components/ScaleToContainer'
import Image, { ImageProps } from 'next/image'

const spacingFixPercentage = 13

type Logo = { src: ImageProps['src'] } & Partial<Omit<ImageProps, 'src'>>

type Layer = {
  logo: Logo
  color?: React.CSSProperties['backgroundColor']
  active?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export interface LogoStackProps {
  width?: number
  gap?: number
  layers: Array<Layer>
}

export default function LogoStack({
  width = 261,
  gap = 64,
  layers
}: LogoStackProps) {
  const layerWidth = ((100 - spacingFixPercentage * 2) / 100) * width
  return (
    <ScaleToContainer scaleUp={false}>
      <div
        className='relative select-none'
        style={{
          width: width,
          aspectRatio: `${width}/${layerWidth + gap * (layers.length - 1) + 4}`
        }}>
        {layers.map((layer, layerIndex) => {
          return (
            <Layer
              key={layerIndex}
              logo={layer.logo}
              color={layer.color}
              active={layer.active}
              onClick={layer.onClick}
              onMouseEnter={layer.onMouseEnter}
              onMouseLeave={layer.onMouseLeave}
              style={{
                zIndex: layers.length - layerIndex,
                top: `${(gap * layerIndex).toFixed(2)}px`
              }}
            />
          )
        })}
      </div>
    </ScaleToContainer>
  )
}

function Layer({
  logo: { src, width, height, alt = '', className = '', ...logo },
  color = '#fff',
  style = {},
  active = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  logo: Logo
  color?: string
  style?: Omit<React.CSSProperties, '--color' | 'left' | 'right'>
  active?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const isInteractive = onClick || onMouseEnter || onMouseLeave

  return (
    <div
      className={`pointer-events-none absolute top-0 aspect-square ${styles.layerPerspective}`}
      style={
        {
          ...style,
          '--color': color,
          left: `${spacingFixPercentage}%`,
          right: `${spacingFixPercentage}%`
        } as React.CSSProperties
      }>
      <div
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`flex items-center justify-center overflow-hidden rounded-[8%] border-2 bg-gradient-to-br from-[rgba(38,38,35,0.9)] to-[rgba(16,16,16,0.9)] backdrop-blur-sm transition duration-300 ${isInteractive ? 'pointer-events-auto cursor-pointer' : ''} ${active ? '' : `opacity-15 ${isInteractive ? 'hover:opacity-40' : ''}`} ${styles.layer}`}>
        <Image
          src={src}
          width={width ?? 180}
          height={height ?? 180}
          alt={alt}
          className={`h-full w-full max-w-none ${className}`}
          {...logo}
        />
      </div>
    </div>
  )
}
