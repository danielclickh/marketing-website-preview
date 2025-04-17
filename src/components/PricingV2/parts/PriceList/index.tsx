import PerkItem from '../../ui/PerkItem'
import PriceUsd from '../../ui/PriceUsd'
import TooltipInfo from '@/components/PricingCalculator/ui/Tooltip/tooltip'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import { useCallback } from 'react'

export default function PriceList() {
  const {
    planEntry,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storage,
    storageCompressed,
    computeUnitPrice,
    storageUnitPrice,
    computeMinPrice,
    computeMaxPrice,
    storagePrice,
    backupsPrice,
    clickpipesPrice,
    transfersPrice
  } = usePricingV2Context()

  const canDisplayPrice = useCallback((value: number) => {
    return Math.round(value * 100) / 100 >= 0.01
  }, [])

  return (
    <ul className='mt-5 space-y-4 text-sm font-medium empty:hidden'>
      {/* Storage price */}
      {!!storagePrice && canDisplayPrice(storagePrice) && (
        <li className='flex items-center gap-x-2'>
          <CheckIcon className='h-4 w-4 text-primary-300' />
          <PriceUsd price={storagePrice} /> for storage{' '}
          <TooltipInfo
            content={
              <>
                Storage cost for {storage}{' '}
                {storageCompressed ? 'uncompressed data' : 'compressed data'}
                {storageUnitPrice && (
                  <>
                    <br />
                    <br />
                    1 TB compressed data = <PriceUsd
                      price={storageUnitPrice}
                    />{' '}
                    per month
                  </>
                )}
              </>
            }
          />
        </li>
      )}

      {/* Min/max compute costs */}
      {!!computeMinPrice &&
        !!computeMaxPrice &&
        computeMinPrice !== computeMaxPrice && (
          <>
            <li className='flex items-center gap-x-2'>
              <CheckIcon className='h-4 w-4 text-primary-300' />
              <PriceUsd price={computeMinPrice} /> minimum compute cost
              <TooltipInfo
                content={
                  <>
                    Minimum ompute cost = {computeMinSize! / 8} compute unit *{' '}
                    {hours}h per day * 30 days * {replicas} replica(s)
                    {computeUnitPrice && (
                      <>
                        <br />
                        <br />1 compute unit = 8 GiB RAM, 2 vCPU ={' '}
                        <PriceUsd
                          price={computeUnitPrice}
                          decimalPlaces={3}
                        />{' '}
                        / hour
                      </>
                    )}
                  </>
                }
              />
            </li>
            <li className='flex items-center gap-x-2'>
              <CheckIcon className='h-4 w-4 text-primary-300' />
              <PriceUsd price={computeMaxPrice} /> maximum compute cost
              <TooltipInfo
                content={
                  <>
                    Maximum compute cost = {computeMaxSize! / 8} compute unit *{' '}
                    {hours}h per day * 30 days * {replicas} replica(s)
                    {computeUnitPrice && (
                      <>
                        <br />
                        <br />1 compute unit = 8 GiB RAM, 2 vCPU ={' '}
                        <PriceUsd
                          price={computeUnitPrice}
                          decimalPlaces={3}
                        />{' '}
                        / hour
                      </>
                    )}
                  </>
                }
              />
            </li>
          </>
        )}

      {/* Fixed compute costs */}
      {!!computeMinPrice &&
        !!computeMaxPrice &&
        computeMinPrice === computeMaxPrice && (
          <>
            <li className='flex items-center gap-x-2'>
              <CheckIcon className='h-4 w-4 text-primary-300' />
              <PriceUsd price={computeMinPrice} /> compute cost
              <TooltipInfo
                content={
                  <>
                    Compute cost = {computeMinSize! / 8} compute unit * {hours}h
                    per day * 30 days * {replicas} replica(s)
                    {computeUnitPrice && (
                      <>
                        <br />
                        <br />1 compute unit = 8 GiB RAM, 2 vCPU ={' '}
                        <PriceUsd
                          price={computeUnitPrice}
                          decimalPlaces={3}
                        />{' '}
                        / hour
                      </>
                    )}
                  </>
                }
              />
            </li>
          </>
        )}

      {/* Backups price */}
      {!!backupsPrice && canDisplayPrice(backupsPrice) && (
        <li className='flex items-center gap-x-2'>
          <CheckIcon className='h-4 w-4 text-primary-300' />
          <PriceUsd price={backupsPrice} /> for backups{' '}
          {/*<TooltipInfo
            content={
              <>
                Storage cost for {storage}{' '}
                {storageCompressed ? 'uncompressed data' : 'compressed data'}
                {storageUnitPrice && (
                  <>
                    <br />
                    <br />
                    1 TB compressed data = <PriceUsd
                      price={storageUnitPrice}
                    />{' '}
                    per month
                  </>
                )}
              </>
            }
          />*/}
        </li>
      )}

      {/* Clickpipes/data sources price */}
      {!!clickpipesPrice && canDisplayPrice(clickpipesPrice) && (
        <li className='flex items-center gap-x-2'>
          <CheckIcon className='h-4 w-4 text-primary-300' />
          <PriceUsd price={clickpipesPrice} /> for ClickPipes
        </li>
      )}

      {/* Data transfers price */}
      {!!transfersPrice && canDisplayPrice(transfersPrice) && (
        <li className='flex items-center gap-x-2'>
          <CheckIcon className='h-4 w-4 text-primary-300' />
          <PriceUsd price={transfersPrice} /> for data transfer
        </li>
      )}

      {/* Not fault-tolerant */}
      {replicas && replicas < 2 && (
        <li className='flex items-center gap-x-2'>
          <XIcon className='h-4 w-4 text-red-200' />
          Not fault tolerant
          <TooltipInfo content='You need at least 2 replicas for your service to be fault tolerant.' />
        </li>
      )}

      {/* Fault-tolerant */}
      {replicas && replicas >= 2 && (
        <li className='flex items-center gap-x-2'>
          <CheckIcon className='h-4 w-4 text-primary-300' />
          Includes {Math.min(replicas, 3)} availability zones
        </li>
      )}

      {/* Additional price list items from CMS */}
      {planEntry?.priceList && planEntry.priceList.length > 0 && (
        <ul className='space-y-5'>
          {planEntry.priceList.map((perk, perkIndex) => {
            return (
              <li key={perkIndex}>
                <PerkItem
                  iconClassName='text-primary-300 -mr-2'
                  text={perk.text}
                  icon={perk.icon}
                  tooltip={perk.tooltip}
                />
              </li>
            )
          })}
        </ul>
      )}
    </ul>
  )
}
