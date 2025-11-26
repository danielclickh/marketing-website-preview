import { usePricing } from './PricingContext'
import { RegionPricingWithIcon } from './types'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

type OnChangeCallback = (value: RegionPricingWithIcon) => void

function PricingSelector({
  regionList,
  onChange
}: {
  regionList: RegionPricingWithIcon[]
  onChange?: OnChangeCallback
}) {
  const { selectedRegion, setSelectedRegion } = usePricing()

  const listValueChange: OnChangeCallback = (value) => {
    setSelectedRegion(value)

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <Listbox value={selectedRegion} onChange={listValueChange}>
      <div className='relative'>
        <Listbox.Button className='relative w-full cursor-default rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input hover:cursor-pointer hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl focus:outline-none data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm'>
          <span className='flex gap-3 truncate'>
            <>
              {selectedRegion?.regionFlagPNG}
              {selectedRegion?.region}
            </>
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
          </span>
        </Listbox.Button>

        <Listbox.Options className='absolute z-10 -mt-1 w-full overflow-auto rounded-md rounded-t-none border border-t-0 border-primary-300 bg-neutral-725 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {regionList.map((item) => {
            let regionSlug =
              item.region.match(/[(]*\(([^)]+)\)$/i)?.[1] || item.region
            const selectedRegionName =
              selectedRegion?.region.match(/[(]*\(([^)]+)\)$/i)?.[1]

            if (regionSlug !== selectedRegionName) {
              return (
                <Listbox.Option
                  key={item.region}
                  value={item}
                  className='hover:bg-neutral-700'>
                  {({ selected }) => (
                    <span
                      className={`relative flex w-full cursor-pointer gap-3 truncate rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm ${
                        selected ? 'font-bold' : 'font-normal'
                      }`}>
                      {item.regionFlagPNG}
                      {item.region}
                    </span>
                  )}
                </Listbox.Option>
              )
            }
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export default PricingSelector
