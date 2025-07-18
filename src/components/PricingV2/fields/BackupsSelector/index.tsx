import { averageDaysPerMonth, backupIntervals } from '../../config'
import { ContextBackupFrequency } from '../../types'
import DataSize from '../../ui/DataSize'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'
import Select from '../../ui/Select'
import StorageSelector from '../StorageSelector'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { bytesToHumanReadable, humanReadableToBytes } from '@/lib/utils/memory'
import { useMemo } from 'react'

const frequencyOptions: Array<{
  value: Exclude<ContextBackupFrequency, null>
  label: string
}> = backupIntervals.map((internal) => {
  return {
    value: internal,
    label: internal === 1 ? 'Every hour' : `Every ${internal} hours`
  }
})

const generateRetentionOptions = (
  max: number,
  singular: string,
  plural: string
) => {
  let values: Array<{
    value: number
    label: string
  }> = []

  for (let i = 1; i <= max; i++) {
    values.push({
      value: i,
      label: i === 1 ? `${i} ${singular}` : `${i} ${plural}`
    })
  }

  return values
}

const retentionOptions = generateRetentionOptions(30, 'day', 'days')

export default function BackupsSelector() {
  const {
    setValues,
    storageCameFrom,
    storage,
    storageCompressed,
    backupFrequency,
    backupRetention,
    estimateBackup,
    fullBackup,
    incrementalBackup
  } = usePricingV2Context()

  const estimatedBackupsPerMonth = useMemo(() => {
    if (!backupFrequency) return null
    const hoursInMonth = averageDaysPerMonth * 24
    return Math.floor(hoursInMonth / backupFrequency)
  }, [backupFrequency])

  const esitmatedIncrementalBackupSize = useMemo(() => {
    if (!estimatedBackupsPerMonth || !storage) return null
    let storageBytes = humanReadableToBytes(storage)

    if (!storageBytes) return null

    // Apply standard 10x compression
    if (!storageCompressed) {
      storageBytes /= 10
    }

    return bytesToHumanReadable(storageBytes / 100)
  }, [estimatedBackupsPerMonth, storage, storageCompressed])

  const estimatedBackupSizeFormatted = useMemo(() => {
    if (
      !estimatedBackupsPerMonth ||
      !storage ||
      !esitmatedIncrementalBackupSize
    )
      return null
    let fullBytes = humanReadableToBytes(storage)
    const incrementalBytes = humanReadableToBytes(
      esitmatedIncrementalBackupSize
    )

    if (!fullBytes || !incrementalBytes) return null

    // Apply standard 10x compression
    if (!storageCompressed) {
      fullBytes /= 10
    }

    return bytesToHumanReadable(
      fullBytes + incrementalBytes * estimatedBackupsPerMonth
    )
  }, [estimatedBackupsPerMonth, esitmatedIncrementalBackupSize, storage])

  return (
    <>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div>
          <Label>Backup frequency</Label>
          <Select
            value={backupFrequency}
            options={frequencyOptions}
            onChange={(value) => setValues({ backupFrequency: value })}
          />
        </div>
        <div>
          <Label>Retention period</Label>
          <Select
            value={backupRetention}
            options={retentionOptions}
            onChange={(value) => setValues({ backupRetention: value })}
            maxHeight={320}
          />
        </div>

        <div className='md:col-span-2'>
          <Label tooltip='If you’re already a ClickHouse user, you can get this info from your service’s Backups page. '>
            Do you know the size of your full and incremental backup?
          </Label>
          <Radios
            options={[
              { value: false, label: 'No' },
              { value: true, label: 'Yes' }
            ]}
            value={!estimateBackup}
            onChange={(value) => {
              // Invert value before storing
              setValues({ estimateBackup: !value })
            }}
          />
          {estimateBackup &&
            (!storageCameFrom || storageCameFrom === 'backups') && (
              <div className='mt-4'>
                <StorageSelector cameFrom='backups' />
              </div>
            )}
          {storage &&
            estimateBackup &&
            estimatedBackupsPerMonth &&
            estimatedBackupSizeFormatted && (
              <p className='mt-4 text-sm'>
                You will have {estimatedBackupsPerMonth} backups per month with
                an estimated total size of {estimatedBackupSizeFormatted}. This
                is based on a storage volume of {storage} of{' '}
                {storageCompressed ? 'compressed' : 'uncompressed'} data,
                expected to grow or change by 1% between backups.
              </p>
            )}
        </div>

        {!estimateBackup && (
          <>
            <div>
              <Label>Full backup</Label>
              <DataSize
                min='0MB'
                max='999PB'
                value={fullBackup}
                onChange={(value) => setValues({ fullBackup: value.formatted })}
              />
            </div>
            <div>
              <Label>Incremental backup</Label>
              <DataSize
                min='0MB'
                max='999PB'
                value={incrementalBackup}
                onChange={(value) =>
                  setValues({ incrementalBackup: value.formatted })
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
