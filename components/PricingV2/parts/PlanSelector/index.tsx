import { useCallback, useEffect } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'

export default function PlanSelector() {
  const { plans, plan, setPlan } = usePricingV2Context()

  const validatePlan = useCallback(
    (value: null | string) => {
      if (!value || !plans.find((item) => item.slug === value)) {
        return (
          plans.find((item) => item.featured)?.slug || plans.at(0)?.slug || null
        )
      }

      return value
    },
    [plans]
  )

  useEffect(() => {
    const validated = validatePlan(plan)
    if (plan !== validated) setPlan(validated)
  }, [plan, plans])

  return (
    <div>
      <Label>Plan</Label>
      <div className='flex gap-3'>
        {plans.map((item, index) => {
          const isActive = plan === item.slug
          return (
            <button
              key={index}
              className={`flex flex-1 flex-col justify-center rounded-[4px] border border-neutral-700 bg-neutral-750 px-3 py-2 text-center text-center text-sm shadow-input transition-colors focus:outline-none ${
                isActive
                  ? 'border-primary'
                  : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
              }`}
              onClick={(event) => {
                event.preventDefault()
                setPlan(item.slug)
              }}>
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
