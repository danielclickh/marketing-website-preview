import { GetStaticProps } from 'next'
import { useRef, useState } from 'react'
import GrowingCommunity from '../../components/GrowingCommunity'
import HRSeparator from '../../components/HRSeparator'
import Layout from '../../components/Layout'
import MarketoForm from '../../components/MarketoForm'
import { findOne } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { ContactProps } from '../../types/contact'

interface DriftAPI {
  startInteraction: (options: { interactionId: number }) => void
}

interface DriftWindow extends Window {
  drift: {
    api: DriftAPI
  }
}

// Tell TypeScript that when we reference `window`, we mean the extended type with `drift` on it
declare var window: DriftWindow

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
          title: 'Google Next 2024 After After Party - ClickHouse',
          description:
            'You’re invited to an exclusive ClickHouse “After, After Party” on Tuesday, April 10th  from 9-11pm at the 1923 Prohibition (Speakeasy) Bar at Mandalay Bay Shoppes',
          path: '/google-next-after-party',
          image: [{ url: '/images/google-next-party.png' }]
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

export default function ReinventPage({
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
          <div className='max-w74xl container mx-auto flex flex-col px-8 2xl:px-0'>
            <div
              className='mx-auto flex flex-col pt-6 text-center'
              id='pricing-contact-form'>
              <h1 className='mb-6 text-center font-basier text-5.5xl font-semibold leading-tight text-neutral-200'>
                Google Next After, After Party
              </h1>
              <h2 className='mb-6 text-center font-basier text-2xl font-semibold leading-tight text-neutral-200'>
                April 10, from 9 PM to 11 PM
                <br />
                1923 Prohibition (Speakeasy) Bar at Mandalay Bay Shoppes
              </h2>
              <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                Spaces are filling up fast, and we're quickly running out of
                passes for the After, After Hours Party. Register below and
                we'll be in touch!
                <strong></strong>
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                {!formSuccess && (
                  <MarketoForm
                    formId='1101'
                    disclaimer={contactForm.disclaimer}
                    onLoad={() => setFormLoaded(true)}
                    onSuccess={() => {
                      setFormSuccess(true)

                      // Delay needed to allow the ref to update before scrolling
                      setTimeout(() => {
                        formSuccessRef.current?.scrollIntoView({
                          behavior: 'smooth'
                        })
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
                    <h3 className='text-2xl font-bold'>Thank you!</h3>
                    <p className='mt-2 text-neutral-200'>We'll be in touch.</p>
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
