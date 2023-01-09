'use client'
import React, { Fragment } from 'react'
import { Listbox, Transition } from '../HeadlessUIClient'
import { usePricing } from './Context'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { RegionPricingWithIcon } from '../../app/pricing/types'

function PricingSelector({ regionList }: { regionList: RegionPricingWithIcon[] }) {
  const { selectedRegion, setSelectedRegion } = usePricing()

  return (
    <Listbox value={selectedRegion} onChange={setSelectedRegion}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative bg-c1 w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm'>
          <span className='flex gap-3 truncate'>
            <>
              {selectedRegion.regionFlagPNG}
              {selectedRegion.region}
            </>
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5 text-c4' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Listbox.Options className='absolute mt-1 w-full overflow-auto rounded-md bg-c1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {regionList.map((item) => (
              <Listbox.Option
                key={item.region}
                value={item}
                className='hover:bg-c2'>
                {({ selected }) => (
                  <span
                    className={`flex gap-3 truncate relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm ${
                      selected ? 'font-bold' : 'font-normal'
                    }`}>
                    {item.regionFlagPNG}
                    {item.region}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default PricingSelector
