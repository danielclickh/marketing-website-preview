import Select, { Options } from '../Select'
import {
  BYTE_UNITS,
  bytesToHumanReadable,
  humanReadableParts,
  humanReadableToBytes
} from '@/lib/utils/memory'
import { useCallback, useMemo } from 'react'

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
  // Get the minimum value in bytes
  const minBytes: number | null = useMemo(() => {
    return min ? humanReadableToBytes(min) : null
  }, [min])

  // Get the maximum value in bytes
  const maxBytes: number | null = useMemo(() => {
    return max ? humanReadableToBytes(max) : null
  }, [max])

  // All-in-one validator and setter
  const validateBytesValue = useCallback(
    (bytes: number | null) => {
      if (bytes === null) {
        return null
      } else if (minBytes && bytes < minBytes) {
        return minBytes
      } else if (maxBytes && bytes > maxBytes) {
        return maxBytes
      }

      return bytes
    },
    [minBytes, maxBytes]
  )

  // Create filtered options list, removing units outside the min/max range
  const units: Options = useMemo(() => {
    let options: Options = []

    const minParts = min ? humanReadableParts(min) : null
    const maxParts = max ? humanReadableParts(max) : null

    // If the min value is zero (e.g. 0GB)
    const minBytesLower =
      minParts?.unit && minParts.value === 0
        ? humanReadableToBytes(`1${minParts.unit}`)
        : null

    // If the max value is zero (e.g. 0TB)
    const maxBytesUpper =
      maxParts?.unit && maxParts.value === 0
        ? humanReadableToBytes(`1${maxParts.unit}`)
        : null

    BYTE_UNITS.forEach((unit) => {
      let passesMinimum = false
      let passesMaximum = false

      const oneUnitBytes = humanReadableToBytes(`1${unit}`)

      if (minBytes !== null || minBytesLower !== null) {
        passesMinimum =
          oneUnitBytes >= (minBytesLower !== null ? minBytesLower : minBytes)
      }

      if (maxBytes !== null || maxBytesUpper !== null) {
        passesMaximum =
          oneUnitBytes <= (maxBytesUpper !== null ? maxBytesUpper : maxBytes)
      }

      if (passesMinimum && passesMaximum) {
        options.push({
          value: unit,
          label: unit
        })
      }
    })
    return options
  }, [min, max, minBytes, maxBytes])

  // Get the corrisponding input values for the byteValue
  const { value: inputValue, unit: unitValue } = useMemo(() => {
    const defaultValue = {
      value: null,
      unit: units?.[0]?.value || null
    }

    if (!value) return defaultValue

    return humanReadableParts(value, defaultValue)
  }, [value, units])

  // Send value up to parent
  const handleOnChange = useCallback(
    (bytes: number | null, userFormatted: null | string = null) => {
      if (onChange) {
        onChange({
          bytes: bytes,
          formatted:
            userFormatted ??
            (bytes !== null ? bytesToHumanReadable(bytes) : null)
        })
      }
    },
    [onChange]
  )

  // Update bytesValue on input change
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value.trim().length) {
        handleOnChange(null)
      } else {
        const userValue = Math.round(Number(event.target.value || '0'))
        const bytesValue = humanReadableToBytes(`${userValue}${unitValue}`)
        const validatedValue = validateBytesValue(bytesValue)
        const isValid = bytesValue === validatedValue
        handleOnChange(
          validatedValue,
          isValid ? `${userValue}${unitValue}` : undefined
        )
      }
    },
    [unitValue, validateBytesValue, handleOnChange]
  )

  // Update bytesValue on select change
  const handleSelectChange = useCallback(
    (userValue: string) => {
      const bytesValue = humanReadableToBytes(`${inputValue}${userValue}`)
      const validatedValue = validateBytesValue(bytesValue)
      const isValid = bytesValue === validatedValue
      handleOnChange(
        validatedValue,
        isValid ? `${inputValue}${userValue}` : undefined
      )
    },
    [inputValue, validateBytesValue, handleOnChange]
  )

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        className={`${inputWidth[uiSplit]} relative h-10 cursor-text rounded border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none`}
        type='number'
        min={0}
        step={1}
        value={inputValue ? inputValue.toString() : ''}
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
