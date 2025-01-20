import { useCallback, useEffect, useMemo } from 'react'
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
  const { providers, provider, region, setRegion } = usePricingV2Context()

  const regionOptions: Options = useMemo(() => {
    const providerEntry = providers.find((item) => item.slug === provider)

    if (!providerEntry) return []

    return providerEntry.regions.map((item) => {
      return {
        value: item.key,
        label: (
          <>
            {item.icon && (
              <StrapiImage {...item.icon} alt={item.label || item.key} />
            )}
            {item.label || item.key}
          </>
        )
      }
    })
  }, [providers, provider])

  const validateRegion = useCallback(
    (value: null | string) => {
      if (!value || !regionOptions.find((item) => item.value === value)) {
        return regionOptions.at(0)?.value || null
      }

      return value
    },
    [regionOptions]
  )

  useEffect(() => {
    const validated = validateRegion(region)
    if (region !== validated) setRegion(validated)
  }, [region, regionOptions])

  return (
    <>
      {regionOptions.length > 0 && (
        <div className={className}>
          {displayLabel && <Label>Region</Label>}
          <Select
            options={regionOptions}
            value={region}
            onChange={(value) => setRegion(value)}
          />
        </div>
      )}
    </>
  )
}
