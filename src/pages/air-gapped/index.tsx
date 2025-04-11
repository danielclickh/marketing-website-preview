import AirGappedIcon from '@/components/AirGapped/AirGappedIcon'
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
          title: 'Air Gapped - ClickHouse',
          description: 'ClickHouse Air Gapped',
          path: '/air-gapped',
          image: [{ url: '/images/air-gapped-og-v2.png' }]
        },
        ...commonProps
      }
    }
  }

interface PageProps {
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export default function Page({
  contactForm,
  footerData,
  headerData,
  seo
}: PageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='relative overflow-hidden bg-primary-300 px-4 py-12 pt-14 sm:px-8 md:py-24 2xl:px-0'>
          <div className='absolute -top-[300px] right-0 hidden lg:block'>
            <AirGappedIcon className='max-w-[800px]' />
          </div>
          <div className='mx-auto max-w-7xl'>
            <div className='flex items-center'>
              <div>
                <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight text-[#1C1B1A] md:text-5.5xl'>
                  ClickHouse Air Gapped
                </h1>
                <h2 className='mb-6 max-w-xl font-basier text-[18px] font-semibold leading-tight text-[#1C1B1A]'>
                  Real-time data warehouse, documented and configured for high
                  security, deployable to your air-gapped environment.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-12 sm:px-8 2xl:px-0'>
            <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
                <div className='section_metadata'>
                  <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        ClickHouse Air Gapped combines the speed and power of
                        ClickHouse with end-to-end FIPS 140-3 compliant
                        encryption, strong authentication, separation of compute
                        and storage, and APIs to manage resources, including
                        scaling. The package will be accompanied by
                        configuration and compliance documentation, and
                        vulnerability management support to reduce effort to
                        install and maintain.
                      </p>
                      <p>Open Source Security</p>
                      <ul>
                        <li>
                          <strong>Vulnerability Management:</strong> We
                          continuously scan our codebase to identify
                          vulnerabilities in existing and new components. We
                          work with third parties to conduct penetration tests
                          on our cloud environments and use the findings to
                          improve our open source code base. We encourage
                          reports through our Bug Bounty program and participate
                          in MITRE’s CVE Numbering Authority (CNA) program to
                          ensure our community stays informed of fixes.
                        </li>
                        <li>
                          <strong>Secure Development:</strong> Our developers
                          undergo annual secure coding training and follow
                          secure software lifecycle development practices. This
                          includes ensuring open source submissions are
                          thoroughly reviewed and tested before being used in
                          our products. Our security team is involved in
                          reviewing and testing new features to ensure adherence
                          to highest infosec standards.
                        </li>
                      </ul>
                      <p>
                        To learn more about our security practices, security
                        configurations in Open Source, and sign up for early
                        vulnerability updates visit our{' '}
                        <a href='https://trust.clickhouse.com/?product=clickhouseoss'>
                          OSS Trust Center
                        </a>
                        .
                      </p>
                      <p>
                        Subscribe to join our Federal community and stay
                        informed about ClickHouse&nbsp;Air&nbsp;Gapped!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='z-10 ml-auto w-full md:-mt-20 lg:max-w-lg'>
                <div className='w-full rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-card duration-300 ease-in-out'>
                  {!formLoaded && (
                    <div className='text-center'>Loading form...</div>
                  )}

                  {formLoaded && (
                    <h2 className='mb-6 text-lg'>Subscribe today!</h2>
                  )}

                  {!formSuccess && (
                    <MarketoForm
                      formId='1156'
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
                  {formSuccess && (
                    <div ref={formSuccessRef} className='text-center'>
                      <h3 className='text-2xl font-bold'>Thank you!</h3>
                      <p className='mt-2 text-neutral-200'>
                        We'll be in touch.
                      </p>
                    </div>
                  )}
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
