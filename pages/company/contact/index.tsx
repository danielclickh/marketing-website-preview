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

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    const growingCommunityData = await findOne('growing-community', {
      populate: [
        'iconButtons',
        'iconButtons.darkIconPng',
        'iconButtons.lightIconPng'
      ]
    })

    return {
      props: {
        ...data.hero,
        seo: data.seo,
        growingCommunityData,
        ...commonProps
      }
    }
  }

export default function ContactPage({
  title,
  description,
  contactForm,
  headerData,
  footerData,
  getStartedData,
  growingCommunityData,
  seo
}: ContactProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='bg-c1 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-8 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-6'>
            <SuiTitle type='h1' className='mb-4'>
              {title}
            </SuiTitle>
            <SuiText
              size='lg'
              weight='medium'
              color='secondary'
              className='max-w-3xl'>
              {description}
            </SuiText>
          </div>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-14 pb-8 text-center px-8 2xl:px-0'>
            <div className='w-full md:max-w-screen-sm self-center text-left space-y-5'>
              <ContactForm {...contactForm} />
              <div className='flex text-center'>
                <SuiText size='xs' weight='medium' color='secondary'>
                  <Markdown>{contactForm.disclaimer}</Markdown>
                </SuiText>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GrowingCommunity {...growingCommunityData} />
      <GetStarted {...getStartedData} />
    </Layout>
  )
}
