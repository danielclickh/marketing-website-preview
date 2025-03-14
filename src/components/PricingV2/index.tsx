import PricingV2ContextProvider, { Values } from '../PricingV2ContextProvider'
import Estimator from './parts/Estimator'
import Table from './parts/Table'
import {
  PricingV2EntryCompute,
  PricingV2EntryPlan,
  PricingV2EntryProvider
} from '@/lib/api/strapi/types'
import { throttle } from 'lodash'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useCallback } from 'react'

export interface PricingV2Props {
  plans: Array<PricingV2EntryPlan>
  providers: Array<PricingV2EntryProvider>
  computes: Array<PricingV2EntryCompute>

  requestParams?: ParsedUrlQuery

  beforeTableFilters?: React.ReactNode
  afterTableFilters?: React.ReactNode
  inbetweenContent?: React.ReactNode
}

export default function PricingV2({
  plans,
  providers,
  computes,
  requestParams,
  beforeTableFilters,
  afterTableFilters,
  inbetweenContent
}: PricingV2Props) {
  const router = useRouter()

  const cleanUrlParam = (param: string | string[] | undefined) => {
    if (Array.isArray(param)) param = param[0]
    if (!param) return null
    if (param.match(/^\d+$/)) return Number(param)
    param = decodeURI(param).trim()
    if (param.toLowerCase() === 'true') return true
    if (param.toLowerCase() === 'false') return false
    return param
  }

  const urlPlan = cleanUrlParam(requestParams?.plan)
  const urlProvider = cleanUrlParam(requestParams?.provider)
  const urlRegion = cleanUrlParam(requestParams?.region)
  const urlUseCase = cleanUrlParam(requestParams?.useCase)
  const urlHours = cleanUrlParam(requestParams?.hours)
  const urlComputeMinSize = cleanUrlParam(requestParams?.computeMinSize)
  const urlComputeMaxSize = cleanUrlParam(requestParams?.computeMaxSize)
  const urlReplicas = cleanUrlParam(requestParams?.replicas)
  const urlStorageUnit = cleanUrlParam(requestParams?.storageUnit)
  const urlStorageSize = cleanUrlParam(requestParams?.storageSize)
  const urlStorageCompressed = cleanUrlParam(requestParams?.storageCompressed)

  const urlBackupFrequency = cleanUrlParam(requestParams?.backupFrequency)
  const urlBackupRetention = cleanUrlParam(requestParams?.backupRetention)
  const urlFullBackupUnit = cleanUrlParam(requestParams?.fullBackupUnit)
  const urlFullBackupSize = cleanUrlParam(requestParams?.fullBackupSize)
  const urlDataSources = cleanUrlParam(requestParams?.dataSources)
  const urlDataTransfers = cleanUrlParam(requestParams?.dataTransfers)

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
    storageUnit:
      urlStorageUnit === 'gb' ||
      urlStorageUnit === 'tb' ||
      urlStorageUnit === 'pb'
        ? urlStorageUnit
        : null,
    storageSize: typeof urlStorageSize === 'number' ? urlStorageSize : null,
    storageCompressed:
      typeof urlStorageCompressed === 'boolean' ? urlStorageCompressed : null
  }

  // Update URL when pricing values have changed
  const onChangeHandler = useCallback(
    throttle((values: Values) => {
      let queryChanged = false
      let modifiedQuery = { ...router.query }

      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          if (value !== modifiedQuery[key]) {
            queryChanged = true
            modifiedQuery[key] = value.toString()
          }
        } else {
          queryChanged = true
          delete modifiedQuery[key]
        }
      })

      // Store values in the URL
      if (queryChanged) {
        const newUrl = new URL(window.location.toString())
        Object.entries(modifiedQuery)
          .reverse()
          .forEach(([key, value]) => {
            newUrl.searchParams.set(key, value?.toString() || '')
          })

        // We use the native API because of a bug where the nextjs
        // `router.replace(...)` causes all iframes on the page to reload
        window.history.replaceState(null, '', newUrl.toString())
      }
    }, 200),
    [router.query]
  )

  return (
    <PricingV2ContextProvider
      data={{ plans, providers, computes }}
      startingValues={startingValues}
      onChange={onChangeHandler}>
      <Table
        beforeFilters={beforeTableFilters}
        afterFilters={afterTableFilters}
      />
      {inbetweenContent}
      <Estimator />
    </PricingV2ContextProvider>
  )
}
