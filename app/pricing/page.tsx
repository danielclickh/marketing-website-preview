import React from 'react'
import CloudProviders from '../../components/CloudProviders'
import Markdown from '../../components/Markdown'
import PricingOptions from '../../components/PricingOptions'
import { StrapiImage, transformStrapi } from '../../components/StrapiElements'
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
  style['--image-url'] = `url(${
    transformStrapi(contactSection.excludeImageLight?.data?.attributes)?.src
  })`
  style['--dark-image-url'] = `url(${
    transformStrapi(contactSection.excludeImageDark?.data?.attributes)?.src
  })`

  return (
    <div className='pricing'>
      {hero && (
        <div className='hero'>
          <div className='container max-auto'>
            <h1>{hero.title}</h1>
            <div className='description'>{hero.description}</div>
            {meteredPricing && (
              <div>
                {pricingByRegion.length > 0 && (
                  <PricingOptions
                    pricingByRegion={pricingByRegion}
                    pricingPlans={pricingPlans}>
                    <CloudProviders />
                  </PricingOptions>
                )}
                <div className='pricing_footer_note'>
                  <Markdown>{meteredPricing.footerNote}</Markdown>
                </div>
                <hr className='page_divide' />
                <p className='open_source_link'>
                  <Markdown>{hero.openSourceLink}</Markdown>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {philosophy && (
        <div className='philosophy'>
          <div className='container'>
            <div className='title'>{philosophy.title}</div>
            <div className='columns_wrapper'>
              {philosophy.columns.map((column) => (
                <div className='column' key={column.header}>
                  <div className='header_row'>
                    <StrapiImage
                      src={column.image.data}
                      alt='payment method'
                      className='image'
                    />
                    <div className='column_title'>{column.header}</div>
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
        <div className='contact_section'>
          <div className='container'>
            <div className='left_content'>
              <div className='title'>{contactSection.title}</div>
              <div className='subtitle'>{contactSection.subtitle}</div>
              <SuiButton
                path={contactSection.contactButton.link}
                title={contactSection.contactButton.text}
              />
            </div>
            <div
              className='bg-[image:var(--image-url)] dark:bg-gunmetal dark:bg-[image:var(--dark-image-url)]'
              style={style}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PricingPage
