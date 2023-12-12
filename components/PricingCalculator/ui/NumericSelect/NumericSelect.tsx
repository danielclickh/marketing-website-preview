import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { Select } from '../Select/Select'

export interface Option {
  value: number
  label: string
}

export interface NumericSelectProps {
  options: Array<Option>
  value: number
  onChange: (value: number) => void
  id: string
}

export const NumericSelect: React.FC<NumericSelectProps> = ({
  options,
  value,
  onChange,
  id
}) => {
  const router = useRouter()
  const handleChange = useCallback(
    (newValue: string) => {
      const numericValue = Number(newValue)
      if (!Number.isNaN(numericValue)) {
        onChange(numericValue)

        router.push(
          {
            query: {
              ...router.query,
              volume: newValue
            }
          },
          undefined,
          { shallow: true }
        )
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
