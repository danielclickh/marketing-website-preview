import React from 'react'
import CloudProviders from '../../components/CloudProviders'
import Markdown from '../../components/Markdown'
import PricingOptions from '../../components/PricingOptions'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiText, SuiTitle } from '../../components/sui'
import { findAll, findOne } from '../../lib/api/strapi'
import {
  PricingData,
  PricingPageProps,
  PricingPlanData,
  RegionPricing,
  RegionPricingWithIcon
} from '../../types/pricing'
import styles from './Pricing.module.scss'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CUIButton } from '../../components/ClickUI'
import HRSeparator from '../../components/HRSeparator'

export const getStaticProps: GetStaticProps<PricingPageProps> =
  async function getStaticProps() {
    const pricingPromise: Promise<PricingData> = findOne('pricing', {
      populate: [
        'hero',
        'pricingPhilosophy',
        'pricingPhilosophy.columns',
        'pricingPhilosophy.columns.image',
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
        fields: ['name', 'description', 'pricingMain']
      }
    )

    const [
      {
        hero,
        pricingPhilosophy: philosophy,
        contactSection,
        meteredPricing,
        seo
      },
      { data: pricingByRegion },
      { data: pricingPlans }
    ] = await Promise.all([pricingPromise, pricingByRegionPromise, plansProps])

    const commonProps = await getCommonProps()

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
        philosophy,
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

function PricingPage({
  hero,
  philosophy,
  contactSection,
  meteredPricing,
  pricingByRegion,
  pricingPlans,
  seo,
  cloudProviders,
  footerData
}: PricingPageProps) {
  const regionList: RegionPricingWithIcon[] = pricingByRegion.map((item) => ({
    ...item,
    regionFlagPNG: <StrapiImage {...item.regionFlagPNG} alt={item.region} />
  }))
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='pricing text-neutral-0 h-full'>
        <div className=' bg-grid bg-[length:100%_60%]'>
          <div className='max-w-7xl px-4 sm:px-8 2xl:px-0 mx-auto py-20'>
            {hero && (
              <div className='hero'>
                <div className='flex flex-col items-center'>
                  <SuiTitle type='h1'>{hero.title}</SuiTitle>
                  <div className='text-neutral-200 mt-6 mb-8'>
                    {hero.description}
                  </div>
                  <CloudProviders cloudProviders={cloudProviders} />
                  {meteredPricing && (
                    <div>
                      {regionList.length > 0 && (
                        <PricingOptions
                          regionList={regionList}
                          pricingPlans={pricingPlans}></PricingOptions>
                      )}
                      <div className='pricing_footer_note mx-auto mt-8 text-center max-w-screen-sm'>
                        <Markdown className={styles.richTextLink}>
                          {meteredPricing.footerNote}
                        </Markdown>
                      </div>
                      <HRSeparator className='my-24 max-w-[384px]' />
                      <Markdown className={styles.richTextLink}>
                        {hero.openSourceLink}
                      </Markdown>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {philosophy && (
            <div className='philosophy text-neutral-900 bg-primary-300'>
              <div className='max-w-7xl px-4 sm:px-8 2xl:px-0 py-16 mx-auto'>
                <SuiTitle
                  type='h2'
                  className='text-neutral-900 text-center pb-16'>
                  {philosophy.title}
                </SuiTitle>
                <div className='columns_wrapper flex flex-col lg:flex-row lg:items-start lg:justify-center gap-x-36 gap-y-16'>
                  {philosophy.columns.map((column) => (
                    <div
                      className='column max-w-sm mx-auto lg:mx-0'
                      key={column.header}>
                      <div className='header_row flex flex-col gap-2 items-center mb-6'>
                        <StrapiImage
                          {...column.image}
                          alt='payment method'
                          className='image w-16 h-16'
                        />
                        <div className='column_title text-xl font-bold'>
                          {column.header}
                        </div>
                      </div>
                      <Markdown className='!text-neutral-800 text-center'>
                        {column.content}
                      </Markdown>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {contactSection && (
          <div className='section-container my-24'>
            <div className='px-4 mx-auto gap-x-4 flex flex-col items-center rounded-xl py-10 md:py-16 bg-neutral-750/50 border border-neutral-725/80 w-full text-neutral-0 relative'>
              <SuiTitle type='h2'>{contactSection.title}</SuiTitle>
              <div className='text-neutral-200 mt-3 mb-6 text-center max-w-screen-md'>
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

export default PricingPage
