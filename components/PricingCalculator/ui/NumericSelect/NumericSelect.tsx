import { useMemo, useCallback } from 'react'
import { Select } from '../Select/Select' // Assuming SelectProps is imported correctly

export interface Option {
  value: number
  label: string
  tier?: string
}

export interface NumericSelectProps {
  options: Array<Option>
  value: number
  id?: string
  disabled?: boolean
}

export const NumericSelect: React.FC<NumericSelectProps> = ({
  options,
  value,
  id,
  disabled
}) => {
  const optionsAsStrings = useMemo(
    () =>
      options.map((option) => ({
        value: option.value.toString(),
        label: option.label
      })),
    [options]
  )

  return (
    <Select
      disabled={disabled}
      id={id}
      options={optionsAsStrings}
      value={value.toString()}
    />
  )
}
