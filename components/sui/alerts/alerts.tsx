import { XIcon, CheckIcon } from '@heroicons/react/solid'
import {
  ExclamationIcon,
  InformationCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { SuiText, SuiTitle } from '../typography'

type AlertProps = {
  icon?: string
  title?: string
  color?: string
  shadow?: boolean
  border?: boolean
  padding?: string
  className?: string
  children: any
}

export function SuiAlert(props: AlertProps) {
  const className = props.className
  const shadow = props.shadow ? 'shadow-lg' : ''
  const border = props.border
    ? 'border border-light-grey4 dark:border-dark-grey4'
    : ''

  const paddingCalculator = (padding: string | undefined) => {
    switch (padding) {
      case 'none':
        return 'p-0'
      case 'sm':
        return 'px-4 py-2'
      case 'md':
        return 'p-4'
      case 'lg':
        return 'p-6'
      case 'xl':
        return 'p-8'
      default:
        return 'p-4'
    }
  }

  const colorCalculator = (color: string | undefined) => {
    switch (color) {
      case 'info':
        return 'bg-alerts-info-background text-alerts-info-text'
      case 'warning':
        return 'bg-alerts-warning-background text-alerts-warning-text'
      case 'success':
        return 'bg-alerts-success-background text-alerts-success-text'
      case 'danger':
        return 'bg-alerts-danger-background text-alerts-danger-text'
      case 'none':
        return 'bg-light-grey2 dark:bg-dark-grey2 text-text-darkest dark:text-white'
      default:
        return 'bg-alerts-info-background text-alerts-info-text'
    }
  }

  function IconCalculator(color: string | undefined) {
    switch (color) {
      case 'success':
        return (
          <CheckIcon
            className={`w-5 bg-alerts-success-background text-alerts-success-text rounded-full`}
          />
        )
      case 'warning':
        return (
          <ExclamationIcon
            className={`w-5 bg-alerts-warning-background text-alerts-warning-text rounded-full`}
          />
        )
      case 'danger':
        return (
          <XIcon
            className={`w-5 bg-alerts-danger-background text-alerts-danger-text rounded-full`}
          />
        )
      case 'info':
        return (
          <InformationCircleIcon
            className={`w-5 bg-alerts-info-background text-alerts-info-text rounded-full`}
          />
        )
      case 'loading':
        return (
          <RefreshIcon
            className={`w-5 bg-transparent text-text-dark rounded-full animate-spin`}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <div
        className={`${colorCalculator(props.color)} ${shadow} ${border} ${
          className ? className : ''
        } w-full ${paddingCalculator(props.padding)} rounded-lg`}>
        <div className='flex items-start space-x-4'>
          {IconCalculator(props.color)}
          <div className='flex flex-col'>
            {props.title ? (
              <>
                <SuiTitle type='h5'>{props.title}</SuiTitle>
                <SuiText type='p3' weight='normal' color='none'>
                  {props.children}
                </SuiText>
              </>
            ) : (
              <SuiText type='p3' weight='normal' color='none'>
                {props.children}
              </SuiText>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
