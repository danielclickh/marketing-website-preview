import Label from '../../ui/Label'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { PricingV2ComponentProvider } from '@/lib/api/strapi/types'
import { memo } from 'react'

export interface ProviderSelectorProps {
  displayLabel?: boolean
  className?: string
}

const ProviderLogo = memo(function ProviderLogo({
  logo
}: {
  logo: PricingV2ComponentProvider['logo']
}) {
  return <StrapiImageUrl {...logo} />
})

export default function ProviderSelector({
  displayLabel = true,
  className = ''
}: ProviderSelectorProps) {
  const { setValues, sourceData, provider } = usePricingV2Context()
  return (
    <div className={className}>
      {displayLabel && <Label>Cloud provider</Label>}
      <div className='flex justify-start gap-3'>
        {sourceData.providers.map((item, index) => {
          const isActive = provider === item.slug
          return (
            <button
              key={index}
              className={`flex-shrink-1 flex h-10 flex-grow-0 flex-col justify-center rounded-lg border border-neutral-725 bg-neutral-725 px-4 text-center text-sm shadow-input transition-colors focus:outline-none ${
                isActive
                  ? 'border-primary'
                  : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
              }`}
              onClick={(event) => {
                event.preventDefault()
                setValues({ provider: item.slug })
              }}>
              <ProviderLogo logo={item.logo} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
