import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import Label from '../../ui/Label'
import ProviderRegion from '../../ui/ProviderRegion'

export interface RegionSelectorProps {
  displayLabel?: boolean
  className?: string
}

export default function RegionSelector({
  displayLabel = true,
  className = ''
}: RegionSelectorProps) {
  const { setValues, providerEntry, region } = usePricingV2Context()

  return (
    <>
      {providerEntry?.regions && providerEntry.regions.length > 0 && (
        <div className={className}>
          {displayLabel && <Label>Region</Label>}
          <ProviderRegion
            value={region}
            onChange={(value) => setValues({ region: value })}
          />
        </div>
      )}
    </>
  )
}
