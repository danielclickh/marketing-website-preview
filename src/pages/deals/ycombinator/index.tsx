import iconDoubleTick from './assets/icon-double-tick.svg'
import iconGuage from './assets/icon-guage.svg'
import iconIntegrations from './assets/icon-integrations.svg'
import iconMaximize from './assets/icon-maximize.svg'
import iconSecure from './assets/icon-secure.svg'
import iconUsers from './assets/icon-users.svg'
import ycLogo from './assets/ycombinator.svg'
import TickItem from '@/components-cleaned/TickItem'
import ClickHousePartnerLogo from '@/components/ClickHousePartnerLogo'
import { CUIButton, CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import TiltedText from '@/components/TiltedText'
import { SuiTitle } from '@/components/sui'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
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
          title: 'ClickHouse x Y Combinator',
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
                href='/deals/ycombinator#apply'
                className='!px-10'
                onClick={useGalaxyOnClick('ycStartupsPage.hero.applyNow')}>
                Apply now
              </CUIButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why? */}
      <section className='bg-neutral-725 py-16 lg:py-20'>
        <div className='section-container'>
          <div className='mb-10 space-y-6 text-center lg:mb-16'>
            <Image
              src={iconCode}
              alt='Icon'
              width={72}
              height={72}
              className='inline-block'
            />
            <SuiTitle type='h2'>Why ClickHouse?</SuiTitle>
            <p className='mx-auto max-w-3xl text-white/70'>
              ClickHouse is the fastest way to explore and analyze data at
              scale. It’s trusted by OpenAI, Anthropic, Tesla, Weights & Biases,
              eBay, and LangChain to handle billions of rows in milliseconds.
            </p>
          </div>

          <ul className='grid grid-cols-1 gap-x-12 gap-y-10 pl-2 sm:pl-0 md:grid-cols-2 lg:grid-cols-3'>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconUsers}
                  alt='Onboarding'
                  width={32}
                  height={32}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>
                  Instant onboarding
                </h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Start running queries in minutes, no infrastructure to manage.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconGuage}
                  alt='Performance'
                  width={32}
                  height={32}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>
                  Best price performance
                </h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Process more data for less with our cloud-native architecture.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconDoubleTick}
                  alt='Reliability'
                  width={32}
                  height={32}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>
                  Uncompromising reliability
                </h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Automatic replication across multiple availability zones.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconSecure}
                  alt='Security'
                  width={32}
                  height={32}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>
                  Enterprise-grade security
                </h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Security and compliance handled by our experts, with always-on
                  encryption.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconIntegrations}
                  alt='Integrations'
                  width={32}
                  height={32}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>
                  Ecosystem integrations
                </h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Connect with your favorite tools, languages, and data sources.
                </p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <div className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center'>
                <Image
                  src={iconMaximize}
                  alt='Scaling'
                  width={21}
                  height={12}
                  className='object-contain object-center'
                />
              </div>
              <div>
                <h4 className='mb-3 font-inter font-bold'>Seamless scaling</h4>
                <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                  Automatically adjusts to changing workloads so you can focus
                  on building, not capacity planning.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Who? */}
      <section className='bg-primary-300 py-4 sm:py-16 lg:py-24'>
        <div className='section-container grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'>
          <div className='text-center'>
            <CUICard className='bg-neutral-900/90 p-6 lg:p-12 lg:pt-8'>
              <CUICard.Body>
                <SuiTitle type='h2'>Who can apply?</SuiTitle>
                <p className='mt-4 text-neutral-200'>
                  Eligible startups are in the Y Combinator 2025 batch, less
                  than three years old, pre-Series B, and new to ClickHouse
                  Cloud.
                </p>
                <ul className='mt-6 space-y-6 text-left lg:mt-12'>
                  <li>
                    <TickItem>
                      You’re part of the Y Combinator 2025 batch
                    </TickItem>
                  </li>
                  <li>
                    <TickItem>Your company is less than 3 years old</TickItem>
                  </li>
                  <li>
                    <TickItem>
                      You haven’t raised a Series B or later round
                    </TickItem>
                  </li>
                  <li>
                    <TickItem>
                      You haven’t been a paid ClickHouse Cloud customer before
                    </TickItem>
                  </li>
                </ul>
              </CUICard.Body>
            </CUICard>
          </div>
          <div className='text-center'>
            <CUICard className='bg-neutral-900/90 p-6 lg:p-12 lg:pt-8'>
              <CUICard.Body>
                <SuiTitle type='h2'>What do you get?</SuiTitle>
                <p className='mt-4 text-neutral-200'>
                  Get $10,000 in ClickHouse Cloud credits for 12 months, with
                  support, expert training, and opportunities for promotion and
                  speaking.
                </p>
                <ul className='mt-6 space-y-6 text-left lg:mt-12'>
                  <li>
                    <TickItem>
                      $10,000 in ClickHouse Cloud credits, valid for 12 months
                    </TickItem>
                  </li>
                  <li>
                    <TickItem>ClickHouse Basic support included</TickItem>
                  </li>
                  <li>
                    <TickItem>One-hour expert training session</TickItem>
                  </li>
                  <li>
                    <TickItem>
                      Get featured in a joint blog post and promoted on our
                      channels
                    </TickItem>
                  </li>
                  <li>
                    <TickItem>
                      Speaking opportunities at ClickHouse community events
                    </TickItem>
                  </li>
                </ul>
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </section>

      <DotsContainer id='apply'>
        <div className='mx-auto max-w-2xl'>
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

            {!formLoaded && <div className='text-center'>Loading form...</div>}

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
      </DotsContainer>
    </Layout>
  )
}
