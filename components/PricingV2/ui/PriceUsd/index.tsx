export interface PriceUsdProps {
  price: number
  decimalPlaces?: number
}

export default function PriceUsd({ price, decimalPlaces = 2 }: PriceUsdProps) {
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
