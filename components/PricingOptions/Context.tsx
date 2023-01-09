'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { RegionPricingWithIcon } from '../../app/pricing/types'
type ContextProps = {
  selectedRegion: RegionPricingWithIcon
  setSelectedRegion: Dispatch<SetStateAction<RegionPricingWithIcon>>
}
const Context = createContext<ContextProps>(undefined!)

type Props = {
  children: ReactNode
  value: RegionPricingWithIcon
}

export const ContextProvider = ({ children, value }: Props) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionPricingWithIcon>(value)

  const pricingValue = {
    selectedRegion,
    setSelectedRegion
  }
  return <Context.Provider value={pricingValue}>{children}</Context.Provider>
}

export const usePricing = () => {
  const result = useContext(Context)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}
