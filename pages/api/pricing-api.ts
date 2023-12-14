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
  planId: '01b9a9d2-a36a-4a1d-969b-b24fc756cd64',
  computeAggregationId: '3797d30c-b13c-480b-9068-baf1e340a589',
  storageAggregationId: 'b5843a1b-a1bb-403d-a929-3ce8486e00d9'
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

  console.log(region)

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
    throw new Error(
      'Could not look up compute and/or storage pricing. Check the configured IDs'
    )
  } else {
    return res.status(200).json({
      computeUnitPrice: getUnitPrice(computePricing),
      storageUnitPrice: getUnitPrice(storagePricing)
    })
  }
}

const testHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PricingData | Error>
) => {
  return res
    .status(200)
    .json({ computeUnitPrice: 0.00182, storageUnitPrice: 6.85e-7 })
}

export default handler
