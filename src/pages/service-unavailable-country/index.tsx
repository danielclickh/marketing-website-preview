import GetStarted from '@/components/GetStarted'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { SuiPanel, SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ServiceProps } from '@/types/serviceUnavailablePage'
import { GetStaticProps } from 'next'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export const getStaticProps: GetStaticProps<ServiceProps> =
  async function getStaticProps() {
    const params = {
      populate: ['card', 'card.iconSvg', 'card.ctaButton', 'card.contactForm']
    }
    const response = await findOne('service-unavailable-country', params)

    const commonProps = await getCommonProps()

    return {
      props: {
        ...response.card,
        ...commonProps,
        seo: {
          title: response.card.title,
          type: 'website',
          siteName: 'ClickHouse',
          path: '/service-unavailable-country'
        }
      }
    }
  }

function ServiceUnavailableCountryPage({
  title,
  description,
  iconSvg,
  contactForm,
  ctaButton,
  platforms,
  footerData,
  headerData,
  seo
}: ServiceProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='service_unavailable_country px-3'>
        <SuiPanel
          color='bg-neutral-950'
          shadow
          isRounded
          className='mx-auto mb-44 mt-16 max-w-screen-sm px-6 py-10 text-center'>
          <div className='flex flex-col'>
            <SuiTitle type='h1' className='mb-3'>
              {title}
            </SuiTitle>
            <SuiText
              size='lg'
              weight='normal'
              color='secondary'
              className='mb-9'>
              {description}
            </SuiText>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1034'}
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
                <div ref={formSuccessRef}>
                  <ReactMarkdown className='text-center'>
                    Thank you for submitting the form
                  </ReactMarkdown>
                </div>
              )}
            </>
          </div>
        </SuiPanel>
      </div>
      <GetStarted platforms={platforms} />
    </Layout>
  )
}

export default ServiceUnavailableCountryPage
