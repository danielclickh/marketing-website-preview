'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type SelectProps = {
  options: { id: number; name: string }[]
  labelVisible?: boolean
  label?: string
  htmlFor: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SuiSelect(props: SelectProps) {
  const [selected, setSelected] = useState(props.options[1])

  return (
    <>
      {props.labelVisible && (
        <label
          htmlFor={props.htmlFor}
          className='block text-xs font-bold text-text-darkest dark:text-white pb-1'>
          {props.label}
        </label>
      )}
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className='mt-1 relative'>
              <Listbox.Button className='focus:bg-field_focus bg-default_size focus:bg-focus_size bg-no-repeat transition-field_props ease-in bg-light-grey1a focus:bg-white dark:bg-dark-grey1 relative w-full border border-light-grey5 dark:border-dark-grey4 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm max-w-lg'>
                <span className='block truncate'>{selected.name}</span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <SelectorIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-dark-grey4 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-w-lg'>
                  {props.options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'text-text-darkest dark:text-white bg-light-grey2 dark:bg-dark-grey3'
                            : 'text-gray-900 dark:text-gray-200',
                          'cursor-pointer select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={option}>
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}>
                            {option.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-c6' : 'text-c6',
                                'absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer'
                              )}>
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  )
}
