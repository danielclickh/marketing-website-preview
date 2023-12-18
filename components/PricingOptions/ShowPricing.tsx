import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import React, { useRef, useState } from 'react'
import { usePricing } from './PricingContext'

function InfoTooltip({ content }: { content: string }) {
  const triggerRef = useRef(null)
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          asChild
          ref={triggerRef}
          onClick={(e) => e.preventDefault()}>
          <button
            className='cursor-pointer appearance-none align-middle'
            tabIndex={0}>
            <InformationCircleIcon
              className='h-4 w-4'
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

function Info({ unit, content }: { unit: string; content: string }) {
  const [showing, setShowing] = useState(false)
  const toggle = () => setShowing(!showing)

  return (
    <div
      className='flex flex-wrap items-center gap-1 text-xs font-medium text-neutral-0/50'
      onClick={toggle}>
      <span className='mt-2 text-[14px] text-[#DFDFDF]'>{unit}</span>
      <div className='mt-2 hidden lg:block'>{content}</div>
      <span className='lg:hidden'>
        <InformationCircleIcon className='h-3.5 w-3.5' />
      </span>
      <div
        className={
          showing
            ? 'w-100 relative mt-2 shrink grow whitespace-normal rounded bg-neutral-700 p-2 lg:hidden'
            : 'hidden'
        }>
        <div className='invisible absolute top-0 left-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-[""]'></div>
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
    <div className='mt-8 flex items-stretch justify-center gap-4 pb-6 text-left text-neutral-0 xl:gap-8 '>
      <div className='shrink grow basis-0'>
        <h5 className='mb-2 text-sm font-bold'>Storage</h5>
        <div className='whitespace-nowrap text-2.75xl font-semibold'>
          ${storage.priceUSD}
        </div>
        <Info unit={storage.meteringUnit} content={storage.meteringTooltip} />
      </div>

      <div className='shrink-0 grow-0 border-r border-neutral-725' />

      <div className='shrink grow basis-0'>
        <h5 className='mb-2 text-sm font-bold'>Compute</h5>
        <div className='whitespace-nowrap text-2.75xl font-semibold'>
          ${compute.priceUSD}
        </div>
        <Info unit={compute.meteringUnit} content={compute.meteringTooltip} />
      </div>
    </div>
  )
}

export default ShowPricing
