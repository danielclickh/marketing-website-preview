import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  PricingV2EntryCompute,
  PricingV2EntryPlan,
  PricingV2EntryProvider
} from '../../lib/api/strapi/types'

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

interface Context {
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
  setStorageCompressed: () => {}
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
        plans,
        setPlans,
        providers,
        setProviders,
        computes,
        setComputes,
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
        setStorageCompressed
      }}>
      {children}
    </PricingV2Context.Provider>
  )
}
