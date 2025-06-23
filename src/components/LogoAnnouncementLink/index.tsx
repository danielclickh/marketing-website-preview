import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'

type Modes = 'light' | 'dark'

export interface LogoAnnouncementLinkProps extends LinkProps {
  children: React.ReactNode
  logo: ImageProps
  className?: string
  mode?: Modes
}

const modeThemes: Record<Modes, { link: string; logo: string; text: string }> =
  {
    light: {
      link: 'border-neutral-950/5 bg-neutral-950/5',
      logo: 'bg-neutral-950/5',
      text: ''
    },
    dark: {
      link: 'bg-neutral-900/60 border-white/10',
      logo: 'bg-neutral-700/60',
      text: 'text-white/70'
    }
  }

export default function LogoAnnouncementLink({
  logo,
  children,
  className = '',
  mode = 'light',
  ...link
}: LogoAnnouncementLinkProps) {
  const theme = modeThemes[mode]
  return (
    <Link
      {...link}
      className={`group flex min-h-20 flex-row rounded border shadow-sm backdrop-blur ${theme.link} ${className}`}>
      <div
        className={`flex flex-shrink-0 flex-grow-0 items-center justify-center rounded-l-sm p-4 md:py-0 ${theme.logo}`}>
        <Image {...logo} alt='logo' />
      </div>
      <div className='flex flex-1 items-center p-4'>
        <p className={`text-left ${theme.text}`}>{children}</p>
      </div>
    </Link>
  )
}
