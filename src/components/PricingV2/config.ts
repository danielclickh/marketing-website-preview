import { MeterConfig } from './types'

export const averageDaysPerMonth = 30.5

// Compute RAM GB sizes (Must be divisible by 4)
export const computes = [8, 12, 16, 32, 64, 120, 236, 356]

// In hours
// @link https://clickhouse.com/docs/cloud/manage/backups/configurable-backups
export const backupIntervals = [6, 8, 12, 16, 20, 24, 36, 48]

export type ClickPipeSizes = 'XS' | 'S' | 'M' | 'L' | 'XL'

// Vertical scaling RAM GB sizes
export const clickpipeSizes: Record<ClickPipeSizes, number> = {
  XS: 0.512,
  S: 1,
  M: 2,
  L: 4,
  XL: 8
}

export const clickpipeBaseSize = clickpipeSizes.XS

// @link https://clickhouse.com/docs/cloud/manage/jan-2025-faq/pricing-dimensions#what-are-the-clickpipes-public-prices
export const clickpipePricingDimensions: {
  computeUnit: number
  computeUsdPerHour: number
  ingestedUsdPerGbPerMonth: number
  replicaComputeUsdPerHour: Record<ClickPipeSizes, number>
} = {
  computeUnit: 0.25,
  computeUsdPerHour: 0.2,
  ingestedUsdPerGbPerMonth: 0.04,
  replicaComputeUsdPerHour: {
    XS: 0.0125,
    S: 0.025,
    M: 0.05,
    L: 0.1,
    XL: 0.2
  }
}

export const meter: MeterConfig = {
  plans: {
    basic: {
      planTemplateId: 'c84c5422-f679-48b4-9910-4265b285795f',
      aggregationIds: {
        compute: ['5e976c25-4e0b-4f60-a527-b398fcb8f0f3'],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    },
    scale: {
      planTemplateId: '439c1511-9402-4cf5-96b9-164de5745df6',
      aggregationIds: {
        compute: ['5e976c25-4e0b-4f60-a527-b398fcb8f0f3'],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    },
    enterprise: {
      planTemplateId: 'ccf9c9b7-df2f-4a97-b400-e559dbaae595',
      aggregationIds: {
        compute: [
          'efb2eef7-cc62-4ae4-8cbf-be6c45c6d9b7',
          'f7e1901e-89ba-4fdc-af3b-2e68ae100b46',
          '66857306-9235-4926-94fe-98a0042564ad'
        ],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    }
  }
}

// Finds the closet compute value
// @example input: 220, output: 216
// @example input: 700, output: 356
export function findClosestCompute(input: number) {
  // If the value exists, return it
  if (computes.includes(input)) return input

  let closest = computes[0]
  let minDifference = Math.abs(input - computes[0])

  for (let i = 1; i < computes.length; i++) {
    const difference = Math.abs(input - computes[i])

    if (difference < minDifference) {
      closest = computes[i]
      minDifference = difference
    }
  }

  return closest
}
