import { ShareIcon } from '@heroicons/react/outline'
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { CUIButton } from '../../../ClickUI'
import TooltipInfo from '../../../PricingCalculator/ui/Tooltip/tooltip'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import PriceUsd from '../../ui/PriceUsd'
import ComputeSelector from '../ComputeSelector'
import HoursSelector from '../HoursSelector'
import PlanSelector from '../PlanSelector'
import ProviderSelector from '../ProviderSelector'
import RegionSelector from '../RegionSelector'
import StorageSelector from '../StorageSelector'

export default function Estimator() {
  const router = useRouter()
  const {
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed,
    computeMinPrice,
    computeMaxPrice,
    storagePrice,
    totalMinPrice,
    totalMaxPrice
  } = usePricingV2Context()

  const priceRef = useRef<null | HTMLParagraphElement>(null)

  // Dynamically resize the price font size
  useLayoutEffect(() => {
    const priceEl = priceRef.current
    if (priceEl) {
      const resize = () => {
        const minFontSize = 14 // pixels
        const maxFontSize = 50 // pixels

        let low = minFontSize
        let high = maxFontSize
        let fontSize

        while (low <= high) {
          fontSize = Math.floor((low + high) / 2)
          priceEl.style.fontSize = `${fontSize}px`

          if (priceEl.scrollWidth > priceEl.clientWidth) {
            high = fontSize - 1 // Text is too wide, decrease size
          } else {
            low = fontSize + 1 // Text fits, try increasing size
          }
        }

        priceEl.style.fontSize = `${high}px`
      }

      resize()

      window.addEventListener('resize', resize)
      window.addEventListener('orientationchange', resize)

      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('orientationchange', resize)
      }
    }
  }, [priceRef, totalMinPrice, totalMaxPrice])

  const displayPrice = useMemo(() => {
    return !!(
      (totalMinPrice && totalMinPrice > 0.01) ||
      (totalMaxPrice && totalMaxPrice > 0.01)
    )
  }, [totalMinPrice, totalMaxPrice])

  // Promote contact if min price is over $5000
  const promoteContact = !!(totalMinPrice && totalMinPrice > 5000)

  const gaEvent = useCallback(
    (eventName: string) => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          referrer: window.document.referrer,
          url: window.location.href,
          tier: plan,
          provider: provider,
          region: region,
          hours: hours,
          storageVolume: storageSize,
          storageUnit: storageUnit,
          storageCompressed: storageCompressed,
          minimumCompute: computeMinSize,
          maximumCompute: computeMaxSize,
          replicas: replicas
        })
      }
    },
    [
      plan,
      provider,
      region,
      hours,
      computeMinSize,
      computeMaxSize,
      replicas,
      storageUnit,
      storageSize,
      storageCompressed
    ]
  )

  const trialButtonHandler = useCallback(() => {
    gaEvent('pricingCalculatorStartTrial')
  }, [])

  const contactButtonHandler = useCallback(() => {
    gaEvent('pricingCalculatorContactClick')
    router.push({
      pathname: '/company/contact',
      query: {
        ...router.query,
        custom: true,
        tier: plan,
        provider: provider,
        region: region,
        hours: hours,
        storageVolume: storageSize,
        storageUnit: storageUnit,
        storageCompressed: storageCompressed,
        minimumCompute: computeMinSize,
        maximumCompute: computeMaxSize,
        replicas: replicas
      }
    })
  }, [
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed
  ])

  const shareButtonHandler = useCallback(() => {
    gaEvent('pricingCalculatorShare')
    const shareUrl = new URL(window.location.toString())
    shareUrl.hash = 'pricing-calculator'

    window.navigator.clipboard.writeText(shareUrl.toString()).catch((err) => {
      alert('Failed to copy url. Please copy from the input below.')
      console.error('Error copying to clipboard:', err)
    })
  }, [
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storageUnit,
    storageSize,
    storageCompressed
  ])

  return (
    <div
      id='pricing-calculator' // Used for scrolling into view and sharing
      className='mx-auto max-w-5xl px-4 sm:px-8 xl:px-0'>
      <div className='flex flex-col lg:-mx-6 lg:flex-row lg:items-start'>
        {/* Form */}
        <div className='w-full space-y-8 lg:w-1/2 lg:px-6'>
          <PlanSelector />
          <ProviderSelector />
          <RegionSelector />
          <HoursSelector />
          <ComputeSelector />
          <StorageSelector />
        </div>

        {/* Results */}
        <div className='w-full lg:w-1/2 lg:px-6'>
          <div className='rounded-lg border border-primary-300 bg-slate-900 p-8'>
            <p className='mb-4 text-center font-inconsolata text-lg text-primary-300'>
              Average price per month
            </p>
            <div className='mb-2 flex min-h-20 items-center'>
              <p
                ref={priceRef}
                className='w-full overflow-hidden whitespace-nowrap text-center font-basier font-bold text-white'>
                {!displayPrice && <PriceUsd price={0.0} />}
                {displayPrice &&
                  [...new Set([totalMinPrice, totalMaxPrice])]
                    .filter((val) => val !== null)
                    .map((price, priceIndex, allPrices) => {
                      return (
                        <Fragment key={priceIndex}>
                          <PriceUsd price={price} />
                          {priceIndex < allPrices.length - 1 && ' - '}
                        </Fragment>
                      )
                    })}
              </p>
            </div>

            {/* Promote free trial */}
            <div className={promoteContact ? 'hidden' : 'space-y-4'}>
              <PricingButton
                type='primary'
                href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
                target='_blank'
                onClick={trialButtonHandler}>
                Start free trial
              </PricingButton>
              <ShareButton handler={shareButtonHandler} />
              <PricingButton type='secondary' onClick={contactButtonHandler}>
                Contact us
              </PricingButton>
            </div>

            {/* Promote contact us */}
            <div className={promoteContact ? 'space-y-4' : 'hidden'}>
              <p className='mb-8 text-center text-base text-[#B3B6BD]'>
                You’re eligible for custom terms.
                <br />
                Contact us for more details.
              </p>
              <PricingButton type='primary' onClick={contactButtonHandler}>
                Get a custom quote
              </PricingButton>
              <PricingButton
                type='secondary'
                href='https://clickhouse.cloud/signUp?loc=pricing-calculator'
                target='_blank'
                onClick={trialButtonHandler}>
                Start free trial
              </PricingButton>
              <ShareButton handler={shareButtonHandler} />
            </div>

            {/* Price list */}
            <ul className='mt-4 space-y-4'>
              {/* Storage price */}
              <li className='flex items-center gap-x-2'>
                <CheckIcon className='h-4 w-4 text-primary-300' />
                <PriceUsd price={storagePrice || 0.0} /> for storage{' '}
                <TooltipInfo
                  content={`Storage cost for ${storageSize}${storageUnit?.toUpperCase()} ${
                    storageCompressed ? 'uncompressed' : 'compressed'
                  }`}
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
                    </li>
                    <li className='flex items-center gap-x-2'>
                      <CheckIcon className='h-4 w-4 text-primary-300' />
                      <PriceUsd price={computeMaxPrice} /> minimum compute cost
                    </li>
                  </>
                )}

              {/* Compute costs */}
              {!!computeMinPrice &&
                !!computeMaxPrice &&
                computeMinPrice === computeMaxPrice && (
                  <>
                    <li className='flex items-center gap-x-2'>
                      <CheckIcon className='h-4 w-4 text-primary-300' />
                      <PriceUsd price={computeMinPrice} /> compute cost
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

            <p className='mt-4 text-sm opacity-70'>
              ClickPipes, data transfer costs and costs incurred by scheduled
              backups are not included and will be added to the pricing
              calculator in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingButton({
  type,
  href,
  target,
  onClick,
  children
}: {
  type: 'secondary' | 'primary'
  href?: string
  target?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <CUIButton
      onClick={onClick}
      type={type}
      href={href}
      target={target}
      size='lg'
      weight='semibold'
      linkClass='flex justify-center w-full text-center !text-sm'
      className='flex w-full justify-center text-center !text-sm'>
      {children}
    </CUIButton>
  )
}

function ShareButton({ handler }: { handler: () => void }) {
  const [copied, setCopied] = useState(false)

  // Reset share "copied" label
  useEffect(() => {
    if (copied) {
      const timer = window.setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => window.clearTimeout(timer)
    }
  }, [copied])

  return (
    <PricingButton
      type='secondary'
      onClick={() => {
        setCopied(true)
        handler()
      }}>
      <ShareIcon className='h-4 w-4' />
      <span className='ml-2'>{copied ? 'Copied!' : 'Share'}</span>
    </PricingButton>
  )
}
