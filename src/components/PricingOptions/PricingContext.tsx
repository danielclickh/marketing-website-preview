import { RegionPricingWithIcon } from './types'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

type ContextProps = {
  selectedRegion?: RegionPricingWithIcon
  setSelectedRegion: Dispatch<SetStateAction<RegionPricingWithIcon>>
}

const PricingContext = createContext<ContextProps>({
  selectedRegion: undefined,
  setSelectedRegion: () => {}
})

type Props = {
  children: ReactNode
  value: RegionPricingWithIcon
}

export const PricingContextProvider = ({ children, value }: Props) => {
  const [selectedRegion, setSelectedRegion] =
    useState<RegionPricingWithIcon>(value)

  const pricingValue = {
    selectedRegion,
    setSelectedRegion
  }

  useEffect(() => {
    setSelectedRegion(value)
  }, [value])
  return (
    <PricingContext.Provider value={pricingValue}>
      {children}
    </PricingContext.Provider>
  )
}

export const usePricing = () => {
  const result = useContext(PricingContext)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}
