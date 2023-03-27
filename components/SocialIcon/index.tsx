import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import { LinkProps } from '../ClickUI/Link/types'

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
      className='w-16 h-16 bg-neutral-900 hover:bg-neutral-800 rounded grid place-items-center border border-neutral-700/80'
      {...props}>
      <Image src={imgSrc} width={32} height={32} alt={`${name} image`} />
    </CUILink>
  )
}

export default SocialIcon
