'use client'
import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { SuiTooltip, SuiTooltipContent, SuiTooltipTrigger } from '../sui'
import { usePricing } from './PricingContext'

function InfoTooltip({ content }: { content: string }) {
  return (
    <SuiTooltip placement='right'>
      <SuiTooltipTrigger>
        <InformationCircleIcon className='h-3.5 w-3.5' />
      </SuiTooltipTrigger>
      <SuiTooltipContent>{content}</SuiTooltipContent>
    </SuiTooltip>
  )
}

function ShowPricing({ isFirst }: { isFirst: boolean }) {
  const { selectedRegion } = usePricing()
  if (selectedRegion?.hasDevService) {
    return null
  }

  const storage =
    selectedRegion?.[isFirst ? 'devStoragePricing' : 'storagePricing']
  const compute =
    selectedRegion?.[isFirst ? 'devComputePricing' : 'computePricing']

  if (!storage || !compute) {
    return null
  }

  return (
    <div className='grid grid-cols-2 rounded-lg bg-c2 text-c5 text-left mt-8 py-3 '>
      <div className='border-r px-6 lg:px-4 xl:px-6'>
        <h5 className='font-semibold text-sm mb-2'>Storage</h5>
        <span className='whitespace-nowrap'>
          <div className='text-xl font-bold whitespace-nowrap'>
            $ {storage.priceUSD}
          </div>
          <div className='text-xs font-medium flex gap-1 items-center text-c5/50'>
            {storage.meteringUnit}
            <InfoTooltip content={storage.meteringTooltip} />
          </div>
        </span>
      </div>
      <div className='compute px-6 lg:px-4 xl:px-6'>
        <h5 className='font-semibold text-sm mb-2'>Compute</h5>
        <span className='whitespace-nowrap'>
          <div className='text-xl font-bold whitespace-nowrap'>
            ${compute.priceUSD}
          </div>
          <div className='text-xs font-medium flex gap-1 items-center text-c5/50'>
            {compute.meteringUnit}
            <InfoTooltip content={compute.meteringTooltip} />
          </div>
        </span>
      </div>
    </div>
  )
}

export default ShowPricing
