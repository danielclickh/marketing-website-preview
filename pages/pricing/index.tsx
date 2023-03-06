import React from 'react'
import CloudProviders from '../../components/CloudProviders'
import Markdown from '../../components/Markdown'
import PricingOptions from '../../components/PricingOptions'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
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
  headerData,
  cloudProviders,
  footerData
}: PricingPageProps) {
  const regionList: RegionPricingWithIcon[] = pricingByRegion.map((item) => ({
    ...item,
    regionFlagPNG: <StrapiImage {...item.regionFlagPNG} alt={item.region} />
  }))
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='pricing bg-c2 text-neutral-0 h-full md:pb-20'>
        <div className='max-w-7xl px-4 sm:px-8 2xl:px-0 mx-auto px-3 py-20'>
          {hero && (
            <div className='hero'>
              <div className='flex flex-col items-center'>
                <SuiTitle type='h1' className='mb-5'>
                  {hero.title}
                </SuiTitle>
                <SuiText
                  size='lg'
                  weight='medium'
                  color='secondary'
                  className='description'>
                  {hero.description}
                </SuiText>
                {meteredPricing && (
                  <div>
                    {regionList.length > 0 && (
                      <PricingOptions
                        regionList={regionList}
                        pricingPlans={pricingPlans}>
                        <CloudProviders cloudProviders={cloudProviders} />
                      </PricingOptions>
                    )}
                    <div className='pricing_footer_note mx-auto mt-4 text-xs text-center max-w-screen-sm text-c4'>
                      <Markdown>{meteredPricing.footerNote}</Markdown>
                    </div>
                    <hr className='max-w-xs mx-auto my-8 border-b bg-transparent border-c4/10' />
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
          <div className='philosophy bg-c3 text-neutral-0'>
            <div className='max-w-7xl px-4 sm:px-8 2xl:px-0 py-28 mx-auto'>
              <h2 className='title text-center font-bold mb-16 text-4xl'>
                {philosophy.title}
              </h2>
              <div className='columns_wrapper flex flex-col lg:flex-row lg:items-start lg:justify-center gap-x-36 gap-y-16'>
                {philosophy.columns.map((column) => (
                  <div
                    className='column max-w-sm mx-auto lg:mx-0'
                    key={column.header}>
                    <div className='header_row flex gap-6 items-center mb-12'>
                      <StrapiImage
                        {...column.image}
                        alt='payment method'
                        className='image w-16 h-16'
                      />
                      <div className='column_title text-3xl font-bold'>
                        {column.header}
                      </div>
                    </div>
                    <div className='content'>
                      <Markdown>{column.content}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {contactSection && (
          <div className='md:mt-20 mx-auto md:w-10/12 max-w-7xl'>
            <div className='container mx-auto gap-x-4 flex md:rounded-lg py-11 px-6 md:pl-20 md:pr-0 md:py-16 bg-c6 w-full max-w-screen-lg text-neutral-0 items-stretch relative'>
              <div className='w-full'>
                <SuiTitle type='h2'>{contactSection.title}</SuiTitle>
                <SuiText
                  size='base'
                  weight='medium'
                  className='my-8 max-w-screen-sm'>
                  {contactSection.subtitle}
                </SuiText>
                <SuiButton
                  type='custom'
                  path={contactSection.contactButton.link}
                  className='bg-c5-light text-neutral-0'>
                  {contactSection.contactButton.text}
                </SuiButton>
              </div>
              <div className='hidden md:block w-72 h-52 relative'>
                <StrapiPicture
                  light={contactSection.excludeImageLight}
                  dark={contactSection.excludeImageDark}
                  className='w-60 h-60 bg-cover absolute -right-9 top-0'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PricingPage
