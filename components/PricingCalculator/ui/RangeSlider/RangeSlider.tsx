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
        className='relative flex h-5 touch-none select-none items-center'
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
        <Slider.Track className='relative h-[3px] grow rounded-full bg-[#414141]'>
          <Slider.Range className='absolute h-full rounded-full bg-primary-300' />
        </Slider.Track>
        <Slider.Thumb
          className='block h-3 w-3 rounded-full bg-primary-300 hover:cursor-pointer focus:outline-none'
          aria-label='Hours'
        />
      </Slider.Root>
    </div>
  )
}
