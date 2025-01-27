import { memo, useMemo } from 'react'
import { PricingV2ComponentRegion } from '../../../../lib/api/strapi/types'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { StrapiImageUrl } from '../../../StrapiElements'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'

export interface RegionSelectorProps {
  displayLabel?: boolean
  className?: string
}

const RegionLabel = memo(function RegionLabel({
  key,
  label,
  icon
}: PricingV2ComponentRegion) {
  return (
    <>
      {icon && (
        <StrapiImageUrl
          {...icon}
          className='h-auto w-8 flex-shrink-0 flex-grow-0'
          alt={label || key}
        />
      )}
      {label || key}
    </>
  )
})

export default function RegionSelector({
  displayLabel = true,
  className = ''
}: RegionSelectorProps) {
  const { providerEntry, region, setRegion } = usePricingV2Context()

  const regionOptions: Options = useMemo(() => {
    if (!providerEntry) return []

    return providerEntry.regions.map((item) => {
      return {
        value: item.key,
        label: <RegionLabel {...item} />
      }
    })
  }, [providerEntry])

  return (
    <>
      {regionOptions.length > 0 && (
        <div className={className}>
          {displayLabel && <Label>Region</Label>}
          <Select options={regionOptions} value={region} onChange={setRegion} />
        </div>
      )}
    </>
  )
}
