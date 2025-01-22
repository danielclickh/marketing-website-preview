import { throttle } from 'lodash'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useCallback } from 'react'
import {
  PricingV2EntryCompute,
  PricingV2EntryPlan,
  PricingV2EntryProvider
} from '../../lib/api/strapi/types'
import PricingV2ContextProvider, { Values } from '../PricingV2ContextProvider'
import Estimator from './parts/Estimator'
import Table from './parts/Table'

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

  const defaultValues: Values = {
    plan: 'basic',
    provider: 'aws',
    region: 'us-east-1',
    hours: 8,
    computeMinSize: 8,
    computeMaxSize: 8,
    replicas: 1,
    storageUnit: 'gb',
    storageSize: 500,
    storageCompressed: false
  }

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
  const urlHours = cleanUrlParam(requestParams?.hours)
  const urlComputeMinSize = cleanUrlParam(requestParams?.computeMinSize)
  const urlComputeMaxSize = cleanUrlParam(requestParams?.computeMaxSize)
  const urlReplicas = cleanUrlParam(requestParams?.replicas)
  const urlStorageUnit = cleanUrlParam(requestParams?.storageUnit)
  const urlStorageSize = cleanUrlParam(requestParams?.storageSize)
  const urlStorageCompressed = cleanUrlParam(requestParams?.storageCompressed)

  // Combine URL and default values
  const startingValues: Values = {
    plan: urlPlan?.toString() || defaultValues.plan,
    provider: urlProvider?.toString() || defaultValues.provider,
    region: urlRegion?.toString() || defaultValues.region,
    hours: typeof urlHours === 'number' ? urlHours : defaultValues.hours,
    computeMinSize:
      typeof urlComputeMinSize === 'number'
        ? urlComputeMinSize
        : defaultValues.computeMinSize,
    computeMaxSize:
      typeof urlComputeMaxSize === 'number'
        ? urlComputeMaxSize
        : defaultValues.computeMaxSize,
    replicas:
      typeof urlReplicas === 'number' ? urlReplicas : defaultValues.replicas,
    storageUnit:
      urlStorageUnit === 'gb' ||
      urlStorageUnit === 'tb' ||
      urlStorageUnit === 'pb'
        ? urlStorageUnit
        : defaultValues.storageUnit,
    storageSize:
      typeof urlStorageSize === 'number'
        ? urlStorageSize
        : defaultValues.storageSize,
    storageCompressed:
      typeof urlStorageCompressed === 'boolean'
        ? urlStorageCompressed
        : defaultValues.storageCompressed
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
