import React from 'react'
import { findOne } from '../../lib/api/strapi'
import ServiceUnavailableForm from '../../components/ServiceUnavailableForm'
import GetStarted from '../../components/GetStarted'
import { SuiPanel, SuiText, SuiTitle } from '../../components/sui'
import { StrapiImage } from '../../components/StrapiElements'
import Markdown from '../../components/Markdown'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { ServiceProps } from '../../types/serviceUnavailablePage'

export const getStaticProps: GetStaticProps<ServiceProps> =
  async function getStaticProps() {
    const params = {
      populate: ['card', 'card.iconSvg', 'card.ctaButton', 'card.contactForm']
    }
    const response = await findOne('service-unavailable-country', params)

    const commonProps = await getCommonProps()
    return {
      props: {
        ...response.card,
        ...commonProps,
        seo: {
          title: response.card.title,
          type: 'website',
          siteName: 'ClickHouse'
        }
      }
    }
  }

function ServiceUnavailableCountryPage({
  title,
  description,
  iconSvg,
  contactForm,
  ctaButton,
  platforms,
  footerData,
  headerData,
  seo
}: ServiceProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='service_unavailable_country px-3'>
        <SuiPanel
          color='bg-neutral-950'
          shadow
          isRounded
          className='mx-auto mt-16 mb-44 max-w-screen-sm px-6 py-10 text-center'>
          <div className='flex flex-col items-center'>
            <SuiTitle type='h1' className='mb-3'>
              {title}
            </SuiTitle>
            <SuiText
              size='lg'
              weight='normal'
              color='secondary'
              className='mb-9'>
              {description}
            </SuiText>
            <ServiceUnavailableForm {...contactForm} btnText={ctaButton.text}>
              <SuiText
                size='sm'
                weight='normal'
                color='secondary'
                className='my-3 text-center'>
                <Markdown className='disclaimer'>
                  {contactForm.tosCheckboxRichText}
                </Markdown>
              </SuiText>
            </ServiceUnavailableForm>
          </div>
        </SuiPanel>
      </div>
      <GetStarted platforms={platforms} />
    </Layout>
  )
}

export default ServiceUnavailableCountryPage
