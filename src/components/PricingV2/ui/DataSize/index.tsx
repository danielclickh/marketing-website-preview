import { useEffect, useMemo, useState } from 'react'
import {
  BYTE_UNITS,
  bytesTo,
  humanReadableToBytes
} from '../../../../lib/utils/memory'
import Select, { Options } from '../Select'

export type Value = {
  size: null | number
  unit: null | string
  formatted: null | string
}

export interface DataSizeProps {
  min?: string | null
  max?: string | null
  value?: string | null
  onChange: (value: Value) => void
  className?: string
}

const valueParts = (
  formattedValue: string | null,
  defaultValue: any = null
) => {
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
}

export default function DataSize({
  min,
  max,
  value,
  onChange,
  className = ''
}: DataSizeProps) {
  const [inputValue, setInputValue] = useState<number | null>(null)
  const [unitValue, setUnitValue] = useState<string | null>(null)

  const formattedValue = useMemo(() => {
    return inputValue && unitValue ? `${inputValue}${unitValue}` : null
  }, [inputValue, unitValue])

  const minBytes: number | null = useMemo(() => {
    return min ? humanReadableToBytes(min) : null
  }, [min])

  const maxBytes: number | null = useMemo(() => {
    return max ? humanReadableToBytes(max) : null
  }, [max])

  const valueBytes = useMemo(() => {
    return formattedValue ? humanReadableToBytes(formattedValue) : null
  }, [formattedValue])

  useEffect(() => {
    if (value) {
      const parts = valueParts(value)
      if (parts) {
        setInputValue(Math.round(parts.value))
        setUnitValue(parts.unit)
      }
    }
  }, [value])

  // Validate value
  useEffect(() => {
    if (unitValue && valueBytes && minBytes && valueBytes < minBytes) {
      setInputValue(bytesTo(minBytes, unitValue))
    }

    if (unitValue && valueBytes && maxBytes && valueBytes > maxBytes) {
      setInputValue(bytesTo(maxBytes, unitValue))
    }
  }, [minBytes, maxBytes, valueBytes, unitValue])

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

  useEffect(() => {
    if (onChange) {
      onChange({
        size: inputValue,
        unit: unitValue,
        formatted: formattedValue
      })
    }
  }, [inputValue, unitValue, formattedValue])

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-3 gap-2 ${className}`}>
      <input
        className='relative lg:col-span-2 h-10 w-full cursor-text rounded border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none'
        type='number'
        min={0}
        step={1}
        value={inputValue?.toString() || '0'}
        onChange={(event) => {
          const inputValue = event.target.value || '0'
          setInputValue(Math.round(Number(inputValue)))
        }}
      />
      <div className='flex flex-col justify-end'>
        <Select
          options={units}
          value={unitValue || units?.[0]?.value}
          onChange={setUnitValue}
        />
      </div>
    </div>
  )
}
