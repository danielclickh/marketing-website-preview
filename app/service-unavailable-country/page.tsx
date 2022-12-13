import Image from 'next/image'
import React from 'react'
import { findOne } from '../../lib/api/strapi'
import ServiceUnavailableForm from '../../components/ServiceUnavailableForm'
import GetStarted from '../../components/GetStarted'

async function getData() {
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
  return response.card
}

async function ServiceUnavailableCountryPage() {
  const { title, description, iconSvg, contactForm, ctaButton, install_oss } =
    await getData()
  const onSubmit = () => {}

  return (
    <>
      <div className='service_unavailable_country'>
        <div className='card'>
          <div className='card_container'>
            <div className='section_metadata'>
              <Image url={iconSvg.url} alt={iconSvg.caption} className='icon' />
              <div className='title'>{title}</div>
              <div className='description'>{description}</div>
            </div>
            <div className='contact_form'>
              <ServiceUnavailableForm
                {...contactForm}
                btnText={ctaButton.text}
              />
            </div>
          </div>
        </div>
      </div>
      <GetStarted customHeader={install_oss.title} />
    </>
  )
}

export default ServiceUnavailableCountryPage
