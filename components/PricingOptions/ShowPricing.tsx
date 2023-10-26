import React, { useEffect, useRef, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { usePricing } from './PricingContext'

function InfoTooltip({ content }: { content: string }) {
  const triggerRef = useRef(null)
  const [position, setPosition] = useState<Tooltip.TooltipContentProps['side']>('right')

  useEffect(() => {
    function updatePosition() {
      if (window.innerWidth < 1024) {
        setPosition('top')
      } else {
        setPosition('right')
      }
    }
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
            asChild
            ref={triggerRef}
            onClick={(e) => e.preventDefault()} >
          <button className='appearance-none cursor-pointer' tabIndex={0}>
            <InformationCircleIcon
                className='h-3.5 w-3.5'
                onClick={(e) => e.preventDefault()}
            />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
              onPointerDownOutside={(event) => {
                if (event.target === triggerRef.current) event.preventDefault()
              }}
              className='rounded-sm bg-neutral-725 p-2 text-sm text-neutral-0'
              sideOffset={5}
              side={position}>
            {content}
            <Tooltip.Arrow className='fill-neutral-725' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

function ShowPricing({ isFirst }: { isFirst: boolean }) {
  const { selectedRegion } = usePricing()

  const storage =
    selectedRegion?.[isFirst ? 'devStoragePricing' : 'storagePricing']
  const compute =
    selectedRegion?.[isFirst ? 'devComputePricing' : 'computePricing']

  if (!storage || !compute) {
    return null
  }

  return (
    <div className='mt-8 grid grid-cols-2 pb-6 text-left text-neutral-0 '>
      <div className='border-r border-neutral-725 px-8 lg:px-4 xl:px-8'>
        <h5 className='mb-2 text-sm font-bold'>Storage</h5>
        <span className='whitespace-nowrap'>
          <div className='whitespace-nowrap text-2.75xl font-semibold'>
            ${storage.priceUSD}
          </div>
          <div className='flex items-center gap-1 text-xs font-medium text-neutral-0/50'>
            {storage.meteringUnit}
            <InfoTooltip content={storage.meteringTooltip} />
          </div>
        </span>
      </div>
      <div className='compute px-8 lg:px-4 xl:px-8'>
        <h5 className='mb-2 text-sm font-bold'>Compute</h5>
        <span className='whitespace-nowrap'>
          <div className='whitespace-nowrap text-2.75xl font-semibold'>
            ${compute.priceUSD}
          </div>
          <div className='flex items-center gap-1 text-xs font-medium text-neutral-0/50'>
            {compute.meteringUnit}
            <InfoTooltip content={compute.meteringTooltip} />
          </div>
        </span>
      </div>
    </div>
  )
}

export default ShowPricing
