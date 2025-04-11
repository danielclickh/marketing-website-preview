import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Link from 'next/link'
import React from 'react'

interface FooterLinkProps {
  href: string
  text: string
  target?: string
  id?: string | number
  galaxyEvent?: FullyQualifiedEvent
}

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  text,
  target,
  id,
  galaxyEvent
}) => {
  const galaxyOnClick = useGalaxyOnClick(
    galaxyEvent ||
      (`footer.nav.${id || text.toLowerCase()}` as FullyQualifiedEvent)
  )

  return (
    <Link
      href={href}
      target={target}
      className='text-sm text-neutral-400 hover:text-neutral-0'
      onClick={galaxyOnClick}>
      {text}
    </Link>
  )
}

export default FooterLink
