import { useRouter } from 'next/router'
import * as Slider from '@radix-ui/react-slider'

export interface RangeSliderProps {
  value: number
  onChange: (value: number) => void
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange
}) => {
  const router = useRouter()
  return (
    <div>
      <Slider.Root
        className='relative flex h-5 touch-none select-none items-center hover:cursor-pointer'
        max={24}
        step={1}
        value={[value]}
        onValueChange={(values) => {
          const newValue = values[0]
          onChange(newValue)
          router.push(
            {
              query: {
                ...router.query,
                hours: newValue
              }
            },
            undefined,
            { shallow: true }
          )
        }}>
        <Slider.Track className='relative h-[3px] grow rounded-full bg-[#414141] hover:cursor-pointer'>
          <Slider.Range className='absolute h-full rounded-full bg-primary-300 ' />
        </Slider.Track>
        <Slider.Thumb
          className='block h-5 w-5 rounded-full border-4 border-neutral-800 bg-primary-300  focus:outline-none'
          aria-label='Hours'
          id='sliderThumb'>
          <div className='absolute inset-0 -right-[70px] flex items-center justify-center'>
            <div className='triangle relative'>
              <div className='absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rotate-45 transform bg-transparent'>
                <div className='h-full w-full bg-primary-300'></div>
              </div>
            </div>
            <div className='hours rounded-[4px] bg-primary-300 py-1 px-3 text-center text-xs font-bold text-black'>
              {value}h
            </div>
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  )
}
