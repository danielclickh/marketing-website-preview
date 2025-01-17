import * as Tooltip from '@radix-ui/react-tooltip'
import { Fragment, memo } from 'react'
import { PricingV2EntryPlan } from '../../../../lib/api/strapi/types'
import {
  calculateComputeCost,
  calculateStorageCost
} from '../../../../lib/m3ter/costs'
import pricingFile from '../../../../public/pricingV2File.json'
import { CUICard } from '../../../ClickUI'
import HRSeparator from '../../../HRSeparator'
import Markdown from '../../../Markdown'
import {
  ContextPlan,
  ContextProvider,
  ContextRegion,
  usePricingV2Context
} from '../../../PricingV2ContextProvider'
import { SuiTitle } from '../../../sui'
import { aggregationIds } from '../../config'
import ProviderSelector from '../ProviderSelector'
import RegionSelector from '../RegionSelector'

const TableColumn = memo(function TableColumn({
  item,
  plan,
  provider,
  region
}: {
  item: PricingV2EntryPlan
  plan: ContextPlan
  provider: ContextProvider
  region: ContextRegion
}) {
  let computeUnitPrice: null | number = null
  let storageUnitPrice: null | number = null

  const isValidPlan =
    plan === 'basic' || plan === 'scale' || plan === 'enterprise'

  if (pricingFile && isValidPlan && provider && region) {
    const pricing = pricingFile[plan].filter((result) => {
      return (
        result.cloudProvider?.toLowerCase() === provider &&
        result.region?.toLowerCase() === region
      )
    })

    computeUnitPrice =
      pricing
        .find((result) => result.aggregationId === aggregationIds.compute)
        ?.pricingBands.at(0)?.unitPrice || null
    storageUnitPrice =
      pricing
        .find((result) => result.aggregationId === aggregationIds.storage)
        ?.pricingBands.at(0)?.unitPrice || null
  }

  return (
    <div className='flex-1 basis-0 p-4'>
      <CUICard
        className={`relative overflow-hidden bg-neutral-900/50 shadow-card-xl ${
          item.featured ? '!border-primary !shadow-2xl !shadow-primary/20' : ''
        }`}>
        <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
        <div className='p-4 text-center'>
          <SuiTitle type='h2'>{item.name}</SuiTitle>
          {item.description && <Markdown>{item.description}</Markdown>}
          <HRSeparator />
          {item.perks.length > 0 && (
            <ul className='text-left'>
              {item.perks.map((perk, perkIndex) => {
                const PerkContent = () => <Markdown>{perk.text}</Markdown>
                return (
                  <li key={perkIndex}>
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
          <div className='grid grid-cols-2'>
            <div>
              <p>Storage</p>
              {storageUnitPrice &&
                calculateStorageCost(storageUnitPrice, 1024).toFixed(2)}
            </div>
            <div>
              <p>Compute</p>
              {computeUnitPrice &&
                calculateComputeCost(computeUnitPrice, 8, 24).toFixed(2)}
            </div>
          </div>
        </div>
      </CUICard>
    </div>
  )
})

export default function Table() {
  const { plans, plan, provider, region } = usePricingV2Context()
  return (
    <div>
      <div>
        <ProviderSelector />
        <RegionSelector />
      </div>
      <div className='flex flex-col lg:flex-row'>
        {plans.map((item, index) => {
          return (
            <Fragment key={index}>
              <TableColumn
                item={item}
                plan={plan}
                provider={provider}
                region={region}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
