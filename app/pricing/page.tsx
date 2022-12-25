import React from 'react'
import CloudProviders from '../../components/CloudProviders'
import Markdown from '../../components/Markdown'
import PricingOptions from '../../components/PricingOptions'
import { StrapiImage } from '../../components/StrapiElements'
import { SuiButton } from '../../components/sui'
import { findAll, findOne } from '../../lib/api/strapi'

async function PricingPage() {
  const pricingPromise = findOne('pricing', {
    populate: [
      'hero',
      'pricingPhilosophy',
      'pricingPhilosophy.columns',
      'pricingPhilosophy.columns.image',
      'meteredPricing',
      'contactSection',
      'contactSection.contactButton',
      'contactSection.excludeImageLight',
      'contactSection.excludeImageDark'
    ]
  })
  const pricingByRegionPromise = findAll('pricing-per-regions', {
    populate: [
      'regionFlagPNG',
      'storagePricing',
      'computePricing',
      'devStoragePricing',
      'devComputePricing'
    ],
    fields: ['cloudProvider', 'region', 'hasDevService']
  })
  const plansProps = findAll('pricing-plans', {
    populate: ['actionButton', 'items', 'items_disabled'],
    fields: ['name', 'description', 'pricingMain']
  })

  const [
    { hero, pricingPhilosophy: philosophy, contactSection, meteredPricing },
    { data: pricingByRegion },
    { data: pricingPlans }
  ] = await Promise.all([pricingPromise, pricingByRegionPromise, plansProps])

  const style = {}
  style[
    '--image-url'
  ] = `url(${contactSection.excludeImageLight?.data?.attributes?.url})`
  style[
    '--dark-image-url'
  ] = `url(${contactSection.excludeImageDark?.data?.attributes?.url})`
  const regionList = await Promise.all(
    pricingByRegion.map((region) => {
      return {
        ...region,
        regionFlagPNG: {
          src: region.regionFlagPNG.data.attributes.url,
          width: 30,
          height: 20
        }
      }
    })
  )

  return (
    <div className='pricing container-light-color h-full md:pb-20'>
      <div className='container mx-auto px-3 py-20'>
        {hero && (
          <div className='hero'>
            <div className='flex flex-col items-center'>
              <h1>{hero.title}</h1>
              <div className='description'>{hero.description}</div>
              {meteredPricing && (
                <div>
                  {regionList.length > 0 && (
                    <PricingOptions
                      regionList={regionList}
                      pricingPlans={pricingPlans}>
                      <CloudProviders />
                    </PricingOptions>
                  )}
                  <div className='pricing_footer_note mx-auto mt-4 text-xs text-center max-w-screen-sm text-web-light-c4 dark:text-web-dark-c4'>
                    <Markdown>{meteredPricing.footerNote}</Markdown>
                  </div>
                  <hr className='max-w-xs mx-auto my-8 border-b bg-transparent border-web-light-c4/10 dark:border-web-dark-c4/10' />
                  <div className=' text-web-light-c4 dark:text-web-dark-c4 text-center'>
                    <Markdown>{hero.openSourceLink}</Markdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {philosophy && (
        <div className='philosophy section-dark'>
          <div className='container py-28 mx-auto'>
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
                      {...column.image.data.attributes}
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
        <div className='md:mt-20 mx-auto md:w-10/12'>
          <div className='container mx-auto gap-x-4 flex md:rounded-lg py-11 px-6 md:pl-20 md:pr-0 md:py-16 bg-primary w-full max-w-screen-lg text-gunmetal items-stretch relative'>
            <div className='w-full'>
              <div>{contactSection.title}</div>
              <div className='my-8 text-base text-medium max-w-screen-sm'>
                {contactSection.subtitle}
              </div>
              <SuiButton
                color='dark'
                path={contactSection.contactButton.link}
                title={contactSection.contactButton.text}
                className='text-cultured'
              />
            </div>
            <div className='hidden md:block w-72 h-52 relative'>
              <div
                className='w-60 h-60 bg-[image:var(--image-url)] dark:bg-[image:var(--dark-image-url)] bg-cover absolute -right-9 top-0'
                style={style}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PricingPage
