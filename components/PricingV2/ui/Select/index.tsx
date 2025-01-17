import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useMemo } from 'react'

export type Option = { value: any; label: string }
export type Options = Array<Option>

export interface SelectProps {
  options: Options
  value: any
  onChange: (value: any) => void
}

export default function Select({ options, value, onChange }: SelectProps) {
  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  return (
    <Listbox value={value} onChange={onChange} as='div' className=''>
      <div className='relative'>
        <Listbox.Button className='relative w-full cursor-default rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm'>
          <span className='flex gap-3 truncate'>
            {selectedOption ? selectedOption.label : ''}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5 text-c4' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Listbox.Options className='absolute z-10 -mt-1 w-full overflow-auto rounded-md rounded-t-none border border-t-0 border-primary-300 bg-neutral-725 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {options.map((item, index) => (
            <Listbox.Option
              key={item.value}
              value={item.value}
              className='hover:bg-neutral-700'>
              {({ selected }) => (
                <span
                  className={`relative flex w-full cursor-pointer gap-3 truncate rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm ${
                    selected ? 'font-bold text-primary-300' : 'font-normal'
                  }`}>
                  {item.label}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
