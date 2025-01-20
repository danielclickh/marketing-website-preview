import {
  createContext,
  Dispatch,
  SetStateAction,
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
import { aggregationIds } from '../PricingV2/config'

const AVG_DAYS_PER_MONTH = 30.41

type PricingFile = Record<
  string,
  Array<{
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
>

export type ContextPlan = null | string
export type ContextProvider = null | string
export type ContextRegion = null | string
export type ContextHours = null | number
export type ContextComputeMinSize = null | number
export type ContextComputeMaxSize = null | number
export type ContextReplicas = null | number
export type ContextStorageUnit = null | string
export type ContextStorageSize = null | number
export type ContextStorageCompressed = null | boolean

export type ContextComputeUnitPrice = null | number
export type ContextStorageUnitPrice = null | number
export type ContextComputeMinPrice = null | number
export type ContextComputeMaxPrice = null | number
export type ContextStoragePrice = null | number
export type ContextTotalMinPrice = null | number
export type ContextTotalMaxPrice = null | number

export interface Context {
  // Data sources
  plans: Array<PricingV2EntryPlan>
  setPlans: Dispatch<SetStateAction<Array<PricingV2EntryPlan>>>
  providers: Array<PricingV2EntryProvider>
  setProviders: Dispatch<SetStateAction<Array<PricingV2EntryProvider>>>
  computes: Array<PricingV2EntryCompute>
  setComputes: Dispatch<SetStateAction<Array<PricingV2EntryCompute>>>

  // Form values
  plan: ContextPlan
  setPlan: Dispatch<SetStateAction<ContextPlan>>
  provider: ContextProvider
  setProvider: Dispatch<SetStateAction<ContextProvider>>
  region: ContextRegion
  setRegion: Dispatch<SetStateAction<ContextRegion>>
  hours: ContextHours
  setHours: Dispatch<SetStateAction<ContextHours>>
  computeMinSize: ContextComputeMinSize
  setComputeMinSize: Dispatch<SetStateAction<ContextComputeMinSize>>
  computeMaxSize: ContextComputeMaxSize
  setComputeMaxSize: Dispatch<SetStateAction<ContextComputeMaxSize>>
  replicas: ContextReplicas
  setReplicas: Dispatch<SetStateAction<ContextReplicas>>
  storageUnit: ContextStorageUnit
  setStorageUnit: Dispatch<SetStateAction<ContextStorageUnit>>
  storageSize: ContextStorageSize
  setStorageSize: Dispatch<SetStateAction<ContextStorageSize>>
  storageCompressed: ContextStorageCompressed
  setStorageCompressed: Dispatch<SetStateAction<ContextStorageCompressed>>

  // Calculated results
  computeUnitPrice: ContextComputeUnitPrice
  storageUnitPrice: ContextStorageUnitPrice
  computeMinPrice: ContextComputeMinPrice
  computeMaxPrice: ContextComputeMaxPrice
  storagePrice: ContextStoragePrice
  totalMinPrice: ContextTotalMinPrice
  totalMaxPrice: ContextTotalMaxPrice
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
  // Data sources
  plans: [],
  setPlans: () => {},
  providers: [],
  setProviders: () => {},
  computes: [],
  setComputes: () => {},

  // Form values
  plan: null,
  setPlan: () => {},
  provider: null,
  setProvider: () => {},
  region: null,
  setRegion: () => {},
  hours: null,
  setHours: () => {},
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

  // Calculated results
  computeUnitPrice: null,
  storageUnitPrice: null,
  computeMinPrice: null,
  computeMaxPrice: null,
  storagePrice: null,
  totalMinPrice: null,
  totalMaxPrice: null
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
  const [plans, setPlans] = useState<Array<PricingV2EntryPlan>>([])
  const [providers, setProviders] = useState<Array<PricingV2EntryProvider>>([])
  const [computes, setComputes] = useState<Array<PricingV2EntryCompute>>([])

  const [plan, setPlan] = useState<ContextPlan>(startingValues?.plan ?? null)
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

  // Find the pricing data for the combined plan, privder and region values
  const pricingData = useMemo(() => {
    if (!plan || !provider || !region || !(plan in pricingFile)) return null

    return (pricingFile as PricingFile)[plan].filter((result) => {
      return (
        result.cloudProvider?.toLowerCase() === provider &&
        result.region?.toLowerCase() === region
      )
    })
  }, [plan, provider, region])

  // Get the compute unit price from pricing file
  const computeUnitPrice: ContextComputeUnitPrice = useMemo(() => {
    if (pricingData) {
      return (
        pricingData
          .find((result) => result.aggregationId === aggregationIds.compute)
          ?.pricingBands.at(0)?.unitPrice || null
      )
    }
    return null
  }, [pricingData])

  // Get the storage unit price from pricing file
  const storageUnitPrice: ContextStorageUnitPrice = useMemo(() => {
    if (pricingData) {
      return (
        pricingData
          .find((result) => result.aggregationId === aggregationIds.storage)
          ?.pricingBands.at(0)?.unitPrice || null
      )
    }
    return null
  }, [pricingData])

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

  useEffect(() => {
    setPlans(data.plans)
    setProviders(data.providers)
    setComputes(data.computes)
  }, [data])

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

  return (
    <PricingV2Context.Provider
      value={{
        // Data sources
        plans,
        setPlans,
        providers,
        setProviders,
        computes,
        setComputes,

        // Form values
        plan,
        setPlan,
        provider,
        setProvider,
        region,
        setRegion,
        hours,
        setHours,
        computeMinSize,
        setComputeMinSize,
        computeMaxSize,
        setComputeMaxSize,
        replicas,
        setReplicas,
        storageUnit,
        setStorageUnit,
        storageSize,
        setStorageSize,
        storageCompressed,
        setStorageCompressed,

        // Computed results
        computeUnitPrice,
        storageUnitPrice,
        computeMinPrice,
        computeMaxPrice,
        storagePrice,
        totalMinPrice,
        totalMaxPrice
      }}>
      {children}
    </PricingV2Context.Provider>
  )
}
