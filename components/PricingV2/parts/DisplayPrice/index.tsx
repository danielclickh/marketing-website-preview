import { Fragment, useEffect, useRef, useState } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import PriceUsd from '../../ui/PriceUsd'

export default function DisplayPrice() {
  const { totalMinPrice, totalMaxPrice } = usePricingV2Context()

  const [prices, setPrices] = useState<Array<number>>([])

  useEffect(() => {
    const isValid = !!(
      (totalMinPrice && totalMinPrice > 1) ||
      (totalMaxPrice && totalMaxPrice > 1)
    )

    // Set default to zero
    if (!isValid) {
      setPrices([0])
      return
    }

    // De-dupe and remove empties
    const cleaned = [...new Set([totalMinPrice, totalMaxPrice])].filter(
      (val) => val !== null
    )

    setPrices(cleaned)
  }, [totalMinPrice, totalMaxPrice])

  const priceRef = useRef<null | HTMLParagraphElement>(null)

  // Dynamically resize the price font size
  useEffect(() => {
    const priceEl = priceRef.current
    if (priceEl) {
      const resize = () => {
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
      }

      resize()

      window.addEventListener('resize', resize)
      window.addEventListener('orientationchange', resize)

      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('orientationchange', resize)
      }
    }
  }, [priceRef, totalMinPrice, totalMaxPrice])

  return (
    <span ref={priceRef} className='block'>
      {prices.map((price, priceIndex, allPrices) => {
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
