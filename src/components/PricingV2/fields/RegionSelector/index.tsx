import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { useMemo } from 'react'

export interface RegionSelectorProps {
  displayLabel?: boolean
  className?: string
}

export default function RegionSelector({
  displayLabel = true,
  className = ''
}: RegionSelectorProps) {
  const { setValues, providerEntry, region } = usePricingV2Context()

  const regionOptions: Options = useMemo(() => {
    if (!providerEntry) return []

    return providerEntry.regions.map((item) => {
      return {
        value: item.key,
        label: item.label || item.key,
        icon: item.icon,
        group: item.category
      }
    })
  }, [providerEntry])

  return (
    <>
      {providerEntry?.regions && providerEntry.regions.length > 0 && (
        <div className={className}>
          {displayLabel && <Label>Region</Label>}
          <Select
            options={regionOptions}
            value={region}
            onChange={(value) => setValues({ region: value })}
          />
        </div>
      )}
    </>
  )
}
