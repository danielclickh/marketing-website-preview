'use client'
import React from 'react'
import { usePricing } from './PricingContext'

function PlanPricing({ isFirst, text }: { isFirst: boolean; text: string }) {
  const { selectedRegion } = usePricing()
  return (
    <div className='text-center font-bold text-3xl pb-4'>
      {isFirst ? selectedRegion?.devStoragePricing?.devPriceUSD : text}
    </div>
  )
}

export default PlanPricing
