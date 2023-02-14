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
      populate: [
        'card',
        'card.iconSvg',
        'card.ctaButton',
        'card.contactForm',
        'install_oss'
      ]
    }
    const response = await findOne('service-unavailable-country', params)

    const commonProps = await getCommonProps()
    return {
      props: {
        ...response.card,
        install_oss: response.install_oss,
        ...commonProps
      }
    }
  }

function ServiceUnavailableCountryPage({
  title,
  description,
  iconSvg,
  contactForm,
  ctaButton,
  install_oss,
  headerData,
  getStartedData,
  footerData
}: ServiceProps) {
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <div className='service_unavailable_country px-3'>
        <SuiPanel
          color='bg-c1'
          shadow
          isRounded
          className='max-w-screen-sm mx-auto mt-16 mb-44 px-6 py-10 text-center'>
          <div className='flex flex-col items-center'>
            <StrapiImage
              {...iconSvg}
              alt={iconSvg.caption}
              className='icon my-2.5'
            />
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
                className='text-center my-3'>
                <Markdown className='disclaimer'>
                  {contactForm.tosCheckboxRichText}
                </Markdown>
              </SuiText>
            </ServiceUnavailableForm>
          </div>
        </SuiPanel>
      </div>
      <GetStarted {...getStartedData} customHeader={install_oss.title} />
    </Layout>
  )
}

export default ServiceUnavailableCountryPage
