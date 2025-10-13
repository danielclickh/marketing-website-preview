'use client'

import pricingPlansFromFile from '../../../public/pricingFile.json'
import HRSeparator from '../HRSeparator'
import PricingOptions from '../PricingOptions'
import { SuiTitle } from '../sui'
import CTAButtons from './CTAButtons'
import {
  acceptableRegions,
  computeOptions,
  config,
  PricingData,
  providerOptions,
  storageUnitOptionsTiered
} from './CalculatorTypesOptions'
import styles from './CostCalculator.module.scss'
import { FormControl } from './ui/FormControl'
import { NumericSelect } from './ui/NumericSelect'
import RadioGroupComponent from './ui/Radio/Radio'
import { RangeSlider } from './ui/RangeSlider'
import { Select } from './ui/Select'
import { Text } from './ui/Text'
import { ToggleButtons } from './ui/ToggleButtons'
import { ToggleButtonsProviders } from './ui/ToggleButtonsProviders'
import { calculateComputeCost, calculateStorageCost } from '@/lib/m3ter/costs'
import {
  CloudProviderType,
  PricingPlanData,
  RegionPricing
} from '@/types/pricing'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'

function convertStorageToGB(
  size: number,
  unit: string,
  storageCompressed: string
) {
  const unitToGB: { [key: string]: number } = {
    gb: 1,
    tb: 1024,
    pb: 1024 * 1024
  }

  if (storageCompressed === 'no') {
    return Number(size * unitToGB[unit]) / 10
  } else {
    return Number(size * unitToGB[unit])
  }
}

function humanReadableStorage(
  size: number,
  unit: string,
  storageCompressed: string
) {
  const unitToGB: { [key: string]: number } = {
    gb: 1,
    tb: 1024,
    pb: 1024 * 1024
  }

  if (storageCompressed === 'no') {
    return Number(size) / 10
  } else {
    return Number(size)
  }
}

const PricingCalculator: React.FC<{
  pricingByRegion: RegionPricing[]
  cloudProviders: CloudProviderType[]
  pricingPlans: PricingPlanData[]
  afterPricingSelector?: React.ReactNode
  afterPricingTable?: React.ReactNode
}> = ({
  pricingByRegion,
  cloudProviders,
  pricingPlans,
  afterPricingSelector,
  afterPricingTable
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isMounted = useRef(false)

  const tier = searchParams?.get('tier') || 'Production'
  const provider = searchParams?.get('provider') || 'aws'
  const region = searchParams?.get('region') || 'us-east-1'

  const tierOptions = useMemo(() => {
    if (region === 'ap-northeast-1' || provider === 'azure') {
      // If the region is ap-northeast-1, only include 'Production' in tier options
      return [{ label: 'Production', value: 'Production' }]
    } else {
      // For other regions, include all tier options
      return [
        { label: 'Production', value: 'Production' },
        { label: 'Development', value: 'Development' }
      ]
    }
  }, [region])

  let hours = 8
  const hoursParam = searchParams?.get('hours') || null
  if (hoursParam !== null) {
    hours = Number(hoursParam)
  }
  const computeMinSize =
    Number(searchParams?.get('computeMinSize') || '24') || 24
  const computeMaxSize =
    Number(searchParams?.get('computeMaxSize') || '48') || 48

  const storageSizeParam = searchParams?.get('storageSize') || null
  const storageCompressed = searchParams?.get('storageCompressed') || 'no'

  let storageSize: number

  if (storageSizeParam === null) {
    storageSize = 500
  } else {
    const parsedStorageSize = Number(storageSizeParam)

    if (parsedStorageSize === 0) {
      storageSize = 0
    } else {
      storageSize = parsedStorageSize
    }
  }

  const storageUnit = searchParams?.get('storageUnit')?.toLowerCase() || 'gb'

  //for passing to the tables
  const [storagePricingDev, setStoragePricingDev] = useState<
    number | undefined
  >(undefined)

  const [computePricingDev, setComputePricingDev] = useState<
    number | undefined
  >(undefined)
  const [storagePricingProd, setStoragePricingProd] = useState<
    number | undefined
  >(undefined)
  const [computePricingProd, setComputePricingProd] = useState<
    number | undefined
  >(undefined)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pricingData, setPricingData] = useState<PricingData | undefined>()
  const [memoryError, setMemoryError] = useState<string | undefined>(undefined)
  const [contactSales, setContactSales] = useState<string | undefined>(
    undefined
  )
  const [priceRangeTextSize, setPriceRangeTextSize] = useState<
    number | undefined
  >(undefined)

  //for events
  useEffect(() => {
    //ga event
    if (isMounted.current) {
      let timeoutId = setTimeout(() => {
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'pricingCalculatorNewConfiguration',
            referrer: window.document.referrer,
            tier: tier,
            provider: provider,
            region: region,
            hours: hours,
            storageVolume: storageSize,
            storageUnit: storageUnit,
            storageCompressed: storageCompressed,
            minimumCompute: computeMinSize,
            maximumCompute: computeMaxSize,
            url: window.location.href
          })
        }
      }, 5000)
      return () => {
        clearTimeout(timeoutId)
      }
    } else {
      // Component is mounting for the first time
      isMounted.current = true
    }
  }, [
    tier,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    storageUnit,
    storageSize,
    storageCompressed
  ])

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

    //update dev to prod on ap-northeast-1
    if (
      (region === 'ap-northeast-1' && tier === 'Development') ||
      (provider === 'azure' && tier === 'Development')
    ) {
      router.push(
        {
          query: {
            ...router.query,
            tier: 'Production' // Set your default value here
          }
        },
        undefined,
        { shallow: true }
      )
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

    //make sure storage is 4 digits or less
    if (storageSize.toString().length > 4) {
      router.push(
        {
          query: {
            ...router.query,
            storageSize: 500 // Set your default value here
          }
        },
        undefined,
        { shallow: true }
      )
    }

    if (tier === 'Development' && storageUnit === 'tb' && storageSize > 10) {
      router.push(
        {
          query: {
            ...router.query,
            storageSize: 10
          }
        },
        undefined,
        { shallow: true }
      )
    }

    if (!['yes', 'no'].includes(storageCompressed)) {
      router.push(
        {
          query: {
            ...router.query,
            storageCompressed: 'no' // Set your default value here
          }
        },
        undefined,
        { shallow: true }
      )
    }

    if (tier === 'Development' && storageUnit.toLowerCase() === 'pb') {
      router.push(
        {
          query: {
            ...router.query,
            storageUnit: 'tb'
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

      if (storageSize < 0) {
        router.push(
          {
            query: {
              ...router.query,
              storageSize: 0
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

      //if min size is greater than max, then set max to match
      if (
        computeMinSize > computeMaxSize &&
        computeMinSize !== computeMaxSize
      ) {
        router.push(
          {
            query: {
              ...router.query,
              computeMaxSize: computeMinSize
            }
          },
          undefined,
          { shallow: true }
        )
        setMemoryError(
          'Please make sure that minimum size is less than max size.'
        )
      }
    }

    //Find the right region for pricing
    //We have to check the provider as m3ter returns gcp region names prepended with gcp-XXXX
    const regionToCheckPricing =
      provider.toLowerCase() === 'gcp'
        ? `gcp-${region}`
        : provider.toLowerCase() === 'azure'
          ? `azure-${region}`
          : region

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
      // Set pricingData with the computed unit prices
      setPricingData({ computeUnitPrice, storageUnitPrice })

      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
    setIsLoading(false)
    //this passes the pricing to the tables at the top of the page
    const matchingPricingPlansForTable = pricingPlansFromFile.filter(
      (plan) =>
        plan.region.toLowerCase() === regionToCheckPricing &&
        plan.cloudProvider.toLowerCase() === provider.toLowerCase()
    )

    if (matchingPricingPlansForTable.length > 0) {
      // Iterate through matching pricing plans
      matchingPricingPlansForTable.forEach((matchingPlan) => {
        // Check if the aggregationId matches config.computeAggregationId
        if (matchingPlan.aggregationId === config.computeAggregationId) {
          // Get the computeUnitPrice for this matching plan
          if (matchingPlan.instanceTier === 'Production') {
            setComputePricingProd(matchingPlan.pricingBands[0].unitPrice)
          }
          if (matchingPlan.instanceTier === 'Development') {
            setComputePricingDev(matchingPlan.pricingBands[0].unitPrice)
          }
        }

        // Check if the aggregationId matches config.storageAggregationId
        if (matchingPlan.aggregationId === config.storageAggregationId) {
          // Get the storageUnitPrice for this matching plan
          if (matchingPlan.instanceTier === 'Production') {
            setStoragePricingProd(matchingPlan.pricingBands[0].unitPrice)
          }
          if (matchingPlan.instanceTier === 'Development') {
            setStoragePricingDev(matchingPlan.pricingBands[0].unitPrice)
          }
        }
      })
    }
    if (costData) {
      const priceRange = document.getElementById('price-range')
      if (priceRange) {
        setPriceRangeTextSize(priceRange.innerText.length)
      }
      if (tier === 'Production') {
        if (
          (costData.minComputeCost &&
            costData.maxComputeCost &&
            costData.storageCost &&
            costData.minComputeCost + costData.storageCost > 5000) ||
          (costData.minComputeCost === 0 && costData.storageCost > 5000)
        ) {
          setContactSales('Contact sales for pricing') // Set contactSales if the combined cost exceeds 5000
        } else {
          setContactSales(undefined)
        }
      }
      if (tier === 'Development') {
        if (
          (costData.computeCost &&
            costData.computeCost + costData.storageCost > 5000) ||
          (costData.computeCost === 0 && costData.storageCost > 5000)
        ) {
          setContactSales('Contact sales for pricing') // Set contactSales if the combined cost exceeds 5000
        } else {
          setContactSales(undefined)
        }
      }
    }
  }, [
    tier,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    storageUnit,
    storageSize,
    storageCompressed
  ])

  const storageAfterCompression = convertStorageToGB(
    storageSize,
    storageUnit,
    storageCompressed
  )

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
    <div>
      {pricingByRegion.length > 0 && (
        <PricingOptions
          computeCostDev={computePricingDev}
          storageCostDev={storagePricingDev}
          computeCostProd={computePricingProd}
          storageCostProd={storagePricingProd}
          pricingByRegion={pricingByRegion}
          cloudProviders={cloudProviders}
          pricingPlans={pricingPlans}
          afterPricingSelector={afterPricingSelector}
          afterPricingTable={afterPricingTable}
        />
      )}
      <HRSeparator className='mt-10 max-w-[384px] pb-10' />
      <div id='pricing-calculator'>
        <SuiTitle type='h2' className='pb-16 text-center'>
          Estimate your monthly&nbsp;cost
        </SuiTitle>

        <div className='mx-auto max-w-5xl px-4 sm:px-8 xl:px-0'>
          <div className='flex flex-col items-start gap-x-12 lg:flex-row'>
            <div className={styles.options}>
              <FormControl label='Service type'>
                <ToggleButtons options={tierOptions} value={tier} />
              </FormControl>
              <FormControl label='Cloud provider'>
                <ToggleButtonsProviders
                  options={providerOptions}
                  value={provider}
                />
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

              {/* === START new storage options  */}
              {/* need to convert to gbs */}
              <div className='relative'>
                <div className='grid grid-cols-4 gap-6'>
                  <div className='col-span-2 md:col-span-1'>
                    <FormControl
                      id='storageSize'
                      label='Storage Volume'
                      marginBottom={false}>
                      <Text id='storageVolume' value={storageSize} />
                    </FormControl>
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <FormControl
                      id='storageUnit'
                      label='Storage Unit'
                      marginBottom={false}>
                      {tier && (
                        <Select
                          id='storageUnit'
                          options={storageUnitOptionsTiered.filter((option) => {
                            if (option.tier.includes(tier)) {
                              return option
                            }
                          })}
                          value={storageUnit}
                        />
                      )}
                    </FormControl>
                  </div>
                  <div className='col-span-4 mb-4 md:col-span-2'>
                    <FormControl
                      id='storageRadioButtons'
                      label='Is your data compressed?'
                      tooltip='If your data is not compressed, ClickHouse will apply up to 10x compression.'
                      marginBottom={false}>
                      <RadioGroupComponent value={storageCompressed} />
                    </FormControl>
                  </div>
                </div>
                <div
                  className={` ${
                    storageCompressed === 'no' ? 'text-[#66FF73]' : 'text-white'
                  } mb-10 mt-3 text-xs`}>
                  {storageCompressed === 'no' ? (
                    <p>
                      {humanReadableStorage(
                        storageSize,
                        storageUnit,
                        storageCompressed
                      )}
                      {storageUnit.toUpperCase()} after compression
                    </p>
                  ) : (
                    <p>No compression applied</p>
                  )}
                </div>
              </div>
              {/* === END new storage options  */}
              {tier === 'Development' && (
                <FormControl
                  label='Compute size'
                  id='computeSizeDevTooltipTrigger'
                  marginBottom={true}
                  helpText='Development services do not auto-scale'
                  tooltip='Development services have a fixed size of 16 GiB RAM, 2 vCPUs and cannot be edited'>
                  <NumericSelect
                    id='computeMinSize'
                    options={computeOptions.filter((option) => {
                      if (option.tier) {
                        return option.tier.includes('Development')
                      }
                    })}
                    value={computeMinSize}
                    disabled={true}
                  />
                </FormControl>
              )}
              {tier === 'Production' && (
                <>
                  <div className='mb-10'>
                    <div className={styles.sizes}>
                      <FormControl
                        label='Minimum compute size'
                        marginBottom={false}>
                        <NumericSelect
                          id='computeMinSize'
                          options={computeOptions.filter((option) => {
                            if (option.tier) {
                              return option.tier.includes('Production')
                            }
                          })}
                          value={computeMinSize}
                        />
                      </FormControl>
                      <FormControl
                        label='Maximum compute size'
                        marginBottom={false}>
                        <NumericSelect
                          id='computeMaxSize'
                          options={computeOptions.filter((option) => {
                            if (option.tier) {
                              return option.tier.includes('Production')
                            }
                          })}
                          value={computeMaxSize}
                        />
                      </FormControl>
                    </div>
                    {!memoryError &&
                    computeMinSize !== computeMaxSize &&
                    tier === 'Production' ? (
                      <div className='mt-3 text-xs'>
                        Your service will autoscale between {computeMinSize}GiB
                        and {computeMaxSize}GiB of RAM depending on your
                        workload
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

                    <div className='mt-3 text-xs'>
                      {memoryError && memoryError}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.costs}>
              {isLoading ? (
                <p className='text-center'>Loading, please wait…</p>
              ) : (
                <div>
                  <p className='mb-4 font-inconsolata text-lg text-primary-300'>
                    Average price per month
                  </p>
                  {costData && (
                    <div>
                      {tier === 'Development' ? (
                        <React.Fragment>
                          <p className='mb-2 break-words font-basier text-[50px] font-bold leading-[84px] text-white'>
                            $
                            {Number(
                              (
                                costData.computeCost! + costData.storageCost
                              ).toFixed(0)
                            ).toLocaleString('en-US')}
                          </p>
                          {contactSales && (
                            <>
                              <p className='mb-8 text-base text-[#B3B6BD]'>
                                You’re eligible for custom terms.
                                <br />
                                Contact us for more details.
                              </p>
                            </>
                          )}
                          <CTAButtons
                            contactSales={contactSales}
                            storageUnit={storageUnit}
                            storageHumanReadable={humanReadableStorage(
                              storageSize,
                              storageUnit,
                              storageCompressed
                            )}
                            tier={tier}
                            provider={provider}
                            region={region}
                            hours={hours}
                            computeCostMin={Number(
                              costData.computeCost?.toFixed(2)
                            )}
                            storageCost={Number(
                              costData.storageCost?.toFixed(2)
                            )}
                            minMemory={Number(computeMinSize)}
                            maxMemory={computeMaxSize}
                            storageSize={Number(storageAfterCompression)}
                            storageCompressed={storageCompressed}
                            minMemoryLabel={
                              computeOptions.find(
                                (option) => option.value === computeMinSize
                              )?.label || ''
                            }
                            maxMemoryLabel={
                              computeOptions.find(
                                (option) => option.value === computeMaxSize
                              )?.label || ''
                            }
                            pricingData={pricingData}
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <p
                            className={`${
                              priceRangeTextSize && priceRangeTextSize <= 15
                                ? 'text-[30px] leading-[54px] md:text-[50px] md:leading-[84px]'
                                : priceRangeTextSize && priceRangeTextSize <= 23
                                  ? 'text-[30px] leading-[54px] md:text-[32px] md:leading-[66px]'
                                  : priceRangeTextSize &&
                                      priceRangeTextSize <= 24
                                    ? 'text-[30px] leading-[54px] md:text-[35px] md:leading-[69px]'
                                    : priceRangeTextSize &&
                                        priceRangeTextSize <= 25
                                      ? 'text-[30px] leading-[54px] md:text-[30px] md:leading-[64px]'
                                      : priceRangeTextSize &&
                                          priceRangeTextSize <= 30
                                        ? 'text-[30px] leading-[54px] md:text-[28px] md:leading-[62px]'
                                        : 'text-[30px] leading-[54px] md:text-[50px] md:leading-[84px]'
                            } mb-2 break-words font-basier font-bold text-white`}
                            id='price-range'>
                            $
                            {Number(
                              (
                                costData.minComputeCost! + costData.storageCost
                              ).toFixed(0)
                            ).toLocaleString('en-US')}{' '}
                            {(
                              costData.minComputeCost! + costData.storageCost
                            ).toFixed(0) !==
                              (
                                costData.maxComputeCost! + costData.storageCost
                              ).toFixed(0) && (
                              <>
                                - $
                                {Number(
                                  (
                                    costData.maxComputeCost! +
                                    costData.storageCost
                                  ).toFixed(0)
                                ).toLocaleString('en-US')}
                              </>
                            )}
                          </p>
                          {contactSales && (
                            <>
                              <p className='mb-8 text-base text-[#B3B6BD]'>
                                You’re eligible for custom terms.
                                <br />
                                Contact us for more details.
                              </p>
                            </>
                          )}

                          <CTAButtons
                            contactSales={contactSales}
                            storageUnit={storageUnit}
                            storageHumanReadable={humanReadableStorage(
                              storageSize,
                              storageUnit,
                              storageCompressed
                            )}
                            tier={tier}
                            hours={hours}
                            region={region}
                            provider={provider}
                            minMemory={computeMinSize}
                            maxMemory={computeMaxSize}
                            storageSize={Number(storageAfterCompression)}
                            storageCompressed={storageCompressed}
                            computeCostMin={Number(
                              costData.minComputeCost!.toFixed(2)
                            )}
                            computeCostMax={Number(
                              costData.maxComputeCost!.toFixed(2)
                            )}
                            storageCost={costData.storageCost}
                            minMemoryLabel={
                              computeOptions.find(
                                (option) => option.value === computeMinSize
                              )?.label || ''
                            }
                            maxMemoryLabel={
                              computeOptions.find(
                                (option) => option.value === computeMaxSize
                              )?.label || ''
                            }
                            pricingData={pricingData}
                          />
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCalculator
