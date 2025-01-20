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
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
]

const validateStorageSize = (value: number | null) => {
  if (value === null || value < 0) return 0
  return Math.min(value, 9999)
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
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-2 md:col-span-1'>
          <Label>Storage Volume</Label>
          <input
            className='relative h-10 w-full cursor-text rounded-[4px] border border-neutral-700 bg-neutral-725 px-3 text-left shadow-input focus:outline-none sm:text-sm md:max-w-[112px]'
            type='number'
            min={0}
            defaultValue={storageSize || 0}
            maxLength={4}
            onChange={onStorageSizeChange}
          />
        </div>
        <div className='col-span-2 md:col-span-1'>
          <Label>Storage Unit</Label>
          <Select
            options={STORAGE_UNITS}
            value={storageUnit}
            onChange={(value) => setStorageUnit(value)}
          />
        </div>
        <div className='col-span-4 mb-4 md:col-span-2'>
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
      <div
        className={` ${
          compressionApplied ? 'text-[#66FF73]' : 'text-white'
        } mb-10 mt-3 text-xs `}>
        {compressionApplied ? (
          <p>
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
