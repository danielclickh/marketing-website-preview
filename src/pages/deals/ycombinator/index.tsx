import ycLogo from './assets/ycombinator.svg'
import TickItem from '@/components-cleaned/TickItem'
import ClickHousePartnerLogo from '@/components/ClickHousePartnerLogo'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import TiltedText from '@/components/TiltedText'
import { SuiTitle } from '@/components/sui'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import azureLogo from '@/pages/partners/azure/assets/azure-logo.svg'
import iconCode from '@/pages/partners/azure/assets/icon-code.svg'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        ...commonProps,
        seo: {
          title: 'ClickHouse x YCombinator',
          description: '',
          keywords: '',
          path: '/deals/ycombinator'
        }
      }
    }
  }

export default function Page({ footerData, headerData, seo }: CommonProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container'>
          <div className='mx-auto max-w-5xl space-y-6 text-center'>
            <ClickHousePartnerLogo
              logo={ycLogo}
              partnerName='Y Combinator'
              className='mb-12'
              inset={false}
            />
            <SuiTitle type='h1'>
              Unlock{' '}
              <TiltedText type='black-on-yellow' className='px-3'>
                $10,000
              </TiltedText>{' '}
              in <br />
              ClickHouse Cloud credits
            </SuiTitle>
            <p className='font-medium text-neutral-200 lg:text-xl'>
              If you’re building fast, you need your data to keep up. As part of
              the Y Combinator 2025 batch, you can claim $10,000 in ClickHouse
              Cloud credits to supercharge your analytics and ship faster.
            </p>
            <div className='!mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 md:flex-nowrap md:gap-6'>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                href='#'
                className='!px-10'
                onClick={useGalaxyOnClick('ycStartupsPage.hero.applyNow')}>
                Apply now
              </CUIButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why? */}
      <section className='bg-white/5 py-16 lg:py-20'>
        <div className='section-container'>
          {/* Intro */}
          <div className='mb-10 space-y-6 text-center lg:mb-16'>
            <Image
              src={iconCode}
              alt='Icon'
              width={72}
              height={72}
              className='inline-block'
            />
            <SuiTitle type='h2'>Why ClickHouse?</SuiTitle>
            <p className='mx-auto max-w-xl text-white/70'>
              ClickHouse is the fastest way to explore and analyze data at
              scale. It’s trusted by OpenAI, Anthropic, Tesla, Weights & Biases,
              eBay, and LangChain to handle billions of rows in milliseconds.
            </p>
          </div>

          {/* Checks */}
          <ul className='mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2'>
            <li>
              <TickItem>
                <strong>Instant onboarding</strong>
                <br />
                Start running queries in minutes, no infrastructure to manage.
              </TickItem>
            </li>
            <li>
              <TickItem>
                <strong>Best price performance</strong>
                <br />
                Process more data for less with our cloud-native architecture.
              </TickItem>
            </li>
            <li>
              <TickItem>
                <strong>Uncompromising reliability</strong>
                <br />
                Automatic replication across multiple availability zones.
              </TickItem>
            </li>
            <li>
              <TickItem>
                <strong>Enterprise-grade security</strong>
                <br />
                Security and compliance handled by our experts, with always-on
                encryption.
              </TickItem>
            </li>
            <li>
              <TickItem>
                <strong>Ecosystem integrations</strong>
                <br />
                Connect with your favorite tools, languages, and data sources.
              </TickItem>
            </li>
            <li>
              <TickItem>
                <strong>Seamless scaling</strong>
                <br />
                Automatically adjusts to changing workloads so you can focus on
                building, not capacity planning.
              </TickItem>
            </li>
          </ul>
        </div>
      </section>

      {/* Who? */}
      <section className='bg-primary-300 py-16 lg:py-24'>
        <div className='section-container grid grid-cols-2 gap-6'>
          <div className='text-center'>
            <CUICard className='bg-neutral-900/90'>
              <CUICard.Body>
                <SuiTitle type='h2'>Who can apply?</SuiTitle>
              </CUICard.Body>
            </CUICard>
          </div>
          <div className='text-center'>
            <CUICard className='bg-neutral-900/90'>
              <CUICard.Body>
                <SuiTitle type='h2'>What do you get?</SuiTitle>
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </section>

      <section className='py-16 lg:py-24'>
        <div className='section-container -mt-4 flex flex-col gap-16 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-24'>
          {/* Content column */}
          <div className='space-y-6 lg:col-span-7'>
            <p>With ClickHouse Cloud, you get:</p>

            <p className='font-bold'>Highlights</p>
            <ul className='space-y-4'>
              <li>
                <TickItem>
                  <strong>Seamless scaling</strong> - automatic scaling adjusts
                  to variable workloads so you don't have to over-provision for
                  peak usage
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Transparent pricing</strong> - pay only for what you
                  use, with resource reservations and scaling controls
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Broad ecosystem</strong> - bring your favorite data
                  connectors, visualization tools, SQL and language clients with
                  you
                </TickItem>
              </li>
            </ul>
          </div>

          {/* Form column */}
          <div className='lg:col-span-5'>
            <div
              className={`relative rounded-lg bg-neutral-900 p-4 shadow-lg sm:p-6 lg:p-8 ${formLoaded ? '' : 'min-h-full'}`}>
              <div className='mb-8 text-center'>
                <SuiTitle type='h2' className='mb-4'>
                  Apply now
                </SuiTitle>
                <p className='text-neutral-200'>
                  Complete the form to claim your credits and start using
                  ClickHouse Cloud.
                </p>
              </div>

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              <MarketoForm
                formId='1442'
                clearbitTracking={true}
                onLoad={() => {
                  setFormLoaded(true)
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

              <div
                ref={formSuccessRef}
                className={`absolute inset-2 z-10 flex bg-neutral-900/90 text-center backdrop-blur transition-opacity ${formSuccess ? '' : 'pointer-events-none -z-50 opacity-0'}`}>
                <div className='m-auto w-full max-w-md'>
                  <h3 className='text-2xl font-bold'>Thank you!</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
