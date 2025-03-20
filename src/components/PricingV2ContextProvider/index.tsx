import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { humanReadableTo } from '@/lib/utils/memory'
import pricingFile from '../../../public/pricingV2File.json'
import * as config from '../PricingV2/config'
import {
  Context,
  ContextBackupFrequency,
  ContextBackupRetention,
  ContextClickpipes,
  ContextComputeMaxPrice,
  ContextComputeMaxSize,
  ContextComputeMinPrice,
  ContextComputeMinSize,
  ContextComputeUnitPrice,
  ContextEstimateBackup,
  ContextFullBackup,
  ContextHours,
  ContextIncrementalBackup,
  ContextPlan,
  ContextProvider,
  ContextRegion,
  ContextReplicas,
  ContextStorage,
  ContextStorageCompressed,
  ContextStoragePrice,
  ContextStorageUnitPrice,
  ContextTotalMaxPrice,
  ContextTotalMinPrice,
  ContextTotalPriceRange,
  ContextTransfers,
  ContextUseCase,
  Data,
  PricingFile,
  Values
} from '../PricingV2/types'

function getPlanPricingData(planKey: string) {
  return (pricingFile as PricingFile)[planKey]
}

function getPlanPricingConfig(planKey: string) {
  return config.meter.plans[planKey]
}

const PricingV2Context = createContext<Context>({
  // Helper functions
  setValues: () => null,
  getPlanPricingData,
  getPlanPricingConfig,

  // Initial source data
  sourceData: {
    plans: [],
    providers: [],
    useCases: [],
    dataSources: []
  },

  // User values
  plan: null,
  provider: null,
  region: null,
  useCase: null,
  hours: null,
  computeMinSize: null,
  computeMaxSize: null,
  replicas: null,
  storage: null,
  storageCompressed: null,
  backupFrequency: null,
  backupRetention: null,
  estimateBackup: null,
  fullBackup: null,
  incrementalBackup: null,
  clickpipes: null,
  transfers: null,

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
  totalPriceRange: null
})

export function usePricingV2Context() {
  const result = useContext(PricingV2Context)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}

export interface PricingV2ContextProviderProps {
  sourceData: Data
  startingValues?: Partial<Values>
  onChange?: (values: Values) => void
  children: React.ReactNode
}

export default function PricingV2ContextProvider({
  sourceData,
  startingValues,
  onChange,
  children
}: PricingV2ContextProviderProps) {
  // -----------------------------------
  // User values
  // -----------------------------------

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
  const [storage, setStorage] = useState<ContextStorage>(
    startingValues?.storage ?? null
  )
  const [storageCompressed, setStorageCompressed] =
    useState<ContextStorageCompressed>(
      startingValues?.storageCompressed ?? null
    )
  const [backupFrequency, setBackupFrequency] =
    useState<ContextBackupFrequency>(startingValues?.backupFrequency ?? null)
  const [backupRetention, setBackupRetention] =
    useState<ContextBackupRetention>(startingValues?.backupRetention ?? null)
  const [estimateBackup, setEstimateBackup] = useState<ContextEstimateBackup>(
    startingValues?.estimateBackup ?? null
  )
  const [fullBackup, setFullBackup] = useState<ContextFullBackup>(
    startingValues?.fullBackup ?? null
  )
  const [incrementalBackup, setIncrementalBackup] =
    useState<ContextIncrementalBackup>(
      startingValues?.incrementalBackup ?? null
    )
  const [clickpipes, setClickpipes] = useState<ContextClickpipes>(
    startingValues?.clickpipes ?? null
  )
  const [transfers, setTransfers] = useState<ContextTransfers>(
    startingValues?.transfers ?? null
  )

  // -----------------------------------
  // Computed values
  // -----------------------------------

  // Get the provider strapi entry
  const providerEntry = useMemo(() => {
    return sourceData.providers.find((item) => item.slug === provider)
  }, [sourceData, provider])

  // Get the plan strapi entry
  const planEntry = useMemo(() => {
    return sourceData.plans.find((item) => item.slug === plan)
  }, [sourceData, plan])

  // Get the useCase strapi entry
  const useCaseEntry = useMemo(() => {
    return sourceData.useCases.find((item) => item.slug === useCase)
  }, [sourceData, useCase])

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
    if (!pricingData || !plan || !(plan in config.meter.plans)) return null

    const aggregationIds = getPlanPricingConfig(plan).aggregationIds.compute

    return (
      pricingData
        .find((result) => aggregationIds.includes(result.aggregationId))
        ?.pricingBands.at(0)?.unitPrice || null
    )
  }, [pricingData, plan])

  // Get the storage unit price from pricing file
  const storageUnitPrice: ContextStorageUnitPrice = useMemo(() => {
    if (!pricingData || !plan || !(plan in config.meter.plans)) return null

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
      (computeMinSize / 8) * hours * config.averageDaysPerMonth
    return computeUnitPrice * computeMinHoursPerMonth * (replicas || 1)
  }, [hours, computeMinSize, computeUnitPrice, replicas])

  // Calculate the maximum compute price
  const computeMaxPrice: ContextComputeMaxPrice = useMemo(() => {
    if (!computeUnitPrice || hours === null || computeMaxSize === null) {
      return null
    }

    // Divide `computeMaxSize` by 8 because 1 unit is equal to a compute size of 8
    const computeMaxHoursPerMonth =
      (computeMaxSize / 8) * hours * config.averageDaysPerMonth
    return computeUnitPrice * computeMaxHoursPerMonth * (replicas || 1)
  }, [hours, computeMaxSize, computeUnitPrice, replicas])

  // Calculate the storage price
  const storagePrice: ContextStoragePrice = useMemo(() => {
    if (!storage || !storageUnitPrice) {
      return null
    }

    // Unit price is in terabytes so we need to convert usage accordingly
    let usageInTb = humanReadableTo(storage, 'TB')

    // Bail if converting value failed
    if (!usageInTb) return null

    // If the storage isn't already compressed, apply standard 10x compression
    if (!storageCompressed) {
      usageInTb = usageInTb / 10
    }

    return usageInTb * storageUnitPrice
  }, [storage, storageCompressed, storageUnitPrice])

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
      return null
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
        return null
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
        storage,
        storageCompressed,
        backupFrequency,
        backupRetention,
        estimateBackup,
        fullBackup,
        incrementalBackup,
        clickpipes,
        transfers
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
    storage,
    storageCompressed,
    estimateBackup,
    backupFrequency,
    backupRetention,
    fullBackup,
    incrementalBackup,
    clickpipes,
    transfers
  ])

  // -----------------------------------
  // Context setter
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
        storage: newStorage,
        storageCompressed: newStorageCompressed,
        backupFrequency: newBackupFrequency,
        backupRetention: newBackupRetention,
        estimateBackup: newEstimateBackupSize,
        fullBackup: newFullBackup,
        incrementalBackup: newIncrementalBackup,
        clickpipes: newClickpipes,
        transfers: newTransfers
      } = newValues

      // Validate plan
      if (newPlan !== undefined) {
        newPlanEntry = sourceData.plans.find((item) => item.slug === newPlan)

        if (!newPlan || !newPlanEntry) {
          newPlanEntry =
            sourceData.plans.find((item) => item.featured) ||
            sourceData.plans.at(0) ||
            undefined
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
        newProviderEntry = sourceData.providers.find(
          (item) => item.slug === newProvider
        )
        if (!newProvider || !newProviderEntry) {
          newProviderEntry = sourceData.providers.at(0)
          newProvider = newProviderEntry?.slug || null
        }

        // Force new region when the provider changes
        if (newProvider !== provider) {
          newRegion = null
        }
      }

      // Validate use case
      if (newUseCase !== undefined) {
        newUseCaseEntry = sourceData.useCases.find(
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
            newComputeMinSize = newUseCaseEntry?.computeMinimum || null
            newComputeMaxSize = newUseCaseEntry?.computeMaximum || null
            newReplicas = newUseCaseEntry.replicas
            newHours = newUseCaseEntry.activeHours
          } else if (newPlanEntry) {
            const first = newPlanEntry.packages.at(0)
            newComputeMinSize = first?.computeMinimum || null
            newComputeMaxSize = first?.computeMaximum || null
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
          newComputeMinSize = config.computes[0]
        }

        // Max size is still null, default to last compute size
        if (newComputeMaxSize === null) {
          newComputeMaxSize = config.computes[config.computes.length - 1]
        }

        // Ensure the compute value exists in the config array
        newComputeMinSize = config.findClosestCompute(newComputeMinSize)
        newComputeMaxSize = config.findClosestCompute(newComputeMaxSize)

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
              item.computeMinimum === newComputeMinSize &&
              item.computeMaximum === newComputeMaxSize &&
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
      if (newStorage !== undefined || newPlanEntry?.maxStorageCapacity) {
        if (!newStorage) newStorage = storage

        if (newStorage && newPlanEntry?.maxStorageCapacity) {
          const storageInGb = humanReadableTo(newStorage, 'GB')
          if (storageInGb > newPlanEntry.maxStorageCapacity) {
            newStorage = `${newPlanEntry.maxStorageCapacity}GB`
          }
        }
      }

      // Validate storage compressed
      if (newStorageCompressed !== undefined) {
        newStorageCompressed = !!newStorageCompressed
      }

      // Validate backup frequency (in hours)
      if (newBackupFrequency !== undefined) {
        if (
          newBackupFrequency !== null &&
          !config.backupIntervals.includes(newBackupFrequency)
        ) {
          newBackupRetention = null
        }
      }

      // Validate full backup
      if (newFullBackup !== undefined) {
        const fullBackupInPB = newFullBackup
          ? humanReadableTo(newFullBackup, 'PB')
          : null
        if (!fullBackupInPB) {
          newFullBackup = null
        } else if (fullBackupInPB > 999) {
          newFullBackup = '999PB'
        } else if (fullBackupInPB < 0) {
          newFullBackup = null
        }
      }

      // Validate incremental backup
      if (newIncrementalBackup !== undefined) {
        const incrementalBackupInPB = newIncrementalBackup
          ? humanReadableTo(newIncrementalBackup, 'PB')
          : null
        if (!incrementalBackupInPB) {
          newIncrementalBackup = null
        }
        if (incrementalBackupInPB > 999) {
          newIncrementalBackup = '999PB'
        } else if (incrementalBackupInPB < 0) {
          newIncrementalBackup = null
        }
      }

      // Limit backup retention to 1-30 days
      if (newBackupRetention !== undefined) {
        if (newBackupRetention !== null) {
          newBackupRetention = Math.max(1, Math.min(30, newBackupRetention))
        } else {
          newBackupRetention = null
        }
      }

      // Validate clickpipes
      if (newClickpipes !== undefined) {
        if (!Array.isArray(newClickpipes)) {
          newClickpipes = null
        } else {
          newClickpipes
            .map((item) => {
              let isValid = true

              // Check clickpipe source exists in source data
              const source = sourceData.dataSources.find(
                (source) => source.slug === item.source
              )

              if (!source) {
                isValid = false
              } else {
                // Validate ingested data value
                const dataIngestedInPB = item.dataIngested
                  ? humanReadableTo(item.dataIngested, 'PB')
                  : null
                if (!dataIngestedInPB) {
                  item.dataIngested = null
                } else if (dataIngestedInPB > 999) {
                  item.dataIngested = '999PB'
                } else if (dataIngestedInPB < 0) {
                  item.dataIngested = null
                }
              }

              return isValid ? item : null
            })
            .filter((item) => !!item)
        }
      }

      // Validate transfers
      if (newTransfers !== undefined) {
        if (!Array.isArray(newTransfers)) {
          newTransfers = null
        } else {
          newTransfers.map((item) => {
            // Validate ingested data value
            const valueInPB = item.value
              ? humanReadableTo(item.value, 'PB')
              : null
            if (!valueInPB) {
              item.value = null
            } else if (valueInPB > 999) {
              item.value = '999PB'
            } else if (valueInPB < 0) {
              item.value = null
            }

            return item
          })
        }
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

      if (newStorage !== undefined && newStorage !== storage) {
        setStorage(newStorage)
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

      if (
        newBackupRetention !== undefined &&
        newBackupRetention !== backupRetention
      ) {
        setBackupRetention(newBackupRetention)
      }

      if (
        newEstimateBackupSize !== undefined &&
        newEstimateBackupSize !== estimateBackup
      ) {
        setEstimateBackup(newEstimateBackupSize)
      }

      if (newFullBackup !== undefined && newFullBackup !== fullBackup) {
        setFullBackup(newFullBackup)
      }

      if (
        newIncrementalBackup !== undefined &&
        newIncrementalBackup !== incrementalBackup
      ) {
        setIncrementalBackup(newIncrementalBackup)
      }

      if (newTransfers !== undefined && newTransfers !== transfers) {
        setTransfers(newTransfers)
      }

      if (newClickpipes !== undefined && newClickpipes !== clickpipes) {
        setClickpipes(newClickpipes)
      }
    },
    [
      sourceData,

      planEntry,
      providerEntry,

      plan,
      provider,
      region,
      useCase,
      hours,
      computeMinSize,
      computeMaxSize,
      replicas,
      storage,
      storageCompressed,
      backupFrequency,
      backupRetention,
      estimateBackup,
      fullBackup,
      incrementalBackup,
      clickpipes,
      transfers
    ]
  )

  // -----------------------------------
  // Initialize states on mount
  // -----------------------------------

  useEffect(() => {
    if (startingValues) setValues(startingValues)
  }, [])

  return (
    <PricingV2Context.Provider
      value={{
        // CMS data
        sourceData,

        // Helper functions
        setValues,
        getPlanPricingData,
        getPlanPricingConfig,

        // User values
        plan,
        provider,
        region,
        useCase,
        hours,
        computeMinSize,
        computeMaxSize,
        replicas,
        storage,
        storageCompressed,
        backupFrequency,
        backupRetention,
        estimateBackup,
        fullBackup,
        incrementalBackup,
        clickpipes,
        transfers,

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
            storage,
            storageCompressed,
            backupFrequency,
            backupRetention,
            estimateBackup,
            fullBackup,
            incrementalBackup,
            clickpipes,
            transfers
          },
          null,
          2
        )}
      </pre>
    </PricingV2Context.Provider>
  )
}
