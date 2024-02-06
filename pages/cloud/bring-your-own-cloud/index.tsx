import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import MarketoForm from '../../../components/MarketoForm'
import { useRef, useState } from 'react'
import { CUIButton } from '../../../components/ClickUI'
import { HomePageProps } from '../../../types/homepage'
import styles from './styles.module.scss'

export const getStaticProps: GetStaticProps = async function getStaticProps() {
  const commonProps = await getCommonProps()

  return {
    props: {
      seo: {
        title: 'Bring Your Own Cloud - ClickHouse',
        description:
          'Join the waitlist for Bring Your Own Cloud. A fully managed ClickHouse Cloud service, deployed in your own AWS account.',
        path: '/cloud/cloud/bring-your-own-cloud'
      },
      ...commonProps
    }
  }
}

export default function Page({ footerData, headerData, seo }: HomePageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        {/* Hero */}
        <div className='bg-primary-300 py-16 lg:py-20'>
          <div className='section-container mx-auto'>
            <div className='flex flex-wrap items-center gap-12 lg:flex-nowrap lg:gap-16'>
              {/* Content column */}
              <div className='w-full text-neutral-900 lg:w-1/2'>
                <Image
                  width={469}
                  height={208}
                  src='/images/cloud/bring-your-own-cloud/hero.svg'
                  alt={'Bring your own cloud graphic'}
                />

                <h1 className='mt-8 mb-5 font-basier text-3xl font-bold !leading-snug lg:text-4xl xl:text-[56px]'>
                  Join the waitlist for Bring Your Own Cloud
                </h1>
                <p className='text-xl'>
                  A fully managed ClickHouse Cloud service, deployed in your own
                  AWS account.
                </p>
              </div>

              {/* Form column */}
              <div
                className={`w-full rounded-lg bg-neutral-900 p-8 lg:w-1/2 ${styles.byocForm}`}>
                {!formSuccess && (
                  <MarketoForm
                    formId='1135'
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
                    <p className='mt-2 text-neutral-200'>
                      We'll be in touch as soon as BYOC becomes available.
                    </p>
                    <div className='mt-6 flex w-full flex-col items-center justify-center gap-6 md:flex-row'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='/cloud'
                        linkClass='w-full max-w-[16rem]'
                        className='w-full'>
                        Back to ClickHouse Cloud
                      </CUIButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BYOC on AWS */}
        <div className='my-16 lg:my-20'>
          <div className='section-container mx-auto'>
            <div className='mx-auto max-w-[800px] text-center'>
              <Image
                width={72}
                height={72}
                src='/images/cloud/bring-your-own-cloud/upload-icon.svg'
                alt={'BYOC on AWS icon'}
                className='mx-auto mb-10'
              />
              <h2 className='mb-10 font-basier text-3xl font-bold lg:text-5xl'>
                BYOC on AWS
              </h2>
              <p className='mb-10 text-neutral-200'>
                Do you have strict data residency and compliance requirements
                that make typical SaaS offerings a nonstarter? Our Bring Your
                Own Cloud deployment model allows you to experience the
                advantages of ClickHouse Cloud within your own Virtual Private
                Cloud (VPC).
              </p>
              <p className='mb-10 text-neutral-200'>
                No regulatory headaches. No operational complexity. All the
                benefits of cloud.
              </p>
            </div>

            <Image
              width={1020}
              height={738}
              src='/images/cloud/bring-your-own-cloud/diagram.svg'
              alt={'BYOC on AWS diagram'}
              className='mx-auto mt-20'
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
