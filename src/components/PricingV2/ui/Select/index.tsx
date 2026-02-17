import { StrapiImageUrl } from '../../../StrapiElements'
import { StrapiImageType } from '@/lib/api/strapi/types'
import { slugify } from '@/lib/utils/strings'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import isEqual from 'lodash/isEqual'
import { Fragment, memo, useMemo } from 'react'

export type Option = {
  value: any
  label: string | React.ReactNode
  disabled?: boolean
  icon?: StrapiImageType | null
  group?: string | null
}
export type Options = Array<Option>

export interface SelectProps {
  options: Options
  value: any
  onChange: (value: any) => void
  maxHeight?: number
  placeholder?: string | React.ReactNode
}

type SelectOptionProps = {
  label: Option['label']
  selected: boolean
  disabled?: boolean
  icon?: Option['icon']
}

const SelectOption = memo(function SelectOption({
  label,
  selected,
  disabled,
  icon
}: SelectOptionProps) {
  return (
    <span
      className={`relative flex w-full items-center gap-3 truncate rounded-lg px-3 py-2 text-left focus:outline-none sm:text-sm ${
        selected ? 'font-bold text-primary-300' : 'font-normal'
      } ${disabled ? 'opacity-60' : 'cursor-pointer'}`}>
      {icon && (
        <StrapiImageUrl
          {...icon}
          className='!h-6 !w-8 flex-shrink-0 flex-grow-0 object-scale-down object-center'
        />
      )}
      {label}
    </span>
  )
})

const Select = memo(function Select({
  options,
  value,
  onChange,
  maxHeight,
  placeholder = ''
}: SelectProps) {
  const groupedOptions = useMemo(() => {
    const grouped: Array<{
      key: string
      label: string
      options: Array<Option>
    }> = []
    options.forEach((option) => {
      const groupName = (option?.group || '').trim()
      const groupKey = slugify(groupName)

      let group = grouped.find((item) => item.key === groupKey)

      if (!group) {
        group = { key: groupKey, label: groupName, options: [] }
        grouped.push(group)
      }

      group.options.push(option)
    })

    return grouped
  }, [options])

  const selectedOption = useMemo(() => {
    return options.find((option) => isEqual(option.value, value))
  }, [options, value])

  if (typeof placeholder === 'string') {
    placeholder = <span className='opacity-40'>{placeholder}</span>
  }

  return (
    <Listbox value={value} onChange={onChange} as='div'>
      <div className='relative'>
        <Listbox.Button className='relative h-10 w-full cursor-default rounded-[4px] border border-neutral-700 bg-neutral-725 pl-3 pr-7 text-left shadow-input transition-colors hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm'>
          <span className='flex items-center gap-3 truncate'>
            {selectedOption && (
              <>
                {selectedOption.icon && (
                  <StrapiImageUrl
                    {...selectedOption.icon}
                    className='!h-6 !w-8 flex-shrink-0 flex-grow-0 object-scale-down object-center'
                  />
                )}
                {selectedOption.label}
              </>
            )}
            {!selectedOption && placeholder}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Listbox.Options
          style={{ maxHeight }}
          className='absolute z-50 -mt-1 w-full overflow-auto rounded-md rounded-t-none border border-t-0 border-primary-300 bg-neutral-725 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {groupedOptions.map((group, groupIndex) => {
            return (
              <Fragment key={groupIndex}>
                {group.label.length > 0 && (
                  <span className='mt-2 block bg-white/5 px-3 py-1 text-xs text-neutral-200'>
                    {group.label}
                  </span>
                )}
                {group.options.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    value={item.value}
                    disabled={item.disabled}
                    className='hover:bg-neutral-700'>
                    {({ selected, disabled }) => (
                      <SelectOption
                        label={item.label}
                        selected={selected}
                        disabled={disabled}
                        icon={item.icon}
                      />
                    )}
                  </Listbox.Option>
                ))}
              </Fragment>
            )
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  )
})

export default Select
