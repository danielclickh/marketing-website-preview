import clickhouse from './logo.svg'
import Image, { ImageProps } from 'next/image'

export interface ClickHousePartnerLogoProps {
  logo: ImageProps['src']
  partnerName: string
  className?: string
  inset?: boolean
}

export default function ClickHousePartnerLogo({
  logo,
  partnerName,
  className = '',
  inset = true
}: ClickHousePartnerLogoProps) {
  return (
    <figure
      className={`flex items-center justify-center gap-4 lg:gap-8 ${className}`}>
      <figcaption className='sr-only'>{partnerName} + ClickHouse</figcaption>
      <Tile src={logo} alt={partnerName} className='bg-white' inset={inset} />
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='28'
          height='29'
          fill='none'
          viewBox='0 0 28 29'
          className='max-w-4 lg:max-w-none'>
          <path
            fill='#fff'
            d='M10.69 28.97v-10.8H.55v-6.39H10.7V.98h6.89v10.8h9.85v6.38h-9.85v10.81h-6.9Z'
          />
        </svg>
      </span>
      <Tile
        src={clickhouse}
        alt='ClickHouse'
        inset={true}
        className='bg-primary-300'
      />
    </figure>
  )
}

function Tile({
  className = '',
  src,
  alt,
  inset
}: {
  className?: string
  src: ImageProps['src']
  alt: ImageProps['alt']
  inset?: boolean
}) {
  return (
    <div
      className={`relative flex aspect-square w-16 flex-shrink-0 flex-grow-0 items-center justify-center lg:w-32 ${className}`}>
      <div className={`absolute ${inset ? 'inset-3 lg:inset-4' : 'inset-0'}`}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          loading='eager'
          priority
          className='absolute h-full w-full object-scale-down object-center'
        />
      </div>
    </div>
  )
}
