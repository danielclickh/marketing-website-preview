import { clickpipeSizes } from '@/components/PricingV2/config'
import {
  PricingV2,
  PricingV2ComponentPlan,
  PricingV2ComponentProvider,
  PricingV2ComponentRegion,
  PricingV2ComponentUseCase
} from '@/lib/api/strapi/types'

export type StorageUnits = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB'

export type StorageValue = `${number}${StorageUnits}`

export type MeterPlanConfig = {
  planTemplateId: string
  aggregationIds: {
    compute: Array<string>
    storage: Array<string>
  }
}

export type MeterConfig = {
  plans: Record<string, MeterPlanConfig>
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
  dataIngested?: null | string | StorageValue
  size?: number
  replicas?: number
}

export type Transfer = {
  type: 'inter-region' | 'public-internet'
  value: null | string | StorageValue
  region?: string | null
}

// Ad-hoc
export type ContextStorageCameFrom = null | 'compute' | 'backups'

// User values
export type ContextPlan = null | string
export type ContextProvider = null | string
export type ContextRegion = null | string
export type ContextUseCase = null | string
export type ContextHours = null | number
export type ContextComputeMinSize = null | number
export type ContextComputeMaxSize = null | number
export type ContextReplicas = null | number
export type ContextStorage = null | string | StorageValue
export type ContextStorageCompressed = null | boolean
export type ContextBackupFrequency = null | number
export type ContextBackupRetention = null | number
export type ContextEstimateBackup = null | boolean
export type ContextFullBackup = null | string | StorageValue
export type ContextIncrementalBackup = null | string | StorageValue
export type ContextClickpipes = null | Array<ClickPipe>
export type ContextTransfers = null | Array<Transfer>

// Computed values
export type ContextComputeUnitPrice = null | number
export type ContextStorageUnitPrice = null | number
export type ContextComputeMinPrice = null | number
export type ContextComputeMaxPrice = null | number
export type ContextStoragePrice = null | number
export type ContextBackupsPrice = null | number
export type ContextClickpipesPrice = null | number
export type ContextTransfersPrice = null | number
export type ContextTotalMinPrice = null | number
export type ContextTotalMaxPrice = null | number
export type ContextTotalPriceRange = null | [number] | [number, number]

// Full context object
export interface Context {
  // Helper functions
  setValues: (values: Partial<Values & Adhoc>) => void
  getPlanPricingData: (value: string) => undefined | PricingFileItem
  getPlanPricingConfig: (value: string) => undefined | PlanConfig
  getUseCaseCompute: (
    storage: ContextStorage,
    storageCompressed: boolean,
    useCase: PricingV2ComponentUseCase
  ) =>
    | undefined
    | {
        computeMinSize: number
        computeMaxSize: number
        replicas: number
        hours: number
      }

  // Data sources
  sourceData: PricingV2

  // Ad-hoc
  storageCameFrom: ContextStorageCameFrom

  // User values
  plan: ContextPlan
  provider: ContextProvider
  region: ContextRegion
  useCase: ContextUseCase
  hours: ContextHours
  computeMinSize: ContextComputeMinSize
  computeMaxSize: ContextComputeMaxSize
  replicas: ContextReplicas
  storage: ContextStorage
  storageCompressed: ContextStorageCompressed
  backupFrequency: ContextBackupFrequency
  backupRetention: ContextBackupRetention
  estimateBackup: ContextEstimateBackup
  fullBackup: ContextFullBackup
  incrementalBackup: ContextIncrementalBackup
  clickpipes: ContextClickpipes
  transfers: ContextTransfers

  // Computed values
  planEntry: undefined | PricingV2ComponentPlan
  providerEntry: undefined | PricingV2ComponentProvider
  regionEntry: undefined | PricingV2ComponentRegion
  useCaseEntry: undefined | PricingV2ComponentUseCase
  computeUnitPrice: ContextComputeUnitPrice
  storageUnitPrice: ContextStorageUnitPrice
  computeMinPrice: ContextComputeMinPrice
  computeMaxPrice: ContextComputeMaxPrice
  storagePrice: ContextStoragePrice
  backupsPrice: ContextBackupsPrice
  clickpipesPrice: ContextClickpipesPrice
  transfersPrice: ContextTransfersPrice
  totalMinPrice: ContextTotalMinPrice
  totalMaxPrice: ContextTotalMaxPrice
  totalPriceRange: ContextTotalPriceRange
}

export type Data = Context['sourceData']

export type Adhoc = Pick<Context, 'storageCameFrom'>

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
  | 'storage'
  | 'storageCompressed'
  | 'backupFrequency'
  | 'backupRetention'
  | 'estimateBackup'
  | 'fullBackup'
  | 'incrementalBackup'
  | 'clickpipes'
  | 'transfers'
>
