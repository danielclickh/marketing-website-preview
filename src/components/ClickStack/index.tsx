import logoClickhouse from './assets/clickhouse.svg'
import logoHyperdx from './assets/hyperdx.svg'
import logoOpentelemetry from './assets/opentelemetry.svg'
import LogoStack from '@/components-cleaned/LogoStack'

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
  return (
    <LogoStack
      layers={[
        {
          logo: { src: logoHyperdx },
          active: hyperdx,
          color: '#4FFA7A',
          onClick: onClick ? () => onClick('hyperdx') : undefined
        },
        {
          logo: { src: logoClickhouse },
          active: clickhouse,
          color: '#FAFF69',
          onClick: onClick ? () => onClick('clickhouse') : undefined
        },
        {
          logo: { src: logoOpentelemetry },
          active: opentelemetry,
          color: '#F5A800',
          onClick: onClick ? () => onClick('opentelemetry') : undefined
        }
      ]}
    />
  )
}
