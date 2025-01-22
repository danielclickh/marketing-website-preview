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
  PricingV2EntryProvider
} from '../../lib/api/strapi/types'
import pricingFile from '../../public/pricingV2File.json'
import config, { PlanConfig } from '../PricingV2/config'

const AVG_DAYS_PER_MONTH = 30.41

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

export type ContextPlan = null | string
export type ContextProvider = null | string
export type ContextRegion = null | string
export type ContextHours = null | number
export type ContextComputeMinSize = null | number
export type ContextComputeMaxSize = null | number
export type ContextReplicas = null | number
export type ContextStorageUnit = null | 'gb' | 'tb' | 'pb'
export type ContextStorageSize = null | number
export type ContextStorageCompressed = null | boolean

export type ContextComputeUnitPrice = null | number
export type ContextStorageUnitPrice = null | number
export type ContextComputeMinPrice = null | number
export type ContextComputeMaxPrice = null | number
export type ContextStoragePrice = null | number
export type ContextTotalMinPrice = null | number
export type ContextTotalMaxPrice = null | number
export type ContextTotalPriceRange = [number] | [number, number]

export interface Context {
  // Helper functions
  getPlanPricingData: (value: string) => undefined | PricingFileItem
  getPlanPricingConfig: (value: string) => undefined | PlanConfig

  // Data sources
  plans: Array<PricingV2EntryPlan>
  setPlans: Dispatch<SetStateAction<Array<PricingV2EntryPlan>>>
  providers: Array<PricingV2EntryProvider>
  setProviders: Dispatch<SetStateAction<Array<PricingV2EntryProvider>>>
  computes: Array<PricingV2EntryCompute>
  setComputes: Dispatch<SetStateAction<Array<PricingV2EntryCompute>>>

  // User values
  plan: ContextPlan
  setPlan: (value: ContextPlan) => void
  provider: ContextProvider
  setProvider: (value: ContextProvider) => void
  region: ContextRegion
  setRegion: (value: ContextRegion) => void
  hours: ContextHours
  setHours: (value: ContextHours) => void

  setCompute: (
    min: ContextComputeMinSize,
    max: ContextComputeMaxSize,
    replicas: ContextReplicas
  ) => void
  computeMinSize: ContextComputeMinSize
  setComputeMinSize: (value: ContextComputeMinSize) => void
  computeMaxSize: ContextComputeMaxSize
  setComputeMaxSize: (value: ContextComputeMaxSize) => void
  replicas: ContextReplicas
  setReplicas: (value: ContextReplicas) => void

  storageUnit: ContextStorageUnit
  setStorageUnit: (value: ContextStorageUnit) => void
  storageSize: ContextStorageSize
  setStorageSize: (value: ContextStorageSize) => void
  storageCompressed: ContextStorageCompressed
  setStorageCompressed: (value: ContextStorageCompressed) => void

  // Computed values
  planEntry: undefined | PricingV2EntryPlan
  providerEntry: undefined | PricingV2EntryProvider
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
  | 'hours'
  | 'computeMinSize'
  | 'computeMaxSize'
  | 'replicas'
  | 'storageUnit'
  | 'storageSize'
  | 'storageCompressed'
>

const PricingV2Context = createContext<Context>({
  // Helper functions
  getPlanPricingData: () => undefined,
  getPlanPricingConfig: () => undefined,

  // Data sources
  plans: [],
  setPlans: () => {},
  providers: [],
  setProviders: () => {},
  computes: [],
  setComputes: () => {},

  // User values
  plan: null,
  setPlan: () => {},
  provider: null,
  setProvider: () => {},
  region: null,
  setRegion: () => {},
  hours: null,
  setHours: () => {},

  setCompute: () => {},
  computeMinSize: null,
  setComputeMinSize: () => {},
  computeMaxSize: null,
  setComputeMaxSize: () => {},
  replicas: null,
  setReplicas: () => {},

  storageUnit: null,
  setStorageUnit: () => {},
  storageSize: null,
  setStorageSize: () => {},
  storageCompressed: null,
  setStorageCompressed: () => {},

  // Computed values
  planEntry: undefined,
  providerEntry: undefined,
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
  const [plans, setPlans] = useState<Array<PricingV2EntryPlan>>(data.plans)
  const [providers, setProviders] = useState<Array<PricingV2EntryProvider>>(
    data.providers
  )
  const [computes, setComputes] = useState<Array<PricingV2EntryCompute>>(
    data.computes
  )

  const [plan, setPlan] = useState<ContextPlan>(null)
  const [provider, setProvider] = useState<ContextProvider>(
    startingValues?.provider ?? null
  )
  const [region, setRegion] = useState<ContextRegion>(
    startingValues?.region ?? null
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

  // -----------------------------------
  // Helper functions
  // -----------------------------------

  const getPlanPricingData = (planKey: string) => {
    return (pricingFile as PricingFile)[planKey]
  }

  const getPlanPricingConfig = (planKey: string) => {
    return config.plans[planKey]
  }

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

    // Unit price is based on tarabytes, convert it to gigabytes
    const pricePerGb = storageUnitPrice / 1024

    let usage = storageSize

    // Convert usage values into gigabytes
    switch (storageUnit) {
      case 'tb':
        usage = usage * 1024
        break
      case 'pb':
        usage = usage * 2048
        break
    }

    // If the storage isn't already compressed, apply standard 10x compression
    if (!storageCompressed) {
      usage = usage / 10
    }

    return usage * pricePerGb
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
        hours,
        computeMinSize,
        computeMaxSize,
        replicas,
        storageUnit,
        storageSize,
        storageCompressed
      })
    }
  }, [
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed
  ])

  // -----------------------------------
  // Value validators
  // -----------------------------------

  const validateAndSetValues = useCallback(
    (newValues: Partial<Values>) => {
      let newPlanEntry = planEntry
      let newProviderEntry = providerEntry

      let {
        plan: newPlan,
        provider: newProvider,
        region: newRegion,
        hours: newHours,
        computeMinSize: newComputeMinSize,
        computeMaxSize: newComputeMaxSize,
        replicas: newReplicas,
        storageUnit: newStorageUnit,
        storageSize: newStorageSize,
        storageCompressed: newStorageCompressed
      } = newValues

      // Validate plan
      if (newPlan !== undefined) {
        newPlanEntry = plans.find((item) => item.slug === newPlan)
        if (!newPlan || !newPlanEntry) {
          newPlanEntry =
            plans.find((item) => item.featured) || plans.at(0) || undefined
          newPlan = newPlanEntry?.slug || null
        }

        // Force new compute values when the provider changes
        if (newPlan !== plan) {
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

      // Validate hours
      if (newHours !== undefined) {
        // Set hours default value
        if (newHours === null) newHours = 8

        // Constrain hours to 0-24
        newHours = Math.min(24, Math.max(0, newHours))
      }

      // Validate compute
      if (
        newComputeMinSize !== undefined ||
        newComputeMaxSize !== undefined ||
        newReplicas !== undefined
      ) {
        const firstComputePackage = () => {
          if (newPlanEntry) {
            newComputeMinSize =
              newPlanEntry.packages.at(0)?.minimumCompute?.size || null
            newComputeMaxSize =
              newPlanEntry.packages.at(0)?.maximumCompute?.size || null
            newReplicas = newPlanEntry.packages.at(0)?.replicas || null
          }
        }

        // Undefined to null
        if (newComputeMinSize === undefined) newComputeMinSize = null
        if (newComputeMaxSize === undefined) newComputeMaxSize = null
        if (newReplicas === undefined) newReplicas = null

        // If all values are null, use the first package
        if (
          newComputeMinSize === null &&
          newComputeMaxSize === null &&
          newReplicas === null
        ) {
          firstComputePackage()
        }

        // If one or the other min/max values are null
        if (newComputeMinSize !== null && newComputeMaxSize === null)
          newComputeMaxSize = newComputeMinSize
        if (newComputeMinSize === null && newComputeMaxSize !== null)
          newComputeMinSize = newComputeMaxSize

        // Get default values
        if (newComputeMinSize === null || newComputeMaxSize === null) {
          const sizes = computes.map((compute) => compute.size)
          if (newComputeMinSize === null) newComputeMinSize = sizes[0]
          if (newComputeMaxSize === null)
            newComputeMaxSize = sizes[sizes.length - 1]
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
        if (planEntry && !planEntry.customizable) {
          const packageExists = planEntry.packages.find((item) => {
            return (
              item.minimumCompute?.size === newComputeMinSize &&
              item.maximumCompute?.size === newComputeMaxSize &&
              item.replicas === newReplicas
            )
          })

          // If not a valid package, set values to the first available package
          if (!packageExists) {
            firstComputePackage()
          }
        }
      }

      // Validate storage size
      if (newStorageSize !== undefined) {
        // Set 500 as the default value
        if (newStorageSize === null) newStorageSize = 500

        // Constrain value to 0-9999
        newStorageSize = Math.max(Math.min(newStorageSize, 9999), 0)
      }

      // Validate storage unit
      if (newStorageUnit !== undefined) {
        if (!newStorageUnit || !['gb', 'pb', 'tb'].includes(newStorageUnit)) {
          newStorageUnit = 'gb'
        }
      }

      // Validate storage compressed
      if (newStorageCompressed !== undefined) {
        newStorageCompressed = !!newStorageCompressed
      }

      if (newPlan !== undefined && newPlan !== plan) {
        setPlan(newPlan)
      }

      if (newProvider !== undefined && newProvider !== provider) {
        setProvider(newProvider)
      }

      if (newRegion !== undefined && newRegion !== region) {
        setRegion(newRegion)
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
    },
    [
      planEntry,
      providerEntry,

      plans,
      providers,
      plan,
      provider,
      region,
      hours,
      computeMinSize,
      computeMaxSize,
      replicas,
      storageUnit,
      storageSize,
      storageCompressed
    ]
  )

  // -----------------------------------
  // On mount
  // -----------------------------------

  useEffect(() => {
    if (startingValues) validateAndSetValues(startingValues)
  }, [])

  return (
    <PricingV2Context.Provider
      value={{
        // Helper functions
        getPlanPricingData,
        getPlanPricingConfig,

        // Data sources
        plans,
        setPlans,
        providers,
        setProviders,
        computes,
        setComputes,

        // User values
        plan,
        setPlan: (plan) => validateAndSetValues({ plan }),
        provider,
        setProvider: (provider) => validateAndSetValues({ provider }),
        region,
        setRegion: (region) => validateAndSetValues({ region }),
        hours,
        setHours: (hours) => validateAndSetValues({ hours }),

        setCompute: (computeMinSize, computeMaxSize, replicas) =>
          validateAndSetValues({ computeMinSize, computeMaxSize, replicas }),
        computeMinSize,
        setComputeMinSize: (computeMinSize) =>
          validateAndSetValues({ computeMinSize }),
        computeMaxSize,
        setComputeMaxSize: (computeMaxSize) =>
          validateAndSetValues({ computeMaxSize }),
        replicas,
        setReplicas: (replicas) => validateAndSetValues({ replicas }),

        storageUnit,
        setStorageUnit: (storageUnit) => validateAndSetValues({ storageUnit }),
        storageSize,
        setStorageSize: (storageSize) => validateAndSetValues({ storageSize }),
        storageCompressed,
        setStorageCompressed: (storageCompressed) =>
          validateAndSetValues({ storageCompressed }),

        // Computed values
        planEntry,
        providerEntry,
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
    </PricingV2Context.Provider>
  )
}
