import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CUIButton } from '../../../components/ClickUI'
import GetStartedFree from '../../../components/GetStartedFree'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import { SuiText, SuiTitle } from '../../../components/sui'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ClickPipesData } from '../../../types/clickpipes'
import features from './features.json'
import integrations from './integrations.json'
import ClickPipesAnimation from '../../../components/ClickPipesAnimation'
import MarketoForm from '../../../components/MarketoForm'



export const getStaticProps: GetStaticProps<ClickPipesData> =
  async function getStaticProps() {
    const data = {
      seo: {
        path: '/cloud/clickpipes',
        title: 'ClickPipes - ClickHouse Cloud',
        description:
          'ClickPipes is an integration engine that makes ingesting massive volumes of data from a diverse set of sources as simple as clicking a few buttons. Our robust and scalable architecture empowers you to handle the most demanding workloads, with guaranteed high throughput and low latency at scale.'
      }
    }

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData
}: ClickPipesData) {

  const formSuccessRef = useRef<HTMLDivElement|null>(null);
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 2xl:px-0'>
              <div className='flex justify-between'>
                <div className='flex-col text-center lg:mt-16 lg:max-w-xl lg:text-left'>
                  <h4 className='mb-4 text-base font-semibold text-primary-300'>
                    <Link href='/cloud'>Cloud</Link> / Data Ingestion
                  </h4>
                  <h1 className='relative mb-3 mt-4 inline-block font-basier text-4xl font-semibold leading-tight md:mt-0 md:text-5.5xl'>
                    ClickPipes
                    <div className='absolute -top-2 -right-10 rounded-full bg-primary-300 px-3 text-sm font-normal text-neutral-725 md:-top-1'>
                      Beta
                    </div>
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 text-neutral-200 md:pr-16'>
                    An integration engine that makes ingesting massive volumes
                    of data from a diverse set of sources as simple as clicking
                    a few buttons.
                  </SuiText>
                  <div className='mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start'>
                    <CUIButton
                      type='primary'
                      size='lg'
                      weight='semibold'
                      href='/cloud/clickpipes#joinwaitlist'
                      target='_self'
                      linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                      className='w-full'>
                      Join the waitlist
                    </CUIButton>
                    <CUIButton
                      type='secondary'
                      weight='semibold'
                      size='lg'
                      href='https://clickhouse.com/docs/en/integrations/clickpipes'
                      target='_blank'
                      linkClass='w-full max-w-[14rem]'
                      className='w-full'>
                      View documentation
                    </CUIButton>
                  </div>
                </div>
                <div className='mt-6 hidden lg:block'>
                  <ClickPipesAnimation className='clickpipes-animation' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 pb-10 text-neutral-0'>
          <div className='mx-auto max-w-2xl pt-16 text-center'>
            <h2 className='font-basier text-3xl font-semibold leading-normal'>
              Seamlessly{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>connect</span>
              </span>{' '}
              your external data sources to ClickHouse Cloud.
            </h2>
          </div>
          <div className='container mx-auto flex max-w-4xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8  2xl:px-0'>
            <div className='grid grid-cols-1 gap-y-10 gap-x-8 space-y-4 md:grid-cols-2 md:space-y-0'>
              {features.map((feature) => (
                <div className='col' key={feature.id}>
                  <div className='flex flex-col items-center gap-4 text-center'>
                    <Image
                      src={feature.icon}
                      width={52}
                      height={52}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='text-md mb-3 font-inter font-semibold'>
                        {feature.title}
                      </h4>
                      <div className='px-10 font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        <ReactMarkdown children={feature.content} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle bg-neutral-725'>
          <div className='section-container max-w-7xl lg:mt-0'>
            <div className='relative flex flex-col rounded-lg border-t-2 border-neutral-700/80 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
              <div className='p-10'>
                <h2 className='mb-10 text-center font-basier text-3xl font-semibold'>
                  Available Connectors
                </h2>
                <div className='flex flex-col gap-x-6 gap-y-6 md:flex-row'>
                  {integrations
                    .filter((integration) => integration.available)
                    .map((integration) => (
                      <div
                        className='flex flex-1 flex-col justify-evenly bg-neutral-700 p-4'
                        key={integration.id}>
                        <div className='mb-4'>
                          <Image
                            src={integration.logo}
                            alt={integration.name}
                            width={integration.imageWidth}
                            height={integration.imageHeight}
                            className='max-w-[72px] md:max-w-max'
                          />
                        </div>
                        <h3 className='mb-6 font-basier text-2xl font-semibold text-neutral-0 md:text-4xl'>
                          {integration.name}
                        </h3>
                        <div className='rich_content min-h-[325px] text-base text-neutral-200'>
                          <ReactMarkdown
                            children={integration.description as string}
                          />
                        </div>
                        {integration.buttonHref && (
                          <div className='mt-auto flex items-center gap-x-6'>
                            <CUIButton
                              type='primary'
                              size='lg'
                              weight='semibold'
                              href={integration.buttonHref}
                              target={integration.buttonTarget}
                              linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                              className='w-full'>
                              {integration.buttonText}
                            </CUIButton>
                            <p className='text-xs text-neutral-50'>
                              {integration.buttonDescription}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className='mx-auto mt-6'>
                  <CUIButton
                    type='primary'
                    size='lg'
                    weight='semibold'
                    href='/cloud/clickpipes#joinwaitlist'
                    linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                    className='mx-auto'>
                    Join the waitlist
                  </CUIButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0 '>
          <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/clickpipes/icon-integrations.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={73}
              />
              <SuiTitle
                type='h2'
                className='mt-8 mb-4 px-8 text-center md:px-0'>
                More connectors coming soon
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-16'>
                To find out more,{' '}
                <Link
                  href='/company/contact?loc=clickpipes'
                  className='text-primary-300'>
                  Contact Us
                </Link>{' '}
                today.
              </div>
            </div>
          </div>
        </div>

        <div className='section-container my-12 pb-16 md:px-8 2xl:px-0 '>
          <GetStartedFree
            href='https://clickhouse.cloud/signUp?loc=clickpipes-getstarted-footer'
            textBefore='Get started with ClickHouse'
            textSlanted='Cloud'
            textAfter='for free'
          />
        </div>
        <div className='mx-auto mb-24 max-w-7xl' id='joinwaitlist'>
          <h2 className='mb-10 text-center font-basier text-3xl font-semibold leading-normal'>
            Join the waitlist
          </h2>
          <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              <div className='px-4 lg:px-0'>

                {!formSuccess && <MarketoForm formId='1057' onLoad={() => setFormLoaded(true)} onSuccess={() => {
                  setFormSuccess(true)

                  // Delay needed to allow the ref to update before scrolling
                  setTimeout(() => {
                    formSuccessRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }, 10);

                  return false // Stops page from reloading
                }} />}

                {!formLoaded && <div className='text-center'>
                  Loading form...
                </div>}

                {formSuccess && <div ref={formSuccessRef} className='text-center'>
                  <h3 className='text-2xl font-bold'>Thanks! You're on the waitlist</h3>
                  <p className='mt-2 text-neutral-200'>We will be in touch as soon as ClickPipes is available.</p>
                </div>}

                {formLoaded && !formSuccess && <div className='rich_content privacy-notice-form mt-4 text-center text-sm'>
                  <ReactMarkdown
                    children='By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).'
                  />
                </div>}

              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
