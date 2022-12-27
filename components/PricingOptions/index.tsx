'use client'
import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '../HeadlessUIClient'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiButton } from '../sui'
import ShowPricing from './ShowPricing'

function PricingOptions({ regionList, pricingPlans, children }) {
  const [selectedRegion, setSelectedRegion] = useState(regionList[0])
  const totalLength = pricingPlans.length
  return (
    <>
      <div className='center_content'>
        <div className='controls_row flex flex-col md:flex-row items-center justify-center gap-x-20 gap-y-8 mb-16 mt-8'>
          {children}
          <div className='seed_select_wrapper w-80'>
            <Listbox value={selectedRegion} onChange={setSelectedRegion}>
              <div className='relative mt-1'>
                <Listbox.Button className='relative bg-white dark:bg-gunmetal w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm'>
                  <span className='flex gap-3 truncate'>
                    <Image
                      src={selectedRegion.regionFlagPNG}
                      alt={selectedRegion.region}
                    />
                    {selectedRegion.region}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronDownIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <Listbox.Options className='absolute mt-1 w-full overflow-auto rounded-md bg-white dark:bg-gunmetal py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {regionList.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        value={item}
                        className='hover:bg-cultured dark:hover:bg-onyx'>
                        {({ selected }) => (
                          <span
                            className={`flex gap-3 truncate relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm ${
                              selected ? 'font-bold' : 'font-normal'
                            }`}>
                            <Image src={item.regionFlagPNG} alt={item.region} />
                            {item.region}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      {selectedRegion && pricingPlans.length > 0 && (
        <div className='plans_container grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {pricingPlans.map((plan, index) => (
            <div
              className='plan_card border-t-[5px] rounded-[5px] border-c_yellow w-full max-w-sm bg-white dark:bg-onyx p-10 mx-auto'
              key={`${selectedRegion.region}-${plan.name}`}>
              <div className='card_content flex flex-col h-full justify-between'>
                <div className='border-b mb-6'>
                  <h2 className='text-center text-2xl font-bold mb-1'>
                    {plan.name}
                  </h2>
                  <div className='text-center text-sm md:h-16 xl:h-auto mb-4 text-normal'>
                    {plan.description}
                  </div>
                  <div className='text-center font-bold text-3xl pb-4'>
                    {index === 0
                      ? selectedRegion.devStoragePricing.devPriceUSD
                      : plan.pricingMain}
                  </div>
                </div>
                <div className='flex-auto'>
                  <div className='flex flex-col gap-5'>
                    {(plan.items ?? []).map((item, planIndex: number) => (
                      <div
                        className='row flex items-center gap-4 text-sm justify-start'
                        key={`${selectedRegion.region}-bullet-${planIndex}`}>
                        {item.isBulleted && <CheckIcon className='w-4 h-4' />}
                        <div className='item_text'>
                          <Markdown>{item.description}</Markdown>
                        </div>
                      </div>
                    ))}
                    {plan.items_disabled.map(
                      (itemDisabled, planIndex: number) => (
                        <div
                          className='row_not_included flex items-center gap-4 text-sm justify-start text-gunmetal/30 dark:text-white/30'
                          key={`${selectedRegion.region}-disabled-bullet-${planIndex}`}>
                          <MinusIcon className='w-4 h-4' />
                          <div className='item_text'>
                            <Markdown>{itemDisabled.description}</Markdown>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {index !== totalLength - 1 &&
                    selectedRegion.hasDevService && (
                      <ShowPricing
                        storage={
                          selectedRegion[
                            index === 0 ? 'devStoragePricing' : 'storagePricing'
                          ]
                        }
                        compute={
                          selectedRegion[
                            index === 0 ? 'devComputePricing' : 'computePricing'
                          ]
                        }
                      />
                    )}
                </div>
                <div className='mt-8'>
                  {plan.actionButton && (
                    <>
                      {index === 0 ? (
                        selectedRegion.hasDevService ? (
                          <SuiButton
                            path={plan.actionButton.link}
                            className='stroked_button_wrapper button_wrapper'
                            type='primary'
                            title={plan.actionButton.text}
                            widthFull
                          />
                        ) : (
                          <SuiButton
                            type='secondary'
                            className='w-full stroked_button_wrapper button_wrapper disabled_button'
                            path={plan.actionButton.link}
                            disabled
                            title='Coming soon'
                            widthFull
                          />
                        )
                      ) : (
                        <SuiButton
                          path={plan.actionButton.link}
                          className='w-full stroked_button_wrapper button_wrapper'
                          type={
                            index !== totalLength - 1 ? 'primary' : 'secondary'
                          }
                          title={plan.actionButton.text}
                          widthFull
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PricingOptions
