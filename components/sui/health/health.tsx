import { XIcon, CheckIcon } from '@heroicons/react/solid'
import { ExclamationIcon, RefreshIcon } from '@heroicons/react/outline'
import { SuiText } from '../typography'

type HealthProps = {
  name?: string
  id?: number
  color?: string
  type?: string
}

export function SuiHealth(props: HealthProps) {
  const { name, id, color, type } = props

  function IconCalculator(type: string | undefined) {
    switch (type) {
      case 'success':
        return (
          <CheckIcon
            className={`w-6 p-1 bg-alerts-success-background text-alerts-success-text rounded-full`}
          />
        )
      case 'warning':
        return (
          <ExclamationIcon
            className={`w-6 p-1 bg-alerts-warning-background text-alerts-warning-text rounded-full`}
          />
        )
      case 'danger':
        return (
          <XIcon
            className={`w-6 p-1 bg-alerts-danger-background text-alerts-danger-text rounded-full`}
          />
        )
      case 'loading':
        return (
          <RefreshIcon
            className={`w-6 p-1 bg-transparent text-text-dark rounded-full animate-spin`}
          />
        )

      default:
        return (
          <CheckIcon
            className={`w-6 p-1 bg-alerts-success-background text-alerts-success-text rounded-full`}
          />
        )
    }
  }

  return (
    <div key={id} className='flex items-center space-x-4'>
      {IconCalculator(type)}
      <SuiText weight='medium'>{name}</SuiText>
    </div>
  )
}
