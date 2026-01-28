import Image from 'next/image'
import Link from 'next/link'

interface SocialIconProps {
  name: string
  href: string
  imgSrc: string
}

export default function SocialIcon({
  name,
  href,
  imgSrc,
  ...props
}: SocialIconProps) {
  return (
    <Link
      href={href}
      target='_blank'
      title={name}
      className='grid size-16 place-items-center rounded border border-neutral-700/80 bg-neutral-900 transition-colors hover:bg-neutral-800'
      {...props}>
      <Image
        src={imgSrc}
        width={32}
        height={32}
        alt={name}
        className='size-8 max-w-none object-scale-down object-center'
      />
      <span className='sr-only'>{name}</span>
    </Link>
  )
}
