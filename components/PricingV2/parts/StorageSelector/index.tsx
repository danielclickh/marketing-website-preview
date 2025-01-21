import { CheckIcon } from '@heroicons/react/solid'
import React, { useCallback, useEffect, useMemo } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'
import Select from '../../ui/Select'

const STORAGE_UNITS: Array<{ value: any; label: string }> = [
  { value: 'gb', label: 'GB' },
  { value: 'tb', label: 'TB' },
  { value: 'pb', label: 'PB' }
]

const STORAGE_COMPRESSED: Array<{ value: boolean; label: string }> = [
  { value: false, label: 'No' },
  { value: true, label: 'Yes' }
]

const validateStorageSize = (value: number | null) => {
  // Set 500 as the default value
  if (value === null) return 500

  // Limit value to 0-9999
  return Math.max(Math.min(value, 9999), 0)
}

const validateStorageUnit = (value: string | null) => {
  if (!value || !STORAGE_UNITS.find((item) => item.value === value)) {
    return STORAGE_UNITS.at(0)?.value || null
  }
  return value
}

const validateStorageCompressed = (value: boolean | null) => {
  if (value === null) return STORAGE_COMPRESSED[0].value
  return value
}

export default function StorageSelector() {
  const {
    storageUnit,
    setStorageUnit,
    storageSize,
    setStorageSize,
    storageCompressed,
    setStorageCompressed
  } = usePricingV2Context()

  const onStorageSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value || '0'
      const truncatedValue = Number(inputValue.slice(0, 4)) // Truncate to 4 characters
      setStorageSize(truncatedValue)
    },
    [setStorageSize]
  )

  const compressionApplied = useMemo(() => {
    return !storageCompressed && storageSize && storageUnit
  }, [storageCompressed, storageSize, storageUnit])

  useEffect(() => {
    const validated = validateStorageSize(storageSize)
    if (storageSize !== validated) setStorageSize(validated)
  }, [storageSize])

  useEffect(() => {
    const validated = validateStorageUnit(storageUnit)
    if (storageUnit !== validated) setStorageUnit(validated)
  }, [storageUnit])

  useEffect(() => {
    const validated = validateStorageCompressed(storageCompressed)
    if (storageCompressed !== validated) setStorageCompressed(validated)
  }, [storageCompressed])

  return (
    <div>
      <div className='grid grid-cols-4 gap-3'>
        <div className='col-span-2 md:col-span-1'>
          <Label>Data volume</Label>
          <input
            className='relative h-10 w-full cursor-text rounded-[4px] border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none sm:text-sm md:max-w-[112px]'
            type='number'
            min={0}
            defaultValue={storageSize || 0}
            maxLength={4}
            onChange={onStorageSizeChange}
          />
        </div>
        <div className='col-span-2 flex flex-col justify-end md:col-span-1'>
          <Select
            options={STORAGE_UNITS}
            value={storageUnit}
            onChange={(value) => setStorageUnit(value)}
          />
        </div>
        <div className='col-span-4 md:col-span-2 md:pl-2'>
          <Label tooltip='If your data is not compressed, ClickHouse will apply up to 10x compression.'>
            Is your data compressed?
          </Label>
          <Radios
            options={STORAGE_COMPRESSED}
            value={storageCompressed}
            onChange={(value) => setStorageCompressed(value)}
          />
        </div>
      </div>
      <div className='mt-3 text-xs text-slate-300'>
        {compressionApplied ? (
          <p className='flex items-center gap-x-2'>
            <CheckIcon className='h-4 w-4' />
            {parseFloat((storageSize! / 10).toFixed(1))}
            {STORAGE_UNITS.find((item) => item.value === storageUnit)?.label ??
              storageUnit}{' '}
            after compression
          </p>
        ) : (
          <p>No compression applied</p>
        )}
      </div>
    </div>
  )
}
