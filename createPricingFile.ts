import fs from 'fs'
import path from 'path'
import {
  acceptableRegions,
  config
} from './components/PricingCalculator/CalculatorTypesOptions'
import { aggregationIds, planIds } from './components/PricingV2/config'
import {
  getPricingsByPlan,
  getPricingsByPlanTemplate,
  Pricing
} from './lib/m3ter/m3ter-api'

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generatePricingFile(fileName: string, data: any) {
  try {
    const outputPath = path.join(__dirname, 'public', fileName)
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
    cloudProvider: item?.segment?.cloudProvider
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

  const basicPromise = getPricingsByPlanTemplate(planIds.basic)
  const scalePromise = getPricingsByPlanTemplate(planIds.scale)
  const enterprisePromise = getPricingsByPlanTemplate(planIds.enterprise)

  let [basic, scale, enterprise] = await Promise.all([
    basicPromise,
    scalePromise,
    enterprisePromise
  ])

  const allowedIds = Object.values(aggregationIds)

  basic = cleanPricing(basic).filter(
    (result) =>
      result.aggregationId && allowedIds.includes(result.aggregationId)
  )
  scale = cleanPricing(scale).filter(
    (result) =>
      result.aggregationId && allowedIds.includes(result.aggregationId)
  )
  enterprise = cleanPricing(enterprise).filter(
    (result) =>
      result.aggregationId && allowedIds.includes(result.aggregationId)
  )

  generatePricingFile('pricingV2File.json', { basic, scale, enterprise })
}

async function triggerPricingFile() {
  await Promise.all([/*createPricingV1File(),*/ createPricingV2File()])
}

triggerPricingFile()
