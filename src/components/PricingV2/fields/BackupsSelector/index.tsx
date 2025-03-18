import { useCallback, useMemo } from 'react'
import {
  bytesToHumanReadable,
  humanReadableToBytes
} from '../../../../lib/utils/memory'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { ContextBackupFrequency } from '../../types'
import DataSize, { Value } from '../../ui/DataSize'
import Label from '../../ui/Label'
import Radios from '../../ui/Radios'
import Select from '../../ui/Select'

const frequencyOptions: Array<{
  value: Exclude<ContextBackupFrequency, null>
  label: string
}> = [
  { value: 6, label: 'Every 6 hours' },
  { value: 8, label: 'Every 8 hours' },
  { value: 12, label: 'Every 12 hours' },
  { value: 16, label: 'Every 16 hours' },
  { value: 20, label: 'Every 20 hours' },
  { value: 24, label: 'Every 24 hours' },
  { value: 36, label: 'Every 36 hours' },
  { value: 48, label: 'Every 48 hours' }
]

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
    storageSize,
    storageUnit,
    storageCompressed,
    backupFrequency,
    backupRetention,
    estimateBackupSize,
    fullBackupSize,
    fullBackupUnit,
    incrementalBackupUnit,
    incrementalBackupSize
  } = usePricingV2Context()

  const onEsitnmateBackupsChange = useCallback(
    (value: boolean) => {
      // Invert value before storing
      setValues({ estimateBackupSize: !value })
    },
    [setValues]
  )

  const estimatedBackupsPerMonth = useMemo(() => {
    if (!backupFrequency) return null
    const hoursInMonth = 30 * 24 // Assuming a 30-day month
    return hoursInMonth / backupFrequency
  }, [backupFrequency])

  const estimatedBackupSize = useMemo(() => {
    if (!estimatedBackupsPerMonth || !storageSize) return null
    return storageSize + (storageSize / 100) * estimatedBackupsPerMonth
  }, [estimatedBackupsPerMonth, storageSize])

  const storageFormatted = useMemo(() => {
    if (!storageSize || !storageUnit) return null

    const bytes = humanReadableToBytes(
      `${storageSize}${storageUnit.toUpperCase()}`
    )

    if (!bytes) return `${storageSize} ${storageUnit.toUpperCase()}`

    return bytesToHumanReadable(bytes)
  }, [storageSize, storageUnit])

  const estimatedBackupSizeFormatted = useMemo(() => {
    if (!estimatedBackupSize || !storageUnit) return null

    const bytes = humanReadableToBytes(
      `${estimatedBackupSize}${storageUnit.toUpperCase()}`,
      null
    )

    if (!bytes) return null

    return bytesToHumanReadable(bytes)
  }, [estimatedBackupSize, storageUnit])

  const onFullChange = useCallback(
    ({ size, unit }: Value) => {
      setValues({ fullBackupUnit: unit, fullBackupSize: size })
    },
    [setValues]
  )

  const onIncrementalChange = useCallback(
    ({ size, unit }: Value) => {
      setValues({ incrementalBackupUnit: unit, incrementalBackupSize: size })
    },
    [setValues]
  )

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
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
            value={!estimateBackupSize}
            onChange={onEsitnmateBackupsChange}
          />
          {estimateBackupSize &&
            estimatedBackupsPerMonth &&
            estimatedBackupSizeFormatted &&
            storageFormatted && (
              <p className='text-sm mt-4'>
                You will have {estimatedBackupsPerMonth} backups with an
                estimated total size of {estimatedBackupSizeFormatted}. This is
                based on a storage volume of {storageFormatted} of{' '}
                {storageCompressed ? 'compressed' : 'uncompressed'} data,
                expected to grow or change by 1% between backups.
              </p>
            )}
        </div>

        {!estimateBackupSize && (
          <>
            <div>
              <Label>Full backup</Label>
              <DataSize
                sizeValue={fullBackupSize}
                unitValue={fullBackupUnit}
                onChange={onFullChange}
              />
            </div>
            <div>
              <Label>Incremental backup</Label>
              <DataSize
                sizeValue={incrementalBackupSize}
                unitValue={incrementalBackupUnit}
                onChange={onIncrementalChange}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
