import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: './soehne-breit-kraftig.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './soehne-breit-kraftig-kursiv.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './soehne-breit-halbfett.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './soehne-breit-halbfett-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './soehne-breit-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './soehne-breit-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

export interface FontSohneBreitProps {
  as?: 'div' | 'span'
  children: React.ReactNode
  className?: string
}

export default function FontSohneBreit({
  as: Component = 'div',
  children,
  className = '',
  ...props
}: FontSohneBreitProps) {
  return (
    <Component className={`${font.className} ${className}`} {...props}>
      {children}
    </Component>
  )
}
