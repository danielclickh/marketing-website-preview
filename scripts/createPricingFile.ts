import {
  acceptableRegions,
  config
} from '@/components/PricingCalculator/CalculatorTypesOptions'
import { meter as pricingV2Config } from '@/components/PricingV2/config'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({
  path: [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ]
})

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
const getPricingsByPlan = async (planId: string): Promise<Array<Pricing>> => {
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

const getPricingsByPlanTemplate = async (
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

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generatePricingFile(fileName: string, data: any) {
  try {
    const outputPath = path.join(__dirname, '..', 'public', fileName)
    fs.writeFileSync(outputPath, JSON.stringify(data))
    log(`Pricing (${fileName}) successfully written to file.`)
  } catch (error) {
    warn(`Error writing Pricing to file:  ${JSON.stringify(error)}`)
  }
}

function cleanPricing(data: Array<Pricing>) {
  return data.map((item) => ({
    id: item?.id,
    aggregationId: item?.aggregationId, // Change this to match the actual property name in 'Pricing'
    pricingBands: item?.pricingBands,
    description: item?.description,
    instanceTier: item?.segment?.instanceTier,
    region: item?.segment?.region,
    cloudProvider: item?.segment?.cloudProvider,
    profile: item?.segment?.profile
  }))
}

async function createPricingV1File() {
  log('Starting to build pricing V1 file.')

  const allPricings = await getPricingsByPlan(config.planId)

  // Generate modified 'acceptableRegions' array for 'gcp' provider
  const modifiedAcceptableRegions = acceptableRegions.map((regionObj) => {
    switch (regionObj.provider) {
      case 'gcp':
        regionObj.region = `gcp-${regionObj.region}`
        break
      case 'azure':
        regionObj.region = `azure-${regionObj.region}`
        break
    }
    return regionObj
  })

  const pricingsToStore = allPricings.filter(
    (item) =>
      modifiedAcceptableRegions.some(
        (region) =>
          region.region === item?.segment?.region &&
          region.tier.includes(item?.segment?.instanceTier)
      ) &&
      !item?.description?.includes('Dedicated') &&
      !item?.description?.includes('Cognitiv') &&
      !item?.description?.includes('Backups')
  )

  // We generate the JSON pricing file with the pricings data
  generatePricingFile('pricingFile.json', cleanPricing(pricingsToStore))
}

async function createPricingV2File() {
  log('Starting to build pricing V2 file.')

  const {
    basic: basicConfig,
    scale: scaleConfig,
    enterprise: enterpriseConfig
  } = pricingV2Config.plans

  // Initiate the api requests
  const basicPromise = getPricingsByPlanTemplate(basicConfig.planTemplateId)
  const scalePromise = getPricingsByPlanTemplate(scaleConfig.planTemplateId)
  const enterprisePromise = getPricingsByPlanTemplate(
    enterpriseConfig.planTemplateId
  )

  // Wait for the requests to complete
  let [basic, scale, enterprise] = await Promise.all([
    basicPromise,
    scalePromise,
    enterprisePromise
  ])

  basic = cleanPricing(basic).filter((result) => {
    return (
      result.aggregationId &&
      [
        ...basicConfig.aggregationIds.compute,
        ...basicConfig.aggregationIds.storage
      ].includes(result.aggregationId)
    )
  })

  scale = cleanPricing(scale).filter((result) => {
    return (
      result.aggregationId &&
      [
        ...scaleConfig.aggregationIds.compute,
        ...scaleConfig.aggregationIds.storage
      ].includes(result.aggregationId)
    )
  })

  enterprise = cleanPricing(enterprise).filter((result) => {
    if (!result.aggregationId) return false

    // Enterprise compute data is filtered by profile
    if (
      enterpriseConfig.aggregationIds.compute.includes(result.aggregationId)
    ) {
      return result.profile === 'v1-default'
    }

    return enterpriseConfig.aggregationIds.storage.includes(
      result.aggregationId
    )
  })

  generatePricingFile('pricingV2File.json', { basic, scale, enterprise })
}

async function triggerPricingFile() {
  await Promise.all([createPricingV1File(), createPricingV2File()])
}

triggerPricingFile()
