import { ToggleButtonsProps } from '../../CalculatorTypesOptions'
import TooltipInfo from '../Tooltip/tooltip'
import { useRouter } from 'next/router'

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
          className={`flex items-center gap-2 rounded-[4px] bg-neutral-750 px-6 py-2 text-sm font-medium transition-all hover:cursor-pointer hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl lg:px-10 ${
            value === option.value
              ? 'border border-primary-300'
              : 'border border-neutral-700 hover:border-primary-500'
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
          {option.tooltip && <TooltipInfo content={option.tooltip} />}
        </div>
      ))}
    </div>
  )
}
