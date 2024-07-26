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
import { SuiText, SuiTitle } from '../sui'
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
  selectorOnly,
  storageCostDev,
  computeCostDev,
  storageCostProd,
  computeCostProd,
  afterPricingSelector
}: {
  pricingByRegion: Array<RegionPricing>
  pricingPlans: Array<PricingPlanData>
  cloudProviders: Array<CloudProviderType>
  meteredPricing?: MeteredPricing
  selectorOnly?: boolean
  storageCostDev?: number
  computeCostDev?: number
  storageCostProd?: number
  computeCostProd?: number
  afterPricingSelector?: React.ReactNode
}) {
  const router = useRouter()
  const [provider, setProvider] = useState(
    router.query.provider ? 'gcp' : 'aws'
  )

  const regionList: RegionPricingWithIcon[] = useMemo(() => {
    const orderedRegions = pricingByRegion
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
      .sort((a, b) => {
        // Extract the regionSlugs
        const slugA = a.regionSlug.toLowerCase()
        const slugB = b.regionSlug.toLowerCase()

        // Define the order of prefixes and region names
        const order = ['us', 'eu', 'ap', 'europe', 'asia']

        // Find the index of the prefixes/region names in the order array
        const indexA = order.findIndex((prefix) => slugA.startsWith(prefix))
        const indexB = order.findIndex((prefix) => slugB.startsWith(prefix))

        // Compare based on the prefix/region name order
        if (indexA < indexB) return -1
        if (indexA > indexB) return 1

        // If the prefixes/region names are the same or not in the order, compare the full slugs
        if (slugA < slugB) return -1
        if (slugA > slugB) return 1

        return 0 // Slugs are equal
      })

    return orderedRegions
  }, [pricingByRegion, provider])

  const sortPlans = (plans: PricingPlanData[]): PricingPlanData[] => {
    const order = ['Development', 'Production', 'Dedicated']
    return plans.sort((a, b) => {
      const aIndex = order.findIndex((name) => a.name.includes(name))
      const bIndex = order.findIndex((name) => b.name.includes(name))
      return aIndex - bIndex
    })
  }

  const plans: Array<PricingPlanData> = useMemo(() => {
    const filteredPlans = pricingPlans.filter(
      (item) => item.cloudProvider === provider
    )
    return sortPlans(filteredPlans)
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
          <div className='flex justify-center space-x-6 pb-6 pt-8 '>
            <div className='flex flex-col'>
              <div className='mx-auto flex flex-row items-start gap-4'>
                {cloudProviders.map((cloudProvider, parentIndex: number) => (
                  <React.Fragment key={parentIndex}>
                    {cloudProvider.darkProviderPngs.map(
                      (darkIconPng, index) => {
                        if (darkIconPng.name === 'logo_aws_dark.svg') {
                          return (
                            <CUIButton
                              key={index}
                              data-key-id={index}
                              type='secondary'
                              onClick={() => {
                                setProvider('aws')
                                router.push(
                                  '/pricing?provider=aws',
                                  undefined,
                                  {
                                    shallow: true
                                  }
                                )
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
                              data-key-id={index}
                              onClick={() => {
                                setProvider('gcp')
                                router.push(
                                  '/pricing?provider=gcp',
                                  undefined,
                                  {
                                    shallow: true
                                  }
                                )
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
                            data-key-id={index}
                            onClick={() => {
                              setProvider('azure')
                              router.push(
                                '/pricing?provider=azure',
                                undefined,
                                {
                                  shallow: true
                                }
                              )
                            }}
                            type='secondary'
                            className={styles.cloudProvidersButton}
                            data-selected={provider === 'azure'}>
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
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {!selectorOnly ? (
          <div className='center_content relative z-10 mx-auto mb-16 max-w-[344px]'>
            <PricingSelector
              regionList={regionList}
              onChange={updateRegionParam}
            />
            {afterPricingSelector}
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
              <div className='flex min-h-[940px] flex-col items-stretch justify-center gap-12 md:flex-row'>
                {plans.map((plan, index) => (
                  <div
                    className={`relative w-full rounded-lg border border-t-4 border-neutral-700/80 border-t-primary bg-neutral-900/50 shadow-card-xl md:max-w-sm`}
                    key={`plan-${plan.name}`}>
                    <div className='card_content flex h-full flex-col justify-between'>
                      <div className='border-b border-neutral-725 p-6'>
                        <h2 className='mb-1 text-center text-2.75xl font-semibold'>
                          {plan.name}
                        </h2>
                        <div className='text-normal text-center text-sm text-neutral-300 md:h-auto md:min-h-[40px]'>
                          {plan.description}
                        </div>
                        <div>
                          <PlanPricing
                            isFirst={index === 0}
                            text={plan.pricingMain}
                            name={plan.name}
                          />
                        </div>

                        {plan.name === 'Development' &&
                          router.query.region !== 'ap-northeast-1' &&
                          router.query.provider !== 'azure' && (
                            <>
                              <CUIButton
                                weight='medium'
                                onClick={() => {
                                  const calculatorElement =
                                    document.getElementById(
                                      'pricing-calculator'
                                    )
                                  if (calculatorElement) {
                                    calculatorElement.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start'
                                    })
                                    router.push(
                                      {
                                        query: {
                                          ...router.query,
                                          tier: 'Development'
                                        }
                                      },
                                      undefined,
                                      { shallow: true }
                                    )
                                  } else {
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
                                  }
                                }}
                                className='stroked_button_wrapper button_wrapper mt-4 w-full'
                                type='secondary'>
                                Estimate your monthly cost ↓
                              </CUIButton>
                            </>
                          )}
                        {plan.name === 'Production' && (
                          <>
                            <CUIButton
                              onClick={() => {
                                const calculatorElement =
                                  document.getElementById('pricing-calculator')
                                if (calculatorElement) {
                                  calculatorElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                  })
                                  router.push(
                                    {
                                      query: {
                                        ...router.query,
                                        tier: 'Production'
                                      }
                                    },
                                    undefined,
                                    { shallow: true }
                                  )
                                } else {
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
                                }
                              }}
                              weight='medium'
                              className='stroked_button_wrapper button_wrapper mt-4 w-full'
                              type='secondary'>
                              Estimate your monthly cost ↓
                            </CUIButton>
                          </>
                        )}
                        {plan.name === 'Dedicated' && (
                          <>
                            <CUIButton
                              href={`/pricing/contact?loc=pricing-enterprise-${provider}`}
                              weight='medium'
                              className='stroked_button_wrapper button_wrapper mt-4 w-full'
                              type='secondary'>
                              Contact us
                            </CUIButton>
                          </>
                        )}
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
                          <ShowPricing
                            tier={plan.name}
                            storagePricing={
                              plan.name === 'Development'
                                ? storageCostDev
                                : storageCostProd
                            }
                            computePricing={
                              plan.name === 'Development'
                                ? computeCostDev
                                : computeCostProd
                            }
                            isFirst={index === 0}
                          />
                        )}
                        {plan.actionButton && (
                          <>
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
