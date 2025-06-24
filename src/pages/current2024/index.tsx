import GrowingCommunity from '@/components/GrowingCommunity'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { findOne } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ContactProps } from '@/types/contact'
import { GetStaticProps } from 'next'
import { useRef, useState } from 'react'

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
          title: 'Kick-off Current Happy Hour - ClickHouse',
          description:
            "Connect with a diverse group of thought leaders, innovators, analysts, and top practitioners across the entire data landscape. Whether you're into data streaming, analytics, or anything in between, we’ve got you covered.",
          path: '/current2024'
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
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='container mx-auto flex max-w-2xl flex-col px-8 2xl:px-0'>
            <div
              className='mx-auto flex flex-col pt-6 text-center'
              id='pricing-contact-form'>
              <h1 className='mb-6 text-center font-basier text-5.5xl font-semibold leading-tight text-neutral-200'>
                Kick-off Current Happy&nbsp;Hour
              </h1>
              <div className='text-neutral-200'>
                Learn how ClickHouse's lightning-fast open-source OLAP database
                can transform your real-time analytics. Schedule a 30 minute
                session with us, and as a thank you, we'll send you a ClickHouse
                t-shirt!
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pb-8 pt-14 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                {!formSuccess && (
                  <MarketoForm
                    clearbitTracking={true}
                    formId='1257'
                    disclaimer={contactForm.disclaimer}
                    onLoad={() => setFormLoaded(true)}
                    onSuccess={() => {
                      setFormSuccess(true)

                      // Delay needed to allow the ref to update before scrolling
                      setTimeout(() => {
                        formSuccessRef.current?.scrollIntoView()
                      }, 10)

                      return false // Stops page from reloading
                    }}
                  />
                )}

                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {formSuccess && (
                  <div ref={formSuccessRef} className='text-center'>
                    <h3 className='text-2xl font-bold'>
                      Thank you for your submission!
                    </h3>
                    <p className='mt-2 text-neutral-200'>
                      We will be in touch soon.
                    </p>
                  </div>
                )}
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
