import Link from 'next/link'
import { StrapiImage } from '../../components/StrapiElements'

interface LogoCarouselItemProps {
  index: number
  customer: {
    href?: string
    darkLogoPng?: any
    Logo?: any
  }
}

const LogoCarouselItem: React.FC<LogoCarouselItemProps> = ({
  index,
  customer
}) => {
  return (
    <div key={index} className={`number-slide${index}`}>
      {customer.href ? (
        <Link href={customer.href}>
          <StrapiImage {...customer.darkLogoPng} className='fill-none' />
        </Link>
      ) : (
        <StrapiImage {...customer.darkLogoPng} className='fill-none' />
      )}
    </div>
  )
}

export default LogoCarouselItem
