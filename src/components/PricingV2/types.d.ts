import {
  PricingV2EntryCompute,
  PricingV2EntryDataSource,
  PricingV2EntryPlan,
  PricingV2EntryProvider,
  PricingV2EntryUseCase
} from '@/lib/api/strapi/types'

export type StorageUnits = 'gb' | 'tb' | 'pb'

export type PlanConfig = {
  planTemplateId: string
  aggregationIds: {
    compute: Array<string>
    storage: Array<string>
  }
}

export type PricingConfig = {
  plans: Record<string, PlanConfig>
}

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

export type ClickPipe = {
  source: string
  instances: number
  dataIngestedUnit?: StorageUnits
  dataIngestedSize?: number
}

export type Transfer = {
  type: 'inter-region' | 'public-internet'
  unit: StorageUnits
  size: number
  region?: string | null
}

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
export type ContextBackupFrequency = null | number
export type ContextBackupRetention = null | number
export type ContextEstimateBackupSize = null | boolean
export type ContextFullBackupUnit = null | StorageUnits
export type ContextFullBackupSize = null | number
export type ContextIncrementalBackupUnit = null | StorageUnits
export type ContextIncrementalBackupSize = null | number
export type ContextClickpipes = null | Array<ClickPipe>
export type ContextTransfers = null | Array<Transfer>

// Computed values
export type ContextComputeUnitPrice = null | number
export type ContextStorageUnitPrice = null | number
export type ContextComputeMinPrice = null | number
export type ContextComputeMaxPrice = null | number
export type ContextStoragePrice = null | number
export type ContextTotalMinPrice = null | number
export type ContextTotalMaxPrice = null | number
export type ContextTotalPriceRange = [number] | [number, number]

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
  dataSources: Array<PricingV2EntryDataSource>
  setDataSources: Dispatch<SetStateAction<Array<PricingV2EntryDataSource>>>

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
  estimateBackupSize: ContextEstimateBackupSize
  fullBackupUnit: ContextFullBackupUnit
  fullBackupSize: ContextFullBackupSize
  incrementalBackupUnit: ContextIncrementalBackupUnit
  incrementalBackupSize: ContextIncrementalBackupSize
  clickpipes: ContextClickpipes
  transfers: ContextTransfers

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

export type Data = Pick<
  Context,
  'plans' | 'providers' | 'computes' | 'dataSources'
>

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
  | 'estimateBackupSize'
  | 'fullBackupUnit'
  | 'fullBackupSize'
  | 'incrementalBackupUnit'
  | 'incrementalBackupSize'
  | 'clickpipes'
  | 'transfers'
>
