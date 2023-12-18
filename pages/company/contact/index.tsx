import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import ContactForm from '../../../components/ContactForm'
import GrowingCommunity from '../../../components/GrowingCommunity'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import { SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ContactProps } from '../../../types/contact'

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()
    data.seo.path = '/company/contact'
    return {
      props: {
        ...data.hero,
        seo: data.seo,
        ...commonProps
      }
    }
  }

export default function ContactPage({
  title,
  description,
  contactForm,
  footerData,
  headerData,
  seo
}: ContactProps) {
  const [formSuccessful, setFormSuccessful] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto flex flex-col pt-6 text-center'>
            <SuiTitle type='h1' className='mb-4'>
              {title}
            </SuiTitle>
            <div className='max-w-3xl text-neutral-200'>{description}</div>
          </div>
          <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              <ContactForm
                {...contactForm}
                onSuccess={() => setFormSuccessful(true)}
              />

              {!formSuccessful && (
                <div className='flex text-center'>
                  <div className='text-sm font-medium text-neutral-200'>
                    <Markdown>{contactForm.disclaimer}</Markdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
