import { useMemo, useCallback } from 'react'
import { Select } from '../Select/Select' // Assuming SelectProps is imported correctly

export interface Option {
  value: number
  label: string
}

export interface NumericSelectProps {
  options: Array<Option>
  value: number
  id?: string
  onChange: (value: number) => void
}

export const NumericSelect: React.FC<NumericSelectProps> = ({
  options,
  value,
  id,
  onChange
}) => {
  const handleChange = useCallback(
    (newValue: string) => {
      const numericValue = Number(newValue)
      if (!Number.isNaN(numericValue)) {
        onChange(numericValue)
      }
    },
    [onChange]
  )
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
      id={id}
      options={optionsAsStrings}
      value={value.toString()}
      onChange={handleChange}
    />
  )
}
