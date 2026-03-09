import { RegionPricing } from '@/types/pricing'
import { ReactNode } from 'react'

export interface RegionPricingWithIcon
  extends Omit<RegionPricing, 'regionFlagPNG'> {
  regionFlagPNG: ReactNode
  regionSlug: string
}
