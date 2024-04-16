import React from 'react'
import { usePricing } from './PricingContext'

function PlanPricing({ isFirst, text }: { isFirst: boolean; text: string }) {
  const { selectedRegion } = usePricing()
  return (
    <div className='text-center text-2.75xl font-semibold'>
      {isFirst &&
        selectedRegion?.regionSlug === 'ap-northeast-1' &&
        !selectedRegion.hasDevService &&
        'Not available'}
      {isFirst ? selectedRegion?.devStoragePricing?.devPriceUSD : text}
    </div>
  )
}

export default PlanPricing
