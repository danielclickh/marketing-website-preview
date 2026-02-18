import Estimator from './parts/Estimator'
import Table from './parts/Table'
import { Values } from './types'
import HRSeparator from '@/components/HRSeparator'
import PricingV2ContextProvider from '@/components/PricingV2ContextProvider'
import type { PricingV2 } from '@/lib/api/strapi/types'
import throttle from 'lodash/throttle'
import { useRouter } from 'next/router'
import { parse, ParsedQs, stringify } from 'qs'
import { ParsedUrlQuery } from 'querystring'
import { useCallback } from 'react'

export interface PricingV2Props {
  data: PricingV2
  requestParams?: ParsedUrlQuery
  beforeTableFilters?: React.ReactNode
  afterTableFilters?: React.ReactNode
  inbetweenContent?: React.ReactNode
  beforeEstimator?: React.ReactNode
}

export default function PricingV2({
  data,
  requestParams,
  beforeTableFilters,
  afterTableFilters,
  inbetweenContent,
  beforeEstimator
}: PricingV2Props) {
  const router = useRouter()

  function cleanUrlParams(
    param: string | string[] | ParsedQs | ParsedQs[] | undefined
  ): any {
    if (!param) return null

    if (Array.isArray(param)) {
      return param.map((param) => cleanUrlParams(param))
    }

    if (typeof param === 'object') {
      return Object.fromEntries(
        Object.entries(param).map(([key, value]) => {
          return [key, cleanUrlParams(value)]
        })
      )
    }

    if (param.match(/^\d+$/)) return Number(param)
    if (param.toLowerCase() === 'true') return true
    if (param.toLowerCase() === 'false') return false

    return param
  }

  const {
    plan: urlPlan,
    provider: urlProvider,
    region: urlRegion,
    useCase: urlUseCase,
    hours: urlHours,
    computeMinSize: urlComputeMinSize,
    computeMaxSize: urlComputeMaxSize,
    replicas: urlReplicas,
    storage: urlStorage,
    storageCompressed: urlStorageCompressed,
    estimateBackup: urlEstimateBackup,
    backupFrequency: urlBackupFrequency,
    backupRetention: urlBackupRetention,
    fullBackup: urlFullBackup,
    incrementalBackup: urlIncrementalBackup,
    clickpipes: urlClickpipes,
    transfers: urlTransfers
  } = cleanUrlParams(parse(stringify(requestParams)))

  // Combine URL and default values
  const startingValues: Partial<Values> = {
    plan: urlPlan?.toString() || null,
    provider: urlProvider?.toString() || null,
    region: urlRegion?.toString() || null,
    useCase: urlUseCase?.toString() || null,
    hours: typeof urlHours === 'number' ? urlHours : null,
    computeMinSize:
      typeof urlComputeMinSize === 'number' ? urlComputeMinSize : null,
    computeMaxSize:
      typeof urlComputeMaxSize === 'number' ? urlComputeMaxSize : null,
    replicas: typeof urlReplicas === 'number' ? urlReplicas : null,
    storage: urlStorage?.toString() || null,
    storageCompressed:
      typeof urlStorageCompressed === 'boolean' ? urlStorageCompressed : null,
    estimateBackup:
      typeof urlEstimateBackup === 'boolean' ? urlEstimateBackup : null,
    backupFrequency:
      typeof urlBackupFrequency === 'number' ? urlBackupFrequency : null,
    backupRetention:
      typeof urlBackupRetention === 'number' ? urlBackupRetention : null,
    fullBackup: urlFullBackup?.toString() || null,
    incrementalBackup: urlIncrementalBackup?.toString() || null,
    clickpipes: Array.isArray(urlClickpipes) ? urlClickpipes : null,
    transfers: Array.isArray(urlTransfers) ? urlTransfers : null
  }

  // Update URL when pricing values have changed
  const onChangeHandler = useCallback(
    throttle((values: Values) => {
      const newUrl = new URL(window.location.toString())

      newUrl.search = stringify(
        { ...newUrl.searchParams, ...values },
        {
          skipNulls: true,
          encodeValuesOnly: true
        }
      )

      // We use the native API because of a bug where the nextjs
      // `router.replace(...)` causes all iframes on the page to reload
      window.history.replaceState(null, '', newUrl.toString())
    }, 200),
    [router.query]
  )

  return (
    <PricingV2ContextProvider
      sourceData={data}
      startingValues={startingValues}
      onChange={onChangeHandler}>
      <Table
        beforeFilters={beforeTableFilters}
        afterFilters={afterTableFilters}
      />
      {inbetweenContent}
      {inbetweenContent && <HRSeparator className='my-16 lg:my-24' />}
      <Estimator before={beforeEstimator} />
    </PricingV2ContextProvider>
  )
}
