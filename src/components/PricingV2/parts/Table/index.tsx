import ProviderSelector from '../../fields/ProviderSelector'
import RegionSelector from '../../fields/RegionSelector'
import { Context } from '../../types'
import PerkItem from '../../ui/PerkItem'
import PriceUsd from '../../ui/PriceUsd'
import { CUIButton, CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import { MarkdownMemoized } from '@/components/Markdown'
import TooltipInfo from '@/components/PricingCalculator/ui/Tooltip/tooltip'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { SuiText, SuiTitle } from '@/components/sui'
import { PricingV2ComponentPlan } from '@/lib/api/strapi/types'
import Link from 'next/link'
import React, { Fragment, memo, useCallback, useMemo } from 'react'

const TableColumn = memo(function TableColumn({
  item,
  computeUnitPrice,
  storageUnitPrice,
  onEstimateCostClick
}: {
  item: PricingV2ComponentPlan
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
              <MarkdownMemoized>{item.description}</MarkdownMemoized>
            </div>
          )}
          <CUIButton
            onClick={() => {
              onEstimateCostClick()
              const calculator = document.getElementById('pricing-calculator')
              if (calculator) {
                calculator.scrollIntoView()
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
                return (
                  <li key={perkIndex}>
                    <PerkItem
                      text={perk.text}
                      icon={perk.icon}
                      tooltip={perk.tooltip}
                    />
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
  const {
    sourceData,
    setValues,
    provider,
    providerEntry,
    region,
    getPlanPricingData,
    getPlanPricingConfig
  } = usePricingV2Context()

  const getPricingData = useCallback(
    (planSlug: string) => {
      if (!planSlug || !provider || !region) return undefined

      const pricingConfig = getPlanPricingConfig(planSlug)

      const computeAggregationIds = pricingConfig?.aggregationIds?.compute || []
      const storageAggregationIds = pricingConfig?.aggregationIds?.storage || []

      const pricingData = getPlanPricingData(planSlug)?.filter((result) => {
        return (
          result.cloudProvider?.toLowerCase() === provider &&
          result.region?.toLowerCase() === region
        )
      })

      const computeUnitPrice =
        pricingData
          ?.find((result) =>
            computeAggregationIds.includes(result.aggregationId)
          )
          ?.pricingBands.at(0)?.unitPrice || null

      const storageUnitPrice =
        pricingData
          ?.find((result) =>
            storageAggregationIds.includes(result.aggregationId)
          )
          ?.pricingBands.at(0)?.unitPrice || null

      return {
        computeUnitPrice,
        storageUnitPrice
      }
    },
    [getPlanPricingData, getPlanPricingConfig, provider, region]
  )

  const minPublicInternetEgress = useMemo(() => {
    if (!providerEntry) return null
    return Math.min(...providerEntry.regions.map((item) => item.internetEgress))
  }, [providerEntry])

  const minInterRegionEgress = useMemo(() => {
    if (!providerEntry) return null
    return Math.min(
      ...providerEntry.regions.map((item) => item.interRegionEgress)
    )
  }, [providerEntry])

  return (
    <div id='pricing-table'>
      <div className='mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6'>
        {beforeFilters}
        <ProviderSelector displayLabel={false} />
        <RegionSelector displayLabel={false} className='w-full max-w-80' />
        {afterFilters}
      </div>
      <div className='flex flex-col lg:flex-row'>
        {sourceData.plans.map((item, index) => {
          const planPricingData = getPricingData(item.slug)
          return (
            <Fragment key={index}>
              <TableColumn
                item={item}
                computeUnitPrice={planPricingData?.computeUnitPrice || null}
                storageUnitPrice={planPricingData?.storageUnitPrice || null}
                onEstimateCostClick={() => {
                  setValues({ plan: item.slug })
                }}
              />
            </Fragment>
          )
        })}
      </div>

      <div className='my-8 space-y-4 text-center text-slate-300'>
        {minPublicInternetEgress && minInterRegionEgress && (
          <SuiText size='sm'>
            <Link
              href='https://clickhouse.com/docs/cloud/manage/network-data-transfer'
              className='text-primary-300 hover:underline'>
              Data transfer
            </Link>{' '}
            for public internet egress starting at{' '}
            <strong className='text-white'>
              <PriceUsd price={minPublicInternetEgress} decimalPlaces='auto' />{' '}
              / GB
            </strong>
            , inter region egress starting at{' '}
            <strong className='text-white'>
              <PriceUsd price={minInterRegionEgress} decimalPlaces='auto' /> /
              GB
            </strong>
            .
          </SuiText>
        )}
      </div>
    </div>
  )
}
