import type { NextApiRequest, NextApiResponse } from 'next'

import { Pricing, getRelevantPricing } from '../../lib/m3ter/m3ter-api'

export interface PricingData {
  computeUnitPrice: number
  storageUnitPrice: number
}

interface Error {
  message: string
}

// Update this config with values from m3ter.
const config = {
  planId: 'edcbc7aa-9532-4072-a18c-f0c34e15396a',
  computeAggregationId: '64ad5584-ac22-4a0a-a40e-ae8b6b93ec6c',
  storageAggregationId: '4d976d72-e1aa-4df8-810c-21dd2d435bdf'
}

const getUnitPrice = (pricing: Pricing): number => {
  const [firstBand] = pricing.pricingBands ?? []
  return firstBand ? firstBand.unitPrice : 0
}

/**
 * API route that returns compute and storage unit price data based on the
 * selected provider, region and tier provided as query params.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PricingData | Error>
) => {
  const { provider, region, tier } = req.query

  // Validate the query params were provided.
  // Using `typeof` ensures the value is not undefined and is not an array of values.
  if (
    typeof provider !== 'string' ||
    typeof region !== 'string' ||
    typeof tier !== 'string'
  ) {
    return res.status(400).json({
      message: 'Query parameters provider, region and tier are all required'
    })
  }

  // Load pricing that matches the correct segment.
  const pricings = await getRelevantPricing(
    config.planId,
    provider,
    region,
    tier
  )

  // Attempt to find the pricing that relates to the compute and storage aggregations.
  const computePricing = pricings.find(
    (pricing) => pricing.aggregationId === config.computeAggregationId
  )
  const storagePricing = pricings.find(
    (pricing) => pricing.aggregationId === config.storageAggregationId
  )

  if (!computePricing || !storagePricing) {
    //remove these hardcoded values! just for testing
    return res
      .status(200)
      .json({ computeUnitPrice: 0.00182, storageUnitPrice: 6.85e-7 })
    // throw new Error(
    //   'Could not look up compute and/or storage pricing. Check the configured IDs'
    // )
  } else {
    return res.status(200).json({
      computeUnitPrice: getUnitPrice(computePricing),
      storageUnitPrice: getUnitPrice(storagePricing)
    })
  }
}

export default handler
