// These are subsets of the fields from the API to cover what we use.

export interface PricingBand {
  lowerLimit: number
  unitPrice: number
}

export interface Pricing {
  id: string
  aggregationId?: string
  pricingBands?: Array<PricingBand>
  segment?: Record<string, string>
  description?: string
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
    const data = await res.json()
    console.log(data)
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
export const getPricingsByPlan = async (
  planId: string
): Promise<Array<Pricing>> => {
  const token = await getToken()
  let allPricings: Array<Pricing> = []

  let nextToken = null

  do {
    const url = buildUrl('/pricings', {
      planId,
      ...(nextToken && { nextToken }) // Include nextToken only if it is truthy
    })

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const responseData = await res.json()
      allPricings = allPricings.concat(responseData.data)
      nextToken = responseData.nextToken
    } else {
      console.log(url, res.statusText)
      // Handle error here if needed
      return []
    }
  } while (nextToken)

  return allPricings
}

export const getPricingsByPlanTemplate = async (
  planTemplateId: string
): Promise<Array<Pricing>> => {
  const token = await getToken()
  let allPricings: Array<Pricing> = []

  let nextToken = null

  do {
    const url = buildUrl('/pricings', {
      planTemplateId,
      ...(nextToken && { nextToken }) // Include nextToken only if it is truthy
    })

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const responseData = await res.json()
      allPricings = allPricings.concat(responseData.data)
      nextToken = responseData.nextToken
    } else {
      console.log(url, res.statusText)
      // Handle error here if needed
      return []
    }
  } while (nextToken)

  return allPricings
}
