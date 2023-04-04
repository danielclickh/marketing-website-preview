import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import Markdown from '../Markdown'
import { PricingContextProvider } from './PricingContext'
import PlanPricing from './PlanPricing'
import PricingButton from './PricingButton'
import PricingSelector from './PricingSelector'
import ShowPricing from './ShowPricing'
import { PricingPlanData, RegionPricingWithIcon } from '../../types/pricing'

function PricingOptions({
  regionList,
  pricingPlans
}: {
  regionList: RegionPricingWithIcon[]
  pricingPlans: PricingPlanData[]
}) {
  const totalLength = pricingPlans.length
  return (
    <PricingContextProvider value={regionList[0]}>
      <div className='center_content mb-24 max-w-[344px] mx-auto'>
        <PricingSelector regionList={regionList} />
      </div>

      {pricingPlans.length > 0 && (
        <div className='plans_container grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {pricingPlans.map((plan, index) => (
            <div
              className='shadow-card-xl border border-neutral-700/80 border-t-4 rounded-lg border-t-primary w-full max-w-sm bg-neutral-900/50 mx-auto'
              key={`plan-${plan.name}`}>
              <div className='card_content flex flex-col h-full justify-between'>
                <div className='border-b border-neutral-725 p-6'>
                  <h2 className='text-center text-2.75xl font-semibold mb-1'>
                    {plan.name}
                  </h2>
                  <div className='text-center text-sm md:h-16 xl:h-auto text-normal text-neutral-300'>
                    {plan.description}
                  </div>
                  <PlanPricing isFirst={index === 0} text={plan.pricingMain} />
                </div>
                <div className='flex-auto justify-between p-6'>
                  <div className='flex flex-col gap-5'>
                    {(plan.items ?? []).map((item, planIndex: number) => (
                      <div
                        className='row flex items-center gap-4 text-sm justify-start'
                        key={`plan-bullet-${planIndex}`}>
                        {item.isBulleted && <CheckIcon className='w-4 h-4' />}
                        <div className='item_text'>
                          <Markdown className=' !text-neutral-0'>
                            {item.description}
                          </Markdown>
                        </div>
                      </div>
                    ))}
                    {plan.items_disabled.map(
                      (itemDisabled, planIndex: number) => (
                        <div
                          className='row_not_included flex items-center gap-4 text-sm justify-start text-neutral-300'
                          key={`plan-disabled-bullet-${planIndex}`}>
                          <MinusIcon className='w-4 h-4' />
                          <div className='item_text'>
                            <Markdown className='!text-neutral-300'>
                              {itemDisabled.description}
                            </Markdown>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className='p-6 pt-0'>
                  {index !== totalLength - 1 && (
                    <ShowPricing isFirst={index === 0} />
                  )}
                  {plan.actionButton && (
                    <PricingButton
                      isFirst={index === 0}
                      isLast={index !== totalLength - 1}
                      path={plan.actionButton.link}
                      btnText={plan.actionButton.text}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PricingContextProvider>
  )
}

export default PricingOptions
