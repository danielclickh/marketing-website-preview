import { HTMLAttributes } from 'react'
import { colourCalculator } from './calculator'

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
  type: 'p1' | 'p2' | 'p3' | 'p4'
  weight: 'normal' | 'medium' | 'bold'
  color?: string
}

// @ts-ignore
export const SuiText = ({ ...TextProps }: TextProps) => {
  const { type, children, color = '', weight, className } = TextProps

  let textClass = ''
  if (type === 'p1') {
    textClass = `text-lg font-${weight}`
  } else if (type === 'p2') {
    textClass = `text-base font-${weight === 'bold' ? 'semibold' : weight}`
  } else if (type === 'p3') {
    textClass = `text-sm font-${weight === 'bold' ? 'semibold' : weight}`
  } else {
    textClass = `text-xs font-${weight === 'bold' ? 'semibold' : weight}`
  }
  return (
    <div
      className={`${textClass} ${className ?? ''}
        ${colourCalculator(color, 'text-inherit')} 
      `}>
      {children}
    </div>
  )
}
