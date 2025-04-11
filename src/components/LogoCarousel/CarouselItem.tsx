import Link from 'next/link'
import { StrapiImage } from '../StrapiElements'

interface LogoCarouselItemProps {
  index: number
  logoColor?: string
  customer: {
    href?: string
    darkLogoPng?: any
    Logo?: any
  }
}

const LogoCarouselItem: React.FC<LogoCarouselItemProps> = ({
  index,
  customer,
  logoColor
}) => {
  const imageClass = logoColor ? `fill-${logoColor}` : 'fill-none'

  return (
    <div key={index} className={`number-slide${index}`}>
      {customer.href ? (
        <Link href={customer.href}>
          <StrapiImage {...customer.darkLogoPng} className={`${imageClass} `} />
        </Link>
      ) : (
        <StrapiImage {...customer.darkLogoPng} className={imageClass} />
      )}
    </div>
  )
}

export default LogoCarouselItem
