import { Fragment, useCallback, useEffect, useRef } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import PriceUsd from '../../ui/PriceUsd'

export default function DisplayPrice() {
  const { totalPriceRange } = usePricingV2Context()

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
  }, [totalPriceRange])

  return (
    <span
      ref={priceRef}
      className='block w-full overflow-hidden whitespace-nowrap'>
      {totalPriceRange.map((price, priceIndex, allPrices) => {
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
