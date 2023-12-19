import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { slugify } from '../../lib/utils/strings'
import { CloudProviderType } from '../../types/cloud'
import {
  MeteredPricing,
  PricingPlanData,
  RegionPricing
} from '../../types/pricing'
import { CUIButton, CUILink } from '../ClickUI'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'
import PlanPricing from './PlanPricing'
import PricingButton from './PricingButton'
import { PricingContextProvider } from './PricingContext'
import styles from './PricingOptions.module.scss'
import PricingSelector from './PricingSelector'
import ShowPricing from './ShowPricing'
import { RegionPricingWithIcon } from './types'

function PricingOptions({
  pricingByRegion,
  pricingPlans,
  cloudProviders,
  meteredPricing,
  selectorOnly
}: {
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
  meteredPricing?: MeteredPricing
  selectorOnly?: boolean
}) {
  const router = useRouter()
  const [provider, setProvider] = useState(
    router.query.provider ? 'gcp' : 'aws'
  )
  const regionList: RegionPricingWithIcon[] = useMemo(() => {
    return pricingByRegion
      .filter((item) => item.cloudProvider === provider)
      .map((item) => {
        let regionSlug =
          item.region.match(/[(]*\(([^)]+)\)$/i)?.[1] || item.region
        return {
          ...item,
          regionFlagPNG: (
            <StrapiImage {...item.regionFlagPNG} alt={item.region} />
          ),
          regionSlug: slugify(regionSlug)
        }
      })
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

  const updateRegionParam = (value: RegionPricingWithIcon) => {
    router.push(
      {
        query: {
          ...router.query,
          provider: value.cloudProvider,
          region: value.regionSlug
        }
      },
      undefined,
      { shallow: true }
    )
  }

  const getDefaultRegion = () => {
    const fallback = regionList[0]
    const urlRegion = router.query?.region
    if (provider && urlRegion && !Array.isArray(urlRegion)) {
      const found = regionList.find((item) => {
        return item.cloudProvider === provider && item.regionSlug === urlRegion
      })

      if (found) {
        return found
      }
    }
    return fallback
  }

  return (
    <div className='w-full '>
      <PricingContextProvider value={getDefaultRegion()}>
        {!selectorOnly && (
          <div className='flex justify-center space-x-6 pt-8 pb-6'>
            {cloudProviders.map((cloudProvider, parentIndex: number) => (
              <div className='flex flex-col space-y-2' key={parentIndex}>
                <div className='mx-auto flex flex-row items-start gap-4'>
                  {cloudProvider.darkProviderPngs.map((darkIconPng, index) => {
                    if (darkIconPng.name === 'logo_aws_dark.svg') {
                      return (
                        <CUIButton
                          key={index}
                          type='secondary'
                          onClick={() => {
                            setProvider('aws')
                            router.push('/pricing?provider=aws', undefined, {
                              shallow: true
                            })
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
                          key={index}
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
                        </CUIButton>
                      )
                    }
                    return (
                      <CUIButton
                        key={index}
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
        )}

        {!selectorOnly ? (
          <div className='center_content relative z-10 mx-auto mb-24 max-w-[344px]'>
            <PricingSelector
              regionList={regionList}
              onChange={updateRegionParam}
            />
          </div>
        ) : (
          <PricingSelector
            regionList={regionList}
            onChange={updateRegionParam}
          />
        )}

        {!selectorOnly && (
          <>
            {plans.length > 0 && (
              <div className='plans_container grid grid-cols-1 gap-8 lg:grid-cols-3'>
                {plans.map((plan, index) => (
                  <div
                    className='relative mx-auto w-full max-w-sm rounded-lg border border-t-4 border-neutral-700/80 border-t-primary bg-neutral-900/50 shadow-card-xl'
                    key={`plan-${plan.name}`}>
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
                              {item.isBulleted && (
                                <CheckIcon className='h-4 w-4' />
                              )}
                              <div className='item_text'>
                                <Markdown className=' max-w-xs !text-neutral-0'>
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
                          <>
                            {plan.name === 'Development' && (
                              <>
                                <CUIButton
                                  weight='medium'
                                  onClick={() => {
                                    router.push(
                                      {
                                        hash: 'pricing-calculator',
                                        query: {
                                          ...router.query,
                                          tier: 'Development'
                                        }
                                      },
                                      undefined,
                                      { shallow: true }
                                    )
                                  }}
                                  className='stroked_button_wrapper button_wrapper mb-4 w-full'
                                  type='secondary'>
                                  Estimate your monthly cost ↓
                                </CUIButton>
                              </>
                            )}
                            {plan.name === 'Production' && (
                              <>
                                <CUIButton
                                  onClick={() => {
                                    router.push(
                                      {
                                        hash: 'pricing-calculator',
                                        query: {
                                          ...router.query,
                                          tier: 'Production'
                                        }
                                      },
                                      undefined,
                                      { shallow: true }
                                    )
                                  }}
                                  weight='medium'
                                  className='stroked_button_wrapper button_wrapper mb-4 w-full'
                                  type='secondary'>
                                  Estimate your monthly cost ↓
                                </CUIButton>
                              </>
                            )}
                            <PricingButton
                              isFirst={true}
                              isLast={index !== plans.length - 1}
                              path={plan.actionButton.link}
                              btnText={plan.actionButton.text}
                              index={index}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </PricingContextProvider>
      {!selectorOnly && meteredPricing && (
        <>
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
              Learn more about our partnerships with{' '}
              <CUILink href='/partners/aws' className='text-primary-300'>
                AWS
              </CUILink>{' '}
              and{' '}
              <CUILink
                href='/blog/clickhouse-cloud-on-google-cloud-platform-gcp-is-generally-available'
                className='text-primary-300'>
                GCP
              </CUILink>
              .
            </SuiText>
          </div>
        </>
      )}
    </div>
  )
}

export default PricingOptions
