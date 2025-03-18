import { memo, useMemo } from 'react'
import { StrapiImageType } from '../../../../lib/api/strapi/types'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { StrapiImageUrl } from '../../../StrapiElements'
import { ContextRegion } from '../../types'
import Select, { Options } from '../../ui/Select'

export interface ProviderRegionProps {
  value: ContextRegion
  onChange: (value: ContextRegion) => void
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

export default function ProviderRegion({
  value,
  onChange
}: ProviderRegionProps) {
  const { providerEntry } = usePricingV2Context()

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

  return <Select options={regionOptions} value={value} onChange={onChange} />
}
