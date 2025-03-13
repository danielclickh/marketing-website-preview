import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { StrapiImageUrl } from '../../../StrapiElements'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { memo, useMemo } from 'react'

export interface RegionSelectorProps {
  displayLabel?: boolean
  className?: string
}

const RegionLabel = memo(function RegionLabel({
  value,
  label,
  icon
}: {
  value: string
  label: null | string
  icon: null | StrapiImageType
}) {
  return (
    <>
      {icon && (
        <StrapiImageUrl
          {...icon}
          className='h-auto w-8 flex-shrink-0 flex-grow-0'
          alt={label || value}
        />
      )}
      {label || value}
    </>
  )
})

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
        label: (
          <RegionLabel value={item.key} label={item.label} icon={item.icon} />
        )
      }
    })
  }, [providerEntry])

  return (
    <>
      {regionOptions.length > 0 && (
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
