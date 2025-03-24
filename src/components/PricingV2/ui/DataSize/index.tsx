import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BYTE_UNITS,
  bytesToHumanReadable,
  humanReadableToBytes
} from '../../../../lib/utils/memory'
import Select, { Options } from '../Select'

export type Value = {
  bytes: null | number
  formatted: null | string
}

type UiSplit = '7/3' | '1/1'

export interface DataSizeProps {
  min?: string | null
  max?: string | null
  value?: string | null
  onChange: (value: Value) => void
  className?: string
  uiSplit?: UiSplit
}

const inputWidth: Record<UiSplit, string> = {
  '7/3': 'w-1/2 lg:w-2/3',
  '1/1': 'w-1/2'
}

const selectWidth: Record<UiSplit, string> = {
  '7/3': 'w-1/2 lg:w-1/3',
  '1/1': 'w-1/2'
}

export default function DataSize({
  min,
  max,
  value,
  onChange,
  className = '',
  uiSplit = '7/3'
}: DataSizeProps) {
  const [bytesValue, setBytesValue] = useState<number | null>(null)

  // Get the minimum value in bytes
  const minBytes: number | null = useMemo(() => {
    return min ? humanReadableToBytes(min) : null
  }, [min])

  // Get the maximum value in bytes
  const maxBytes: number | null = useMemo(() => {
    return max ? humanReadableToBytes(max) : null
  }, [max])

  // All-in-one validator and setter
  const validateAndSetBytesValue = useCallback(
    (bytes: number | null) => {
      if (bytes === null) {
        setBytesValue(null)
      } else if (minBytes && bytes < minBytes) {
        setBytesValue(minBytes)
      } else if (maxBytes && bytes > maxBytes) {
        setBytesValue(maxBytes)
      } else {
        setBytesValue(bytes)
      }
    },
    [minBytes, maxBytes, setBytesValue]
  )

  // Create filtered options list, removing units outside the min/max range
  const units: Options = useMemo(() => {
    let options = BYTE_UNITS

    // Remove units below the minimum
    if (minBytes) {
      options = options.filter(
        (unit) => humanReadableToBytes(`1${unit}`) >= minBytes
      )
    }

    // Remove units above the maximum
    if (maxBytes) {
      options = options.filter(
        (unit) => humanReadableToBytes(`1${unit}`) <= maxBytes
      )
    }

    return options.map((unit) => {
      return {
        value: unit,
        label: unit
      }
    })
  }, [minBytes, maxBytes])

  // Generate human readable value
  const formattedValue = useMemo(() => {
    return bytesValue ? bytesToHumanReadable(bytesValue) : null
  }, [bytesValue])

  // Get the corrisponding input values for the byteValue
  const { value: inputValue, unit: unitValue } = useMemo(() => {
    const defaultValue = {
      value: 0,
      unit: units?.[0]?.value || null
    }

    if (!formattedValue) return defaultValue

    const pattern = new RegExp(
      `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${BYTE_UNITS.join('|')})$`,
      'i'
    )

    // If is a match, return example: [ "-2.75GB", "-2.75", "GB" ]
    const matches = formattedValue.trim().match(pattern)

    if (!matches) return defaultValue

    const value = Number(matches[1])
    const unit = matches[2]

    return {
      value,
      unit
    }
  }, [formattedValue, units])

  // Sync prop with local state
  useEffect(() => {
    validateAndSetBytesValue(value ? humanReadableToBytes(value) : null)
  }, [value])

  // Fire on change callback
  useEffect(() => {
    if (onChange) {
      onChange({
        bytes: bytesValue,
        formatted: formattedValue
      })
    }
  }, [bytesValue, formattedValue])

  // Update bytesValue on input change
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const userValue = Math.round(Number(event.target.value || '0'))
      validateAndSetBytesValue(
        unitValue && userValue
          ? humanReadableToBytes(`${userValue}${unitValue}`)
          : null
      )
    },
    [validateAndSetBytesValue, unitValue]
  )

  // Update bytesValue on select change
  const handleSelectChange = useCallback(
    (userValue: string) => {
      validateAndSetBytesValue(
        userValue && inputValue
          ? humanReadableToBytes(`${inputValue}${userValue}`)
          : null
      )
    },
    [validateAndSetBytesValue, inputValue]
  )

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        className={`${inputWidth[uiSplit]} relative h-10 cursor-text rounded border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none`}
        type='number'
        min={0}
        step={1}
        value={inputValue?.toString() || '0'}
        onChange={handleInputChange}
      />
      <div className={`${selectWidth[uiSplit]} flex flex-col justify-end`}>
        <Select
          options={units}
          value={unitValue}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  )
}
