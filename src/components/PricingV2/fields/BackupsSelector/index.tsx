import {
  ContextBackupFrequency,
  usePricingV2Context
} from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'
import Select from '../../ui/Select'

const frequencyOptions: Array<{
  value: Exclude<ContextBackupFrequency, null>
  label: string
}> = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
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

const retentionOptions: Record<
  Exclude<ContextBackupFrequency, null>,
  Array<{
    value: number
    label: string
  }>
> = {
  daily: generateRetentionOptions(7, 'day', 'days'),
  weekly: generateRetentionOptions(4, 'week', 'weeks'),
  monthly: generateRetentionOptions(12, 'month', 'months')
}

export default function BackupsSelector() {
  const { setValues, backupFrequency } = usePricingV2Context()
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <Label>Backup frequency</Label>
          <Select
            value={backupFrequency}
            options={frequencyOptions}
            onChange={(value) => setValues({ backupFrequency: value })}
          />
        </div>
        <div>
          <Label>Backup frequency</Label>
          <Select
            value={null}
            options={retentionOptions[backupFrequency || 'daily']}
            onChange={console.log}
          />
        </div>
      </div>
    </>
  )
}
