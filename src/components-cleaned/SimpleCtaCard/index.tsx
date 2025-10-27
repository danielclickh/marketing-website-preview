import { CUIButton } from '@/components/ClickUI'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'

export type SimpleCtaCardProps = {
  children: React.ReactNode
  galaxyEventName?: `${string}.${string}.${string}`
  className?: string
  link: {
    text: string
    href: string
    target?: '_self' | '_blank'
  }
}

export default function SimpleCtaCard({
  children,
  galaxyEventName,
  link,
  className = ''
}: SimpleCtaCardProps) {
  return (
    <div className={`rounded-lg bg-white/10 p-4 ${className}`}>
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
