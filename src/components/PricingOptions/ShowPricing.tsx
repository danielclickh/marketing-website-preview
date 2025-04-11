import { calculateComputeMargin } from '../PricingCalculator/CalculatorTypesOptions'
import { usePricing } from './PricingContext'
import { calculateStorageCost } from '@/lib/m3ter/costs'
import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useRef, useState } from 'react'

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
        <div className='invisible absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-[""]'></div>
        {content}
      </div>
    </div>
  )
}

function ShowPricing({
  isFirst,
  storagePricing,
  computePricing,
  tier
}: {
  isFirst: boolean
  storagePricing: number | undefined
  computePricing: number | undefined
  tier: string
}) {
  const { selectedRegion } = usePricing()

  const storage =
    selectedRegion?.[isFirst ? 'devStoragePricing' : 'storagePricing']
  const compute =
    selectedRegion?.[isFirst ? 'devComputePricing' : 'computePricing']

  if (!storage || !compute) {
    return null
  }

  return (
    <>
      <div className='pb-6'>
        <div className='flex justify-between gap-x-8'>
          <div className='w-1/2'>
            <h5 className='mb-2 text-sm font-bold'>Storage</h5>
            <div className='whitespace-nowrap text-2.75xl font-semibold'>
              $
              {storagePricing &&
                calculateStorageCost(storagePricing, 1024).toFixed(2)}
            </div>
            <Info
              unit={storage.meteringUnit}
              content={storage.meteringTooltip}
            />
          </div>
          <div className='w-1/2 text-left'>
            <h5 className='mb-2 text-sm font-bold'>Compute</h5>
            <div className='whitespace-nowrap text-2.75xl font-semibold'>
              ${computePricing && calculateComputeMargin(tier, computePricing)}
            </div>
            <div className='max-w-[120px]'>
              <Info
                unit={compute.meteringUnit}
                content={compute.meteringTooltip}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowPricing
