import React from 'react'
import { usePricing } from './PricingContext'

interface PlanPricingProps {
  isFirst: boolean
  text: string
}

const PlanPricing: React.FC<PlanPricingProps> = ({ isFirst, text }) => {
  const { selectedRegion } = usePricing()

  const renderPricing = (): string | undefined => {
    if (isFirst) {
      if (
        (selectedRegion?.regionSlug === 'ap-northeast-1' &&
          !selectedRegion.hasDevService) ||
        selectedRegion?.cloudProvider === 'azure'
      ) {
        return 'Not available'
      }
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
