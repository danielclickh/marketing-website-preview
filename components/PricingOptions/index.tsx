'use client'
import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import CloudProviders from '../CloudProviders'
import { Listbox, Transition } from '../HeadlessUIClient'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiButton } from '../sui'
import ShowPricing from './ShowPricing'

function PricingOptions({ pricingByRegion, pricingPlans, children }) {
  const [selectedRegion, setSelectedRegion] = useState(pricingByRegion[0])
  const totalLength = pricingByRegion.length
  return (
    <>
      <div className='center_content'>
        <div className='controls_row flex items-end'>
          {children}
          <div className='seed_select_wrapper'>
            <Listbox value={selectedRegion} onChange={setSelectedRegion}>
              <div className='relative mt-1'>
                <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                  <span className='block truncate'>
                    {/* <StrapiImage src={selectedRegion.regionFlagPNG.data} /> */}
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
                  <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {pricingByRegion.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        value={item}
                        className='ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black'>
                        <span className='block truncate'>
                          {/* <StrapiImage src={item.regionFlagPNG.data} /> */}
                          {item.region}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      {selectedRegion && (
        <div>
          {pricingPlans.length > 0 && (
            <div className='plans_container flex '>
              {pricingPlans.map((plan, index) => (
                <div
                  className='plan_card border-2'
                  key={`${selectedRegion.region}-${plan.name}`}>
                  <div className='top_marker'></div>
                  <div className='card_content'>
                    <div className='title'>{plan.name}</div>
                    <div className='subtitle'>{plan.description}</div>
                    <div className='pricing_title'>
                      <span>
                        {index === 0
                          ? selectedRegion.devStoragePricing.devPriceUSD
                          : plan.pricingMain}
                      </span>
                    </div>

                    <div className='plan_items'>
                      {(plan.items ?? []).map((item, planIndex: number) => (
                        <div
                          className='row flex'
                          key={`${selectedRegion.region}-bullet-${planIndex}`}>
                          {item.isBulleted && <CheckIcon className='w-4 h-4' />}
                          <p className='item_text'>
                            <Markdown>{item.description}</Markdown>
                          </p>
                        </div>
                      ))}
                    </div>
                    {(plan.items_disabled ?? []).length > 0 && (
                      <div className='plan_disabled_items'>
                        {plan.items_disabled.map(
                          (itemDisabled, planIndex: number) => (
                            <div
                              className='row_not_included flex '
                              key={`${selectedRegion.region}-disabled-bullet-${planIndex}`}>
                              <MinusIcon className='w-4 h-4' />
                              {/* <mat-icon className="check_icon" svgIcon="glyph_dash"></mat-icon> */}
                              <p className='item_text'>
                                <Markdown>{itemDisabled.description}</Markdown>
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {index !== totalLength - 1 &&
                      selectedRegion.hasDevService && (
                        <ShowPricing
                          isFirst={index === 0}
                          storage={
                            selectedRegion[
                              index === 0
                                ? 'devStoragePricing'
                                : 'storagePricing'
                            ]
                          }
                          compute={
                            selectedRegion[
                              index === 0
                                ? 'devComputePricing'
                                : 'computePricing'
                            ]
                          }
                        />
                      )}
                    {plan.actionButton && (
                      <span>
                        {index === 0 ? (
                          <span>
                            {selectedRegion.hasDevService ? (
                              <SuiButton
                                path={plan.actionButton.link}
                                className={`stroked_button_wrapper button_wrapper ${
                                  index !== totalLength - 1
                                    ? 'stroked_button'
                                    : 'primary'
                                }`}
                                title={plan.actionButton.text}
                              />
                            ) : (
                              <SuiButton
                                className='stroked_button_wrapper button_wrapper disabled_button'
                                path={plan.actionButton.link}
                                disabled
                                title='Coming soon'
                              />
                            )}
                          </span>
                        ) : (
                          <SuiButton
                            path={plan.actionButton.link}
                            className={`stroked_button_wrapper button_wrapper ${
                              index !== totalLength - 1
                                ? 'stroked_button'
                                : 'primary'
                            }`}
                            title={plan.actionButton.text}
                          />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PricingOptions
