import { ReactNode } from 'react'

export type Tier = 'Development' | 'Production'
export type Provider = 'aws' | 'gcp'
export interface PricingData {
  computeUnitPrice: number
  storageUnitPrice: number
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
  { provider: 'aws', region: 'us-east-2' },
  { provider: 'aws', region: 'us-west-2' },
  { provider: 'aws', region: 'us-east-1' },
  { provider: 'aws', region: 'eu-west-1' },
  { provider: 'aws', region: 'eu-west-2' },
  { provider: 'aws', region: 'eu-central-1' },
  { provider: 'aws', region: 'ap-southeast-1' },
  { provider: 'aws', region: 'ap-south-1' },
  { provider: 'aws', region: 'ap-southeast-2' },
  { provider: 'gcp', region: 'us-central1' },
  { provider: 'gcp', region: 'us-east1' },
  { provider: 'gcp', region: 'europe-west4' },
  { provider: 'gcp', region: 'asia-southeast1' }
]

export const config = {
  planId: '01b9a9d2-a36a-4a1d-969b-b24fc756cd64',
  computeAggregationId: '3797d30c-b13c-480b-9068-baf1e340a589',
  storageAggregationId: 'b5843a1b-a1bb-403d-a929-3ce8486e00d9'
}

export const tierOptions: Array<Option<Tier>> = [
  {
    value: 'Development',
    label: 'Development',
    tooltip: 'Great for smaller workloads and starter projects'
  },
  {
    value: 'Production',
    label: 'Production',
    tooltip: 'Designed to handle production workloads'
  }
]

export const providerOptions: Array<Option<Provider>> = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'GCP' }
]

export const dataOptions: Array<NumericOption> = [
  { value: 250, label: '250GB', tier: ['Development', 'Production'] },
  { value: 500, label: '500GB', tier: ['Development', 'Production'] },
  { value: 1024, label: '1TB', tier: ['Development', 'Production'] },
  { value: 10240, label: '10TB', tier: ['Development', 'Production'] },
  { value: 102400, label: '100TB', tier: ['Production'] },
  { value: 1048576, label: '1PB', tier: ['Production'] },
  { value: 5120000, label: '5PB', tier: ['Production'] },
  { value: 10240000, label: '10PB', tier: ['Production'] }
]

export const computeOptions: Array<NumericOption> = [
  { value: 16, label: '16 GiB RAM, 2 vCPU', tier: ['Development'] },
  { value: 24, label: '24 GiB RAM, 6 vCPU', tier: ['Production'] },
  { value: 48, label: '48 GiB RAM, 12 vCPU', tier: ['Production'] },
  { value: 96, label: '96 GiB RAM, 24 vCPU', tier: ['Production'] },
  { value: 192, label: '192 GiB RAM, 48 vCPU', tier: ['Production'] },
  { value: 360, label: '360 GiB RAM, 96 vCPU', tier: ['Production'] },
  { value: 720, label: '720 GiB RAM, 192 vCPU', tier: ['Production'] }
]
