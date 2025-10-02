import * as RadioGroup from '@radix-ui/react-radio-group'
import { useId } from 'react'

export type Option = { value: any; label: string | React.ReactNode }
export type Options = Array<Option>

export interface RadiosProps {
  options: Options
  value: any
  onChange: (value: any) => void
  className?: string
}

export default function Radios({
  options,
  value,
  onChange,
  className = ''
}: RadiosProps) {
  const groupId = useId()
  return (
    <>
      <RadioGroup.Root
        className={`mt-5 flex flex-row items-center gap-2.5 gap-x-6 ${className}`}
        value={value}
        onValueChange={onChange}
        aria-label='Is your data compressed?'>
        {options.map((item, index) => {
          return (
            <div key={item.value} className='flex items-center'>
              <RadioGroup.Item
                value={item.value}
                id={`pricing-radio-${groupId}-${index}`}
                className='aspect-square w-4 cursor-pointer overflow-hidden rounded-full border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
                <RadioGroup.Indicator
                  className={`relative flex aspect-square w-full items-center justify-center bg-primary-300 after:absolute after:inset-[4px] after:block after:rounded-full after:bg-neutral-750 after:content-['']`}
                />
              </RadioGroup.Item>
              <label
                className='cursor-pointer pl-2 text-sm leading-none text-white'
                htmlFor={`pricing-radio-${groupId}-${index}`}>
                {item.label}
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </>
  )
}
