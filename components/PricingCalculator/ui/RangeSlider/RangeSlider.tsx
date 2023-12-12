import React, { ChangeEvent, useCallback } from 'react'
import * as Slider from '@radix-ui/react-slider'

import styles from './RangeSlider.module.scss'

export interface RangeSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min,
  max
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      console.log('value')
      if (!Number.isNaN(value)) {
        onChange(value)
      }
    },
    [onChange]
  )

  return (
    <div>
      <Slider.Root
        className='relative flex h-5 touch-none select-none items-center'
        max={24}
        step={1}
        value={[value]}
        onValueChange={(values) => {
          const newValue = values[0] // Assuming you're only using the first value
          onChange(newValue)
        }}>
        <Slider.Track className='relative h-[3px] grow rounded-full bg-[#414141]'>
          <Slider.Range className='absolute h-full rounded-full bg-primary-300' />
        </Slider.Track>
        <Slider.Thumb
          className='block h-3 w-3 rounded-full bg-primary-300 hover:cursor-pointer focus:outline-none'
          aria-label='Volume'
        />
      </Slider.Root>
      {/* <input
        type="range"
        value={value}
        onChange={handleChange}
        min={1}
        max={24}
        className={styles.input}
      />
      <span className={styles.value}>{value}</span> */}
    </div>
  )
}
