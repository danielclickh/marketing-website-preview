import { memo } from 'react'
import { PricingV2EntryProvider } from '@/lib/api/strapi/types'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { StrapiImage } from '../../../StrapiElements'
import Label from '../../ui/Label'

export interface ProviderSelectorProps {
  displayLabel?: boolean
  className?: string
}

const ProviderLogo = memo(function ProviderLogo({
  logo
}: {
  logo: PricingV2EntryProvider['logo']
}) {
  return <StrapiImage {...logo} />
})

export default function ProviderSelector({
  displayLabel = true,
  className = ''
}: ProviderSelectorProps) {
  const { providers, provider, setProvider } = usePricingV2Context()
  return (
    <div className={className}>
      {displayLabel && <Label>Cloud provider</Label>}
      <div className='flex justify-start gap-3'>
        {providers.map((item, index) => {
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
                setProvider(item.slug)
              }}>
              <ProviderLogo logo={item.logo} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
