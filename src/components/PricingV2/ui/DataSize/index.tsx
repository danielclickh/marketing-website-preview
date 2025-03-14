import { useCallback, useMemo } from 'react'
import {
  StorageUnits,
  usePricingV2Context
} from '../../../PricingV2ContextProvider'
import Select, { Option } from '../Select'

export type Value = { size: null | number; unit: null | StorageUnits }

export interface DataSizeProps {
  maxGb?: number | null
  sizeValue?: Value['size']
  unitValue?: Value['unit']
  onChange: (value: Value) => void
}

export default function DataSize({
  sizeValue,
  unitValue,
  maxGb,
  onChange
}: DataSizeProps) {
  const { validateDataSize } = usePricingV2Context()

  // Calculate the maximum input value
  const maxInput: number | undefined = useMemo(() => {
    if (!maxGb) return undefined

    if (unitValue === 'pb') {
      return maxGb / 1000000 // 1,000,000 GB = 1 PB
    } else if (unitValue === 'tb') {
      return maxGb / 1000 // 1,000 GB = 1 TB
    }

    return maxGb // 1 GB = 1 GB
  }, [maxGb, unitValue])

  const maxSizeChars = useMemo(() => {
    return maxInput?.toString().length || undefined
  }, [maxInput])

  const units = useMemo(() => {
    let gbOption: Option = { value: 'gb', label: 'GB' }
    let tbOption: Option = { value: 'tb', label: 'TB' }
    let pbOption: Option = { value: 'pb', label: 'PB' }

    if (maxGb) {
      if (maxGb < 1000) {
        tbOption.disabled = true
        pbOption.disabled = true
      } else if (maxGb < 1000000) {
        pbOption.disabled = true
      }
    }

    return [gbOption, tbOption, pbOption]
  }, [maxGb])

  const setValues = useCallback(
    (values: { size?: null | number; unit?: null | StorageUnits }) => {
      const newValues = validateDataSize(
        values?.size ?? sizeValue ?? 0,
        values?.unit ?? unitValue ?? 'gb',
        maxGb
      )

      onChange(newValues)
    },
    [validateDataSize, maxGb, unitValue, sizeValue]
  )

  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
      <input
        className='relative lg:col-span-2 h-10 w-full cursor-text rounded border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none'
        type='number'
        min={0}
        max={maxInput}
        value={sizeValue?.toString() || '0'}
        maxLength={maxSizeChars}
        onChange={(event) => {
          const inputValue = event.target.value || '0'
          setValues({ size: Number(inputValue) })
        }}
      />
      <div className='flex flex-col justify-end'>
        <Select
          options={units}
          value={unitValue}
          onChange={(value) => setValues({ unit: value })}
        />
      </div>
    </div>
  )
}
