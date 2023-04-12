import { SuiText, SuiTitle } from '../../../components/sui'

import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import ContactForm from '../../../components/ContactForm'
import GetStarted from '../../../components/GetStarted'
import Markdown from '../../../components/Markdown'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

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
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='flex container mx-auto flex-col px-8 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-6'>
            <SuiTitle type='h1' className='mb-4'>
              {title}
            </SuiTitle>
            <div className='max-w-3xl text-neutral-200'>{description}</div>
          </div>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-14 pb-8 text-center px-8 2xl:px-0'>
            <div className='w-full md:max-w-screen-sm self-center text-left space-y-5'>
              <ContactForm {...contactForm} />
              <div className='flex text-center'>
                <div className='text-neutral-200 text-sm font-medium'>
                  <Markdown>{contactForm.disclaimer}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
