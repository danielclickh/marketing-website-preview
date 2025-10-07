import { PolymorphicComponentProps } from '@/types/global'
import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: './soehne-extraleicht.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: './soehne-extraleicht-kursiv.woff2',
      weight: '200',
      style: 'italic'
    },
    {
      path: './soehne-leicht.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './soehne-leicht-kursiv.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: './soehne-buch.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './soehne-buch-kursiv.woff2',
      weight: '400',
      style: 'italic'
    },

    {
      path: './soehne-kraftig.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './soehne-kraftig-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './soehne-halbfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './soehne-halbfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: './soehne-dreiviertelfett.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './soehne-dreiviertelfett-kursiv.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: './soehne-fett.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: './soehne-fett-kursiv.woff2',
      weight: '800',
      style: 'italic'
    },
    {
      path: './soehne-extrafett.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: './soehne-extrafett.woff2',
      weight: '900',
      style: 'italic'
    }
  ]
})

type FontSohneProps = <T extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<T>
) => React.ReactElement | null

const FontSohne: FontSohneProps = ({
  as,
  children,
  className = '',
  ...props
}: any) => {
  const Component = as || 'div'
  return (
    <Component {...props} className={`${font.className} ${className}`}>
      {children}
    </Component>
  )
}

export default FontSohne
