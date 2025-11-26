import { SelectProps } from '../../CalculatorTypesOptions'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  id,
  disabled = false
}) => {
  const router = useRouter()
  const selectedOption = options.find((option) => option.value === value)

  const handleChange = (e: any) => {
    if (id === 'storageVolume') {
      router.push(
        {
          query: {
            ...router.query,
            storage: e.value
          }
        },
        undefined,
        { shallow: true }
      )
    }
    if (id === 'storageUnit') {
      router.push(
        {
          query: {
            ...router.query,
            storageUnit: e.value
          }
        },
        undefined,
        { shallow: true }
      )
    }
    if (id === 'storageCompressed') {
      router.push(
        {
          query: {
            ...router.query,
            storageCompressed: e.value
          }
        },
        undefined,
        { shallow: true }
      )
    }
    if (id === 'computeMinSize') {
      router.push(
        {
          query: {
            ...router.query,
            computeMinSize: e.value
          }
        },
        undefined,
        { shallow: true }
      )
    }
    if (id === 'computeMaxSize') {
      router.push(
        {
          query: {
            ...router.query,
            computeMaxSize: e.value
          }
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <>
      <Listbox
        value={value}
        onChange={handleChange}
        as='div'
        id={id}
        disabled={disabled}
        className=''>
        <div className='relative'>
          <Listbox.Button
            className={`${
              disabled
                ? 'border-neutral-750'
                : 'hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
            } relative w-full cursor-default rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm`}>
            <span className='flex gap-3 truncate'>
              <span className={disabled ? 'text-neutral-300' : ''}>
                {selectedOption ? selectedOption.label : ''}
              </span>
            </span>
            {!disabled && (
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
              </span>
            )}
          </Listbox.Button>
          <Listbox.Options className='absolute z-10 -mt-1 w-full overflow-auto rounded-md rounded-t-none border border-t-0 border-primary-300 bg-neutral-725 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options
              .filter((option) => option.value !== value)
              .map((item, index) => (
                <Listbox.Option
                  key={index}
                  value={item}
                  className='hover:bg-neutral-700'>
                  {({ selected }) => (
                    <span
                      className={`relative flex w-full cursor-pointer gap-3 truncate rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm ${
                        selected ? 'font-bold' : 'font-normal'
                      }`}>
                      {item.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </>
  )
}
