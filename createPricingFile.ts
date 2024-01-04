import fs from 'fs'
import path from 'path'
import { getPricingsByPlan } from './lib/m3ter/m3ter-api'

const config = {
  planId: '01b9a9d2-a36a-4a1d-969b-b24fc756cd64',
  computeAggregationId: '3797d30c-b13c-480b-9068-baf1e340a589',
  storageAggregationId: 'b5843a1b-a1bb-403d-a929-3ce8486e00d9'
}

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generatePricingFile(pricings: any) {
  const pricingJSON = `${JSON.stringify(pricings)}`
  try {
    const outputPath = path.join(__dirname, 'public', 'pricingFile.json')
    fs.writeFileSync(outputPath, pricingJSON)
    log('Pricing successfully written to file.')
  } catch (error) {
    warn(`Error writing Pricing to file:  ${JSON.stringify(error)}`)
  }
}

async function triggerPricingFile() {
  log('Starting to build pricing file')

  const allPricings = await getPricingsByPlan(config.planId)

  //should really pull from Strapi, but for now this will do
  const acceptableRegions = [
    'us-east-2',
    'us-west-2',
    'us-east-1',
    'eu-west-1',
    'eu-west-2',
    'eu-central-1',
    'ap-southeast-1',
    'ap-south-1',
    'ap-southeast-2',
    'gcp-us-central1',
    'gcp-us-east1',
    'gcp-europe-west4',
    'gcp-asia-southeast1'
  ]

  const pricingsToStore = allPricings
    .filter(
      (item) =>
        acceptableRegions.includes(item?.segment?.region ?? '') &&
        !item?.description?.includes('Dedicated')
    )
    .map((item) => ({
      id: item?.id,
      aggregationId: item?.aggregationId, // Change this to match the actual property name in 'Pricing'
      pricingBands: item?.pricingBands,
      description: item?.description,
      instanceTier: item?.segment?.instanceTier,
      region: item?.segment?.region,
      cloudProvider: item?.segment?.cloudProvider
    }))

  // We generate the JSON pricing file with the pricings data
  generatePricingFile(pricingsToStore)
}

triggerPricingFile()
