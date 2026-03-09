import styles from './Typography.module.scss'
import { colorCalculator } from './calculator'
import { createElement, HTMLAttributes } from 'react'

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: string
  weight?: string
}

// @ts-ignore
export const SuiTitle = ({
  type,
  children,
  color = '',
  className,
  weight,
  id,
  ...rest
}: TitleProps) => {
  return createElement(
    type,
    {
      ...rest,
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
