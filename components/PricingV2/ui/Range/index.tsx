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
          <Slider.Range className='absolute h-full rounded-full bg-primary-300 ' />
        </Slider.Track>
        <Slider.Thumb className='block h-5 w-5 rounded-full border-4 border-neutral-800 bg-primary-300  focus:outline-none'>
          <div className='absolute inset-0 -right-[70px] flex items-center justify-center'>
            <div className='triangle relative'>
              <div className='absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rotate-45 transform bg-transparent'>
                <div className='h-full w-full bg-primary-300'></div>
              </div>
            </div>
            <div className='rounded-[4px] bg-primary-300 px-3 py-1 text-center text-xs font-bold text-black'>
              {thumbPrefix}
              {value}
              {thumbSuffix}
            </div>
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  )
}
