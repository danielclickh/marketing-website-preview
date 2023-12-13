import isEqual from 'lodash/isEqual'

// These are subsets of the fields from the API to cover what we use.

interface PricingBand {
  lowerLimit: number
  unitPrice: number
}

export interface Pricing {
  id: string
  aggregationId?: string
  pricingBands?: Array<PricingBand>
  segment?: Record<string, string>
}

const API_ENDPOINT = process.env.M3TER_API_ENDPOINT
const API_KEY = process.env.M3TER_API_KEY
const API_SECRET = process.env.M3TER_API_SECRET
const ORG_ID = process.env.M3TER_ORG_ID

const basicAuth = btoa(`${API_KEY}:${API_SECRET}`)

const getToken = async () => {
  const res = await fetch(`${API_ENDPOINT}/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ grant_type: 'client_credentials' })
  })

  if (res.ok) {
    const data = await res.json()
    return data.access_token
  } else {
    throw new Error('Unable to obtain an auth token')
  }
}

const buildUrl = (
  path: string,
  queryParams?: Record<string, string>
): string => {
  const query = queryParams ? `?${new URLSearchParams(queryParams)}` : ''
  return `${API_ENDPOINT}/organizations/${ORG_ID}${path}${query}`
}

// TODO: This needs to be like `listAll` from the console because they have 100s
//       of pricings on the plan due to all the segments.
const getPricingsByPlan = async (planId: string): Promise<Array<Pricing>> => {
  const token = await getToken()

  const res = await fetch(buildUrl('/pricings', { planId }), {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (res.ok) {
    const responseData = await res.json()
    return responseData.data
  }

  return []
}

export const getRelevantPricing = async (
  planId: string,
  cloudProvider: string,
  region: string,
  instanceTier: string
): Promise<Array<Pricing>> => {
  const allPricings = await getPricingsByPlan(planId)

  const segment = {
    cloudProvider,
    region,
    instanceTier
  }

  return allPricings.filter(
    (pricing: any) => pricing.segment && isEqual(pricing.segment, segment)
  )
}
