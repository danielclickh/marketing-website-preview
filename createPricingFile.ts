import fs from 'fs'
import path from 'path'
import { getPricingsByPlan } from './lib/m3ter/m3ter-api'
import { acceptableRegions } from './components/PricingCalculator/CalculatorTypesOptions'
import {
  config,
  configStaging
} from './components/PricingCalculator/CalculatorTypesOptions'

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

  const allPricings = await getPricingsByPlan(configStaging.planId)

  // Generate modified 'acceptableRegions' array for 'gcp' provider
  const modifiedAcceptableRegions = acceptableRegions.map((regionObj) => {
    if (regionObj.provider === 'gcp') {
      return { ...regionObj, region: `gcp-${regionObj.region}` }
    }
    if (regionObj.provider === 'azure') {
      return { ...regionObj, region: `azure-${regionObj.region}` }
    }
    return regionObj
  })

  const pricingsToStore = allPricings
    .filter(
      (item) =>
        modifiedAcceptableRegions.some(
          (region) =>
            region.region === item?.segment?.region &&
            region.tier.includes(item?.segment?.instanceTier)
        ) &&
        !item?.description?.includes('Dedicated') &&
        !item?.description?.includes('Cognitiv')
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
