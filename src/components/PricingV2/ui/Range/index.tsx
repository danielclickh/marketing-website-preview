import * as Slider from '@radix-ui/react-slider'

export interface RangeProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  thumbPrefix?: string
  thumbSuffix?: string
}

export default function Range({
  min,
  max,
  step,
  value,
  onChange,
  thumbPrefix,
  thumbSuffix
}: RangeProps) {
  return (
    <div className={max && value === max ? 'pr-4' : ''}>
      <Slider.Root
        className='relative flex h-5 touch-none select-none items-center hover:cursor-pointer'
        max={max}
        min={min}
        step={step}
        value={[value]}
        onValueChange={(values) => {
          onChange(values[0])
        }}>
        <Slider.Track className='relative h-[3px] grow rounded-full bg-[#414141] hover:cursor-pointer'>
          <Slider.Range className='absolute h-full rounded-full bg-primary-300' />
        </Slider.Track>
        <Slider.Thumb className='block h-5 w-5 rounded-full border-4 border-neutral-800 bg-primary-300 focus:outline-none'>
          <div className='absolute left-full top-1/2 flex -translate-y-1/2 translate-x-2 items-center justify-center rounded bg-primary-300 px-3 py-1 text-center text-xs font-bold text-black'>
            <div className='absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-primary-300' />
            <span>
              {thumbPrefix}
              {value}
              {thumbSuffix}
            </span>
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  )
}
