import PriceUsd from '../../ui/PriceUsd'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { Fragment, useCallback, useEffect, useMemo, useRef } from 'react'

export default function DisplayPrice() {
  const { totalMinPrice, totalPriceRange } = usePricingV2Context()

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

  // Promote contact if min price is over $5000
  const promoteContact = !!(totalMinPrice && totalMinPrice > 5000)

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
  }, [totalPriceRange, promoteContact])

  const isValidPriceRange = useMemo(() => {
    return (
      totalPriceRange &&
      totalPriceRange.filter((value) => Number(value.toFixed(2)) >= 0.01)
        .length > 0
    )
  }, [totalPriceRange])

  return (
    <span
      ref={priceRef}
      className='block w-full overflow-hidden whitespace-nowrap'>
      {promoteContact && <>Contact sales</>}
      {!promoteContact && !isValidPriceRange && '--'}
      {!promoteContact &&
        isValidPriceRange &&
        totalPriceRange &&
        totalPriceRange.map((price, priceIndex, allPrices) => {
          return (
            <Fragment key={priceIndex}>
              <PriceUsd
                price={price}
                decimalPlaces={allPrices.length === 1 && price < 1 ? 2 : 0}
              />
              {priceIndex < allPrices.length - 1 && ' - '}
            </Fragment>
          )
        })}
    </span>
  )
}
