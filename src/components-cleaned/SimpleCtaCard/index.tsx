import { CUIButton } from '@/components/ClickUI'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'

export type SimpleCtaCardProps = {
  children: React.ReactNode
  galaxyEventName?: `${string}.${string}.${string}`
  link: {
    text: string
    href: string
    target?: '_self' | '_blank'
  }
}

export default function SimpleCtaCard({
  children,
  galaxyEventName,
  link
}: SimpleCtaCardProps) {
  return (
    <div className='rounded-lg bg-white/10 p-4'>
      {children}
      <CUIButton
        type='primary'
        className='mt-6 w-full'
        linkClass='w-full'
        href={link.href}
        target={link.target}
        onClick={() => {
          if (galaxyEventName) {
            useGalaxyOnClick(galaxyEventName)()
          }
        }}>
        {link.text}
      </CUIButton>
    </div>
  )
}
