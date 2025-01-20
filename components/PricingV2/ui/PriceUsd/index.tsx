export interface PriceUsdProps {
  price: number
}

export default function PriceUsd({ price }: PriceUsdProps) {
  return (
    <>
      {price
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
        .replace(/\.00$/, '')}
    </>
  )
}
