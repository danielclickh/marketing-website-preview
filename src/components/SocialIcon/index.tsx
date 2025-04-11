import { CUILink } from '../ClickUI'
import { LinkProps } from '../ClickUI/Link/types'
import Image from 'next/image'

interface Props extends Omit<LinkProps, 'children'> {
  name: string
  href: string
  imgSrc: string
}

function SocialIcon({ name, href, imgSrc, ...props }: Props) {
  return (
    <CUILink
      key={name}
      href={href}
      target='_blank'
      className='grid h-16 w-16 place-items-center rounded border border-neutral-700/80 bg-neutral-900 hover:bg-neutral-800'
      {...props}>
      <Image src={imgSrc} width={32} height={32} alt={`${name} image`} />
    </CUILink>
  )
}

export default SocialIcon
