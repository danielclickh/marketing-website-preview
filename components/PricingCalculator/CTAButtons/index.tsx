import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CUIButton } from '../../ClickUI'
import TooltipInfo from '../ui/Tooltip/tooltip'
import { PricingData } from '../CalculatorTypesOptions'

export default function CTAButtons({
  contactSales,
  tier,
  storageCost,
  computeCostMin,
  computeCostMax,
  storageSize,
  minMemory,
  maxMemory,
  provider,
  region,
  hours,
  minMemoryLabel,
  maxMemoryLabel,
  pricingData
}: {
  contactSales?: string
  tier?: string
  storageCost: number
  computeCostMin: number
  computeCostMax?: number
  storageSize?: number
  minMemory?: number
  maxMemory?: number
  provider?: string
  region?: string
  hours?: number
  minMemoryLabel?: string
  maxMemoryLabel?: string
  pricingData?: PricingData
}) {
  const router = useRouter()
  const [isCopied, setIsCopied] = useState(false)
  const [share, setShare] = useState('Share')
  const [availabilityZones, setAvailabilityZones] = useState(2)

  useEffect(() => {
    if (tier === 'Production') {
      setAvailabilityZones(3)
    }
  }, [tier])

  const copyToClipboard = () => {
    const urlToCopy = window.location.href + '#pricing-calculator'

    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setShare('Share')
          setIsCopied(false)
        }, 1000)
      })
      .catch((err) => {
        console.error('Error copying to clipboard:', err)
      })
  }
  return (
    <>
      <div className='flex flex-col gap-4'>
        {!contactSales && (
          <CUIButton
            type='primary'
            size='lg'
            weight='semibold'
            href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
            linkClass='w-full'
            className='w-full'>
            <span className='text-sm'>Start free trial</span>
          </CUIButton>
        )}
        {contactSales ? (
          <>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              onClick={() => {
                router.push({
                  pathname: '/company/contact',
                  query: {
                    ...router.query,
                    custom: true,
                    tier,
                    storageSize,
                    minMemory,
                    maxMemory,
                    provider,
                    region,
                    hours
                  }
                })
              }}
              linkClass='w-full'
              className='w-full'>
              <span className='text-sm'>Get custom quote</span>
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              href='https://clickhouse.cloud/signUp?loc=pricing-calculator-custom'
              linkClass='w-full'
              className='w-full'>
              <span className='text-sm'>Start free trial</span>
            </CUIButton>
            <CUIButton
              onClick={copyToClipboard}
              type='secondary'
              size='lg'
              weight='semibold'
              linkClass='w-full'
              className='w-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-share-2 h-4 w-4'>
                <circle cx='18' cy='5' r='3' />
                <circle cx='6' cy='12' r='3' />
                <circle cx='18' cy='19' r='3' />
                <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
                <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
              </svg>
              <span className='ml-2 text-sm'>
                {isCopied ? 'Copied!' : share}
              </span>
            </CUIButton>
          </>
        ) : (
          <CUIButton
            onClick={copyToClipboard}
            type='secondary'
            size='lg'
            weight='semibold'
            linkClass='w-full'
            className='w-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-share-2 h-4 w-4'>
              <circle cx='18' cy='5' r='3' />
              <circle cx='6' cy='12' r='3' />
              <circle cx='18' cy='19' r='3' />
              <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
              <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
            </svg>
            <span className='ml-2 text-sm'>{isCopied ? 'Copied!' : share}</span>
          </CUIButton>
        )}
        {!contactSales && (
          <CUIButton
            type='secondary'
            size='lg'
            weight='semibold'
            linkClass='w-full'
            className='w-full'
            onClick={() => {
              router.push({
                pathname: '/company/contact',
                query: {
                  custom: true,
                  tier,
                  storageSize,
                  minMemory,
                  maxMemory,
                  provider,
                  region,
                  hours
                }
              })
            }}>
            <span className='text-sm'>Contact us</span>
          </CUIButton>
        )}
      </div>
      <ul className='mt-6 flex flex-col gap-y-4 text-left'>
        {!contactSales && (
          <li>
            <div className='flex items-center gap-4'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                  stroke='#FCFF74'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <p className='flex items-center gap-x-2'>
                ${storageCost!.toFixed(2)} for storage{' '}
                <TooltipInfo
                  content={`Storage cost for ${
                    storageSize && storageSize / 10
                  } GB compressed data`}
                />
              </p>
            </div>
          </li>
        )}
        {!contactSales && (
          <>
            {tier === 'Development' && (
              <li>
                <div className='flex items-center gap-4'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                      stroke='#FCFF74'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='flex items-center gap-x-2'>
                    <>
                      ${computeCostMin} for compute{' '}
                      <TooltipInfo
                        content={`Compute cost = ${minMemoryLabel} * ${hours}h per day\n\n1 compute unit = ${minMemoryLabel} = $${pricingData?.computeUnitPrice} / hour`}
                      />
                    </>
                  </p>
                </div>
              </li>
            )}
          </>
        )}
        {!contactSales && (
          <>
            {tier === 'Production' && (
              <>
                <li>
                  <div className='flex items-center gap-4'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                        stroke='#FCFF74'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='flex items-center gap-x-2'>
                      <>
                        ${computeCostMin} minimum compute cost{' '}
                        <TooltipInfo
                          content={`Minimum compute cost = 1 compute unit * ${hours}h per day * 30 days\n\n1 compute unit = ${minMemoryLabel} = $${pricingData?.computeUnitPrice} / hour`}
                        />
                      </>
                    </p>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                        stroke='#FCFF74'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='flex items-center gap-x-2'>
                      <>
                        ${computeCostMax} maximum compute cost{' '}
                        <TooltipInfo
                          content={`Maximum compute cost = 2 compute units * ${hours}h per day * 30 days\n\n1 compute unit = ${maxMemoryLabel} = $${pricingData?.computeUnitPrice} / hour`}
                        />
                      </>
                    </p>
                  </div>
                </li>
              </>
            )}
          </>
        )}
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className=''>Includes data transfer costs</div>
          </div>
        </li>
        <li>
          <div className='flex items-center gap-4'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.3332 4.3335L5.99984 11.6668L2.6665 8.3335'
                stroke='#FCFF74'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className=''>
              Includes {availabilityZones.toString()} availability zones
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}
