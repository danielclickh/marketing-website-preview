import { colourCalculator } from './calculator'

export type TextProps = {
  color?: string | undefined
  dark_color?: string
  size?: string
  uppercase?: boolean
  padding_0?: boolean
  className: string
}

// @ts-ignore
export const SuiText = ({ ...TextProps }) => {
  const {
    children,
    color,
    dark_color,
    size = 'sm',
    weight,
    uppercase,
    padding_0,
    className
  } = TextProps
  const padding = padding_0 ? 'py-0' : 'py-2'
  const isUppercase = uppercase ? 'uppercase' : 'normal-case'

  return (
    <div
      className={`text-${size} ${className && className}
        font-${weight ? weight : 'normal'} ${isUppercase} ${padding}
        ${colourCalculator(color, 'text-gunmetal dark:text-white')} 
      `}>
      {children}
    </div>
  )
}
