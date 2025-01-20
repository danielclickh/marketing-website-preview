import { CheckIcon } from '@heroicons/react/solid'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useId, useState } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'
import Range from '../../ui/Range'

export default function HoursSelector() {
  const { hours, setHours } = usePricingV2Context()
  const checkboxId = useId()
  const [isAlwaysOn, setIsAlwaysOn] = useState<Checkbox.CheckedState>(false)

  useEffect(() => {
    if (hours === 24 && !isAlwaysOn) {
      setIsAlwaysOn(true)
    } else if (hours !== 24 && isAlwaysOn) {
      setIsAlwaysOn(false)
    }
  }, [hours])

  useEffect(() => {
    if (isAlwaysOn && hours !== 24) {
      setHours(24)
    } else if (!isAlwaysOn && hours === 24) {
      setHours(0)
    }
  }, [isAlwaysOn])

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <Label
          tooltip='We idle your service when it’s inactive, saving you on cost.'
          className='!mb-0 flex-1'>
          Active hours per day
        </Label>
        <div className='flex flex-shrink-0 flex-grow-0 items-center gap-2'>
          <Checkbox.Root
            id={checkboxId}
            checked={isAlwaysOn}
            onCheckedChange={setIsAlwaysOn}
            className='aspect-square w-4 cursor-pointer overflow-hidden rounded-sm border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
            <Checkbox.Indicator className='relative flex h-full w-full items-center justify-center bg-primary-300'>
              <CheckIcon className='h-4 w-4 text-neutral-750' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            htmlFor={checkboxId}
            className='cursor-pointer text-sm leading-none text-white'>
            Always on
          </label>
        </div>
      </div>
      <div className={`transition-opacity ${isAlwaysOn ? 'opacity-30' : ''}`}>
        <Range min={0} max={24} value={hours || 0} onChange={setHours} />
      </div>
    </div>
  )
}
