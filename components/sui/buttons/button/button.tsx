'use client'
import Link from 'next/link'
import { RefreshIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { useAnalytics } from '../../../Providers/Analytics'
import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'base' | 'sm'
  type: 'primary' | 'secondary' | 'danger' | 'custom'
  icon?: boolean
  iconRight?: boolean
  iconType?: string
  path?: any
  onClick?: any
  disabled?: boolean
  scroll?: boolean
  target?: string
  className?: string
  segment?: string
  color?: never
}

interface EmptyButtonProps extends Omit<ButtonProps, 'type' | 'color'> {
  type: 'empty'
  color: 'primary' | 'warning' | 'danger'
}

const colorCalculator = ({
  color,
  textColor,
  disabled
}: {
  color: string | undefined
  disabled: boolean
  textColor?: string
}) => {
  const disabledStyle = 'bg-c4/10 text-c4'
  switch (color) {
    case 'primary':
      if (disabled) {
        return disabledStyle
      }
      return 'bg-c6 text-seal_brown'
    case 'secondary':
      if (disabled) {
        return 'bg-transparent text-inherit border border-c4'
      }
      return 'bg-transparent text-inherit border border-c6'
    case 'danger':
      if (disabled) {
        return disabledStyle
      }
      return 'bg-alerts-danger-text text-white'
    case 'empty':
      return `bg-transparent ${
        textColor === 'warning'
          ? 'text-c7'
          : textColor === 'danger'
          ? 'text-alerts-danger-text'
          : 'text-inherit'
      }text-text-darkest dark:text-white`
    case 'custom':
      return 'custom-btn'
    case 'dark':
      return 'bg-arsenic text-white'
    case 'ghost':
      return 'bg-transparent text-inherit border border-c4'
    case 'success':
      return 'bg-alerts-success-background text-alerts-success-text'
    case 'warning':
      return 'bg-alerts-warning-background text-alerts-warning-text'
    case 'danger':
      return 'bg-alerts-danger-background text-alerts-danger-text'
    case 'xl':
      return 'text-base py-3 px-6'
    default:
      if (disabled) {
        return disabledStyle
      }
      return 'bg-c6 text-seal_brown'
  }
}

const sizeCalculator = (size: string | undefined) => {
  switch (size) {
    case 'sm':
      return 'text-xs py-2 px-4' // 0.75rem / 12px
    case 'lg':
      return 'text-base py-3 px-6' // 1.125rem / 18px
    default:
      return 'text-sm py-2.5 px-6' // 0.875rem / 14px
  }
}

export function SuiButton({
  disabled,
  type,
  children,
  ...props
}: ButtonProps | EmptyButtonProps) {
  const ButtonContent = () => {
    const analytics = useAnalytics()
    const hoverEffects = disabled
      ? 'cursor-default'
      : 'hover:underline hover:transition-all hover:-translate-y-0.5'

    return (
      <>
        <button
          disabled={disabled ? true : false}
          className={`${hoverEffects}
          ${sizeCalculator(props.size)}
          font-semibold text-center rounded-lg duration-300 whitespace-nowrap
           ${colorCalculator({
             color: type,
             disabled: disabled ?? false,
             textColor: props.color
           })} ${props.className ?? ''}`}
          onClick={() => {
            analytics.track('click')
            props.onClick && props.onClick()
          }}>
          <span className='flex justify-center items-center gap-2.5'>
            {props.icon && <RefreshIcon className='w-4 mr-2' />}
            {children}
            {props.iconRight && <ArrowRightIcon className='w-4 ml-2' />}
          </span>
        </button>
      </>
    )
  }

  return (
    <>
      {props.path ? (
        <Link
          href={props.path}
          passHref
          scroll={props.scroll}
          target={props.target}>
          <ButtonContent />
        </Link>
      ) : (
        <ButtonContent />
      )}
    </>
  )
}
