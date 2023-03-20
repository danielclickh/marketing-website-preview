import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'base' | 'sm'
  type: 'primary' | 'secondary' | 'danger' | 'custom' | 'dark'
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
  weight?: string
  segmentEvent?: Record<string, string>
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
      return 'bg-primary-300 text-primary-900 hover:bg-primary'
    case 'secondary':
      if (disabled) {
        return 'bg-transparent text-inherit border border-c4'
      }
      return 'bg-transparent text-inherit border border-c6'
    case 'danger':
      if (disabled) {
        return disabledStyle
      }
      return 'bg-alerts-danger-text text-neutral-0'
    case 'empty':
      return `bg-transparent ${
        textColor === 'warning'
          ? 'text-c7'
          : textColor === 'danger'
          ? 'text-alerts-danger-text'
          : 'text-inherit'
      }`
    case 'custom':
      return 'custom-btn'
    case 'dark':
      return 'bg-primary-900 text-neutral-0'
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
      return 'bg-c6 text-c6-text'
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

export default function SuiButton({
  disabled = false,
  type,
  children,
  segmentEvent,
  weight,
  ...props
}: ButtonProps | EmptyButtonProps) {
  const ButtonContent = () => {
    const hoverEffects = disabled
      ? 'cursor-default'
      : 'hover:underline hover:transition-all hover:-translate-y-0.5'

    return (
      <>
        <button
          disabled={disabled}
          className={`${hoverEffects}
          ${sizeCalculator(props.size)}
          ${
            weight ? `font-${weight}` : 'font-semibold'
          } text-center rounded-lg duration-300 whitespace-nowrap
           ${colorCalculator({
             color: type,
             disabled: disabled ?? false,
             textColor: props.color
           })} ${props.className ?? ''}`}
          onClick={() => {
            if (segmentEvent) {
              try {
                window.analytics.track('click', segmentEvent)
              } catch (e) {}
            }
            props.onClick && props.onClick()
          }}>
          <span className='flex justify-center items-center gap-2.5'>
            {children}
            {props.iconRight && <ArrowRightIcon className='w-4' />}
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
          className={disabled ? 'cursor-not-allowed pointer-events-none' : ''}
          target={props.target}>
          <ButtonContent />
        </Link>
      ) : (
        <ButtonContent />
      )}
    </>
  )
}
