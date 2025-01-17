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
      <Label>Service type</Label>
      <div className='flex gap-3'>
        {plans.map((item, index) => {
          const isActive = plan === item.slug
          return (
            <button
              key={index}
              className={`inline-block flex-1 rounded border px-1 py-2 text-center ${
                isActive ? 'border-primary' : ''
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
