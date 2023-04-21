import { GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import { ContactProps } from '../../../types/contact'
import { findOne } from '../../../lib/api/strapi'
import Markdown from '../../../components/Markdown'
import ContactForm from '../../../components/ContactForm'

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        seo: {
          title: 'ClickHouse Cloud on Google Cloud Platform',
          description:
            'The fastest and most resource-efficient analytical database, ClickHouse, will soon be available as a service on GCP. ClickHouse Cloud on GCP will allow you to experience the speed and scalability of the fastest OLAP database on earth without any need to manage the infrastructure.'
        },
        ...commonProps
      }
    }
  }

function PartnersPage({
  seo,
  headerData,
  footerData,
  contactForm
}: ContactProps) {
  contactForm.submitButtonLabel = 'Join waitlist'

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-20 md:pt-30'>
        <div className='mx-10 min-h-screen pb-10 md:pb-10 '>
          <div className='mx-auto max-w-3xl'>
            <Image
              src='/images/google-cloud-icon.svg'
              width='120'
              height='120'
              alt='Google Cloud'
              className='mx-auto pb-6'
            />{' '}
            <h1 className='pb-6 text-center text-5.5xl font-bold tracking-tight text-neutral-0'>
              ClickHouse Cloud on GCP
            </h1>
            <div className='mx-auto max-w-2xl'>
              <p className='text-center text-neutral-200'>{seo?.description}</p>
            </div>
          </div>
          <div className='mx-auto mt-12 md:max-w-screen-sm'>
            <div className='rounded-md border border-neutral-700 p-8'>
              <ContactForm {...contactForm} />
              <div className='mt-6 text-center'>
                <div className='text-sm font-medium text-neutral-200'>
                  <Markdown>{contactForm.disclaimer}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PartnersPage
