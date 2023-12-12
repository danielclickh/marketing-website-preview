import React, { useCallback, useMemo } from 'react'

import { Select } from '../Select/Select'

export interface Option {
  value: number
  label: string
}

export interface NumericSelectProps {
  options: Array<Option>
  value: number
  onChange: (value: number) => void
}

export const NumericSelect: React.FC<NumericSelectProps> = ({
  options,
  value,
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
      options={optionsAsStrings}
      value={value.toString()}
      onChange={handleChange}
    />
  )
}
