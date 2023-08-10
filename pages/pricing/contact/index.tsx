import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import Markdown from '../../../components/Markdown'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'
import MarketoForm from '../../../components/MarketoForm'

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
          title: 'Dedicated Services - ClickHouse',
          description:
            'Thank you for your interest in our Dedicated Service; please submit the below information to the best of your ability so we can help.',
          path: '/pricing/contact'
        },
        ...commonProps
      }
    }
  }

interface ContactPageProps {
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}


export default function ContactPage({
  contactForm,
  footerData,
  headerData,
  seo
}: ContactPageProps) {
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='container mx-auto flex max-w-2xl flex-col px-8 2xl:px-0'>
            <div
              className='mx-auto flex flex-col pt-6 text-center'
              id='pricing-contact-form'>
              <h1 className='mb-6 text-center font-basier text-5.5xl font-semibold leading-tight text-neutral-200'>
                Dedicated Services
              </h1>
              <div className=' text-neutral-200'>
                Thank you for your interest in our Dedicated Service; please
                submit the below information to the best of your ability so we
                can help.
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                <MarketoForm formId='1063' onSuccess={() => document.querySelector('.disclaimer-text')?.classList.add('hidden')}>
                  <h3 className='text-center text-2xl font-bold'>Thank you for your submission!</h3>
                  <p className='mt-2 text-center text-neutral-200'>We will be in touch soon.</p>
                </MarketoForm>
                <div className='flex text-center'>
                  <div className='disclaimer-text text-sm font-medium text-neutral-200'>
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
    </>
  )
}
