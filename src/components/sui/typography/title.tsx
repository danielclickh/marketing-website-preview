import styles from './Typography.module.scss'
import { colorCalculator } from './calculator'
import { createElement, HTMLAttributes } from 'react'

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: string
  weight?: string
}

// @ts-ignore
export const SuiTitle = ({ ...TitleProps }: TitleProps) => {
  const { type, children, color = '', className, weight, id } = TitleProps

  return createElement(
    type,
    {
      className: `${colorCalculator(color, 'text-inherit')} ${
        styles.suiTitle
      } ${styles[`suiTitle${type}`]} ${
        weight ? styles[`weight-${weight}`] : ''
      } ${className}`,
      id
    },
    children
  )
}
