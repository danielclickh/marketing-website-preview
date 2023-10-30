import { ReactNode } from 'react'
import { RegionPricing } from '../../types/pricing'

export interface RegionPricingWithIcon
  extends Omit<RegionPricing, 'regionFlagPNG'> {
  regionFlagPNG: ReactNode,
  regionSlug: string
}
