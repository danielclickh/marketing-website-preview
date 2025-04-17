import Label from '../../ui/Label'
import Range from '../../ui/Range'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { CheckIcon } from '@heroicons/react/solid'

export default function HoursSelector() {
  const { setValues, hours } = usePricingV2Context()
  const isAlwaysOn = hours && hours >= 24
  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <Label
          tooltip='We idle your service when it’s inactive, saving you on cost.'
          className='!mb-0 flex-1'>
          Active hours per day
        </Label>
        <div className='flex flex-shrink-0 flex-grow-0 items-center gap-2'>
          <button
            className='group/always-on inline-flex cursor-pointer items-center gap-2'
            onClick={(event) => {
              event.preventDefault()
              setValues({ hours: isAlwaysOn ? 8 : 24 })
            }}>
            <span
              className={`flex aspect-square w-4 overflow-hidden rounded-sm border border-neutral-700 ${
                isAlwaysOn
                  ? 'bg-primary-300'
                  : 'bg-neutral-750 outline-none group-hover/always-on:border-primary-500 group-hover/always-on:bg-neutral-725/80'
              }`}>
              <CheckIcon
                className={`h-4 w-4 text-neutral-750 transition-opacity ${
                  !isAlwaysOn ? 'opacity-0' : ''
                }`}
              />
            </span>
            <span className='text-sm leading-none text-white'>Always on</span>
          </button>
        </div>
      </div>
      <div
        className={`transition-opacity ${
          isAlwaysOn
            ? /* Translate class fixes a clipping bug in Safari */
              'translate-x-0 opacity-30'
            : ''
        }`}>
        <Range
          min={0}
          max={24}
          value={hours !== null ? hours : 8}
          onChange={(value) => setValues({ hours: value })}
        />
      </div>
    </div>
  )
}
