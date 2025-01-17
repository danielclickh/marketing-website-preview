import { useCallback, useEffect } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'

export default function ProviderSelector() {
  const { providers, provider, setProvider } = usePricingV2Context()

  const validateProvider = useCallback(
    (value: null | string) => {
      if (!value || !providers.find((item) => item.slug === value)) {
        return providers.at(0)?.slug || null
      }

      return value
    },
    [providers]
  )

  useEffect(() => {
    const validated = validateProvider(provider)
    if (provider !== validated) setProvider(validated)
    console.log({ provider, validated, valid: provider !== validated })
  }, [provider])

  return (
    <div>
      <Label>Cloud provider</Label>
      <div className='flex gap-3'>
        {providers.map((item, index) => {
          const isActive = provider === item.slug
          return (
            <button
              key={index}
              className={`inline-block flex-1 rounded border px-1 py-2 text-center ${
                isActive ? 'border-primary' : ''
              }`}
              onClick={(event) => {
                event.preventDefault()
                setProvider(item.slug)
              }}>
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
