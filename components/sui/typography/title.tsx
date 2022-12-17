import { colourCalculator } from './calculator'

export type TitleProps = {
  color?: string
  dark_color?: string
  size?: string
  uppercase?: boolean
  className?: string
  weight?: string
}

// @ts-ignore
export const SuiTitle = ({ ...TitleProps }) => {
  const {
    children,
    color,
    dark_color,
    size = 'base',
    uppercase,
    className,
    weight = 'bold'
  } = TitleProps

  return (
    <div
      className={`${colourCalculator(color, 'text-gunmetal')} dark:text-web-${
        dark_color ? dark_color : 'dark-c5'
      } ${className} font-${weight} text-${size} ${uppercase && 'uppercase'}`}>
      {children}
    </div>
  )
}
