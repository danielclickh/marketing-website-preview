import { PolymorphicComponentProps } from '@/types/global'
import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: './soehne-breit-extraleicht.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: './soehne-breit-extraleicht-kursiv.woff2',
      weight: '200',
      style: 'italic'
    },
    {
      path: './soehne-breit-leicht.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: './soehne-breit-leicht-kursiv.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: './soehne-breit-buch.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './soehne-breit-buch-kursiv.woff2',
      weight: '400',
      style: 'italic'
    },

    {
      path: './soehne-breit-kraftig.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './soehne-breit-kraftig-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './soehne-breit-halbfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './soehne-breit-halbfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: './soehne-breit-dreiviertelfett.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './soehne-breit-dreiviertelfett-kursiv.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: './soehne-breit-fett.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: './soehne-breit-fett-kursiv.woff2',
      weight: '800',
      style: 'italic'
    },
    {
      path: './soehne-breit-extrafett.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: './soehne-breit-extrafett.woff2',
      weight: '900',
      style: 'italic'
    }
  ]
})

type FontSohneBreitProps = <T extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<T>
) => React.ReactElement | null

const FontSohneBreit: FontSohneBreitProps = ({
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

export default FontSohneBreit
