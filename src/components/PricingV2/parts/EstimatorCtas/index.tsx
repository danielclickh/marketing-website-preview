import { CUIButton } from '@/components/ClickUI'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { ShareIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

export default function EstimatorCtas() {
  const router = useRouter()

  const {
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas,
    storage,
    storageCompressed,
    totalMinPrice
  } = usePricingV2Context()

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
          storage: storage,
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
      storage,
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
        storage: storage,
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
    storage,
    storageCompressed
  ])

  const shareButtonHandler = useCallback(() => {
    gaEvent('pricingCalculatorShare')
    const shareUrl = new URL(window.location.toString())
    shareUrl.hash = 'pricing-calculator'

    window.navigator.clipboard.writeText(shareUrl.toString()).catch((err) => {
      window.prompt(
        'Failed to copy url. Please copy from the input below.',
        shareUrl.toString()
      )
      console.error('Error copying to clipboard:', err)
    })
  }, [])
  return (
    <>
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
        <p className='-mt-4 mb-8 text-center text-base font-bold text-white'>
          You’re eligible for custom terms{' '}
          <span className='-mr-1 ml-1 inline-block text-xl'>🎉</span>
          <br />
          Contact us for more details
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
    </>
  )
}

export function PricingButton({
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

export function ShareButton({ handler }: { handler: () => void }) {
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
