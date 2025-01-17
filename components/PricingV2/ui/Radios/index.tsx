import * as RadioGroup from '@radix-ui/react-radio-group'
import { useId } from 'react'

export interface RadiosProps {
  options: Array<{ value: any; label: string }>
  value: any
  onChange: (value: any) => void
}

export default function Radios({ options, value, onChange }: RadiosProps) {
  return (
    <>
      <RadioGroup.Root
        className='mt-5 flex flex-row items-center gap-2.5 gap-x-6'
        value={value}
        onValueChange={onChange}
        aria-label='Is your data compressed?'>
        {options.map((item, index) => {
          const id = useId()
          return (
            <div key={item.value} className='flex items-center'>
              <RadioGroup.Item
                value={item.value}
                id={id}
                className='h-[16px] w-[16px] cursor-pointer rounded-full border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
                <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-primary-300 after:content-['']" />
              </RadioGroup.Item>
              <label
                className='cursor-pointer pl-[8px] text-[15px] leading-none text-white'
                htmlFor={id}>
                {item.label}
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </>
  )
}
