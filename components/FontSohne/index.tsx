import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: './soehne-buch.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './soehne-buch-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './soehne-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './soehne-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

// Define custom props that should always be available
export interface FontSohneProps {
  as?: 'div' | 'span'
  children: React.ReactNode
  className?: string
}

export default function FontSohne({
  as: Component = 'div',
  children,
  className = '',
  ...props
}: FontSohneProps) {
  return (
    <Component className={`${font.className} ${className}`} {...props}>
      {children}
    </Component>
  )
}
