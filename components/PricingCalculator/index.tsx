import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  calculateComputeCost,
  calculateStorageCost
} from '../../lib/m3ter/costs'
import { PricingData } from '../../pages/api/pricing-api'
import { CUIButton } from '../ClickUI'
import { FormControl } from '../PricingCalculator/ui/FormControl'
import {
  NumericSelect,
  Option as NumericSelectOption
} from '../PricingCalculator/ui/NumericSelect'
import { RangeSlider } from '../PricingCalculator/ui/RangeSlider'
import { Option as SelectOption, Select } from '../PricingCalculator/ui/Select'
import {
  Option as ToggleOption,
  ToggleButtons
} from '../PricingCalculator/ui/ToggleButtons'
import styles from './CostCalculator.module.scss'

type Tier = 'Development' | 'Production'
type Provider = 'AWS' | 'GCP'

const tierOptions: Array<ToggleOption<Tier>> = [
  { value: 'Development', label: 'Development' },
  { value: 'Production', label: 'Production' }
]

const providerOptions: Array<ToggleOption<Provider>> = [
  { value: 'AWS', label: 'AWS' },
  { value: 'GCP', label: 'GCP' }
]

const regionOptions: Record<Provider, Array<SelectOption>> = {
  AWS: [
    { value: 'eu-west-1', label: 'Ireland (eu-west-1)' },
    { value: 'eu-west-2', label: 'London (eu-west-2)' }
  ],
  GCP: [
    { value: 'gcp-europe-west1', label: 'europe-west1' },
    { value: 'gcp-europe-west2', label: 'europe-west2' }
  ]
}

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

export const PricingCalculator: React.FC = () => {
  const [pricingOverlay, setPricingOverlay] = useState(false)
  const [tier, setTier] = useState<Tier>('Development')
  const [provider, setProvider] = useState<Provider>('AWS')
  const [region, setRegion] = useState<string>('eu-west-1')

  const [hours, setHours] = useState(8)
  const [storage, setStorage] = useState(500)
  const [minCompute, setMinCompute] = useState(24)
  const [maxCompute, setMaxCompute] = useState(48)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pricingData, setPricingData] = useState<PricingData | undefined>()

  const changeProvider = useCallback((newProvider: Provider) => {
    setProvider(newProvider)
    setRegion(regionOptions[newProvider][0].value)
  }, [])

  useEffect(() => {
    // Load the data whenever the provider, region or tier change.
    const query = new URLSearchParams({
      provider,
      region,
      tier
    })
    setIsLoading(true)
    fetch(`/api/pricing-api?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setPricingData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [provider, region, tier])

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
          <ToggleButtons
            options={tierOptions}
            value={tier}
            onChange={setTier}
          />
        </FormControl>

        <FormControl label='Cloud provider'>
          <ToggleButtons
            options={providerOptions}
            value={provider}
            onChange={changeProvider}
          />
        </FormControl>

        <FormControl label='Region'>
          <Select
            options={regionOptions[provider]}
            value={region}
            onChange={setRegion}
          />
        </FormControl>

        <FormControl label='Active hours per day'>
          <RangeSlider min={1} max={24} value={hours} onChange={setHours} />
        </FormControl>

        <FormControl
          label='Data volume'
          helpText={`${storageAfterCompression}GB after compression`}>
          <NumericSelect
            options={dataOptions}
            value={storage}
            onChange={setStorage}
          />
        </FormControl>

        {tier === 'Production' && (
          <div className={styles.sizes}>
            <FormControl label='Minimum size'>
              <NumericSelect
                options={computeOptions}
                value={minCompute}
                onChange={setMinCompute}
              />
            </FormControl>
            <FormControl label='Maximum size'>
              <NumericSelect
                options={computeOptions}
                value={maxCompute}
                onChange={setMaxCompute}
              />
            </FormControl>
          </div>
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
                    <div className='flex flex-col gap-4'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
                        linkClass='w-full'
                        className='w-full'>
                        <span className='text-sm'>Start free trial</span>
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
                        linkClass='w-full'
                        className='w-full'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='lucide lucide-share-2 h-4 w-4'>
                          <circle cx='18' cy='5' r='3' />
                          <circle cx='6' cy='12' r='3' />
                          <circle cx='18' cy='19' r='3' />
                          <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
                          <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
                        </svg>
                        <span className='ml-2 text-sm'>Share</span>
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/company/contact?loc=pricing-calculator'
                        linkClass='w-full'
                        className='w-full'>
                        <span className='text-sm'>Contact us</span>
                      </CUIButton>
                    </div>
                    <ul className='mt-6 flex flex-col gap-y-4 text-left'>
                      <li>
                        <div className='flex items-center gap-4'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                              stroke='#FCFF74'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <p>${costData.storageCost.toFixed(2)} for storage</p>
                        </div>
                      </li>
                      <li>
                        <div className='flex items-center gap-4'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                              stroke='#FCFF74'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>

                          <p>${costData.computeCost!.toFixed(2)} for compute</p>
                        </div>
                      </li>
                      <li>
                        <div className='flex items-center gap-4'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                              stroke='#FCFF74'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className=''>Includes data transfer costs</div>
                        </div>
                      </li>
                      <li>
                        <div className='flex items-center gap-4'>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                              stroke='#FCFF74'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className=''>Includes 2 availability zones</div>
                        </div>
                      </li>
                    </ul>
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
                    <p>${costData.storageCost.toFixed(2)} for storage</p>
                    <p>
                      ${costData.minComputeCost!.toFixed(2)} minimum compute
                      cost
                    </p>
                    <p>
                      ${costData.maxComputeCost!.toFixed(2)} maximum compute
                      cost
                    </p>
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
