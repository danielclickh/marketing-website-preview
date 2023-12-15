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
}

export const NumericSelect: React.FC<NumericSelectProps> = ({
  options,
  value,
  id
}) => {
  const optionsAsStrings = useMemo(
    () =>
      options.map((option) => ({
        value: option.value.toString(),
        label: option.label
      })),
    [options]
  )

  return <Select id={id} options={optionsAsStrings} value={value.toString()} />
}
