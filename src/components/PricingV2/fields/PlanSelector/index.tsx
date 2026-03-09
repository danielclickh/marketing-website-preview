import FieldContainer from '../../ui/FieldContainer'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'

export default function PlanSelector() {
  const { setValues, sourceData, plan } = usePricingV2Context()
  return (
    <FieldContainer label='Plan'>
      <div className='flex gap-3'>
        {sourceData.plans.map((item, index) => {
          const isActive = plan === item.slug
          return (
            <button
              key={index}
              className={`block flex-1 rounded border border-neutral-700 bg-neutral-750 px-3 py-2 text-center text-sm shadow-input transition-colors focus:outline-none ${
                isActive
                  ? 'border-primary'
                  : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
              }`}
              onClick={(event) => {
                event.preventDefault()
                setValues({ plan: item.slug })
              }}>
              {item.name}
            </button>
          )
        })}
      </div>
    </FieldContainer>
  )
}
