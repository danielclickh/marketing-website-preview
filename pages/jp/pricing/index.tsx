import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ByocPricingCard from '../../../components/ByocPricingCard'
import { CUIButton } from '../../../components/ClickUI'
import Layout from '../../../components/Layout'
import LinkWithArrow from '../../../components/LinkWithArrow'
import Markdown from '../../../components/Markdown'
import MarketoForm from '../../../components/MarketoForm'
import Modal from '../../../components/Modal'
import { PricingCalculator } from '../../../components/PricingCalculator'
import { SuiText, SuiTitle } from '../../../components/sui'
import { useClickOutside } from '../../../hooks'
import { findAll, findOne } from '../../../lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import {
  PricingData,
  PricingPageProps,
  PricingPlanData,
  RegionPricing
} from '../../../types/pricing'
import philosophy from './philosophy.json'

export const getStaticProps: GetStaticProps<PricingPageProps> =
  async function getStaticProps() {
    const pricingPromise: Promise<PricingData> = findOne('pricing', {
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

    const [
      { hero, contactSection, meteredPricing, seo },
      { data: pricingByRegion },
      { data: pricingPlans }
    ] = await Promise.all([pricingPromise, pricingByRegionPromise, plansProps])

    const commonProps = await getCommonProps()
    seo.path = '/pricing'
    const {
      hero: { cloudProviders }
    } = await findOne('cloud', {
      populate: [
        'hero.cloudProviders',
        'hero.cloudProviders.darkProviderPngs',
        'hero.cloudProviders.lightProviderPngs'
      ]
    })

    return {
      props: {
        hero,
        contactSection,
        meteredPricing,
        seo,
        pricingByRegion,
        pricingPlans,
        cloudProviders,
        ...commonProps
      }
    }
  }

export default function PricingPage({
  hero,
  contactSection,
  meteredPricing,
  pricingByRegion,
  pricingPlans,
  seo,
  cloudProviders,
  headerData,
  footerData
}: PricingPageProps) {
  useGalaxyOnPage('pricingPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pricing h-full text-neutral-0'>
        <div className='bg-grid'>
          <div className='mx-auto max-w-7xl px-4 pt-16 sm:px-8 2xl:px-0'>
            {hero && (
              <div className='hero'>
                <div className='flex flex-col items-center'>
                  <SuiTitle type='h1' color='white' className='md:!text-5.5xl'>
                    {hero.title} jp
                  </SuiTitle>
                  <div className='mt-6 text-neutral-200'>
                    {hero.description}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='pb-16'>
            <div className='mx-auto max-w-7xl px-4 sm:px-8 xl:px-0'>
              {pricingByRegion.length > 0 && (
                <PricingCalculator
                  pricingByRegion={pricingByRegion}
                  cloudProviders={cloudProviders}
                  pricingPlans={pricingPlans}
                  afterPricingSelector={<RegionRequest />}
                  afterPricingTable={
                    <>
                      <ByocPricingCard />
                      <div className='mt-12 space-y-6 text-center'>
                        <SuiText size='sm'>
                          Or download the forever-free{' '}
                          <LinkWithArrow
                            href='https://clickhouse.com/docs/en/quick-start'
                            className='text-primary-300 underline'>
                            open source distribution of ClickHouse
                          </LinkWithArrow>
                        </SuiText>
                        <SuiText size='sm'>
                          For more information about our billing and pricing
                          please refer to our{' '}
                          <Link
                            href='https://clickhouse.com/docs/en/manage/billing/#faqs'
                            className='text-primary-300 underline'>
                            Billing & Pricing FAQ
                          </Link>
                          .
                        </SuiText>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          </div>
          <div className='clip-inverted-triangle bg-shadow-element pb-60 pt-10'></div>
          <div className='philosophy -mt-1 bg-primary-300 text-neutral-900'>
            <div className='flip-selection mx-auto max-w-7xl px-4 pb-16 sm:px-8 2xl:px-0'>
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
  //modal and form
  const searchParams = useSearchParams()
  const modalSearchParam = searchParams.get('modal')
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
      <p className='mt-4 text-center text-sm'>
        Can't find your region?{' '}
        <span
          className='text-primary-300 hover:cursor-pointer'
          onClick={() => {
            setIsModalOpen(true)
            handleRegionRequestClick()
          }}>
          Request it
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
                modalFormSuccessRef.current?.scrollIntoView({
                  behavior: 'smooth'
                })
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
