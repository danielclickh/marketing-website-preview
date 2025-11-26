import philosophy from './philosophy.json'
import ByocPricingCard from '@/components/ByocPricingCard'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import Modal from '@/components/Modal'
import PocContactForm from '@/components/PocContactForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { useClickOutside } from '@/hooks'
import { findAll, findOne, getPricingV2 } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import {
  PricingData,
  PricingPageProps,
  PricingPagePropsV1,
  PricingPagePropsV2,
  PricingPlanData,
  RegionPricing
} from '@/types/pricing'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Lazy load prizing components
const PricingV1 = dynamic(() => import('@/components/PricingCalculator'), {
  loading: () => <p className='my-10 text-center'>Loading pricing...</p>,
  ssr: true
})

const PricingV2 = dynamic(() => import('@/components/PricingV2'), {
  loading: () => <p className='my-10 text-center'>Loading pricing...</p>,
  ssr: true
})

export const getServerSideProps: GetServerSideProps<PricingPageProps> =
  async function getServerSideProps({ query }) {
    const displayOldPricing = ['1', 'true', 'yes'].includes(
      query?.legacy?.toString().toLowerCase() || 'no'
    )

    const pagePromise: Promise<PricingData> = findOne('pricing', {
      populate: [
        'hero',
        'meteredPricing',
        'contactSection',
        'contactSection.contactButton',
        'contactSection.excludeImageLight',
        'contactSection.excludeImageDark',
        'seo',
        'seo.image'
      ]
    })

    const commonPropsPromise = getCommonProps()

    // Old (V1) pricing
    if (displayOldPricing) {
      const pricingByRegionPromise: Promise<{ data: Array<RegionPricing> }> =
        findAll('pricing-per-regions', {
          populate: [
            'regionFlagPNG',
            'storagePricing',
            'computePricing',
            'devStoragePricing',
            'devComputePricing'
          ],
          fields: ['cloudProvider', 'region', 'hasDevService']
        })
      const plansProps: Promise<{ data: Array<PricingPlanData> }> = findAll(
        'pricing-plans',
        {
          populate: ['actionButton', 'items', 'items_disabled'],
          fields: ['name', 'description', 'pricingMain', 'cloudProvider']
        }
      )

      const cloudPromise = findOne('cloud', {
        populate: [
          'hero.cloudProviders',
          'hero.cloudProviders.darkProviderPngs',
          'hero.cloudProviders.lightProviderPngs'
        ]
      })

      const [
        { hero, contactSection, meteredPricing, seo },
        commonProps,
        { data: pricingByRegion },
        { data: pricingPlans },
        {
          hero: { cloudProviders }
        }
      ] = await Promise.all([
        pagePromise,
        commonPropsPromise,
        pricingByRegionPromise,
        plansProps,
        cloudPromise
      ])

      seo.path = '/pricing'

      return {
        props: {
          hero,
          contactSection,
          meteredPricing,
          seo,
          displayOldPricing: true,
          pricingByRegion,
          pricingPlans,
          cloudProviders,
          requestParams: query,
          ...commonProps
        } as PricingPagePropsV1
      }
    }

    // New (V2) pricing
    const pricingDataPromise = getPricingV2()

    const [
      { hero, contactSection, meteredPricing, seo },
      commonProps,
      pricingData
    ] = await Promise.all([pagePromise, commonPropsPromise, pricingDataPromise])

    seo.path = '/pricing'
    seo.languages = ['en', 'ja']

    return {
      props: {
        hero,
        contactSection,
        meteredPricing,
        seo,
        displayOldPricing: false,
        pricingData,
        requestParams: query,
        ...commonProps
      } as PricingPagePropsV2
    }
  }

export default function PricingPage({
  hero,
  contactSection,
  seo,
  displayOldPricing,
  pricingByRegion,
  pricingPlans,
  cloudProviders,
  pricingData,
  requestParams,
  headerData,
  footerData
}: PricingPageProps) {
  useGalaxyOnPage('pricingPage')
  const pocFormRef = useRef<HTMLDivElement | null>(null)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pricing h-full text-neutral-0'>
        <div className='pt-16'>
          <div className='mx-auto max-w-7xl px-4 sm:px-8 xl:px-0'>
            {hero && (
              <div className='mb-16 flex flex-col items-center'>
                <SuiTitle type='h1' color='white' className='md:!text-5.5xl'>
                  {hero.title}
                </SuiTitle>
                <div className='mt-6 text-neutral-200'>{hero.description}</div>
              </div>
            )}

            {displayOldPricing && (
              <PricingV1
                pricingByRegion={pricingByRegion}
                cloudProviders={cloudProviders}
                pricingPlans={pricingPlans}
                afterPricingSelector={
                  <div className='mt-4'>
                    <RegionRequest />
                  </div>
                }
                afterPricingTable={
                  <>
                    <ByocPricingCard />
                    <div className='mx-6 mt-6'>
                      <div className='rounded bg-neutral-700 px-3 py-5 text-center text-white'>
                        <SuiText size='sm'>
                          Need help with your proof of concept?{' '}
                          <br className='sm:hidden' />
                          <Link
                            href='#poc-contact'
                            className='text-primary-300 hover:underline'
                            onClick={(event) => {
                              if (pocFormRef.current) {
                                event.preventDefault()
                                pocFormRef.current.scrollIntoView()
                              }
                            }}>
                            Contact us
                          </Link>
                        </SuiText>
                      </div>
                    </div>
                    <div className='mt-12 space-y-6 text-center'>
                      <SuiText size='sm'>
                        Or download the forever-free{' '}
                        <LinkWithArrow
                          href='https://clickhouse.com/docs/quick-start'
                          className='text-primary-300 hover:underline'>
                          open source distribution of ClickHouse
                        </LinkWithArrow>
                      </SuiText>
                      <SuiText size='sm'>
                        For more information about our billing and pricing
                        please refer to our{' '}
                        <Link
                          href='https://clickhouse.com/docs/manage/billing/#faqs'
                          className='text-primary-300 hover:underline'>
                          Billing & Pricing FAQ
                        </Link>
                        .
                      </SuiText>
                    </div>
                  </>
                }
              />
            )}

            {!displayOldPricing && (
              <PricingV2
                data={pricingData}
                requestParams={requestParams}
                afterTableFilters={<RegionRequest />}
                inbetweenContent={
                  <>
                    <div className='-mt-4 space-y-8'>
                      <div className='space-y-4 text-center text-slate-300'>
                        <SuiText size='sm'>
                          ClickPipes rates are{' '}
                          <strong className='text-white'>$0.04 / GB</strong> for
                          ingested data,{' '}
                          <strong className='text-white'>$0.20 / hr</strong> per
                          compute unit. Does not include{' '}
                          <Link
                            href='/cloud/clickpipes/postgres-cdc-connector'
                            className='text-primary-300 hover:underline'>
                            Postgres CDC ClickPipes
                          </Link>{' '}
                          - for Postgres CDC pricing, visit{' '}
                          <Link
                            href='https://clickhouse.com/docs/cloud/reference/billing/clickpipes/postgres-cdc'
                            className='text-primary-300 hover:underline'>
                            here
                          </Link>
                        </SuiText>
                        <SuiText size='sm'>
                          For more information about our billing and pricing
                          please refer to our{' '}
                          <Link
                            href='https://clickhouse.com/docs/manage/billing/#faqs'
                            className='text-primary-300 hover:underline'>
                            Billing & Pricing FAQ
                          </Link>
                          .
                        </SuiText>
                      </div>
                      <ByocPricingCard />
                      <SuiText size='sm' className='text-center text-slate-300'>
                        Or download the forever-free{' '}
                        <LinkWithArrow
                          href='https://clickhouse.com/docs/quick-start'
                          className='text-primary-300 hover:underline'>
                          open source distribution of ClickHouse
                        </LinkWithArrow>
                      </SuiText>
                      <div className='mx-6 mt-6'>
                        <div className='rounded bg-neutral-700 px-3 py-5 text-center text-white'>
                          <SuiText size='sm'>
                            Need help with your proof of concept?{' '}
                            <br className='sm:hidden' />
                            <Link
                              href='#poc-contact'
                              className='text-primary-300 hover:underline'
                              onClick={(event) => {
                                if (pocFormRef.current) {
                                  event.preventDefault()
                                  pocFormRef.current.scrollIntoView()
                                }
                              }}>
                              Contact us
                            </Link>
                          </SuiText>
                        </div>
                      </div>
                    </div>
                  </>
                }
                beforeEstimator={
                  <SuiTitle type='h2' className='my-12 text-center'>
                    Estimate your monthly&nbsp;cost
                  </SuiTitle>
                }
              />
            )}
          </div>
          <div className='philosophy mt-24 bg-primary-300 text-neutral-900'>
            <div className='flip-selection mx-auto max-w-7xl px-4 py-16 sm:px-8 2xl:px-0'>
              <SuiTitle
                type='h2'
                className='pb-16 text-center text-neutral-900'>
                Pricing philosophy
              </SuiTitle>
              <div className='columns_wrapper flex flex-col gap-x-36 gap-y-16 lg:flex-row lg:items-start lg:justify-center'>
                {philosophy.map((column) => (
                  <div
                    className='column mx-auto max-w-sm lg:mx-0'
                    key={column.header}>
                    <div className='header_row mb-6 flex flex-col items-center gap-2'>
                      <Image
                        src={column.image}
                        width='72'
                        height='72'
                        alt='payment method'
                      />
                      <div className='column_title text-xl font-bold'>
                        {column.header}
                      </div>
                    </div>
                    <Markdown className='text-center !text-neutral-800'>
                      {column.content}
                    </Markdown>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className='relative bg-neutral-700 py-20'
          id='poc-contact'
          ref={pocFormRef}>
          <div className='section-container'>
            <div className='mx-auto w-full lg:max-w-xl'>
              <CUICard className='overflow-hidden bg-neutral-900/80'>
                <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
                <CUICard.Body className='p-4 lg:p-6'>
                  <div className='mb-4 space-y-4 text-center lg:mb-6'>
                    <SuiTitle type='h2' className='!text-2xl'>
                      Need help with your ClickHouse Cloud PoC?
                    </SuiTitle>
                    <SuiText className='opacity-70'>
                      Contact our team of experts
                    </SuiText>
                  </div>
                  <PocContactForm />
                </CUICard.Body>
              </CUICard>
            </div>
          </div>
        </div>

        {contactSection && (
          <div className='section-container bg-shadow-element mb-24 mt-20 max-w-[1115px]'>
            <div className='relative mx-auto flex w-full flex-col items-center gap-x-4 rounded-xl border border-neutral-725/80 bg-neutral-750/50 px-4 py-10 text-neutral-0 md:py-16'>
              <SuiTitle type='h2'>{contactSection.title}</SuiTitle>
              <div className='mb-6 mt-3 max-w-screen-md text-center text-neutral-200'>
                {contactSection.subtitle}
              </div>
              <CUIButton
                type='primary'
                weight='medium'
                href={contactSection.contactButton.link}>
                {contactSection.contactButton.text}
              </CUIButton>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

function RegionRequest() {
  'use client'

  //modal and form
  const searchParams = useSearchParams()
  const modalSearchParam = searchParams?.get('modal')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalInnerRef = useRef<HTMLDivElement | null>(null)
  const modalFormSuccessRef = useRef<HTMLDivElement | null>(null)
  const [modalFormSuccess, setModalFormSuccess] = useState(false)
  const [modalFormLoaded, setModalFormLoaded] = useState(false)

  // Open modal based on query param
  useEffect(() => {
    if (modalSearchParam === 'open') {
      setIsModalOpen(true)
    }
  }, [modalSearchParam])

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

  const handleRegionRequestClick = useGalaxyOnClick(
    'pricingPage.regionRequest.requestRegionSelect'
  )

  return (
    <>
      <p className='text-center'>
        Or{' '}
        <span
          className='text-primary-300 hover:cursor-pointer hover:underline'
          onClick={() => {
            setIsModalOpen(true)
            handleRegionRequestClick()
          }}>
          request a private/other region
        </span>
      </p>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        innerRef={modalInnerRef}>
        <SuiTitle type='h3'>Request a new Cloud region</SuiTitle>
        <SuiText size='sm' className='mb-6 mt-4'>
          We’re adding new Cloud regions all of the time, please select the
          region that you would like us to support below. We will add you to the
          wait list and be in contact if we look to add it in the future.
        </SuiText>
        {!modalFormSuccess && (
          <MarketoForm
            formId={'1241'}
            clearbitTracking={true}
            onLoad={() => {
              setModalFormLoaded(true)
            }}
            onSuccess={() => {
              setModalFormSuccess(true)
              // Delay needed to allow the ref to update before scrolling
              setTimeout(() => {
                modalFormSuccessRef.current?.scrollIntoView()
              }, 10)

              return false // Stops page from reloading
            }}
          />
        )}

        {!modalFormLoaded && <div className='text-center'>Loading form...</div>}

        {modalFormSuccess && (
          <div ref={modalFormSuccessRef}>
            <SuiTitle type='h3' className='text-center'>
              {' '}
              Thank you for your submission!
            </SuiTitle>

            <p className='mt-2 text-center text-neutral-200'>
              We will be in touch soon.
            </p>
          </div>
        )}
      </Modal>
    </>
  )
}
