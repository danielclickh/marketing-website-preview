export interface PriceUsdProps {
  price: number
  decimalPlaces?: number | 'auto'
}

export default function PriceUsd({ price, decimalPlaces = 2 }: PriceUsdProps) {
  if (decimalPlaces === 'auto') {
    decimalPlaces =
      price.toString().split('.')[1]?.length ?? price.toString().length
  }
  return (
    <>
      {price
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        })
        .replace(/\.00$/, '')}
    </>
  )
}
