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
import philosophy from './philosophy.json'
import Image from 'next/image'
import Link from 'next/link'

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
        fields: ['name', 'description', 'pricingMain'],
        filters: {
          cloudProvider: {
            $eq: 'aws'
          }
        }
      }
    )

    const [
      { hero, contactSection, meteredPricing, seo },
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
  contactSection,
  meteredPricing,
  pricingByRegion,
  pricingPlans,
  seo,
  cloudProviders,
  headerData,
  footerData
}: PricingPageProps) {
  const regionList: RegionPricingWithIcon[] = pricingByRegion
    .filter((item) => item.cloudProvider === 'aws')
    .map((item) => ({
      ...item,
      regionFlagPNG: <StrapiImage {...item.regionFlagPNG} alt={item.region} />
    }))
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pricing h-full text-neutral-0'>
        <div className='bg-grid'>
          <div className='mx-auto max-w-7xl px-4 pt-16 sm:px-8 2xl:px-0'>
            {hero && (
              <div className='hero'>
                <div className='flex flex-col items-center'>
                  <SuiTitle type='h1' color='white' className='md:!text-5.5xl'>
                    {hero.title}
                  </SuiTitle>
                  <div className='mt-6 text-neutral-200'>
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
                      <div className='pricing_footer_note mx-auto mt-8 max-w-screen-sm text-center'>
                        <Markdown className={styles.richTextLink}>
                          {meteredPricing.footerNote}
                        </Markdown>
                      </div>
                      <div className='flex items-center justify-center gap-2 pt-6'>
                        <Image
                          src='/images/pricing/marketplace.svg'
                          alt='ClickHouse on AWS Marketplace'
                          width={20}
                          height={20}
                        />
                        <SuiText
                          size='sm'
                          color='secondary'
                          className='text-center'>
                          Available on AWS Marketplace.{' '}
                          <Link
                            href='/partners/aws'
                            className='text-primary-300'>
                            Find out more
                          </Link>
                          .
                        </SuiText>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='clip-inverted-triangle bg-shadow-element pt-10 pb-60'>
            <HRSeparator className='max-w-[384px] pb-10' />
            <Markdown className={styles.richTextLink}>
              {hero.openSourceLink}
            </Markdown>
          </div>
          <div className='philosophy bg-primary-300 text-neutral-900'>
            <div className='mx-auto max-w-7xl px-4 pb-16 sm:px-8 2xl:px-0'>
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
          <div className='section-container bg-shadow-element my-24'>
            <div className='relative mx-auto flex w-full flex-col items-center gap-x-4 rounded-xl border border-neutral-725/80 bg-neutral-750/50 px-4 py-10 text-neutral-0 md:py-16'>
              <SuiTitle type='h2'>{contactSection.title}</SuiTitle>
              <div className='mt-3 mb-6 max-w-screen-md text-center text-neutral-200'>
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
