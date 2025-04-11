import { NumericSelectProps } from '../../CalculatorTypesOptions'
import { Select } from '../Select/Select'
import { useMemo } from 'react'

// Assuming SelectProps is imported correctly

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
