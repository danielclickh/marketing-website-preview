import { CheckIcon } from '@heroicons/react/solid'
import { useCallback, useMemo } from 'react'
import {
  bytesToHumanReadable,
  humanReadableToBytes
} from '@/lib/utils/memory'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import DataSize, { Value } from '../../ui/DataSize'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'

export default function StorageSelector() {
  const { setValues, planEntry, storage, storageCompressed } =
    usePricingV2Context()

  const maxSotrageSize = useMemo(() => {
    return planEntry?.maxStorageCapacity
  }, [planEntry])

  const onStorageSizeChange = useCallback(
    ({ formatted }: Value) => {
      setValues({
        storage: formatted
      })
    },
    [setValues]
  )

  const onStorageCompressedChange = useCallback(
    (value: any) => {
      setValues({ storageCompressed: value })
    },
    [setValues]
  )

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
        <div className=''>
          <Label>Data volume</Label>
          <DataSize
            min='0GB'
            max={maxSotrageSize ? `${maxSotrageSize}GB` : '999PB'}
            value={storage ?? '0GB'}
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
        {!storageCompressed && (
          <>
            {storage && (
              <p className='flex items-center gap-x-2 text-[#CCFFD0]'>
                <CheckIcon className='h-4 w-4' />
                {bytesToHumanReadable(humanReadableToBytes(storage) / 10)} after
                compression
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
