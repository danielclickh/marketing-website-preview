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
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-20 md:pt-30'>
        <div className='mx-10 min-h-screen pb-10 md:pb-10 '>
          <div className='mx-auto flex w-full flex-col items-center justify-center gap-12 md:mb-24 md:flex-row-reverse md:gap-36'>
            <Image
              src='/images/google-cloud-icon.svg'
              width='240'
              height='240'
              alt='Google Cloud'
            />
            <div className='flex max-w-screen-md flex-col items-center md:items-start'>
              <h3 className='mb-2 pb-0 text-4xl'>
                {' '}
                <span className='tilted tilted-yellow'>
                  <span className='tilted-content'>soon</span>
                </span>{' '}
              </h3>
              <h1 className='pb-6 text-center text-4xl font-bold tracking-tight text-neutral-0 md:text-left'>
                ClickHouse Cloud on GCP
              </h1>
              <p className='mb-4 text-center text-neutral-200 md:text-left'>
                {seo?.description}
              </p>
            </div>
          </div>
          <div className='mx-auto mt-6  md:max-w-screen-sm'>
            <h3
              className='mb-4 text-center text-2.75xl font-semibold md:text-left
            '>
              Register your interest
            </h3>
            <ContactForm {...contactForm} />
            <div className='mt-4 text-center'>
              <div className='text-sm font-medium text-neutral-200'>
                <Markdown>{contactForm.disclaimer}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PartnersPage
