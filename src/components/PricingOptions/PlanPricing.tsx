import { usePricing } from './PricingContext'
import React from 'react'

interface PlanPricingProps {
  isFirst: boolean
  text: string
  name: string
}

const PlanPricing: React.FC<PlanPricingProps> = ({ isFirst, text, name }) => {
  const { selectedRegion } = usePricing()
  const renderPricing = (): string | undefined => {
    if (
      selectedRegion?.regionSlug === 'ap-northeast-1' &&
      name === 'Development'
    ) {
      return 'Not available'
    }
    if (name === 'Development') {
      return selectedRegion?.devStoragePricing?.devPriceUSD
    }

    return text
  }

  return (
    <div className='text-center text-2.75xl font-semibold'>
      {renderPricing()}
    </div>
  )
}

export default PlanPricing
