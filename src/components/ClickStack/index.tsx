import logoClickhouseCloud from './assets/clickhouse-cloud.svg'
import logoClickhouse from './assets/clickhouse.svg'
import logoHyperdx from './assets/hyperdx.svg'
import logoOpentelemetry from './assets/opentelemetry.svg'
import LogoStack from '@/components-cleaned/LogoStack'

type CallbackStack = 'hyperdx' | 'clickhouse' | 'opentelemetry'

export interface ClickStackProps {
  type?: 'oss' | 'cloud'
  hyperdx?: boolean
  clickhouse?: boolean
  opentelemetry?: boolean
  gap?: number
  onClick?: (stack: CallbackStack) => void
  onMouseEnter?: (stack: CallbackStack) => void
  onMouseLeave?: (stack: CallbackStack) => void
}

export default function ClickStack({
  type = 'oss',
  hyperdx = true,
  clickhouse = true,
  opentelemetry = true,
  gap,
  onClick,
  onMouseEnter,
  onMouseLeave
}: ClickStackProps) {
  return (
    <LogoStack
      gap={gap}
      layers={[
        {
          logo: { src: logoHyperdx },
          active: hyperdx,
          color: '#4FFA7A',
          onClick: onClick ? () => onClick('hyperdx') : undefined,
          onMouseEnter: onMouseEnter
            ? () => onMouseEnter('hyperdx')
            : undefined,
          onMouseLeave: onMouseLeave ? () => onMouseLeave('hyperdx') : undefined
        },
        {
          logo: {
            src: type === 'cloud' ? logoClickhouseCloud : logoClickhouse
          },
          active: clickhouse,
          color: '#FAFF69',
          onClick: onClick ? () => onClick('clickhouse') : undefined,
          onMouseEnter: onMouseEnter
            ? () => onMouseEnter('clickhouse')
            : undefined,
          onMouseLeave: onMouseLeave
            ? () => onMouseLeave('clickhouse')
            : undefined
        },
        {
          logo: { src: logoOpentelemetry },
          active: opentelemetry,
          color: '#F5A800',
          onClick: onClick ? () => onClick('opentelemetry') : undefined,
          onMouseEnter: onMouseEnter
            ? () => onMouseEnter('opentelemetry')
            : undefined,
          onMouseLeave: onMouseLeave
            ? () => onMouseLeave('opentelemetry')
            : undefined
        }
      ]}
    />
  )
}
