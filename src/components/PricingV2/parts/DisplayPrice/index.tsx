import { Fragment, useCallback, useEffect, useMemo, useRef } from 'react'
import { humanReadableTo } from '@/lib/utils/memory'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import PriceUsd from '../../ui/PriceUsd'

export default function DisplayPrice() {
  const { totalPriceRange, storage, storageCompressed } = usePricingV2Context()

  const priceRef = useRef<null | HTMLParagraphElement>(null)

  const resize = useCallback(() => {
    const priceEl = priceRef.current
    if (!priceEl) return
    const minFontSize = 14 // pixels
    const maxFontSize = 50 // pixels

    let low = minFontSize
    let high = maxFontSize
    let fontSize

    while (low <= high) {
      fontSize = Math.floor((low + high) / 2)
      priceEl.style.fontSize = `${fontSize}px`

      if (priceEl.scrollWidth > priceEl.clientWidth) {
        high = fontSize - 1 // Text is too wide, decrease size
      } else {
        low = fontSize + 1 // Text fits, try increasing size
      }
    }

    priceEl.style.fontSize = `${high}px`
  }, [priceRef])

  // If storage (compressed) is over 1PB, display custom quote CTA
  const displayCustomQuoteCta = useMemo(() => {
    if (!storage) return false

    let storageInPb = humanReadableTo(storage, 'PB')
    if (!storageInPb) return false

    // Apply standard compression
    if (!storageCompressed) {
      storageInPb /= 10
    }

    return storageInPb > 1
  }, [storage, storageCompressed])

  // Attach resize events on mount
  useEffect(() => {
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
    }
  }, [])

  // Resize text on value changes, uses a
  // timeout to allow the dom to update
  useEffect(() => {
    const timer = window.setTimeout(resize, 100)
    return () => window.clearTimeout(timer)
  }, [totalPriceRange, displayCustomQuoteCta])

  return (
    <span
      ref={priceRef}
      className='block w-full overflow-hidden whitespace-nowrap'>
      {displayCustomQuoteCta && <>Contact sales</>}
      {!displayCustomQuoteCta && !totalPriceRange && '--'}
      {!displayCustomQuoteCta &&
        totalPriceRange &&
        totalPriceRange.map((price, priceIndex, allPrices) => {
          return (
            <Fragment key={priceIndex}>
              <PriceUsd price={price} decimalPlaces={0} />
              {priceIndex < allPrices.length - 1 && ' - '}
            </Fragment>
          )
        })}
    </span>
  )
}
