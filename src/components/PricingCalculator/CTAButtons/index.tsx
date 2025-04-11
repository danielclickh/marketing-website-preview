import { CUIButton } from '../../ClickUI'
import { calculateComputeMargin, PricingData } from '../CalculatorTypesOptions'
import TooltipInfo from '../ui/Tooltip/tooltip'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CTAButtons({
  contactSales,
  tier,
  storageCost,
  storageUnit,
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
  pricingData,
  storageCompressed,
  storageHumanReadable
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
  pricingData?: PricingData | undefined
  storageCompressed?: string
  storageUnit?: string
  storageHumanReadable?: number
}) {
  const router = useRouter()
  const [isCopied, setIsCopied] = useState(false)
  const [share, setShare] = useState('Share')
  const [availabilityZones, setAvailabilityZones] = useState(2)

  const oneComputeUnitText = '24GiB RAM, 6 vCPU'
  const oneComputeUnitTextDev = '16GiB RAM, 2 vCPU'

  const formattedStorageCost = Number(storageCost.toFixed(2)).toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )
  useEffect(() => {
    if (tier === 'Production') {
      setAvailabilityZones(3)
    } else {
      setAvailabilityZones(2)
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

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pricingCalculatorShare',
        url: urlToCopy,
        referrer: window.document.referrer,
        tier: tier,
        provider: provider,
        region: region,
        hours: hours,
        storageVolume: storageSize,
        storageUnit: storageUnit,
        storageCompressed: storageCompressed,
        minimumCompute: minMemory,
        maximumCompute: maxMemory
      })
    }
  }

  const contactSalesHandler = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'pricingCalculatorContactClick',
        url: window.location.href,
        referrer: window.document.referrer,
        tier: tier,
        provider: provider,
        region: region,
        hours: hours,
        storageVolume: storageSize,
        storageUnit: storageUnit,
        storageCompressed: storageCompressed,
        minimumCompute: minMemory,
        maximumCompute: maxMemory
      })
    }
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
        hours,
        storageCompressed
      }
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
            href='https://console.clickhouse.cloud/signUp?loc=pricing-calculator'
            linkClass='w-full'
            target='_blank'
            onClick={() => {
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  event: 'pricingCalculatorStartTrial',
                  referrer: window.document.referrer,
                  tier: tier,
                  provider: provider,
                  region: region,
                  hours: hours,
                  storageVolume: storageSize,
                  storageUnit: storageUnit,
                  storageCompressed: storageCompressed,
                  minimumCompute: minMemory,
                  maximumCompute: maxMemory,
                  url: window.location.href
                })
              }
            }}
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
              onClick={contactSalesHandler}
              linkClass='w-full'
              target='_blank'
              className='w-full'>
              <span className='text-sm'>Get a custom quote</span>
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              href='https://console.clickhouse.cloud/signUp?loc=pricing-calculator-custom'
              linkClass='w-full'
              target='_blank'
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
            target='_blank'
            onClick={contactSalesHandler}>
            <span className='text-sm'>Contact us</span>
          </CUIButton>
        )}
      </div>
      <ul className='mt-6 flex flex-col gap-y-4 text-left'>
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
              ${formattedStorageCost} for storage{' '}
              <TooltipInfo
                content={`Storage cost for ${
                  storageHumanReadable && storageHumanReadable
                }${storageUnit?.toUpperCase()} ${
                  storageCompressed === 'no' ? 'compressed' : 'uncompressed'
                }`}
              />
            </p>
          </div>
        </li>
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
                    ${Number(computeCostMin.toFixed(0)).toLocaleString('en-US')}{' '}
                    for compute
                    <TooltipInfo
                      content={`Compute cost = ${minMemoryLabel} * ${hours}h per day * 30 days per month\n\n1 compute unit = ${oneComputeUnitTextDev} = $${
                        pricingData &&
                        calculateComputeMargin(
                          tier,
                          pricingData?.computeUnitPrice
                        )
                      } / hour`}
                    />
                  </>
                </p>
              </div>
            </li>
          )}
        </>
        <>
          {tier === 'Production' && (
            <>
              {computeCostMin !== computeCostMax && (
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
                        $
                        {Number(computeCostMin.toFixed(0)).toLocaleString(
                          'en-US'
                        )}{' '}
                        minimum compute cost{' '}
                        <TooltipInfo
                          content={`Minimum compute cost = ${
                            minMemory && minMemory / 24
                          } compute unit${
                            minMemory && minMemory / 24 > 1 ? 's' : ''
                          } * ${hours}h per day * 30 days\n\n1 compute unit = ${oneComputeUnitText} = $${
                            pricingData &&
                            calculateComputeMargin(
                              tier,
                              pricingData?.computeUnitPrice
                            )
                          } / hour`}
                        />
                      </p>
                    </div>
                  </li>
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
                  <p className='flex items-center gap-x-2'>
                    <>
                      $
                      {Number(computeCostMax?.toFixed(0)).toLocaleString(
                        'en-US'
                      )}{' '}
                      {computeCostMin !== computeCostMax && 'maximum'} compute
                      cost{' '}
                      <TooltipInfo
                        content={`Maximum compute cost = ${
                          maxMemory && maxMemory / 24
                        } compute unit${
                          maxMemory && maxMemory / 24 > 1 ? 's' : ''
                        }  * ${hours}h per day * 30 days\n\n1 compute unit = ${oneComputeUnitText} = $${
                          pricingData &&
                          calculateComputeMargin(
                            tier,
                            pricingData?.computeUnitPrice
                          )
                        } / hour`}
                      />
                    </>
                  </p>
                </div>
              </li>
            </>
          )}
        </>
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
