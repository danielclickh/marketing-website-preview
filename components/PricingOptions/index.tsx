import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import React, { ReactNode } from 'react'
import Markdown from '../Markdown'
import { PricingContextProvider } from './PricingContext'
import PlanPricing from './PlanPricing'
import PricingButton from './PricingButton'
import PricingSelector from './PricingSelector'
import ShowPricing from './ShowPricing'
import { PricingPlanData, RegionPricingWithIcon } from '../../types/pricing'

function PricingOptions({
  regionList,
  pricingPlans,
  children
}: {
  regionList: RegionPricingWithIcon[]
  pricingPlans: PricingPlanData[]
  children: ReactNode
}) {
  const totalLength = pricingPlans.length
  return (
    <PricingContextProvider value={regionList[0]}>
      <div className='center_content'>
        <div className='controls_row flex flex-col md:flex-row items-center justify-center gap-x-20 gap-y-8 mb-16 mt-8'>
          {children}
          <div className='seed_select_wrapper w-80'>
            <PricingSelector regionList={regionList} />
          </div>
        </div>
      </div>

      {pricingPlans.length > 0 && (
        <div className='plans_container grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {pricingPlans.map((plan, index) => (
            <div
              className='plan_card border-t-[5px] rounded-[5px] border-c6 w-full max-w-sm bg-c1-light dark:bg-c2-dark p-10 mx-auto'
              key={`plan-${plan.name}`}>
              <div className='card_content flex flex-col h-full justify-between'>
                <div className='border-b mb-6'>
                  <h2 className='text-center text-2xl font-bold mb-1'>
                    {plan.name}
                  </h2>
                  <div className='text-center text-sm md:h-16 xl:h-auto mb-4 text-normal'>
                    {plan.description}
                  </div>
                  <PlanPricing isFirst={index === 0} text={plan.pricingMain} />
                </div>
                <div className='flex-auto justify-between'>
                  <div className='flex flex-col gap-5'>
                    {(plan.items ?? []).map((item, planIndex: number) => (
                      <div
                        className='row flex items-center gap-4 text-sm justify-start'
                        key={`plan-bullet-${planIndex}`}>
                        {item.isBulleted && <CheckIcon className='w-4 h-4' />}
                        <div className='item_text'>
                          <Markdown>{item.description}</Markdown>
                        </div>
                      </div>
                    ))}
                    {plan.items_disabled.map(
                      (itemDisabled, planIndex: number) => (
                        <div
                          className='row_not_included flex items-center gap-4 text-sm justify-start text-neutral-0/30'
                          key={`plan-disabled-bullet-${planIndex}`}>
                          <MinusIcon className='w-4 h-4' />
                          <div className='item_text'>
                            <Markdown>{itemDisabled.description}</Markdown>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {index !== totalLength - 1 && (
                    <ShowPricing isFirst={index === 0} />
                  )}
                </div>
                <div className='mt-8'>
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
