import Image, { ImageProps } from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'
import { CUIButton, CUICard } from '../../../../components/ClickUI'
import Footer from '../../../../components/Footer'
import HomepageSectionTrustedByAlt from '../../../../components/HomepageSectionTrustedByAlt'
import Markdown from '../../../../components/Markdown'
import MarketoForm from '../../../../components/MarketoForm'
import SeoContainer from '../../../../components/SeoContainer'
import { SuiText, SuiTitle } from '../../../../components/sui'
import { useClickOutside } from '../../../../hooks'
import { findAll, findOne } from '../../../../lib/api/strapi'
import { galaxyOnPage } from '../../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../../lib/utils/revalidationConfig'
import logoFull from '../../../../public/logo-full.svg'
import { ComparisonPage, ComparisonProps } from '../../../../types/comparisons'
import { HomepageCustomerStories } from '../../../../types/homepage'
import iconQuote from '../icon-quote.svg'
import styles from './styles.module.scss'
import bgArrows from './bg-arrows.png'
import chartCostsQuering from './chart-costs-querying.svg'
import chartCostsStoring from './chart-costs-storing.svg'
import chartCostsLoading from './chart-costs-loading.svg'
import chartCostsQueryingSpeed from './chart-costs-querying-speed.svg'
import chartPerformanceTableScan from './chart-performance-table-scan.svg'
import chartPerformanceIndexSupport from './chart-performance-index-support.svg'
import chartPerformanceQuerying from './chart-performance-querying.svg'
import chartPerformanceStoring from './chart-performance-storing.svg'
import logoGcs from './logo-gcs.svg'
import logoAws from './logo-aws.svg'
import logoAzure from './logo-azure.svg'
import logoAdevinta from './logo-adevinta.svg'
import logoBlock from './logo-block.png'
import logoPerfect from './logo-perfect.svg'

export interface BigQueryCostsAndPerformancePageProps extends ComparisonProps {
  customerStories: HomepageCustomerStories
}

export async function getStaticProps() {
  const { data }: { data: ComparisonPage[] } = await findAll('comparisons', {
    filters: {
      slug: {
        $eq: 'bigquery'
      }
    },
    populate: [
      'seo',
      'Content',
      'Content.customContent',
      'Content.customContent.Image',
      'Content.RelatedBlogs',
      'Content.RelatedBlogs.blog_posts',
      'Content.RelatedBlogs.blog_posts.*',
      'Content.RelatedBlogs.blog_posts.author',
      'Content.RelatedBlogs.blog_posts.thumbnailPng'
    ]
  })

  if (!data?.[0]) {
    return {
      notFound: true,
      revalidate: REVALIDATE_SECONDS
    }
  }

  const { customerStories } = await findOne('homepage', {
    populate: [
      'customerStories',
      'customerStories.*',
      'customerStories.logos.*',
      'customerStories.logos.darkLogoPng'
    ]
  })

  const comparison = data[0]

  const seo = comparison.seo
  if (seo) seo.path = `/comparison/${comparison.slug}/costs-and-performance`

  const props: BigQueryCostsAndPerformancePageProps = {
    comparison,
    customerStories,
    seo,
    ...(await getCommonProps())
  }

  return {
    props,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function BigQueryCostsAndPerformancePage({
  footerData,
  seo,
  comparison,
  customerStories
}: BigQueryCostsAndPerformancePageProps) {
  galaxyOnPage(`${comparison.slug}CostsAndPerformanceComparisonPage`)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalInnerRef = useRef<HTMLDivElement | null>(null)
  const modalFormSuccessRef = useRef<HTMLDivElement | null>(null)
  const [modalFormSuccess, setModalFormSuccess] = useState(false)
  const [modalFormLoaded, setModalFormLoaded] = useState(false)

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

  const searchParams = useSearchParams()
  const [test, setTest] = useState<string | null>(searchParams.get('test'))

  const isPerformanceTest = test === 'performance'
  const isCostsTest = !isPerformanceTest

  return (
    <div>
      {seo && <SeoContainer {...seo} />}
      <div className='readable-content relative'>
        {/* Logo */}
        <div className='absolute left-0 right-0 top-0 z-50'>
          <div className='no-wrap section-container relative flex items-center py-4'>
            <Image
              src={logoFull}
              priority
              width='135'
              height='40'
              alt='ClickHouse logo'
            />
            <button
              className='ml-auto text-white opacity-80 hover:opacity-90 lg:text-primary-900'
              onClick={() => setTest(isCostsTest ? 'performance' : 'costs')}>
              Switch to {isCostsTest ? 'performance' : 'costs'}
            </button>
          </div>
        </div>

        {isCostsTest && (
          <>
            <HeroCosts onSupportClick={() => setIsModalOpen(true)} />
            <IntroGraphsCosts />
            <QuotesCosts />
            <div className='bg-neutral-750 py-16 lg:py-24'>
              <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
                <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
                  <SuiTitle type='h3' className='text-2xl'>
                    Juspay{' '}
                    <span className='tilted tilted-sm tilted-yellow'>
                      <span className='tilted-content'>cut costs by 90%</span>
                    </span>{' '}
                    after <br /> migrating to ClickHouse.
                  </SuiTitle>
                  <SuiText className='opacity-80'>
                    BigQuery is a traditional data warehouse that’s optimized
                    for ad-hoc and infrequent queries. Their pricing model -
                    which charges for BigQuery “slots” - is calculated based on
                    the amount of data scanned to perform a query. This can
                    become exorbitantly expensive for analytics workloads,
                    particularly where applications invoke queries and
                    concurrency is high.
                  </SuiText>
                </div>
                <Image
                  src={chartCostsLoading}
                  alt='Loading 1 billion rows'
                  width={501}
                  height={337}
                  className='order-first mx-auto lg:order-last lg:mx-0'
                />
              </div>
            </div>
            <div className='my-16 lg:my-24'>
              <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
                <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
                  <SuiTitle type='h3' className='text-2xl'>
                    ClickHouse is purpose-built to power your most
                    data-intensive applications
                  </SuiTitle>
                  <SuiText className='opacity-80'>
                    BigQuery is a traditional data warehouse that’s optimized
                    for ad-hoc and infrequent queries. Their pricing model -
                    which charges for BigQuery “slots” - is calculated based on
                    the amount of data scanned to perform a query. This can
                    become exorbitantly expensive for analytics workloads,
                    particularly where applications invoke queries and
                    concurrency is high.
                  </SuiText>
                </div>
                <Image
                  src={chartCostsQueryingSpeed}
                  alt='Querying 1 billion rows'
                  width={501}
                  height={347}
                  className='order-first mx-auto lg:mx-0'
                />
              </div>
            </div>
          </>
        )}

        {isPerformanceTest && (
          <>
            <HeroPerformance onSupportClick={() => setIsModalOpen(true)} />
            <IntroGraphsPerformance />
            <QuotesPerformance />
            <div className='bg-neutral-750 py-16 lg:py-24'>
              <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
                <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
                  <SuiTitle type='h3' className='text-2xl'>
                    ClickHouse is purpose-built to power your most
                    data-intensive applications
                  </SuiTitle>
                  <SuiText className='opacity-80'>
                    BigQuery is a traditional data warehouse that’s optimized
                    for ad-hoc and infrequent queries. Their pricing model -
                    which charges for BigQuery “slots” - is calculated based on
                    the amount of data scanned to perform a query. This can
                    become exorbitantly expensive for analytics workloads,
                    particularly where applications invoke queries and
                    concurrency is high.
                  </SuiText>
                </div>
                <Image
                  src={chartPerformanceStoring}
                  alt='Storing 1 billion rows'
                  width={501}
                  height={346}
                  className='order-first mx-auto lg:order-last lg:mx-0'
                />
              </div>
            </div>
            <div className='my-16 lg:my-24'>
              <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
                <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
                  <SuiTitle type='h3' className='text-2xl'>
                    Juspay{' '}
                    <span className='tilted tilted-sm tilted-yellow'>
                      <span className='tilted-content'>cut costs by 90%</span>
                    </span>{' '}
                    after <br /> migrating to ClickHouse.
                  </SuiTitle>
                  <SuiText className='opacity-80'>
                    BigQuery is a traditional data warehouse that’s optimized
                    for ad-hoc and infrequent queries. Their pricing model -
                    which charges for BigQuery “slots” - is calculated based on
                    the amount of data scanned to perform a query. This can
                    become exorbitantly expensive for analytics workloads,
                    particularly where applications invoke queries and
                    concurrency is high.
                  </SuiText>
                </div>
                <Image
                  src={chartPerformanceQuerying}
                  alt='Querying 1 billion rows'
                  width={501}
                  height={326}
                  className='order-first mx-auto lg:mx-0'
                />
              </div>
            </div>
          </>
        )}

        <div className='bg-neutral-750 py-16 lg:py-24'>
          <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
            <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[565px]'>
              <SuiTitle type='h3' className='text-2xl'>
                We’re cloud agnostic. <br />
                And built on open source.
              </SuiTitle>
              <SuiText className='opacity-80'>
                With ClickHouse, you have the ultimate flexibility to choose
                where and how you deploy. ClickHouse is available on AWS, GCP,
                and Azure, as well as through their Marketplaces. You can manage
                your services through our ClickHouse Cloud self-serve UI, or by
                leveraging our APIs and Terraform provider to automate your
                operations. Or, deploy and run open-source ClickHouse and join
                our community of thousands more!
              </SuiText>
            </div>
            <div className='order-first flex gap-6 lg:order-last  '>
              <CUICard className='w-full max-w-40 p-5'>
                <Image
                  src={logoGcs}
                  alt='Google Cloud Storage'
                  width={128}
                  height={115}
                  className='aspect-square object-scale-down object-center'
                />
              </CUICard>
              <CUICard className='w-full max-w-40 p-5'>
                <Image
                  src={logoAws}
                  alt='Amazon Web Services'
                  width={120}
                  height={73}
                  className='aspect-square object-scale-down object-center'
                />
              </CUICard>
              <CUICard className='w-full max-w-40 p-5'>
                <Image
                  src={logoAzure}
                  alt='Microsoft Azure'
                  width={120}
                  height={121}
                  className='aspect-square object-scale-down object-center'
                />
              </CUICard>
            </div>
          </div>
        </div>

        <HomepageSectionTrustedByAlt
          className='!my-24'
          heading='Trusted by'
          customerStories={customerStories}
        />

        <div className='section-container my-24'>
          <div className='space-y-6 rounded-lg bg-primary-300 px-6 py-10 text-center text-primary-900'>
            <SuiTitle type='h2'>Get started for free</SuiTitle>
            <SuiText>
              We’ll get you started on a 30 day trial and $300 credits to spend
              at your own pace.
            </SuiText>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <CUIButton
                type='primary-dark'
                size='lg'
                weight='semibold'
                onClick={() => setIsModalOpen(true)}>
                Get personalized support
              </CUIButton>
              <CUIButton
                type='secondary-dark'
                size='lg'
                weight='semibold'
                href='#'
                className='w-full !border !border-primary-900 !text-primary-900 hover:!text-white sm:w-auto'>
                Start free trial
              </CUIButton>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          className={`fixed inset-0 z-50 flex overflow-auto bg-[#323232] bg-opacity-50 transition-opacity ${
            isModalOpen ? '' : 'pointer-events-none opacity-0'
          }`}>
          <div className='m-auto p-4'>
            <div
              className='relative w-full max-w-2xl rounded-lg bg-[#323232] p-8 shadow-2xl'
              ref={modalInnerRef}>
              <button
                className='absolute right-4 top-4 opacity-60 transition-opacity hover:opacity-80'
                type='button'
                onClick={() => setIsModalOpen(false)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>

              <SuiTitle type='h3'>Get personalized support</SuiTitle>
              <SuiText size='sm' className='mb-6 mt-4'>
                We have helped many of our customers migrate from BigQuery to
                ClickHouse. Please leave your details below and we will reach
                out with availability shortly to learn about how we can assist
                you on this journey.
              </SuiText>
              <>
                {!modalFormSuccess && (
                  <MarketoForm
                    formId={'1237'}
                    clearbitTracking={true}
                    onLoad={() => {
                      setModalFormLoaded(true)
                    }}
                    onSuccess={() => {
                      setModalFormSuccess(true)
                      // Delay needed to allow the ref to update before scrolling
                      setTimeout(() => {
                        modalFormSuccessRef.current?.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }, 10)

                      return false // Stops page from reloading
                    }}
                  />
                )}

                {!modalFormLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {modalFormSuccess && (
                  <div ref={modalFormSuccessRef}>
                    <h3 className='text-center text-2xl font-bold'>
                      Thank you for your submission!
                    </h3>
                    <p className='mt-2 text-center text-neutral-200'>
                      We will be in touch soon.
                    </p>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      <Footer {...footerData} />
    </div>
  )
}

type HeroProps = {
  children: React.ReactNode
  onSupportClick: () => void
  stats?: Array<{ stat: string; label: string }>
}

function Hero({
  children,
  onSupportClick,
  stats = [
    {
      stat: '100x',
      label: 'More cost effective querying'
    },
    {
      stat: '2x+',
      label: 'Reduction in storage cost'
    },
    {
      stat: '95%',
      label: 'Faster querying speeds'
    }
  ]
}: HeroProps) {
  return (
    <div className='relative overflow-hidden'>
      <Image
        src={bgArrows}
        alt='Arrows background image'
        width={2880}
        height={1970}
        className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center'
      />

      <div className='container mx-auto flex max-w-7xl flex-col gap-x-10 px-8 lg:flex-row 2xl:px-0'>
        <div className='relative z-10 mx-auto grid max-w-[750px] grid-cols-1 gap-6 pb-10 pt-24 text-center lg:mx-0 lg:pb-24 lg:text-left'>
          {children}

          <div className='mt-6 flex flex-col gap-4 sm:mx-auto sm:flex-row lg:mx-0'>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              onClick={onSupportClick}>
              Get personalized support
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              href='#'
              className='w-full lg:w-auto'>
              Start free trial
            </CUIButton>
          </div>
        </div>

        <div className='relative ml-auto w-full rounded-lg bg-primary-300 p-6 lg:max-w-[300px] lg:bg-transparent lg:px-0 lg:py-24'>
          <div
            className={`absolute bottom-0 top-0 z-0 hidden w-dvw bg-primary-300 md:translate-x-24 lg:block xl:translate-x-0 ${styles.angledBackground}`}
          />
          <div className='relative z-10'>
            <p className='mb-4 text-center text-sm font-semibold uppercase tracking-wider text-primary-900 lg:text-right'>
              migrating to ClickHouse
              <br />
              can lead to:
            </p>
            <ul className='space-y-3'>
              {stats.map(({ stat, label }, index) => {
                return (
                  <li
                    key={index}
                    className='grid grid-cols-1 rounded bg-primary-900 py-4 text-center text-white'>
                    <span className='text-4xl font-bold text-primary-300'>
                      {stat}
                    </span>
                    <span>{label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroCosts({ onSupportClick }: Omit<HeroProps, 'children'>) {
  return (
    <Hero onSupportClick={onSupportClick}>
      <SuiTitle type='h1'>
        Are your BigQuery costs
        <br />
        <span className='text-primary-300'>out of control</span> ?
      </SuiTitle>
      <SuiText className='sm:text-xl'>
        BigQuery handles ad-hoc queries and smaller data volumes effectively,
        but scaling turns performance and cost management into a significant
        challenge.
      </SuiText>
      <SuiText className='sm:text-xl'>
        Migrate to ClickHouse for improved cost-efficiency and blazing-fast
        performance.
      </SuiText>
    </Hero>
  )
}

function HeroPerformance({ onSupportClick }: Omit<HeroProps, 'children'>) {
  return (
    <Hero onSupportClick={onSupportClick}>
      <SuiTitle type='h1'>
        Is BigQuery <span className='text-primary-300'>struggling</span> <br />
        to scale?
      </SuiTitle>
      <SuiText className='sm:text-xl'>
        BigQuery handles ad-hoc queries and smaller data volumes effectively,
        but scaling turns performance and cost management into a significant
        challenge.
      </SuiText>
      <SuiText className='sm:text-xl'>
        Migrate to ClickHouse for blazing-fast performance and improved
        cost-efficiency.
      </SuiText>
    </Hero>
  )
}

type IntroChartsProps = {
  children: React.ReactNode
  charts: Array<Omit<ImageProps, 'className'>>
}

function IntroCharts({ children, charts }: IntroChartsProps) {
  return (
    <div className='container mx-auto mt-10 max-w-7xl gap-x-6 px-8 md:flex-row lg:-mt-12 2xl:px-0'>
      <CUICard className='gap-6 !bg-neutral-700 p-6 sm:gap-10 sm:p-10'>
        <CUICard.Body className='max-w-[800px] space-y-6 text-center'>
          {children}
        </CUICard.Body>
        <CUICard.Footer className='flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:items-end md:justify-center'>
          {charts.map((chart, index) => {
            return (
              <div key={index}>
                <Image {...chart} />
              </div>
            )
          })}
        </CUICard.Footer>
      </CUICard>
    </div>
  )
}

function IntroGraphsCosts() {
  return (
    <IntroCharts
      charts={[
        {
          src: chartCostsQuering,
          alt: 'Querying 1 billion rows',
          width: 503,
          height: 346
        },
        {
          src: chartCostsStoring,
          alt: 'Storing 1 billions row',
          width: 501,
          height: 327
        }
      ]}>
      <SuiTitle type='h2'>
        Improve your cost efficiency with ClickHouse. And achieve better
        performance, too.
      </SuiTitle>
      <SuiText>
        Our parallelized query execution engine, best-in-class compression
        rates, and column-oriented design deliver unparalleled performance at
        scale so that you can focus on insights and forget worrying about
        infrastructure.
      </SuiText>
    </IntroCharts>
  )
}

function IntroGraphsPerformance() {
  return (
    <IntroCharts
      charts={[
        {
          src: chartPerformanceTableScan,
          alt: 'Querying 1 billion rows full table scan',
          width: 501,
          height: 346
        },
        {
          src: chartPerformanceIndexSupport,
          alt: 'Storing 1 billions row with index support',
          width: 503,
          height: 346
        }
      ]}>
      <SuiTitle type='h2'>
        Achieve better performance with ClickHouse. And improve your
        cost-efficiency, too.
      </SuiTitle>
      <SuiText>
        BigQuery is a traditional data warehouse that’s optimized for ad-hoc and
        infrequent queries. Their pricing model - which charges for BigQuery
        “slots” - is calculated based on the amount of data scanned to perform a
        query. This can become exorbitantly expensive for analytics workloads,
        particularly where applications invoke queries and concurrency is high.
      </SuiText>
    </IntroCharts>
  )
}

type QuotesProps = {
  quotes: Array<{
    quote: string | React.ReactNode
    logo?: Omit<ImageProps, 'className'>
  }>
}

function Quotes({ quotes }: QuotesProps) {
  const [swiperInstance, setSwiperInstance] = useState<null | SwiperClass>(null)

  return (
    <div className='group/quotes relative my-10 xl:my-24'>
      <div className='section-container relative z-0'>
        <Swiper
          onInit={(instance: SwiperClass) => setSwiperInstance(instance)}
          spaceBetween={32}
          breakpoints={{
            1024: {
              slidesPerView: 2
            }
          }}
          loop={true}
          className={`sm:!-mx-8 sm:!px-8 ${styles.quotesMask}`}>
          {quotes.map(({ quote, logo }, index) => {
            const quoteIsString = typeof quote === 'string'
            return (
              <SwiperSlide key={index} className='group !h-auto !self-stretch'>
                <CUICard className='p-6 lg:p-12'>
                  <div className='flex h-full flex-col'>
                    <Image
                      src={iconQuote}
                      alt='Quote'
                      width={36}
                      height={28}
                      className='mb-6'
                    />
                    <div className='grid grid-cols-1 gap-6 text-lg lg:mb-10'>
                      {quoteIsString && (
                        <Markdown encloseByDiv={false}>{quote}</Markdown>
                      )}
                      {!quoteIsString && quote}
                    </div>
                    {logo && <Image {...logo} className='mt-auto' />}
                  </div>
                </CUICard>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className='pointer-events-none z-10 mt-10 flex justify-center gap-10 xl:absolute xl:left-0 xl:right-0 xl:top-1/2 xl:mt-0 xl:-translate-y-1/2 xl:justify-between xl:px-4 2xl:px-12'>
        <button
          className='pointer-events-auto opacity-40 transition-opacity hover:!opacity-90 group-hover/quotes:opacity-70'
          onClick={() => swiperInstance?.slidePrev()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='24'
            fill='none'
            viewBox='0 0 14 24'>
            <path
              fill='#fff'
              d='M13.06 20.94a1.5 1.5 0 1 1-2.12 2.12l-10-10a1.5 1.5 0 0 1 0-2.12l10-10a1.5 1.5 0 0 1 2.12 2.12L4.13 12l8.93 8.94Z'
            />
          </svg>
        </button>
        <button
          className='pointer-events-auto opacity-40 transition-opacity hover:!opacity-90 group-hover/quotes:opacity-70'
          onClick={() => swiperInstance?.slideNext()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='24'
            fill='none'
            viewBox='0 0 14 24'>
            <path
              fill='#fff'
              d='m13.06 13.06-10 10a1.5 1.5 0 0 1-2.12-2.12L9.87 12 .94 3.06A1.5 1.5 0 0 1 3.06.94l10 10a1.5 1.5 0 0 1 0 2.12Z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function QuotesCosts() {
  return (
    <Quotes
      quotes={[
        {
          quote:
            'We needed a solution that could scale, but also provide end-user facing analytics capabilities with low latency and high throughput.”',
          logo: {
            src: logoAdevinta,
            alt: 'Adevinta',
            width: 143,
            height: 33
          }
        },
        {
          quote:
            'We needed a solution that could scale, but also provide end-user facing analytics capabilities with low latency and high throughput.',
          logo: {
            src: logoBlock,
            alt: 'Block',
            width: 200,
            height: 40
          }
        },
        {
          quote:
            'We needed a solution that could scale, but also provide end-user facing analytics capabilities with low latency and high throughput.”',
          logo: {
            src: logoAdevinta,
            alt: 'Adevinta',
            width: 143,
            height: 33
          }
        },
        {
          quote:
            'We needed a solution that could scale, but also provide end-user facing analytics capabilities with low latency and high throughput.',
          logo: {
            src: logoBlock,
            alt: 'Block',
            width: 200,
            height: 40
          }
        }
      ]}
    />
  )
}

function QuotesPerformance() {
  return (
    <Quotes
      quotes={[
        {
          quote:
            'In comparison, BigQuery was 2x more expensive due to its pricing model that charges based on bytes scanned”',
          logo: {
            src: logoAdevinta,
            alt: 'Adevinta',
            width: 143,
            height: 33
          }
        },
        {
          quote:
            'We have saved costs, savings not to be sniffed at, but that was not the driving factor. This was a qualitative step. We just could not do the things we wanted until we had ClickHouse and that is why we’re so excited about it.”',
          logo: {
            src: logoPerfect,
            alt: 'Perfect',
            width: 212,
            height: 59
          }
        },
        {
          quote:
            'In comparison, BigQuery was 2x more expensive due to its pricing model that charges based on bytes scanned”',
          logo: {
            src: logoAdevinta,
            alt: 'Adevinta',
            width: 143,
            height: 33
          }
        },
        {
          quote:
            'We have saved costs, savings not to be sniffed at, but that was not the driving factor. This was a qualitative step. We just could not do the things we wanted until we had ClickHouse and that is why we’re so excited about it.”',
          logo: {
            src: logoPerfect,
            alt: 'Perfect',
            width: 212,
            height: 59
          }
        }
      ]}
    />
  )
}
