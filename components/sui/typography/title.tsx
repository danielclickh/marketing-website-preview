import { createElement, HTMLAttributes } from 'react'
import { colourCalculator } from './calculator'

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: string
  size?: string
  weight?: string
}

// @ts-ignore
export const SuiTitle = ({ ...TitleProps }: TitleProps) => {
  const { type, children, color = '', size, className, weight } = TitleProps

  let textClass = ''

  if (type === 'h1') {
    textClass = `text-${size ?? '[38px] leading-none'} font-${weight ?? 'bold'}`
  } else if (type === 'h2') {
    textClass = `text-${size ?? '[28px] leading-9'} font-${weight ?? 'bold'}`
  } else if (type === 'h3') {
    textClass = `text-${size ?? 'xl'} font-${weight ?? 'bold'}`
  } else if (type === 'h4') {
    textClass = `text-${size ?? 'base'} font-${weight ?? 'bold'}`
  } else if (type === 'h5') {
    textClass = `text-${size ?? 'sm'} font-${weight ?? 'semibold'}`
  } else if (type === 'h6') {
    textClass = `text-${size ?? 'xs'} font-${weight ?? 'bold'} uppercase`
  }
  return createElement(
    type,
    {
      className: `${colourCalculator(
        color,
        'text-inherit'
      )} ${className} ${textClass}`
    },
    children
  )
}
