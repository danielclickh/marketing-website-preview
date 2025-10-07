import { ContextStorageCameFrom } from '../../types'
import DataSize, { Value } from '../../ui/DataSize'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'
import FieldContainer from '@/components/PricingV2/ui/FieldContainer'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { bytesToHumanReadable, humanReadableToBytes } from '@/lib/utils/memory'
import { CheckIcon } from '@heroicons/react/solid'
import { useCallback, useMemo } from 'react'

export interface StorageSelectorProps {
  cameFrom?: ContextStorageCameFrom
}

export default function StorageSelector({ cameFrom }: StorageSelectorProps) {
  const { setValues, planEntry, storage, storageCompressed } =
    usePricingV2Context()

  const maxSotrageSize = useMemo(() => {
    return planEntry?.maxStorageCapacity
  }, [planEntry])

  const onStorageSizeChange = useCallback(
    ({ formatted }: Value) => {
      setValues({
        storage: formatted,
        storageCameFrom: cameFrom
      })
    },
    [setValues, cameFrom]
  )

  const onStorageCompressedChange = useCallback(
    (value: any) => {
      setValues({ storageCompressed: value, storageCameFrom: cameFrom })
    },
    [setValues, cameFrom]
  )

  return (
    <div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
        <FieldContainer label='Data volume'>
          <DataSize
            min='0GB'
            max={maxSotrageSize ? `${maxSotrageSize}GB` : '999PB'}
            value={storage ?? '0GB'}
            onChange={onStorageSizeChange}
          />
        </FieldContainer>
        <FieldContainer
          label='Is your data compressed?'
          tooltip='If your data is not compressed, ClickHouse will apply up to 10x compression.'>
          <Radios
            className='!mt-0 mb-3'
            options={[
              { value: false, label: 'No' },
              { value: true, label: 'Yes' }
            ]}
            value={storageCompressed}
            onChange={onStorageCompressedChange}
          />
        </FieldContainer>
      </div>
      {!storageCompressed && (
        <>
          {storage && (
            <p className='mt-3 flex items-center gap-x-2 text-xs text-[#CCFFD0]'>
              <CheckIcon className='h-4 w-4' />
              {bytesToHumanReadable(humanReadableToBytes(storage) / 10)} after
              compression
            </p>
          )}
        </>
      )}
    </div>
  )
}
