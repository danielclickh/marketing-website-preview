import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import {
  calculateComputeCost,
  calculateStorageCost
} from '../../lib/m3ter/costs'
import pricingPlansFromFile from '../../public/pricingFile.json'
import {
  CloudProviderType,
  PricingPlanData,
  RegionPricing
} from '../../types/pricing'
import { FormControl } from '../PricingCalculator/ui/FormControl'
import {
  NumericSelect,
  Option as NumericSelectOption
} from '../PricingCalculator/ui/NumericSelect'
import { RangeSlider } from '../PricingCalculator/ui/RangeSlider'
import {
  Option as ToggleOption,
  ToggleButtons
} from '../PricingCalculator/ui/ToggleButtons'
import PricingOptions from '../PricingOptions'
import styles from './CostCalculator.module.scss'
import CTAButtons from './CTAButtons'
import { ToggleButtonsProviders } from './ui/ToggleButtonsProviders'

type Tier = 'Development' | 'Production'
type Provider = 'aws' | 'gcp'
interface PricingData {
  computeUnitPrice: number
  storageUnitPrice: number
}

const acceptableRegions = [
  { provider: 'aws', region: 'us-east-2' },
  { provider: 'aws', region: 'us-west-2' },
  { provider: 'aws', region: 'us-east-1' },
  { provider: 'aws', region: 'eu-west-1' },
  { provider: 'aws', region: 'eu-central-1' },
  { provider: 'aws', region: 'ap-southeast-1' },
  { provider: 'aws', region: 'ap-south-1' },
  { provider: 'aws', region: 'ap-southeast-2' },
  { provider: 'gcp', region: 'us-central1' },
  { provider: 'gcp', region: 'us-east1' },
  { provider: 'gcp', region: 'europe-west4' },
  { provider: 'gcp', region: 'asia-southeast1' }
]

const tierOptions: Array<ToggleOption<Tier>> = [
  {
    value: 'Development',
    label: 'Development',
    tooltip: 'Great for smaller workloads and starter projects'
  },
  {
    value: 'Production',
    label: 'Production',
    tooltip: 'Designed to handle production workloads'
  }
]

const providerOptions: Array<ToggleOption<Provider>> = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' }
]

const dataOptions: Array<NumericSelectOption> = [
  { value: 250, label: '250GB' },
  { value: 500, label: '500GB' },
  { value: 1024, label: '1TB' },
  { value: 10240, label: '10TB' }
]

const computeOptions: Array<NumericSelectOption> = [
  { value: 16, label: '16 GiB RAM, 2 vCPU', tier: 'Development' },
  { value: 24, label: '24 GiB RAM, 6 vCPU', tier: 'Production' },
  { value: 48, label: '48 GiB RAM, 12 vCPU', tier: 'Production' },
  { value: 96, label: '96 GiB RAM, 24 vCPU', tier: 'Production' },
  { value: 192, label: '192 GiB RAM, 48 vCPU', tier: 'Production' },
  { value: 360, label: '360 GiB RAM, 96 vCPU', tier: 'Production' },
  { value: 720, label: '720 GiB RAM, 192 vCPU', tier: 'Production' }
]

const config = {
  planId: '01b9a9d2-a36a-4a1d-969b-b24fc756cd64',
  computeAggregationId: '3797d30c-b13c-480b-9068-baf1e340a589',
  storageAggregationId: 'b5843a1b-a1bb-403d-a929-3ce8486e00d9'
}

export const PricingCalculator: React.FC<{
  pricingByRegion: RegionPricing[]
  cloudProviders: CloudProviderType[]
  pricingPlans: PricingPlanData[]
}> = ({ pricingByRegion, cloudProviders, pricingPlans }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tier = searchParams.get('tier') || 'Development'
  const provider = searchParams.get('provider') || 'aws'
  const region = searchParams.get('region') || 'us-east-2'
  let hours = 8
  const hoursParam = searchParams.get('hours')
  if (hoursParam !== null) {
    hours = Number(hoursParam)
  }
  const storage = Number(searchParams.get('storage')) || 500
  const computeMinSize = Number(searchParams.get('computeMinSize')) || 24
  const computeMaxSize = Number(searchParams.get('computeMaxSize')) || 48

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pricingData, setPricingData] = useState<PricingData | undefined>()
  const [memoryError, setMemoryError] = useState<string | undefined>(undefined)
  const [contactSales, setContactSales] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    setIsLoading(true)
    setMemoryError(undefined)

    // Check if the selected tier is valid
    if (!tierOptions.some((option) => option.value === tier)) {
      // If it's not a valid tier, default to 'dev'
      router.push(
        {
          query: {
            ...router.query,
            tier: 'Development'
          }
        },
        undefined,
        { shallow: true }
      )
    }

    // Check if the selected provider is valid
    if (!providerOptions.some((option) => option.value === provider)) {
      // If it's not a valid provider, default to 'aws'
      router.push(
        {
          query: {
            ...router.query,
            provider: 'aws'
          }
        },
        undefined,
        { shallow: true }
      )
    }

    //make sure only accepted regions and providers
    const providerToCheck = provider
    const regionToCheck = region
    const isMatch = acceptableRegions.some(
      (region) =>
        region.provider === providerToCheck && region.region === regionToCheck
    )

    //if no match, then set the region to the first region in the list of the given provider.
    if (!isMatch) {
      const firstRegionForProvider = acceptableRegions.find(
        (region) => region.provider === providerToCheck
      )

      if (firstRegionForProvider) {
        router.push(
          {
            query: {
              ...router.query,
              region: firstRegionForProvider.region
            }
          },
          undefined,
          { shallow: true }
        )
      }
    }

    //make sure number isn't over 24 hrs
    if (hours > 24) {
      // If it's not a valid value, default to '8'
      router.push(
        {
          query: {
            ...router.query,
            hours: 24 // Set your default value here
          }
        },
        undefined,
        { shallow: true }
      )
    }
    if (hours < 0) {
      // If it's not a valid value, default to '8'
      router.push(
        {
          query: {
            ...router.query,
            hours: 8 // Set your default value here
          }
        },
        undefined,
        { shallow: true }
      )
    }

    //validate data accepted volumes
    if (!dataOptions.map((option) => option.value).includes(storage)) {
      router.push(
        {
          query: {
            ...router.query,
            storage: 500
          }
        },
        undefined,
        { shallow: true }
      )
    }

    //validate min and max memory sizes
    // Check if computeMinSize is an acceptable value
    const isMinSizeValid = computeOptions.some(
      (option) => option.value === computeMinSize
    )

    // Check if computeMaxSize is an acceptable value
    const isMaxSizeValid = computeOptions.some(
      (option) => option.value === computeMaxSize
    )

    if (tier === 'Development') {
      delete router.query.computeMaxSize
      router.push(
        {
          query: {
            ...router.query
          }
        },
        undefined,
        { shallow: true }
      )
      if (computeMinSize > 16) {
        router.push(
          {
            query: {
              ...router.query,
              computeMinSize: 16
            }
          },
          undefined,
          { shallow: true }
        )
      }
    }

    if (tier === 'Production') {
      // Check if computeMinSize is in the list of acceptable options
      if (!isMinSizeValid || computeMinSize < 24) {
        // Set a default value for computeMinSize
        router.push(
          {
            query: {
              ...router.query,
              computeMinSize: 24
            }
          },
          undefined,
          { shallow: true }
        )
      }

      // Check if computeMaxSize is in the list of acceptable options
      if (!isMaxSizeValid) {
        // Set a default value for computeMaxSize
        router.push(
          {
            query: {
              ...router.query,
              computeMaxSize: 48
            }
          },
          undefined,
          { shallow: true }
        )
      }

      if (
        computeMinSize > computeMaxSize &&
        computeMinSize !== computeMaxSize
      ) {
        setMemoryError(
          'Please make sure that minimum size is less than max size.'
        )
      }
    }

    //Find the right region for pricing
    //We have to check the provider as m3ter returns gcp region names prepended with gcp-XXXX
    const regionToCheckPricing =
      provider.toLowerCase() === 'gcp' ? `gcp-${region}` : region
    const matchingPricingPlans = pricingPlansFromFile.filter(
      (plan) =>
        plan.instanceTier.toLowerCase() === tier.toLowerCase() &&
        plan.region.toLowerCase() === regionToCheckPricing &&
        plan.cloudProvider.toLowerCase() === provider.toLowerCase()
    )

    if (matchingPricingPlans.length > 0) {
      // Initialize variables to store the compute and storage unit prices
      let computeUnitPrice = 0
      let storageUnitPrice = 0

      // Iterate through matching pricing plans
      matchingPricingPlans.forEach((matchingPlan) => {
        // Check if the aggregationId matches config.computeAggregationId
        if (matchingPlan.aggregationId === config.computeAggregationId) {
          // Get the computeUnitPrice for this matching plan
          computeUnitPrice = matchingPlan.pricingBands[0].unitPrice
        }

        // Check if the aggregationId matches config.storageAggregationId
        if (matchingPlan.aggregationId === config.storageAggregationId) {
          // Get the storageUnitPrice for this matching plan
          storageUnitPrice = matchingPlan.pricingBands[0].unitPrice
        }
      })
      console.log({ computeUnitPrice, storageUnitPrice })
      // Set pricingData with the computed unit prices
      setPricingData({ computeUnitPrice, storageUnitPrice })
      setIsLoading(false)
    } else {
      console.log('No matching pricing plans found for the specified criteria.')
      setIsLoading(false)
    }
    setIsLoading(false)
    if (costData) {
      if (tier === 'Production') {
        if (
          costData.minComputeCost &&
          costData.maxComputeCost &&
          costData.storageCost &&
          (costData.minComputeCost + costData.storageCost > 2000 ||
            costData.maxComputeCost + costData.storageCost > 2000)
        ) {
          setContactSales('Contact sales for pricing') // Set contactSales if the combined cost exceeds 2000
        } else {
          setContactSales(undefined)
        }
      }
    }
  }, [tier, provider, region, hours, storage, computeMinSize, computeMaxSize])

  const storageAfterCompression = storage / 10

  const costData = useMemo(() => {
    if (!pricingData) {
      return undefined
    }

    if (tier === 'Development') {
      // Single compute cost based on 16GiB RAM
      return {
        computeCost: calculateComputeCost(
          pricingData.computeUnitPrice,
          16,
          hours
        ),
        storageCost: calculateStorageCost(
          pricingData.storageUnitPrice,
          storageAfterCompression
        )
      }
    } else {
      // Two compute costs for the range of sizes.
      return {
        minComputeCost: calculateComputeCost(
          pricingData.computeUnitPrice,
          computeMinSize,
          hours
        ),
        maxComputeCost: calculateComputeCost(
          pricingData.computeUnitPrice,
          computeMaxSize,
          hours
        ),
        storageCost: calculateStorageCost(
          pricingData.storageUnitPrice,
          storageAfterCompression
        )
      }
    }
  }, [
    computeMinSize,
    computeMaxSize,
    storageAfterCompression,
    hours,
    tier,
    pricingData
  ])

  return (
    <div className={styles.wrapper}>
      <div className={styles.options}>
        <FormControl label='Service type'>
          <ToggleButtons options={tierOptions} value={tier} />
        </FormControl>

        <FormControl label='Cloud provider'>
          <ToggleButtonsProviders options={providerOptions} value={provider} />
        </FormControl>

        <FormControl label='Region'>
          <PricingOptions
            selectorOnly={true}
            pricingByRegion={pricingByRegion}
            cloudProviders={cloudProviders}
            pricingPlans={pricingPlans}
          />
        </FormControl>

        <FormControl
          label='Active hours per day'
          tooltip='We idle your service when it’s inactive, saving you on cost.'>
          <RangeSlider value={hours} />
        </FormControl>

        <FormControl
          label='Data volume'
          tooltip='Uncompressed volume data. We compress your data before we store it with a 10x estimated compression rate.'
          helpText={`${storageAfterCompression}GB after compression`}>
          <NumericSelect
            id='storageVolume'
            options={dataOptions}
            value={storage}
          />
        </FormControl>
        {tier === 'Development' && (
          <FormControl
            label='Compute size - not editable in development instances'
            marginBottom={false}>
            <NumericSelect
              id='computeMinSize'
              options={computeOptions.filter(
                (option) => option.tier === 'Development'
              )}
              value={computeMinSize}
              disabled={true}
            />
          </FormControl>
        )}

        {tier === 'Production' && (
          <>
            <div>
              <div className={styles.sizes}>
                <FormControl label='Minimum size' marginBottom={false}>
                  <NumericSelect
                    id='computeMinSize'
                    options={computeOptions.filter(
                      (option) => option.tier === 'Production'
                    )}
                    value={computeMinSize}
                  />
                </FormControl>
                <FormControl label='Maximum size' marginBottom={false}>
                  <NumericSelect
                    id='computeMaxSize'
                    options={computeOptions.filter(
                      (option) => option.tier === 'Production'
                    )}
                    value={computeMaxSize}
                  />
                </FormControl>
              </div>
              {!memoryError &&
              computeMinSize !== computeMaxSize &&
              tier === 'Production' ? (
                <div className='mt-3 text-xs'>
                  Your service will autoscale between {computeMinSize}GiB and{' '}
                  {computeMaxSize}GiB of RAM depending on your workload
                </div>
              ) : (
                <>
                  {!memoryError && (
                    <div className='mt-3 text-xs'>
                      Your service will be pinned at {computeMinSize}GiB
                    </div>
                  )}
                </>
              )}

              <div className='mt-3 text-xs'>{memoryError && memoryError}</div>
            </div>
          </>
        )}
      </div>
      <div className={styles.costs}>
        {isLoading ? (
          <p className='text-center'>Loading, please wait…</p>
        ) : (
          <div>
            <p className='font-inconsolata text-lg text-primary-300'>
              Average price per month
            </p>
            {costData && (
              <div className='mt-2'>
                {tier === 'Development' ? (
                  <React.Fragment>
                    <p className='mb-8 font-basier text-[60px] font-bold text-white'>
                      $
                      {(costData.computeCost! + costData.storageCost).toFixed(
                        0
                      )}
                    </p>
                    <CTAButtons
                      computeCostMin={Number(costData.computeCost?.toFixed(2))}
                      storageCost={Number(costData.storageCost?.toFixed(2))}
                      minMemory={Number(computeMinSize)}
                      maxMemory={computeMaxSize}
                      storageSize={Number(storageAfterCompression)}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {contactSales && (
                      <>
                        <p className='mb-2 font-basier text-[60px] font-bold text-white'>
                          Contact us
                        </p>
                        <p className='mb-8 text-base text-[#B3B6BD]'>
                          You’re eligible for custom quotes.
                          <br />
                          Contact us for more details.
                        </p>
                      </>
                    )}
                    {!contactSales && (
                      <p className='mb-8 font-basier text-[60px] font-bold text-white'>
                        $
                        {(
                          costData.minComputeCost! + costData.storageCost
                        ).toFixed(0)}{' '}
                        {(
                          costData.minComputeCost! + costData.storageCost
                        ).toFixed(0) !==
                          (
                            costData.maxComputeCost! + costData.storageCost
                          ).toFixed(0) && (
                          <>
                            - $
                            {(
                              costData.maxComputeCost! + costData.storageCost
                            ).toFixed(0)}
                          </>
                        )}
                      </p>
                    )}

                    <CTAButtons
                      contactSales={contactSales}
                      tier={tier}
                      computeCostMin={Number(
                        costData.minComputeCost!.toFixed(2)
                      )}
                      computeCostMax={Number(
                        costData.maxComputeCost!.toFixed(2)
                      )}
                      storageCost={costData.storageCost}
                    />
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
