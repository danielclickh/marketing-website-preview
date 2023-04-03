import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { usePricing } from './PricingContext'

function InfoTooltip({ content }: { content: string }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className='IconButton'>
            <InformationCircleIcon className='h-3.5 w-3.5' />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={`bg-neutral-725 text-neutral-0 rounded-lg text-sm p-2`}
            sideOffset={5}
            side='right'>
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
    <div className='grid grid-cols-2 text-neutral-0 text-left mt-8 py-3 '>
      <div className='border-r border-neutral-725 px-8 lg:px-4 xl:px-8'>
        <h5 className='font-bold text-sm mb-2'>Storage</h5>
        <span className='whitespace-nowrap'>
          <div className='text-2.75xl font-semibold whitespace-nowrap'>
            $ {storage.priceUSD}
          </div>
          <div className='text-xs font-medium flex gap-1 items-center text-neutral-0/50'>
            {storage.meteringUnit}
            <InfoTooltip content={storage.meteringTooltip} />
          </div>
        </span>
      </div>
      <div className='compute px-8 lg:px-4 xl:px-8'>
        <h5 className='font-bold text-sm mb-2'>Compute</h5>
        <span className='whitespace-nowrap'>
          <div className='text-2.75xl font-semibold whitespace-nowrap'>
            ${compute.priceUSD}
          </div>
          <div className='text-xs font-medium flex gap-1 items-center text-neutral-0/50'>
            {compute.meteringUnit}
            <InfoTooltip content={compute.meteringTooltip} />
          </div>
        </span>
      </div>
    </div>
  )
}

export default ShowPricing
