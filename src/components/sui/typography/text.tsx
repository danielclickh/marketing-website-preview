import { colorCalculator, sizeCalculator } from './calculator'
import { HTMLAttributes } from 'react'

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'base' | 'sm' | 'xs'
  weight?: 'normal' | 'medium' | 'bold' | 'semibold'
  color?: string
}

export const SuiText = ({ ...TextProps }: TextProps) => {
  const { size, children, color = '', weight, className } = TextProps

  return (
    <div
      className={` ${className ?? ''} ${colorCalculator(color, 'text-inherit')} ${sizeCalculator(size ? size : 'base', weight ? weight : 'normal')} `}>
      {children}
    </div>
  )
}
