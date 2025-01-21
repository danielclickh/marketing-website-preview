import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import * as Tooltip from '@radix-ui/react-tooltip'
import React, { Fragment, memo } from 'react'
import {
  PricingV2ComponentPerk,
  PricingV2EntryPlan
} from '../../../../lib/api/strapi/types'
import { CUIButton, CUICard } from '../../../ClickUI'
import HRSeparator from '../../../HRSeparator'
import Markdown from '../../../Markdown'
import TooltipInfo from '../../../PricingCalculator/ui/Tooltip/tooltip'
import { Context, usePricingV2Context } from '../../../PricingV2ContextProvider'
import { SuiTitle } from '../../../sui'
import PriceUsd from '../../ui/PriceUsd'
import ProviderSelector from '../ProviderSelector'
import RegionSelector from '../RegionSelector'

const perkIcons: Record<PricingV2ComponentPerk['icon'], React.ReactNode> = {
  None: <></>,
  Tick: <CheckIcon className='h-4 w-4' />,
  Dash: <MinusIcon className='h-4 w-4' />
}

const TableColumn = memo(function TableColumn({
  item,
  computeUnitPrice,
  storageUnitPrice,
  onEstimateCostClick
}: {
  item: PricingV2EntryPlan
  computeUnitPrice: Context['computeUnitPrice']
  storageUnitPrice: Context['storageUnitPrice']
  onEstimateCostClick: () => void
}) {
  return (
    <div className='flex-1 basis-0 p-4'>
      <CUICard
        className={`relative overflow-hidden bg-neutral-900/50 shadow-card-xl ${
          item.featured ? '!border-primary !shadow-2xl !shadow-primary/20' : ''
        }`}>
        <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
        <div className='relative flex min-h-full flex-col gap-y-6 p-6'>
          <SuiTitle type='h2' className='text-center'>
            {item.name}
          </SuiTitle>
          {item.description && (
            <div className='text-normal text-center text-sm text-neutral-300'>
              <Markdown>{item.description}</Markdown>
            </div>
          )}
          <CUIButton
            onClick={() => {
              onEstimateCostClick()
              const calculator = document.getElementById('pricing-calculator')
              if (calculator) {
                calculator.scrollIntoView({
                  behavior: 'smooth'
                })
              }
            }}
            weight='medium'
            className='stroked_button_wrapper button_wrapper mt-4 w-full'
            type='secondary'>
            Estimate your monthly cost ↓
          </CUIButton>
          <HRSeparator />
          {item.perks.length > 0 && (
            <ul className='space-y-5'>
              {item.perks.map((perk, perkIndex) => {
                const PerkContent = () => <Markdown>{perk.text}</Markdown>
                return (
                  <li
                    key={perkIndex}
                    className='row flex items-center justify-start gap-4 text-sm'>
                    <span className='flex-shrink-0 flex-grow-0'>
                      {perkIcons[perk.icon]}
                    </span>
                    {!perk.tooltip && <PerkContent />}
                    {perk.tooltip && (
                      <Tooltip.Provider
                        delayDuration={0}
                        disableHoverableContent={false}>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <PerkContent />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side='top'
                              align='start'
                              className='max-w-[300px] whitespace-pre-wrap rounded-[4px] bg-neutral-725 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
                              sideOffset={5}>
                              {perk.tooltip}
                              <Tooltip.Arrow className='fill-neutral-725' />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          <div className='mt-auto grid grid-cols-2'>
            {storageUnitPrice && (
              <div className='space-y-2'>
                <p className='text-sm font-bold'>Storage</p>
                <div className='whitespace-nowrap text-2.75xl font-semibold'>
                  <PriceUsd price={storageUnitPrice} />
                </div>
                <div className='flex flex-wrap items-center gap-2 text-[14px] text-[#DFDFDF]'>
                  <span>Per 1TB / mo</span>
                  <TooltipInfo
                    content={`Data is compressed by 90-98% before it's stored.`}
                  />
                </div>
              </div>
            )}
            {computeUnitPrice && (
              <div className='space-y-2'>
                <p className='text-sm font-bold'>Compute</p>
                <div className='whitespace-nowrap text-2.75xl font-semibold'>
                  <PriceUsd price={computeUnitPrice} decimalPlaces={4} />
                </div>
                <div className='flex flex-wrap items-center gap-2 text-[14px] text-[#DFDFDF]'>
                  <span>Per unit / hr</span>
                  <TooltipInfo content={`1 unit = 8GiB RAM, 2 vCPU`} />
                </div>
              </div>
            )}
          </div>
          <CUIButton
            href='https://clickhouse.cloud/signUp?loc=website-pricing-page'
            weight='medium'
            className='w-full'
            type='primary'>
            Start your 30-day free trial
          </CUIButton>
        </div>
      </CUICard>
    </div>
  )
})

export default function Table({
  beforeFilters,
  afterFilters
}: {
  beforeFilters?: React.ReactNode
  afterFilters?: React.ReactNode
}) {
  const { plans, setPlan, computeUnitPrice, storageUnitPrice } =
    usePricingV2Context()
  return (
    <div id='pricing-table'>
      <div className='mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6'>
        {beforeFilters}
        <ProviderSelector displayLabel={false} />
        <RegionSelector displayLabel={false} className='w-full max-w-80' />
        {afterFilters}
      </div>
      <div className='flex flex-col lg:flex-row'>
        {plans.map((item, index) => {
          return (
            <Fragment key={index}>
              <TableColumn
                item={item}
                computeUnitPrice={computeUnitPrice}
                storageUnitPrice={storageUnitPrice}
                onEstimateCostClick={() => {
                  setPlan(item.slug)
                }}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
