import { colourCalculator } from './calculator'

export type TitleProps = {
  color?: string
  dark_color?: string
  size?: string
  uppercase?: boolean
  className?: string
  semibold?: boolean
}

// @ts-ignore
export const SuiTitle = ({ ...TitleProps }) => {
  const { children, color, dark_color, size, uppercase, semibold, className } =
    TitleProps

  const sizeCalculator = (size: string) => {
    switch (size) {
      case 'xxs':
        return 'text-xs'
      case 'xs':
        return 'text-sm'
      case 'sm':
        return 'text-base'
      case 'md':
        return 'text-base md:text-ch-lg'
      case 'lg':
        return 'text-lg md:text-ch-2xl'
      case 'xl':
        return 'text-ch-2xl md:text-ch-4xl'
      case 'web':
        return 'text-ch-4xl md:text-ch-webtitle'
      case 'xxl':
        return 'text-ch-3xl md:text-ch-5xl'
      case 'max':
        return 'text-ch-4xl md:text-ch-max'
      default:
        return 'text-base md:text-ch-lg'
    }
  }

  return (
    <div
      className={`${colourCalculator(color, 'text-gunmetal')} dark:text-web-${
        dark_color ? dark_color : 'dark-c5'
      } ${className} ${
        semibold ? 'font-semibold' : 'font-bold'
      } ${sizeCalculator(size)} ${uppercase && 'uppercase'}`}>
      {children}
    </div>
  )
}
