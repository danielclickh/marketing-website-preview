import { useMemo } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { StrapiImage } from '../../../StrapiElements'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'

export interface RegionSelectorProps {
  displayLabel?: boolean
  className?: string
}

export default function RegionSelector({
  displayLabel,
  className = ''
}: RegionSelectorProps) {
  const { providerEntry, region, setRegion } = usePricingV2Context()

  const regionOptions: Options = useMemo(() => {
    if (!providerEntry) return []

    return providerEntry.regions.map((item) => {
      return {
        value: item.key,
        label: (
          <>
            {item.icon && (
              <StrapiImage
                {...item.icon}
                className='h-auto w-8'
                alt={item.label || item.key}
              />
            )}
            {item.label || item.key}
          </>
        )
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
