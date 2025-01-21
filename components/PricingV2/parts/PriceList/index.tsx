import { CheckIcon, XIcon } from '@heroicons/react/solid'
import TooltipInfo from '../../../PricingCalculator/ui/Tooltip/tooltip'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import PriceUsd from '../../ui/PriceUsd'

export default function PriceList() {
  const {
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed,
    computeUnitPrice,
    storageUnitPrice,
    computeMinPrice,
    computeMaxPrice,
    storagePrice
  } = usePricingV2Context()

  return (
    <ul className='mt-5 space-y-4 text-sm'>
      {/* Storage price */}
      <li className='flex items-center gap-x-2'>
        <CheckIcon className='h-4 w-4 text-primary-300' />
        <PriceUsd price={storagePrice || 0.0} /> for storage{' '}
        <TooltipInfo
          content={
            <>
              Storage cost for {storageSize} {storageUnit?.toUpperCase()}{' '}
              {storageCompressed ? 'uncompressed data' : 'compressed data'}
              <br />
              <br />
              {storageUnitPrice && (
                <>
                  1 TB compressed data = <PriceUsd price={storageUnitPrice} />{' '}
                  per month
                </>
              )}
            </>
          }
        />
      </li>

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

      {!!replicas && replicas < 2 && (
        <li className='flex items-center gap-x-2'>
          <XIcon className='h-4 w-4 text-red-200' />
          Not fault tolerant
          <TooltipInfo content='You need at least 2 replicas for your service to be fault tolerant.' />
        </li>
      )}

      <li className='flex items-center gap-x-2'>
        <CheckIcon className='h-4 w-4 text-primary-300' />
        Includes 3 availability zones
      </li>

      <li className='flex items-center gap-x-2'>
        <CheckIcon className='h-4 w-4 text-primary-300' />
        Includes 2 backups
        <TooltipInfo content='1 backup every 24h, 2 day retention period. Customized schedules backups are available in the Scale and Enterprise plans.' />
      </li>
    </ul>
  )
}
