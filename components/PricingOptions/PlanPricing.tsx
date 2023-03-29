import React from 'react'
import { usePricing } from './PricingContext'

function PlanPricing({ isFirst, text }: { isFirst: boolean; text: string }) {
  const { selectedRegion } = usePricing()
  return (
    <div className='text-center font-semibold text-2.75xl'>
      {isFirst ? selectedRegion?.devStoragePricing?.devPriceUSD : text}
    </div>
  )
}

export default PlanPricing
