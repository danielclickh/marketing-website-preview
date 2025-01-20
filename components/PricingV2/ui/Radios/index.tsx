import * as RadioGroup from '@radix-ui/react-radio-group'
import { useId } from 'react'

export type Option = { value: any; label: string | React.ReactNode }
export type Options = Array<Option>

export interface RadiosProps {
  options: Options
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
            <div key={item.value} className='flex items-center gap-2'>
              <RadioGroup.Item
                value={item.value}
                id={id}
                className='aspect-square w-4 cursor-pointer overflow-hidden rounded-full border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
                <RadioGroup.Indicator
                  className={`relative flex h-full w-full items-center justify-center bg-primary-300 after:absolute after:inset-[4px] after:block after:rounded-full after:bg-neutral-750 after:content-['']`}
                />
              </RadioGroup.Item>
              <label
                className='cursor-pointer text-sm leading-none text-white'
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
