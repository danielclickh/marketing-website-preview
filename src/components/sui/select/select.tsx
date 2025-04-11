import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'

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
          className='block pb-1 text-xs font-bold text-neutral-0'>
          {props.label}
        </label>
      )}
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full max-w-lg cursor-default rounded-md border border-c4/10 bg-c2 bg-default_size bg-left-bottom bg-no-repeat py-2 pl-3 pr-10 text-left shadow-sm transition-[background] ease-in focus:bg-c1 focus:bg-field_focus focus:bg-focus_size focus:outline-none sm:text-sm'>
                <span className='block truncate'>{selected.name}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
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
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full max-w-lg overflow-auto rounded-md bg-c1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {props.options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-c1' : 'bg-c2',
                          'relative cursor-pointer select-none py-2 pl-3 pr-9 text-neutral-0 placeholder-c4'
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
                                'absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4'
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
