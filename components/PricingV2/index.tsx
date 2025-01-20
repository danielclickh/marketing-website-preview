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

  const startingValues: Values = {
    plan: urlPlan?.toString() || null,
    provider: urlProvider?.toString() || null,
    region: urlRegion?.toString() || null,
    hours: typeof urlHours === 'number' ? urlHours : null,
    computeMinSize:
      typeof urlComputeMinSize === 'number' ? urlComputeMinSize : null,
    computeMaxSize:
      typeof urlComputeMaxSize === 'number' ? urlComputeMaxSize : null,
    replicas: typeof urlReplicas === 'number' ? urlReplicas : null,
    storageUnit: urlStorageUnit?.toString() || null,
    storageSize: typeof urlStorageSize === 'number' ? urlStorageSize : null,
    storageCompressed: !!urlStorageCompressed
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
          delete modifiedQuery[key]
        }
      })

      if (queryChanged) {
        router.replace(
          {
            query: modifiedQuery
          },
          undefined,
          { shallow: true, scroll: false }
        )
      }
    }, 200),
    [router]
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
