import { CheckIcon } from '@heroicons/react/solid'
import { useCallback, useMemo } from 'react'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import DataSize, { Value } from '../../ui/DataSize'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'

export default function StorageSelector() {
  const { setValues, planEntry, storageUnit, storageSize, storageCompressed } =
    usePricingV2Context()

  const maxSotrageSize = useMemo(() => {
    return planEntry?.maxStorageCapacity
  }, [planEntry])

  const onStorageSizeChange = useCallback(
    ({ size, unit }: Value) => {
      setValues({ storageUnit: unit, storageSize: size })
    },
    [setValues]
  )

  const onStorageCompressedChange = useCallback(
    (value: any) => {
      setValues({ storageCompressed: value })
    },
    [setValues]
  )

  const compressionApplied = !storageCompressed && storageSize && storageUnit

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
        <div className=''>
          <Label>Data volume</Label>
          <DataSize
            maxGb={maxSotrageSize}
            sizeValue={storageSize}
            unitValue={storageUnit}
            onChange={onStorageSizeChange}
          />
        </div>
        <div className=''>
          <Label tooltip='If your data is not compressed, ClickHouse will apply up to 10x compression.'>
            Is your data compressed?
          </Label>
          <Radios
            options={[
              { value: false, label: 'No' },
              { value: true, label: 'Yes' }
            ]}
            value={storageCompressed}
            onChange={onStorageCompressedChange}
          />
        </div>
      </div>
      <div className='mt-3 text-xs text-slate-300'>
        {compressionApplied ? (
          <p className='flex items-center gap-x-2 text-[#CCFFD0]'>
            <CheckIcon className='h-4 w-4' />
            {parseFloat((storageSize! / 10).toFixed(1))}
            {storageUnit?.toLocaleUpperCase()} after compression
          </p>
        ) : (
          <p>No compression applied</p>
        )}
      </div>
    </div>
  )
}
