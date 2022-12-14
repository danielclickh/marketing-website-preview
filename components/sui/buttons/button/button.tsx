import Link from 'next/link'
import { RefreshIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'

type ButtonProps = {
  title: string
  size?: string
  icon?: boolean
  iconRight?: boolean
  iconType?: string
  path?: any
  onClick?: any
  color?: string
  textColor?: string
  disabled?: boolean
  border?: boolean
  borderColor?: string
  scroll?: boolean
  target?: string
  className?: string
  widthFull?: boolean
}

export function SuiButton(props: ButtonProps) {
  const colorCalculator = (color: string | undefined) => {
    switch (color) {
      case 'primary':
        return `bg-primary ${
          props.textColor ? props.textColor : 'text-primary-text'
        }`
      case 'dark':
        return 'bg-arsenic text-white'
      case 'dark_alt':
        return 'bg-light-purple2 text-white'
      case 'empty':
        return 'bg-transparent text-text-darkest dark:text-white'
      case 'ghost':
        return 'bg-transparent text-text-darkest dark:text-white border border-light-grey5 dark:border-dark-grey4'
      case 'success':
        return 'bg-alerts-success-background text-alerts-success-text'
      case 'warning':
        return 'bg-alerts-warning-background text-alerts-warning-text'
      case 'danger':
        return 'bg-alerts-danger-background text-alerts-danger-text'
      case 'xl':
        return 'text-base py-3 px-6'
      default:
        return 'bg-primary text-primary-text'
    }
  }

  const sizeCalculator = (size: string | undefined) => {
    switch (size) {
      case 'sm':
        return 'text-xs py-2 px-6' // 0.75rem / 12px
      case 'base':
        return 'text-sm py-2.5 px-6' // 0.875rem / 14px
      case 'lg':
        return 'text-base py-3 px-6' // 1.125rem / 18px
      default:
        return 'text-sm py-2.5 px-6'
    }
  }

  const ButtonContent = () => {
    const opacityLevel = props.disabled ? 'opacity-60' : 'opacity-100'
    const hoverEffects = props.disabled
      ? 'cursor-default'
      : 'hover:underline hover:transition-all hover:-translate-y-0.5'

    return (
      <>
        <button
          onClick={props.onClick}
          disabled={props.disabled ? true : false}
          className={`${opacityLevel} ${hoverEffects}
          ${sizeCalculator(props.size)}
          ${props.textColor ?? ''}
          ${
            props.borderColor && 'border ' + props.borderColor
          } font-semibold text-center ${
            props.widthFull ? 'w-full' : 'w-auto'
          } rounded-lg duration-300 whitespace-nowrap
           ${colorCalculator(props.color)} ${props.className ?? ''}`}>
          <span className='flex justify-center'>
            {props.icon && <RefreshIcon className='w-4 mr-2' />}
            {props.title}
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
