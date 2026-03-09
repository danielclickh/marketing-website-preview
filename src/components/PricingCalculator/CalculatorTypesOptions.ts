import { ReactNode } from 'react'

export type Tier = 'Development' | 'Production'
export type Provider = 'aws' | 'gcp' | 'azure'
export interface PricingData {
  computeUnitPrice: number
  storageUnitPrice: number
  storageUnitPriceDev?: number
  computeUnitPriceDev?: number
  storageUnitPriceProd?: number
  computeUnitPriceProd?: number
}
export interface Option<T extends string = string> {
  value: T
  label: string
  tooltip?: string
  id?: string
}

export interface NumericOption<T extends string = string> {
  value: number
  label: string
  tooltip?: string
  id?: string
  tier?: Array<String>
}

export interface RangeSliderProps {
  value: number
}
export interface NumericSelectProps {
  options: Array<NumericOption>
  value: number
  id?: string
  disabled?: boolean
}

export interface SelectProps {
  options: Array<Option>
  value: string
  id?: string
  disabled?: boolean
}

export interface ToggleButtonsProps<T extends string = string> {
  options: Array<Option<T>>
  value: string
}

export interface FormControlProps {
  children: ReactNode
  label: string
  helpText?: string
  tooltip?: string
  errorText?: string
  marginBottom?: boolean
  id?: string
}

export const acceptableRegions = [
  { provider: 'aws', region: 'us-east-2', tier: ['Production', 'Development'] },
  { provider: 'aws', region: 'us-west-2', tier: ['Production', 'Development'] },
  { provider: 'aws', region: 'us-east-1', tier: ['Production', 'Development'] },
  { provider: 'aws', region: 'eu-west-1', tier: ['Production', 'Development'] },
  { provider: 'aws', region: 'eu-west-2', tier: ['Production', 'Development'] },
  {
    provider: 'aws',
    region: 'eu-central-1',
    tier: ['Production', 'Development']
  },
  { provider: 'aws', region: 'ap-northeast-1', tier: ['Production'] },
  {
    provider: 'aws',
    region: 'ap-southeast-1',
    tier: ['Production', 'Development']
  },
  {
    provider: 'aws',
    region: 'ap-south-1',
    tier: ['Production', 'Development']
  },
  {
    provider: 'aws',
    region: 'ap-southeast-2',
    tier: ['Production', 'Development']
  },
  {
    provider: 'gcp',
    region: 'us-central1',
    tier: ['Production', 'Development']
  },
  { provider: 'gcp', region: 'us-east1', tier: ['Production', 'Development'] },
  {
    provider: 'gcp',
    region: 'europe-west4',
    tier: ['Production', 'Development']
  },
  {
    provider: 'gcp',
    region: 'asia-southeast1',
    tier: ['Production', 'Development']
  },

  {
    provider: 'azure',
    region: 'westus3',
    tier: ['Production']
  },
  {
    provider: 'azure',
    region: 'eastus2',
    tier: ['Production']
  },
  {
    provider: 'azure',
    region: 'germanywestcentral',
    tier: ['Production']
  }
]

export const config = {
  planId: '0f8fc0ba-d098-4b49-94fd-344204ed87c2',
  computeAggregationId: 'b39b23b9-4016-4016-8050-f473517048ff',
  storageAggregationId: '680fc216-be2b-4b26-8a3a-3e1f385305dd'
}

export const configStaging = {
  planId: 'f0b7690e-9d26-4dbe-940b-1b9be7181cec',
  computeAggregationId: '79a1bcaf-62e6-4202-bf72-dd0e718e62ab',
  storageAggregationId: '48f71a43-05cf-4a01-bafc-eb84ef340493'
}

export const tierOptions: Array<Option<Tier>> = [
  {
    value: 'Production',
    label: 'Production',
    tooltip: 'Designed to handle production workloads'
  },
  {
    value: 'Development',
    label: 'Development',
    tooltip: 'Great for smaller workloads and starter projects'
  }
]

export const providerOptions: Array<Option<Provider>> = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' },
  { value: 'azure', label: 'Azure' }
]

//to calculate vCPU, you divide the GiB by 4
export const computeOptions: Array<NumericOption> = [
  {
    value: 16,
    label: '16 GiB RAM, 2 vCPU',
    tier: ['Development']
  },
  { value: 24, label: '24 GiB RAM, 6 vCPU', tier: ['Production'] },
  { value: 48, label: '48 GiB RAM, 12 vCPU', tier: ['Production'] },
  { value: 96, label: '96 GiB RAM, 24 vCPU', tier: ['Production'] },
  { value: 192, label: '192 GiB RAM, 48 vCPU', tier: ['Production'] },
  { value: 360, label: '360 GiB RAM, 90 vCPU', tier: ['Production'] },
  { value: 720, label: '720 GiB RAM, 180 vCPU', tier: ['Production'] },
  { value: 1080, label: '1080 GiB RAM, 270 vCPU', tier: ['Production'] },
  { value: 1800, label: '1800 GiB RAM, 450 vCPU', tier: ['Production'] },
  { value: 3600, label: '3600 GiB RAM, 960 vCPU', tier: ['Production'] }
]

export const storageUnitOptionsTiered = [
  {
    value: 'gb',
    label: 'GB',
    tier: ['Development', 'Production']
  },
  {
    value: 'tb',
    label: 'TB',
    tier: ['Development', 'Production']
  },
  {
    value: 'pb',
    label: 'PB',
    tier: ['Production']
  }
]

export function calculateComputeMargin(tier: string, computePrice: number) {
  if (tier === 'Development') {
    return Number(computePrice * 60 * 2).toFixed(4)
  }
  return Number(computePrice * 60 * 3).toFixed(4)
}
