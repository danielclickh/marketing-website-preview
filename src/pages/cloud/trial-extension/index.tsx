import GrowingCommunity from '@/components/GrowingCommunity'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import MarketoForm, { SpoofedMarketoObject } from '@/components/MarketoForm'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ContactProps } from '@/types/contact'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
          title: 'Extend your ClickHouse Cloud trial',
          path: '/cloud/trial-extension'
        },
        ...commonProps
      }
    }
  }

export default function TrialExtensionPage({ headerData, seo }: ContactProps) {
  const router = useRouter()
  useGalaxyOnPage('trialExtensionPage')

  const { orgId, email } = router.query

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [marketoForm, setMarketoForm] = useState<SpoofedMarketoObject>()
  return (
    <Layout seo={seo} headerData={headerData}>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto mb-10 text-center text-neutral-100'>
            <h1 className='mx-auto text-center font-basier text-4xl text-neutral-100 md:text-5.5xl lg:mb-16 lg:pt-20'>
              Extend your ClickHouse Cloud trial
            </h1>
            <div className='mx-auto mt-6 max-w-3xl text-neutral-200'>
              Fill in the form below, and we'll let you know once your trial is
              extended.
            </div>
            {!orgId && (
              <div className='mx-auto mt-6 max-w-3xl text-neutral-200'>
                Your organization ID can be found on clickhouse.cloud on the
                Admin page.
              </div>
            )}
          </div>

          <div className='container mx-auto flex flex-col bg-opacity-10 px-8 pb-8 pt-6 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <h3 className='text-center text-2xl font-bold'>
                    Thank you for your submission!
                  </h3>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
                  </p>
                </div>
              )}
              {!formSuccess && (
                <MarketoForm
                  formId={'1211'}
                  onLoad={(formObject) => {
                    setFormLoaded(true)
                    setMarketoForm(formObject)
                    // Set field values
                    formObject.setValues({
                      miscBlankField14: orgId || '',
                      Email: email || '',
                      programmessagefull: `${
                        orgId
                          ? `Please extend my trial for organization ID: ${orgId}`
                          : 'Please extend my trial'
                      }`
                    })
                  }}
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
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
