import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import React, { useState, useMemo, useEffect } from 'react'
import Markdown from '../Markdown'
import { PricingContextProvider } from './PricingContext'
import PlanPricing from './PlanPricing'
import PricingButton from './PricingButton'
import PricingSelector from './PricingSelector'
import ShowPricing from './ShowPricing'
import {
  MeteredPricing,
  PricingPlanData,
  RegionPricing
} from '../../types/pricing'
import { RegionPricingWithIcon } from './types'
import { CloudProviderType } from '../../types/cloud'
import { SuiText } from '../sui'
import { StrapiImage } from '../StrapiElements'
import { CUIButton, CUILink } from '../ClickUI'
import styles from './PricingOptions.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'

function PricingOptions({
  pricingByRegion,
  pricingPlans,
  cloudProviders,
  meteredPricing
}: {
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
  meteredPricing: MeteredPricing
}) {
  const router = useRouter()
  const [provider, setProvider] = useState(
    router.query.priovider ? 'gcp' : 'aws'
  )
  const regionList: RegionPricingWithIcon[] = useMemo(() => {
    return pricingByRegion
      .filter((item) => item.cloudProvider === provider)
      .map((item) => ({
        ...item,
        regionFlagPNG: <StrapiImage {...item.regionFlagPNG} alt={item.region} />
      }))
  }, [pricingByRegion, provider])

  const plans: Array<PricingPlanData> = useMemo(() => {
    return pricingPlans.filter((item) => item.cloudProvider === provider)
  }, [pricingPlans, provider])

  useEffect(() => {
    const newProvider = (router.query.provider ?? 'aws') as string
    if (provider !== newProvider) {
      setProvider(newProvider)
    }
  }, [router.query.provider])
  return (
    <div>
      <PricingContextProvider value={regionList[0]}>
        <div className='flex justify-center space-x-6 pt-8 pb-6'>
          {cloudProviders.map((cloudProvider, parentIndex: number) => (
            <div className='flex flex-col space-y-2' key={parentIndex}>
              <div className='mx-auto flex flex-row items-start gap-4'>
                {cloudProvider.darkProviderPngs.map((darkIconPng, index) => {
                  if (darkIconPng.name === 'logo_aws_dark.svg') {
                    return (
                      <CUIButton
                        type='secondary'
                        onClick={() => {
                          setProvider('aws')
                          router.push('/pricing', undefined, { shallow: true })
                        }}
                        className={styles.cloudProvidersButton}
                        data-selected={provider === 'aws'}>
                        <StrapiImage
                          key={`${cloudProvider.title}-${index}`}
                          {...darkIconPng}
                          className={`h-8 w-auto ${
                            parentIndex !== 0 ? 'opacity-25' : ''
                          }`}
                        />
                      </CUIButton>
                    )
                  }
                  if (darkIconPng.name === 'google_cloud_dark.svg') {
                    return (
                      <CUIButton
                        onClick={() => {
                          setProvider('gcp')
                          router.push('/pricing?provider=gcp', undefined, {
                            shallow: true
                          })
                        }}
                        type='secondary'
                        className={styles.cloudProvidersButton}
                        data-selected={provider === 'gcp'}>
                        <StrapiImage
                          key={`${cloudProvider.title}-${index}`}
                          {...darkIconPng}
                          className={`h-8 w-auto ${
                            parentIndex !== 0 ? '' : ''
                          }`}
                        />
                        <SuiText
                          size='xs'
                          weight='medium'
                          color='secondary'
                          className='absolute -top-2 -right-3.5 rounded-lg bg-neutral-100 px-2.5 text-sm text-neutral-900'>
                          Beta
                        </SuiText>
                      </CUIButton>
                    )
                  }
                  return (
                    <CUIButton
                      type='secondary'
                      className={styles.cloudProvidersButton}
                      disabled>
                      <StrapiImage
                        key={`${cloudProvider.title}-${index}`}
                        {...darkIconPng}
                        className={`h-8 w-auto ${
                          parentIndex !== 0 ? 'opacity-25' : ''
                        }`}
                      />
                      <SuiText
                        size='xs'
                        weight='medium'
                        color='secondary'
                        className='absolute -top-2 -right-6 rounded-lg bg-neutral-300 px-2.5 text-sm text-neutral-900'>
                        Soon
                      </SuiText>
                    </CUIButton>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className='center_content relative z-50 mx-auto mb-24 max-w-[344px]'>
          <PricingSelector regionList={regionList} />
        </div>

        {plans.length > 0 && (
          <div className='plans_container grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {plans.map((plan, index) => (
              <div
                className='relative mx-auto w-full max-w-sm rounded-lg border border-t-4 border-neutral-700/80 border-t-primary bg-neutral-900/50 shadow-card-xl'
                key={`plan-${plan.name}`}>
                {index === 2 && (
                  <div className='absolute left-1/2 -translate-y-1/2 -translate-x-1/2 transform lg:-right-20 lg:left-auto'>
                    <span className='relative inline-flex'>
                      <Link
                        href='/company/contact?loc=ent-coming-soon-btn'
                        type='button'
                        className='inline-flex items-center rounded-md bg-primary-300 px-4 py-1 text-sm font-semibold leading-6 text-neutral-800 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out '>
                        Coming soon
                      </Link>
                      <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-300 opacity-75'></span>
                        <span className='relative inline-flex h-3 w-3 rounded-full bg-primary-300'></span>
                      </span>
                    </span>
                  </div>
                )}

                <div className='card_content flex h-full flex-col justify-between'>
                  <div className='border-b border-neutral-725 p-6'>
                    <h2 className='mb-1 text-center text-2.75xl font-semibold'>
                      {plan.name}
                    </h2>
                    <div className='text-normal text-center text-sm text-neutral-300 md:h-auto md:min-h-[40px]'>
                      {plan.description}
                    </div>
                    <PlanPricing
                      isFirst={index === 0}
                      text={plan.pricingMain}
                    />
                  </div>
                  <div className='flex-auto justify-between p-6'>
                    <div className='flex flex-col gap-5'>
                      {(plan.items ?? []).map((item, planIndex: number) => (
                        <div
                          className='row flex items-center justify-start gap-4 text-sm'
                          key={`plan-bullet-${planIndex}`}>
                          {item.isBulleted && <CheckIcon className='h-4 w-4' />}
                          <div className='item_text'>
                            <Markdown className=' !text-neutral-0'>
                              {item.description}
                            </Markdown>
                          </div>
                        </div>
                      ))}
                      {plan.items_disabled.map(
                        (itemDisabled, planIndex: number) => (
                          <div
                            className='row_not_included flex items-center justify-start gap-4 text-sm text-neutral-300'
                            key={`plan-disabled-bullet-${planIndex}`}>
                            <MinusIcon className='h-4 w-4' />
                            <div className='item_text'>
                              <Markdown className='!text-neutral-300'>
                                {itemDisabled.description}
                              </Markdown>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className='p-6 pt-0'>
                    {index !== plans.length - 1 && (
                      <ShowPricing isFirst={index === 0} />
                    )}
                    {plan.actionButton && (
                      <PricingButton
                        isFirst={index === 0}
                        isLast={index !== plans.length - 1}
                        path={plan.actionButton.link}
                        btnText={plan.actionButton.text}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PricingContextProvider>
      <div className='pricing_footer_note mx-auto mt-8 max-w-screen-sm text-center'>
        <Markdown
          className={`${styles.richTextLink} ${
            provider === 'gcp' ? styles.gcpTextLink : ''
          }`}>
          {meteredPricing.footerNote}
        </Markdown>
      </div>
      <div className='flex items-center justify-center gap-2 pt-6'>
        <SuiText size='sm' color='secondary' className='text-center'>
          Learn more about our partnerships wth{' '}
          <CUILink href='/partners/aws' className='text-primary-300'>
            AWS
          </CUILink>{' '}
          and GCP (Beta).
        </SuiText>
      </div>
    </div>
  )
}

export default PricingOptions
