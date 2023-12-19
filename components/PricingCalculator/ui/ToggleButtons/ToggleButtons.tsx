import { useRouter } from 'next/router'
import Icon from '../../ui/Tooltip'

export interface Option<T extends string = string> {
  value: T
  label: string
  tooltip?: string
}

export interface ToggleButtonsProps<T extends string = string> {
  options: Array<Option<T>>
  value: string
}

export function ToggleButtons<T extends string = string>({
  options,
  value
}: ToggleButtonsProps<T>) {
  const router = useRouter()

  return (
    <div className='flex gap-5'>
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex gap-2 rounded-[4px] bg-neutral-750 py-2 px-10 text-sm font-medium transition-all delay-75 hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl ${
            value === option.value
              ? 'border border-primary-300'
              : 'border border-neutral-700'
          }`}
          onClick={() => {
            router.push(
              {
                query: {
                  ...router.query,
                  tier: option.value
                }
              },
              undefined,
              { shallow: true }
            )
          }}>
          <button>{option.label}</button>
          {option.tooltip && <Icon content={option.tooltip} />}
        </div>
      ))}
    </div>
  )
}
