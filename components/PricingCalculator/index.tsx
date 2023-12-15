import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  calculateComputeCost,
  calculateStorageCost
} from '../../lib/m3ter/costs'
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
import { ToggleButtonsProviders } from './ui/ToggleButtonsProviders'
import PricingOptions from '../PricingOptions'
import CTAButtons from './CTAButtons'

import styles from './CostCalculator.module.scss'

import pricingPlansFromfile from '../../public/pricingFile.json'
import { useSearchParams } from 'next/navigation'
import { max } from 'lodash'

type Tier = 'Development' | 'Production'
type Provider = 'aws' | 'gcp'
interface PricingData {
  computeUnitPrice: number
  storageUnitPrice: number
}

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
  { value: 24, label: '24 GiB RAM, 6 vCPU' },
  { value: 48, label: '48 GiB RAM, 12 vCPU' },
  { value: 96, label: '96 GiB RAM, 24 vCPU' }
]

export const PricingCalculator: React.FC<{
  pricingByRegion: RegionPricing[]
  cloudProviders: CloudProviderType[]
  pricingPlans: PricingPlanData[]
}> = ({ pricingByRegion, cloudProviders, pricingPlans }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tier = searchParams.get('tier') || 'Development'
  const provider = searchParams.get('provider') || 'aws'
  const region = searchParams.get('region') || 'eu-west-1'
  const hours = Number(searchParams.get('hours'))
  const storage = Number(searchParams.get('storage')) || 500
  const minCompute = Number(searchParams.get('minCompute')) || 24
  const maxCompute = Number(searchParams.get('maxCompute')) || 48

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pricingData, setPricingData] = useState<PricingData | undefined>()

  useEffect(() => {
    setIsLoading(true)

    console.log('State: ', {
      tier,
      provider,
      region,
      hours,
      storage,
      minCompute,
      maxCompute
    })

    //make sure only accepted tiers
    if (!['Development', 'Production'].includes(tier)) {
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

    //make sure only accepted providers
    if (!['aws', 'gcp'].includes(provider)) {
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

    //make sure only accepted regions

    //make sure number isn't over 24 hrs
    if (hours > 24) {
      router.push(
        {
          query: {
            ...router.query,
            hours: 24
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

    // Load the data whenever the provider, region or tier change.
    const m3terQuery = new URLSearchParams({
      provider,
      region,
      tier
    })

    setIsLoading(false)
  }, [tier, provider, region, hours, storage, minCompute, maxCompute])

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
          minCompute,
          hours
        ),
        maxComputeCost: calculateComputeCost(
          pricingData.computeUnitPrice,
          maxCompute,
          hours
        ),
        storageCost: calculateStorageCost(
          pricingData.storageUnitPrice,
          storageAfterCompression
        )
      }
    }
  }, [
    minCompute,
    maxCompute,
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
          <p className='mt-2 text-xs'>
            This region does not have a development service, please choose
            another.
          </p>
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

        {tier === 'Production' && (
          <>
            <div className={styles.sizes}>
              <FormControl label='Minimum size'>
                <NumericSelect
                  id='computeMinSize'
                  options={computeOptions}
                  value={minCompute}
                />
              </FormControl>
              <FormControl label='Maximum size'>
                <NumericSelect
                  id='computeMaxSize'
                  options={computeOptions}
                  value={maxCompute}
                />
              </FormControl>
            </div>
          </>
        )}
      </div>
      <div className={styles.costs}>
        {isLoading ? (
          <p>Loading, please wait…</p>
        ) : (
          <div>
            <p className='pb-1 font-inconsolata text-lg text-primary-300'>
              Average price per month
            </p>
            {costData && (
              <div>
                {tier === 'Development' ? (
                  <React.Fragment>
                    <p className={styles.total}>
                      $
                      {(costData.computeCost! + costData.storageCost).toFixed(
                        0
                      )}
                    </p>
                    <CTAButtons
                      computeCostMin={Number(costData.computeCost?.toFixed(2))}
                      storageCost={Number(costData.storageCost?.toFixed(2))}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p className={styles.total}>
                      $
                      {(
                        costData.minComputeCost! + costData.storageCost
                      ).toFixed(0)}{' '}
                      - $
                      {(
                        costData.maxComputeCost! + costData.storageCost
                      ).toFixed(0)}
                    </p>

                    <CTAButtons
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
