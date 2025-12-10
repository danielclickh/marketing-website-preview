import iconVs from '@/components-cleaned/ClickHouseVersusAnimation/assets/icon-vs.png'
import LogoStack, { Layer } from '@/components-cleaned/LogoStack'
import ClickStack from '@/components/ClickStack'
import ScaleToContainer from '@/components/ScaleToContainer'
import { useDebounce } from '@/hooks'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export interface ClickStackVsCompetitorStackProps {
  layer1: Pick<Layer, 'logo' | 'color'>
  layer2: Pick<Layer, 'logo' | 'color'>
  layer3: Pick<Layer, 'logo' | 'color'>
}

export default function ClickStackVsCompetitorStack({
  layer1,
  layer2,
  layer3
}: ClickStackVsCompetitorStackProps) {
  const layerGap = 72
  const autoplay = false
  const [userInteracting, setUserInteracting] = useState(false)
  const [activeLayer, setActiveLayer] = useState<null | number>(null)

  const activateLayer = useDebounce((layer: number | null) => {
    setUserInteracting(typeof layer === 'number')
    setActiveLayer(layer)
  }, 50)
  const resetActiveLayer = () => activateLayer(null)

  useEffect(() => {
    if (!userInteracting && autoplay) {
      const interval = window.setInterval(() => {
        setActiveLayer((old) => {
          if (old === null) return 1
          const newValue = old + 1
          return newValue > 3 ? null : newValue
        })
      }, 1500)

      return () => window.clearInterval(interval)
    }
  }, [autoplay, userInteracting])

  const noActiveLayer = activeLayer === null
  const layer1Active = noActiveLayer || activeLayer === 1
  const layer2Active = noActiveLayer || activeLayer === 2
  const layer3Active = noActiveLayer || activeLayer === 3
  return (
    <ScaleToContainer scaleUp={false} className='mx-auto'>
      <div className='flex w-max flex-row items-center justify-center gap-x-16 gap-y-8'>
        <ClickStack
          gap={layerGap}
          hyperdx={layer1Active}
          clickhouse={layer2Active}
          opentelemetry={layer3Active}
          onMouseEnter={(stack) => {
            switch (stack) {
              case 'hyperdx':
                activateLayer(1)
                break
              case 'clickhouse':
                activateLayer(2)
                break
              case 'opentelemetry':
                activateLayer(3)
                break
            }
          }}
          onMouseLeave={resetActiveLayer}
        />
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='rounded-full shadow-xl'
        />
        <LogoStack
          gap={layerGap}
          layers={[
            {
              ...layer1,
              onMouseEnter: () => activateLayer(1),
              onMouseLeave: resetActiveLayer,
              active: layer1Active
            },
            {
              ...layer2,
              onMouseEnter: () => activateLayer(2),
              onMouseLeave: resetActiveLayer,
              active: layer2Active
            },
            {
              ...layer3,
              onMouseEnter: () => activateLayer(3),
              onMouseLeave: resetActiveLayer,
              active: layer3Active
            }
          ]}
        />
      </div>
    </ScaleToContainer>
  )
}
