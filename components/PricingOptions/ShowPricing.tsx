import React, { useEffect, useRef, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { usePricing } from './PricingContext'

function InfoTooltip({ content }: { content: string }) {
  const triggerRef = useRef(null)
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
            asChild
            ref={triggerRef}
            onClick={(e) => e.preventDefault()} >
          <button className='appearance-none cursor-pointer align-middle' tabIndex={0}>
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
              side='right'>
            {content}
            <Tooltip.Arrow className='fill-neutral-725' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

function Info({
  unit,
  content
}: {
  unit: string,
  content: string
}) {
  const [showing, setShowing] = useState(false)
  const toggle = () => setShowing(!showing)

  return (
    <div className='flex items-center gap-1 flex-wrap text-xs font-medium text-neutral-0/50' onClick={toggle}>
      {unit}
      <div className='hidden lg:block'>
        <InfoTooltip content={content} />
      </div>
      <span className='lg:hidden'>
        <InformationCircleIcon className='h-3.5 w-3.5' />
      </span>
      <div className={showing ? 'lg:hidden p-2 mt-2 rounded bg-neutral-700 w-100 shrink grow whitespace-normal relative' : 'hidden'}>
        <div className='invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-[""] top-0 left-1/2 -translate-y-1/2 -translate-x-1/2'></div>
        {content}
      </div>
    </div>
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
    <div className='mt-8 flex items-stretch justify-center gap-4 xl:gap-8 pb-6 text-left text-neutral-0 '>
      <div className='basis-0 grow shrink xl:max-w-[100px]'>
        <h5 className='mb-2 text-sm font-bold'>Storage</h5>
        <div className='whitespace-nowrap text-2.75xl font-semibold'>
          ${storage.priceUSD}
        </div>
        <Info
          unit={storage.meteringUnit}
          content={storage.meteringTooltip} />
      </div>

      <div className='border-r border-neutral-725 grow-0 shrink-0' />

      <div className='basis-0 grow shrink xl:max-w-[100px]'>
        <h5 className='mb-2 text-sm font-bold'>Compute</h5>
        <div className='whitespace-nowrap text-2.75xl font-semibold'>
          ${compute.priceUSD}
        </div>
        <Info
          unit={compute.meteringUnit}
          content={compute.meteringTooltip} />
      </div>
    </div>
  )
}

export default ShowPricing
