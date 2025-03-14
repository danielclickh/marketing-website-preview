import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  PricingV2EntryCompute,
  PricingV2EntryPlan,
  PricingV2EntryProvider,
  PricingV2EntryUseCase
} from '@/lib/api/strapi/types'
import pricingFile from '../../../public/pricingV2File.json'
import config, { PlanConfig } from '../PricingV2/config'

const AVG_DAYS_PER_MONTH = 30.5

export type PricingFileItem = Array<{
  id: string
  aggregationId: string
  description: string
  region: string
  cloudProvider: string
  pricingBands: Array<{
    id: string
    lowerLimit: number
    fixedPrice: number
    unitPrice: number
  }>
}>
export type PricingFile = Record<string, PricingFileItem>

export type StorageUnits = 'gb' | 'tb' | 'pb'

// User values
export type ContextPlan = null | string
export type ContextProvider = null | string
export type ContextRegion = null | string
export type ContextUseCase = null | string
export type ContextHours = null | number
export type ContextComputeMinSize = null | number
export type ContextComputeMaxSize = null | number
export type ContextReplicas = null | number
export type ContextStorageUnit = null | StorageUnits
export type ContextStorageSize = null | number
export type ContextStorageCompressed = null | boolean
export type ContextBackupFrequency = null | 'daily' | 'weekly' | 'monthly'
export type ContextBackupRetention = null | number
export type ContextFullBackupUnit = null | StorageUnits
export type ContextFullBackupSize = null | number
export type ContextIncrementalBackupUnit = null | StorageUnits
export type ContextIncrementalBackupSize = null | number
export type ContextDataSources = null | Array<{
  source: string
  instances: number
  dataIngestedUnit?: StorageUnits
  dataIngestedSize?: number
}>
export type ContextDataTransfers = null | Array<
  | {
      type: 'internet'
      unit: StorageUnits
      size: number
      region: never
    }
  | {
      type: 'inter-region'
      unit: StorageUnits
      size: number
      region: string
    }
>

// Computed values
export type ContextComputeUnitPrice = null | number
export type ContextStorageUnitPrice = null | number
export type ContextComputeMinPrice = null | number
export type ContextComputeMaxPrice = null | number
export type ContextStoragePrice = null | number
export type ContextTotalMinPrice = null | number
export type ContextTotalMaxPrice = null | number
export type ContextTotalPriceRange = [number] | [number, number]

// -----------------------------------
// Helper functions
// -----------------------------------

function getPlanPricingData(planKey: string) {
  return (pricingFile as PricingFile)[planKey]
}

function getPlanPricingConfig(planKey: string) {
  return config.plans[planKey]
}

function validateDataSize(
  size: number,
  unit: StorageUnits,
  maxGb?: number | null
) {
  let sizeInGb = size

  // Convert the size to GB based on the selected unit
  switch (unit) {
    case 'tb':
      sizeInGb = size * 1000 // 1 TB = 1000 GB
      break
    case 'pb':
      sizeInGb = size * 1000 * 1000 // 1 PB = 1000000 GB
      break
  }

  // If maxGb is provided, ensure the size doesn't exceed the maximum allowed
  if (maxGb && sizeInGb > maxGb) {
    sizeInGb = maxGb
  }

  // Determine the best unit based on the size in GB
  let newSize = sizeInGb
  let newUnit: StorageUnits = 'gb'

  // GB value >= 1 PB? Convert to PB
  if (sizeInGb >= 1000 * 1000) {
    newSize = sizeInGb / 1000 / 1000
    newUnit = 'pb'
  }

  // GB value >= 1 TB? Convert to TB
  else if (sizeInGb >= 1000) {
    newSize = sizeInGb / 1000
    newUnit = 'tb'
  }

  return {
    size: newSize,
    unit: newUnit
  }
}

// Full context object
export interface Context {
  // Helper functions
  setValues: (values: Partial<Values>) => void
  getPlanPricingData: (value: string) => undefined | PricingFileItem
  getPlanPricingConfig: (value: string) => undefined | PlanConfig
  validateDataSize: (
    size: number,
    unit: StorageUnits,
    maxGb?: number | null
  ) => { size: number; unit: StorageUnits }

  // Data sources
  plans: Array<PricingV2EntryPlan>
  setPlans: Dispatch<SetStateAction<Array<PricingV2EntryPlan>>>
  providers: Array<PricingV2EntryProvider>
  setProviders: Dispatch<SetStateAction<Array<PricingV2EntryProvider>>>
  computes: Array<PricingV2EntryCompute>
  setComputes: Dispatch<SetStateAction<Array<PricingV2EntryCompute>>>

  // User values
  plan: ContextPlan
  provider: ContextProvider
  region: ContextRegion
  useCase: ContextUseCase
  hours: ContextHours
  computeMinSize: ContextComputeMinSize
  computeMaxSize: ContextComputeMaxSize
  replicas: ContextReplicas
  storageUnit: ContextStorageUnit
  storageSize: ContextStorageSize
  storageCompressed: ContextStorageCompressed
  backupFrequency: ContextBackupFrequency
  backupRetention: ContextBackupRetention
  fullBackupUnit: ContextFullBackupUnit
  fullBackupSize: ContextFullBackupSize
  incrementalBackupUnit: ContextIncrementalBackupUnit
  incrementalBackupSize: ContextIncrementalBackupSize
  dataSources: ContextDataSources
  dataTransfers: ContextDataTransfers

  // Computed values
  planEntry: undefined | PricingV2EntryPlan
  providerEntry: undefined | PricingV2EntryProvider
  useCaseEntry: undefined | PricingV2EntryUseCase
  computeUnitPrice: ContextComputeUnitPrice
  storageUnitPrice: ContextStorageUnitPrice
  computeMinPrice: ContextComputeMinPrice
  computeMaxPrice: ContextComputeMaxPrice
  storagePrice: ContextStoragePrice
  totalMinPrice: ContextTotalMinPrice
  totalMaxPrice: ContextTotalMaxPrice
  totalPriceRange: ContextTotalPriceRange
}

export type Data = Pick<Context, 'plans' | 'providers' | 'computes'>

export type Values = Pick<
  Context,
  | 'plan'
  | 'provider'
  | 'region'
  | 'useCase'
  | 'hours'
  | 'computeMinSize'
  | 'computeMaxSize'
  | 'replicas'
  | 'storageUnit'
  | 'storageSize'
  | 'storageCompressed'
  | 'backupFrequency'
  | 'backupRetention'
  | 'fullBackupUnit'
  | 'fullBackupSize'
  | 'incrementalBackupUnit'
  | 'incrementalBackupSize'
  | 'dataSources'
  | 'dataTransfers'
>

const PricingV2Context = createContext<Context>({
  // Helper functions
  setValues: () => null,
  getPlanPricingData,
  getPlanPricingConfig,
  validateDataSize,

  // Data sources
  plans: [],
  setPlans: () => {},
  providers: [],
  setProviders: () => {},
  computes: [],
  setComputes: () => {},

  // User values
  plan: null,
  provider: null,
  region: null,
  useCase: null,
  hours: null,
  computeMinSize: null,
  computeMaxSize: null,
  replicas: null,
  storageUnit: null,
  storageSize: null,
  storageCompressed: null,
  backupFrequency: null,
  backupRetention: null,
  fullBackupUnit: null,
  fullBackupSize: null,
  incrementalBackupUnit: null,
  incrementalBackupSize: null,
  dataSources: null,
  dataTransfers: null,

  // Computed values
  planEntry: undefined,
  providerEntry: undefined,
  useCaseEntry: undefined,
  computeUnitPrice: null,
  storageUnitPrice: null,
  computeMinPrice: null,
  computeMaxPrice: null,
  storagePrice: null,
  totalMinPrice: null,
  totalMaxPrice: null,
  totalPriceRange: [0]
})

export function usePricingV2Context() {
  const result = useContext(PricingV2Context)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}

export interface PricingV2ContextProviderProps {
  data: Data
  startingValues?: Partial<Values>
  onChange?: (values: Values) => void
  children: React.ReactNode
}

export default function PricingV2ContextProvider({
  data,
  startingValues,
  onChange,
  children
}: PricingV2ContextProviderProps) {
  // Data sources
  const [plans, setPlans] = useState<Array<PricingV2EntryPlan>>(data.plans)
  const [providers, setProviders] = useState<Array<PricingV2EntryProvider>>(
    data.providers
  )
  const [computes, setComputes] = useState<Array<PricingV2EntryCompute>>(
    data.computes
  )

  // User values
  const [plan, setPlan] = useState<ContextPlan>(null)
  const [provider, setProvider] = useState<ContextProvider>(
    startingValues?.provider ?? null
  )
  const [region, setRegion] = useState<ContextRegion>(
    startingValues?.region ?? null
  )
  const [useCase, setUseCase] = useState<ContextUseCase>(
    startingValues?.useCase ?? null
  )
  const [hours, setHours] = useState<ContextHours>(
    startingValues?.hours ?? null
  )
  const [computeMinSize, setComputeMinSize] = useState<ContextComputeMinSize>(
    startingValues?.computeMinSize ?? null
  )
  const [computeMaxSize, setComputeMaxSize] = useState<ContextComputeMaxSize>(
    startingValues?.computeMaxSize ?? null
  )
  const [replicas, setReplicas] = useState<ContextReplicas>(
    startingValues?.replicas ?? null
  )
  const [storageUnit, setStorageUnit] = useState<ContextStorageUnit>(
    startingValues?.storageUnit ?? null
  )
  const [storageSize, setStorageSize] = useState<ContextStorageSize>(
    startingValues?.storageSize ?? null
  )
  const [storageCompressed, setStorageCompressed] =
    useState<ContextStorageCompressed>(
      startingValues?.storageCompressed ?? null
    )
  const [backupFrequency, setBackupFrequency] =
    useState<ContextBackupFrequency>(startingValues?.backupFrequency ?? null)
  const [backupRetention, setBackupRetention] =
    useState<ContextBackupRetention>(startingValues?.backupRetention ?? null)
  const [fullBackupUnit, setFullBackupUnit] = useState<ContextFullBackupUnit>(
    startingValues?.fullBackupUnit ?? null
  )
  const [fullBackupSize, setFullBackupSize] = useState<ContextFullBackupSize>(
    startingValues?.fullBackupSize ?? null
  )
  const [incrementalBackupUnit, setIncrementalBackupUnit] =
    useState<ContextIncrementalBackupUnit>(
      startingValues?.incrementalBackupUnit ?? null
    )
  const [incrementalBackupSize, setIncrementalBackupSize] =
    useState<ContextIncrementalBackupSize>(
      startingValues?.incrementalBackupSize ?? null
    )
  const [dataSources, setDataSources] = useState<ContextDataSources>(
    startingValues?.dataSources ?? null
  )
  const [dataTransfers, setDataTransfers] = useState<ContextDataTransfers>(
    startingValues?.dataTransfers ?? null
  )

  // -----------------------------------
  // Computed values
  // -----------------------------------

  // Get the provider strapi entry
  const providerEntry = useMemo(() => {
    return providers
      ? providers.find((item) => item.slug === provider)
      : undefined
  }, [providers, provider])

  // Get the plan strapi entry
  const planEntry = useMemo(() => {
    return plan ? plans.find((item) => item.slug === plan) : undefined
  }, [plans, plan])

  // Get the useCase strapi entry
  const useCaseEntry = useMemo(() => {
    return planEntry && useCase
      ? planEntry.useCases.find((item) => item.slug === useCase)
      : undefined
  }, [planEntry, useCase])

  // Find the pricing data for the combined plan, privder and region values
  const pricingData = useMemo(() => {
    if (!plan || !provider || !region || !(plan in pricingFile)) return null

    return getPlanPricingData(plan).filter((result) => {
      return (
        result.cloudProvider?.toLowerCase() === provider &&
        result.region?.toLowerCase() === region
      )
    })
  }, [plan, provider, region])

  // Get the compute unit price from pricing file
  const computeUnitPrice: ContextComputeUnitPrice = useMemo(() => {
    if (!pricingData || !plan || !(plan in config.plans)) return null

    const aggregationIds = getPlanPricingConfig(plan).aggregationIds.compute

    return (
      pricingData
        .find((result) => aggregationIds.includes(result.aggregationId))
        ?.pricingBands.at(0)?.unitPrice || null
    )
  }, [pricingData, plan])

  // Get the storage unit price from pricing file
  const storageUnitPrice: ContextStorageUnitPrice = useMemo(() => {
    if (!pricingData || !plan || !(plan in config.plans)) return null

    const aggregationIds = getPlanPricingConfig(plan).aggregationIds.storage

    return (
      pricingData
        .find((result) => aggregationIds.includes(result.aggregationId))
        ?.pricingBands.at(0)?.unitPrice || null
    )
  }, [pricingData, plan])

  // Calculate the minimum compute price
  const computeMinPrice: ContextComputeMinPrice = useMemo(() => {
    if (!computeUnitPrice || hours === null || computeMinSize === null) {
      return null
    }

    // Divide `computeMinSize` by 8 because 1 unit is equal to a compute size of 8
    const computeMinHoursPerMonth =
      (computeMinSize / 8) * hours * AVG_DAYS_PER_MONTH
    return computeUnitPrice * computeMinHoursPerMonth * (replicas || 1)
  }, [hours, computeMinSize, computeUnitPrice, replicas])

  // Calculate the maximum compute price
  const computeMaxPrice: ContextComputeMaxPrice = useMemo(() => {
    if (!computeUnitPrice || hours === null || computeMaxSize === null) {
      return null
    }

    // Divide `computeMaxSize` by 8 because 1 unit is equal to a compute size of 8
    const computeMaxHoursPerMonth =
      (computeMaxSize / 8) * hours * AVG_DAYS_PER_MONTH
    return computeUnitPrice * computeMaxHoursPerMonth * (replicas || 1)
  }, [hours, computeMaxSize, computeUnitPrice, replicas])

  // Calculate the storage price
  const storagePrice: ContextStoragePrice = useMemo(() => {
    if (!storageUnitPrice || !storageSize || !storageUnit) {
      return null
    }

    // Unit price is in terabytes so we need to convert usage accordingly
    let usageInTb = storageSize

    // Convert usage values into gigabytes
    switch (storageUnit) {
      case 'gb':
        usageInTb = storageSize / 1000
        break
      case 'pb':
        usageInTb = storageSize * 1000
        break
    }

    // If the storage isn't already compressed, apply standard 10x compression
    if (!storageCompressed) {
      usageInTb = usageInTb / 10
    }

    return usageInTb * storageUnitPrice
  }, [storageSize, storageUnit, storageCompressed, storageUnitPrice])

  // Calculate the minimum total price (min compute & min storage combined)
  const totalMinPrice: ContextTotalMinPrice = useMemo(() => {
    return [computeMinPrice, storagePrice]
      .filter((val) => val !== null)
      .reduce((total, current) => total + current, 0)
  }, [computeMinPrice, storagePrice, replicas])

  // Calculate the maximum total price (max compute & max storage combined)
  const totalMaxPrice: ContextTotalMaxPrice = useMemo(() => {
    return [computeMaxPrice, storagePrice]
      .filter((val) => val !== null)
      .reduce((total, current) => total + current, 0)
  }, [computeMaxPrice, storagePrice, replicas])

  const totalPriceRange: ContextTotalPriceRange = useMemo(() => {
    const isValid = !!(
      (totalMinPrice && totalMinPrice > 1) ||
      (totalMaxPrice && totalMaxPrice > 1)
    )

    // Set default to zero
    if (!isValid) {
      return [0]
    }

    // De-dupe and remove empties
    const cleaned = [...new Set([totalMinPrice, totalMaxPrice])].filter(
      (val) => val !== null
    )

    // This pleases typescript
    switch (cleaned.length) {
      case 2:
        return [cleaned[0], cleaned[1]]
      case 1:
        return [cleaned[0]]
      default:
        return [0]
    }
  }, [totalMinPrice, totalMaxPrice])

  // -----------------------------------
  // Provider callbacks
  // -----------------------------------

  // Fire onChange callback
  useEffect(() => {
    if (onChange) {
      onChange({
        plan,
        provider,
        region,
        useCase,
        hours,
        computeMinSize,
        computeMaxSize,
        replicas,
        storageUnit,
        storageSize,
        storageCompressed,
        backupFrequency,
        backupRetention,
        fullBackupUnit,
        fullBackupSize,
        incrementalBackupUnit,
        incrementalBackupSize,
        dataSources,
        dataTransfers
      })
    }
  }, [
    plan,
    provider,
    region,
    useCase,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed,
    backupFrequency,
    backupRetention,
    fullBackupUnit,
    fullBackupSize,
    incrementalBackupUnit,
    incrementalBackupSize,
    dataSources,
    dataTransfers
  ])

  // -----------------------------------
  // Value validators
  // -----------------------------------

  const setValues = useCallback(
    (newValues: Partial<Values>) => {
      let newPlanEntry = planEntry
      let newProviderEntry = providerEntry
      let newUseCaseEntry = useCaseEntry

      let {
        plan: newPlan,
        provider: newProvider,
        region: newRegion,
        useCase: newUseCase,
        hours: newHours,
        computeMinSize: newComputeMinSize,
        computeMaxSize: newComputeMaxSize,
        replicas: newReplicas,
        storageUnit: newStorageUnit,
        storageSize: newStorageSize,
        storageCompressed: newStorageCompressed,
        backupFrequency: newBackupFrequency,
        backupRetention: newBackupRetention,
        fullBackupUnit: newFullBackupUnit,
        fullBackupSize: newFullBackupSize,
        incrementalBackupUnit: newIncrementalBackupUnit,
        incrementalBackupSize: newIncrementalBackupSize,
        dataSources: newDataSources,
        dataTransfers: newDataTransfers
      } = newValues

      // Validate plan
      if (newPlan !== undefined) {
        newPlanEntry = plans.find((item) => item.slug === newPlan)

        if (!newPlan || !newPlanEntry) {
          newPlanEntry =
            plans.find((item) => item.featured) || plans.at(0) || undefined
          newPlan = newPlanEntry?.slug || null
        }

        // Force new compute values when the plan and customizablilty changed
        if (
          plan &&
          newPlan !== plan &&
          planEntry?.customizable !== newPlanEntry?.customizable
        ) {
          newComputeMinSize = null
          newComputeMaxSize = null
          newReplicas = null
        }
      }

      // Validate provider
      if (newProvider !== undefined) {
        newProviderEntry = providers.find((item) => item.slug === newProvider)
        if (!newProvider || !newProviderEntry) {
          newProviderEntry = providers.at(0)
          newProvider = newProviderEntry?.slug || null
        }

        // Force new region when the provider changes
        if (newProvider !== provider) {
          newRegion = null
        }
      }

      // Validate use case
      if (newUseCase !== undefined) {
        newUseCaseEntry = newPlanEntry?.useCases.find(
          (item) => item.slug === newUseCase
        )

        if (!newUseCase || !newUseCaseEntry) {
          newUseCaseEntry = undefined
          newUseCase = null
        }
      }

      // Validate region
      if (newRegion !== undefined) {
        if (!newProviderEntry) {
          newRegion = null
        } else if (
          !newRegion ||
          (newProviderEntry &&
            !newProviderEntry.regions.find((item) => item.key === newRegion))
        ) {
          newRegion = newProviderEntry.regions.at(0)?.key || null
        }
      }

      // Validate compute
      if (
        newPlanEntry ||
        newComputeMinSize !== undefined ||
        newComputeMaxSize !== undefined ||
        newReplicas !== undefined
      ) {
        const applyUseCaseOrFirstPackage = () => {
          if (newUseCaseEntry) {
            newComputeMinSize = newUseCaseEntry?.minimumCompute?.size || null
            newComputeMaxSize = newUseCaseEntry?.maximumCompute?.size || null
            newReplicas = newUseCaseEntry.replicas
            newHours = newUseCaseEntry.activeHours
          } else if (newPlanEntry) {
            const first = newPlanEntry.packages.at(0)
            newComputeMinSize = first?.minimumCompute?.size || null
            newComputeMaxSize = first?.maximumCompute?.size || null
            newReplicas = first?.replicas || null
            newHours = first?.activeHours || newHours || hours
          }
        }

        // If a value is undefined, use the current value
        if (newComputeMinSize === undefined) newComputeMinSize = computeMinSize
        if (newComputeMaxSize === undefined) newComputeMaxSize = computeMaxSize
        if (newReplicas === undefined) newReplicas = replicas

        // If all values are null, use the first package
        if (
          newComputeMinSize === null &&
          newComputeMaxSize === null &&
          newReplicas === null
        ) {
          applyUseCaseOrFirstPackage()
        }

        // Min value is null, set it to match max
        if (newComputeMinSize === null && newComputeMaxSize !== null) {
          newComputeMinSize = newComputeMaxSize
        }

        // Max value is null, set it to match min
        if (newComputeMinSize !== null && newComputeMaxSize === null) {
          newComputeMaxSize = newComputeMinSize
        }

        // Min size is still null, default to first compute size
        if (newComputeMinSize === null) {
          newComputeMinSize = computes[0].size
        }

        // Max size is still null, default to last compute size
        if (newComputeMaxSize === null) {
          newComputeMaxSize = computes[computes.length - 1].size
        }

        // If min value has changed, ensure max value is always greater than or equal to
        if (
          newComputeMinSize !== computeMinSize &&
          newComputeMinSize > newComputeMaxSize
        ) {
          newComputeMaxSize = newComputeMinSize
        }

        // If max value has changed, ensure min value is always less than or equal to
        else if (
          newComputeMaxSize !== computeMaxSize &&
          newComputeMinSize > newComputeMaxSize
        ) {
          newComputeMinSize = newComputeMaxSize
        }

        // Sanity check if neither value has changed
        else if (newComputeMinSize > newComputeMaxSize) {
          newComputeMaxSize = newComputeMinSize
        }

        // Set replicas default value
        if (newReplicas === null) newReplicas = 1

        // Constrain replicas to 1-25
        newReplicas = Math.min(25, Math.max(1, newReplicas))

        // Ensure values match a package for non-customizable plans
        if (newPlanEntry && !newPlanEntry.customizable) {
          const packageExists = newPlanEntry.packages.find((item) => {
            return (
              item.minimumCompute?.size === newComputeMinSize &&
              item.maximumCompute?.size === newComputeMaxSize &&
              item.replicas === newReplicas
            )
          })

          // If not a valid package, set values to the first available package
          if (!packageExists) {
            applyUseCaseOrFirstPackage()
          }
        }
      }

      // Validate hours
      if (newHours !== undefined) {
        // Set hours default value
        if (newHours === null) newHours = 8

        // Constrain hours to 0-24
        newHours = Math.min(24, Math.max(0, newHours))
      }

      // Validate storage
      if (
        newStorageUnit !== undefined ||
        newStorageSize !== undefined ||
        newPlanEntry?.maxStorageCapacity
      ) {
        // If a value is undefined, use the current value
        if (newStorageUnit === undefined) newStorageUnit = storageUnit
        if (newStorageSize === undefined) newStorageSize = storageSize

        // Set the default storage unit
        if (!newStorageUnit || !['gb', 'pb', 'tb'].includes(newStorageUnit)) {
          newStorageUnit = 'gb'
        }

        // Set 500 as the default value
        if (newStorageSize === null) newStorageSize = 500

        // Apply plan storage restriciton
        const validatedStorage = validateDataSize(
          newStorageSize,
          newStorageUnit,
          newPlanEntry?.maxStorageCapacity
        )

        newStorageSize = validatedStorage.size
        newStorageUnit = validatedStorage.unit
      }

      // Validate storage compressed
      if (newStorageCompressed !== undefined) {
        newStorageCompressed = !!newStorageCompressed
      }

      if (newPlanEntry !== undefined && newPlanEntry !== planEntry) {
        setPlan(newPlanEntry.slug)
      }

      if (
        newProviderEntry !== undefined &&
        newProviderEntry !== providerEntry
      ) {
        setProvider(newProviderEntry.slug)
      }

      if (newUseCaseEntry !== undefined && newUseCaseEntry !== useCaseEntry) {
        setUseCase(newUseCaseEntry.slug)
      }

      if (newRegion !== undefined && newRegion !== region) {
        setRegion(newRegion)
      }

      if (newUseCase !== undefined && newUseCase !== useCase) {
        setUseCase(newUseCase)
      }

      if (newHours !== undefined && newHours !== hours) {
        setHours(newHours)
      }

      if (
        newComputeMinSize !== undefined &&
        newComputeMinSize !== computeMinSize
      ) {
        setComputeMinSize(newComputeMinSize)
      }

      if (
        newComputeMaxSize !== undefined &&
        newComputeMaxSize !== computeMaxSize
      ) {
        setComputeMaxSize(newComputeMaxSize)
      }

      if (newReplicas !== undefined && newReplicas !== replicas) {
        setReplicas(newReplicas)
      }

      if (newStorageUnit !== undefined && newStorageUnit !== storageUnit) {
        setStorageUnit(newStorageUnit)
      }

      if (newStorageSize !== undefined && newStorageSize !== storageSize) {
        setStorageSize(newStorageSize)
      }

      if (
        newStorageCompressed !== undefined &&
        newStorageCompressed !== storageCompressed
      ) {
        setStorageCompressed(newStorageCompressed)
      }

      if (
        newBackupFrequency !== undefined &&
        newBackupFrequency !== backupFrequency
      ) {
        setBackupFrequency(newBackupFrequency)
      }
    },
    [
      planEntry,
      providerEntry,

      plans,
      providers,
      plan,
      provider,
      region,
      useCase,
      hours,
      computeMinSize,
      computeMaxSize,
      replicas,
      storageUnit,
      storageSize,
      storageCompressed,
      backupFrequency,
      backupRetention,
      fullBackupUnit,
      fullBackupSize,
      incrementalBackupUnit,
      incrementalBackupSize,
      dataSources,
      dataTransfers
    ]
  )

  // -----------------------------------
  // On mount
  // -----------------------------------

  useEffect(() => {
    if (startingValues) setValues(startingValues)
  }, [])

  return (
    <PricingV2Context.Provider
      value={{
        // Helper functions
        setValues,
        getPlanPricingData,
        getPlanPricingConfig,
        validateDataSize,

        // Data sources
        plans,
        setPlans,
        providers,
        setProviders,
        computes,
        setComputes,

        // User values
        plan,
        provider,
        region,
        useCase,
        hours,
        computeMinSize,
        computeMaxSize,
        replicas,
        storageUnit,
        storageSize,
        storageCompressed,
        backupFrequency,
        backupRetention,
        fullBackupUnit,
        fullBackupSize,
        incrementalBackupUnit,
        incrementalBackupSize,
        dataSources,
        dataTransfers,

        // Computed values
        planEntry,
        providerEntry,
        useCaseEntry,
        computeUnitPrice,
        storageUnitPrice,
        computeMinPrice,
        computeMaxPrice,
        storagePrice,
        totalMinPrice,
        totalMaxPrice,
        totalPriceRange
      }}>
      {children}
      <pre>
        {JSON.stringify(
          {
            plan,
            provider,
            region,
            useCase,
            hours,
            computeMinSize,
            computeMaxSize,
            replicas,
            storageUnit,
            storageSize,
            storageCompressed,
            backupFrequency,
            backupRetention,
            fullBackupUnit,
            fullBackupSize,
            incrementalBackupUnit,
            incrementalBackupSize,
            dataSources,
            dataTransfers
          },
          null,
          2
        )}
      </pre>
    </PricingV2Context.Provider>
  )
}
