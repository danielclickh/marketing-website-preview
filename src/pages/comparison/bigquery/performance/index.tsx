import { useClickOutside } from '../../../../hooks'
import iconBullseye from '../costs/assets/icon-bullseye.svg'
import iconCoins from '../costs/assets/icon-coins.svg'
import iconSpeedometer from '../costs/assets/icon-speedometer.svg'
import chartPerformanceIndexSupport from './assets/chart-performance-index-support.svg'
import chartPerformanceQuerying from './assets/chart-performance-querying.svg'
import chartPerformanceStoring from './assets/chart-performance-storing.svg'
import chartPerformanceTableScan from './assets/chart-performance-table-scan.svg'
import logoAdevinta from './assets/logo-adevinta.svg'
import logoAws from './assets/logo-aws.svg'
import logoAzure from './assets/logo-azure.svg'
import logoCoinhall from './assets/logo-coinhall.svg'
import logoGcs from './assets/logo-gcs.svg'
import logoPerfect from './assets/logo-perfect.svg'
import logoFull from '@/../public/logo-full.svg'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Footer from '@/components/Footer'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import MarketoForm from '@/components/MarketoForm'
import Nbsp from '@/components/Nbsp'
import QuotesCarousel from '@/components/QuotesCarousel'
import SeoContainer from '@/components/SeoContainer'
import StatsHero from '@/components/StatsHero'
import bgArrows from '@/components/StatsHero/bg-arrows.png'
import StatsHeroWithForm from '@/components/StatsHeroWithForm'
import { updateLinks } from '@/components/UTMPersist'
import { SuiText, SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ComparisonPage, ComparisonProps } from '@/types/comparisons'
import { HomepageCustomerStories } from '@/types/homepage'
import { useFeatureValue, useGrowthBook } from '@growthbook/growthbook-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const locTracking = 'bigquery-comparison-page'

export interface BigQueryPerformancePageProps extends ComparisonProps {
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
      notFound: true
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
  if (seo) {
    seo.title =
      'ClickHouse vs BigQuery - Migrate to ClickHouse for blazing-fast performance and improved cost-efficiency'
    seo.description =
      'BigQuery handles ad-hoc queries and smaller data volumes effectively, but scaling turns performance and cost management into a significant challenge.'
    seo.path = `/comparison/${comparison.slug}/performance`
  }

  const props: BigQueryPerformancePageProps = {
    comparison,
    customerStories,
    seo,
    ...(await getCommonProps())
  }

  return {
    props
  }
}

function LeadForm({ hiddenFields }: { hiddenFields: Record<any, any> }) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1237'}
          clearbitTracking={true}
          onLoad={(formObject) => {
            setFormLoaded(true)

            // Set field values
            formObject.addHiddenFields(hiddenFields)
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

      {!formLoaded && <div className='text-center'>Loading form...</div>}

      {formSuccess && (
        <div ref={formSuccessRef}>
          <SuiTitle type='h3' className='text-center'>
            Thank you for your submission!
          </SuiTitle>
          <p className='mt-2 text-center text-neutral-200'>
            We will be in touch soon.
          </p>
        </div>
      )}
    </>
  )
}

export default function BigQueryPerformancePage({
  seo,
  comparison,
  customerStories
}: BigQueryPerformancePageProps) {
  const gb = useGrowthBook()
  useGalaxyOnPage(`${comparison.slug}PerformanceComparisonPage`)
  if (gb?.ready) {
    const testTarget = document.querySelector('#test-target')

    setTimeout(() => {
      updateLinks(
        'mktg-bigquery-performance ',
        gb.getFeatureValue('mktg-bigquery-performance-hero', 0).toString(),
        '.readable-content'
      )
      testTarget?.classList.remove('hidden')
    }, 100)
  }

  const pageLayout = useFeatureValue('mktg-bigquery-performance-hero', 0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFormLocValue, setModalFormLocValue] = useState<null | string>(
    null
  )

  const modalInnerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

  const handleHeroCtaClick = useGalaxyOnClick(
    `bigQueryPerformanceComparisonPage.heroCtaVariant${pageLayout}.perfPersonalizedSupportSelect`
  )
  const handleHeroSecondaryCtaClick = useGalaxyOnClick(
    `bigQueryPerformanceComparisonPage.heroCtaVariant${pageLayout}.perfStartTrialSelect`
  )
  const handleFooterCtaClick = useGalaxyOnClick(
    `bigQueryPerformanceComparisonPage.footerCtaVariant${pageLayout}.perfPersonalizedSupportSelect`
  )
  const handleFooterSecondaryCtaClick = useGalaxyOnClick(
    `bigQueryPerformanceComparisonPage.footerCtaVariant${pageLayout}.perfStartTrialSelect`
  )

  return (
    <>
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
          </div>
        </div>

        <div className='relative overflow-hidden lg:min-h-[500px]'>
          <Image
            src={bgArrows}
            alt='Arrows background image'
            width={2880}
            height={1970}
            className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center'
          />
          <div className='hidden' id='test-target'>
            {pageLayout === 0 && (
              <StatsHero
                content={
                  <>
                    <SuiTitle type='h1'>
                      Is BigQuery{' '}
                      <span className='text-primary-300'>struggling</span>{' '}
                      <br />
                      to scale?
                    </SuiTitle>
                    <SuiText className='sm:text-xl'>
                      BigQuery handles ad-hoc queries and smaller data volumes
                      effectively, but scaling turns performance and cost
                      management into a significant challenge.
                    </SuiText>
                    <SuiText className='sm:text-xl'>
                      Migrate to ClickHouse for blazing-fast performance and
                      improved cost-efficiency.
                    </SuiText>
                  </>
                }
                primaryCta={{
                  onClick() {
                    setModalFormLocValue(`hero-cta-perf-variant${pageLayout}`)
                    setIsModalOpen(true)
                    handleHeroCtaClick()
                  },
                  text: 'Get personalized support'
                }}
                secondaryCta={{
                  onClick() {
                    handleHeroSecondaryCtaClick()
                  },
                  target: '_blank',
                  href: `https://console.clickhouse.cloud/signUp?loc=${locTracking}-paid-perf-hero-variant${pageLayout}`,
                  text: 'Start free trial'
                }}
                statsLabel={
                  <>
                    migrating to ClickHouse
                    <br />
                    can lead to:
                  </>
                }
                stats={[
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
                ]}
              />
            )}
            {pageLayout === 1 && (
              <StatsHeroWithForm
                content={
                  <>
                    <SuiTitle type='h1'>
                      Is BigQuery facing
                      <br />
                      <span className='text-primary-300'>
                        scalability issues
                      </span>
                      ?
                    </SuiTitle>
                    <SuiText className='sm:text-xl'>
                      BigQuery handles ad-hoc queries and smaller data volumes
                      effectively, but scaling turns performance and cost
                      management into a significant challenge.
                    </SuiText>
                  </>
                }
                form={
                  <>
                    <SuiText className='mb-8 text-balance text-xl'>
                      <strong>We offer free migration support</strong>
                      <br />
                      Upgrade to ClickHouse for improved performance and
                      cost-efficiency leaving BigQuery behind.
                    </SuiText>
                    <LeadForm
                      hiddenFields={{
                        miscBlankField17: 'paid',
                        miscBlankField16: pageLayout,
                        loc__c: `hero-performance-variant${pageLayout}`
                      }}
                    />
                  </>
                }
                statsLabel='Migrating to ClickHouse can lead to:'
                stats={[
                  {
                    icon: {
                      src: iconBullseye,
                      alt: 'Faster',
                      width: 26,
                      height: 26
                    },
                    stat: 'Up to 100x faster querying'
                  },
                  {
                    icon: {
                      src: iconSpeedometer,
                      alt: 'Performance',
                      width: 28,
                      height: 20
                    },
                    stat: '2x+ increase in storage performance'
                  },
                  {
                    icon: {
                      src: iconCoins,
                      alt: 'Speeds',
                      width: 30,
                      height: 22
                    },
                    stat: '95% faster query speeds'
                  }
                ]}
              />
            )}
          </div>
        </div>

        <div className='container mx-auto mt-10 max-w-7xl gap-x-6 px-8 md:flex-row lg:-mt-12 2xl:px-0'>
          <CUICard className='gap-6 !bg-neutral-700 p-6 sm:gap-10 sm:p-10'>
            <CUICard.Body className='max-w-[800px] space-y-6 text-center'>
              <SuiTitle type='h2'>
                Achieve better performance with ClickHouse. And improve your
                cost-efficiency, too.
              </SuiTitle>
              <SuiText className='lg:px-6'>
                Achieving sub-second query response times and supporting highly
                concurrent workloads can be painful in BigQuery, if not
                impossible. ClickHouse is purpose-built for real-time,
                large-volume, data analytics and is designed to serve queries
                with high concurrency without enforcing limits on the number of
                parallel queries.
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:items-end md:justify-center'>
              <Image
                src={chartPerformanceTableScan}
                alt='Querying 1 billion rows full table scan'
                width={501}
                height={346}
                className='h-auto w-full flex-1'
              />
              <Image
                src={chartPerformanceIndexSupport}
                alt='Storing 1 billions row with index support'
                width={503}
                height={346}
                className='h-auto w-full max-w-full flex-1'
              />
            </CUICard.Footer>
          </CUICard>
        </div>

        <QuotesCarousel
          quotes={[
            {
              quote: (
                <>
                  "We needed a solution that could scale, but also provide
                  end-user facing analytics capabilities with low latency and
                  high throughput."{' '}
                  <Link
                    href={`/blog/serving-real-time-analytics-across-marketplaces-at-adevinta?loc=${locTracking}`}
                    className='text-primary-300 hover:underline'>
                    Read
                    <Nbsp />
                    blog
                  </Link>
                </>
              ),
              logo: {
                src: logoAdevinta,
                alt: 'Adevinta',
                width: 143,
                height: 33
              }
            },
            {
              quote: (
                <>
                  “We have saved costs, savings not to be sniffed at, but that
                  was not the driving factor. This was a qualitative step. We
                  just could not do the things we wanted until we had ClickHouse
                  and that is why we’re so excited about it.”{' '}
                  <Link
                    href={`/blog/prefect-event-driven-workflow-orchestration-powered-by-clickhouse?loc=${locTracking}`}
                    className='text-primary-300 hover:underline'>
                    Read
                    <Nbsp />
                    blog
                  </Link>
                </>
              ),
              logo: {
                src: logoPerfect,
                alt: 'Perfect',
                width: 212,
                height: 59
              }
            },
            {
              quote: (
                <>
                  "At Coinhall, managing vast amounts of blockchain data
                  efficiently is crucial for our consumer-facing trading
                  platform. Initially, we used BigQuery, but as our data grew,
                  so did its costs and performance issues. ClickHouse
                  significantly outperformed other databases we tested and
                  delivered at 40x cost savings."{' '}
                  <Link
                    href={`/blog/trade-secrets-how-coinhall-uses-clickhouse-to-power-its-blockchain-data-platform?loc=${locTracking}`}
                    className='text-primary-300 hover:underline'>
                    Read
                    <Nbsp />
                    blog
                  </Link>
                </>
              ),
              logo: {
                src: logoCoinhall,
                alt: 'Coinhall',
                width: 203,
                height: 30
              }
            }
          ]}
        />

        <div className='bg-neutral-750 py-16 lg:py-24'>
          <div className='section-container flex flex-col gap-16 lg:min-h-96 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
            <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
              <SuiTitle type='h3' className='text-2xl'>
                Juspay{' '}
                <span className='tilted tilted-sm tilted-yellow'>
                  <span className='tilted-content'>cut costs by 90%</span>
                </span>{' '}
                after <br /> migrating to ClickHouse.
              </SuiTitle>
              <SuiText className='opacity-80'>
                BigQuery is a traditional data warehouse that’s optimized for
                ad-hoc and infrequent queries. Their pricing model - which
                charges for BigQuery “slots” - is calculated based on the amount
                of data scanned to perform a query. This can become exorbitantly
                expensive for analytics workloads, particularly where
                applications invoke queries and concurrency is high.
              </SuiText>
            </div>
            <Image
              src={chartPerformanceQuerying}
              alt='Querying 1 billion rows'
              width={501}
              height={326}
              className='order-first mx-auto lg:order-last lg:mx-0'
            />
          </div>
        </div>

        <div className='my-16 lg:my-24'>
          <div className='section-container flex flex-col gap-16 lg:min-h-96 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
            <div className='space-y-4 border-l-4 border-primary-300 pl-6 lg:max-w-[615px]'>
              <SuiTitle type='h3' className='text-2xl'>
                ClickHouse is purpose-built to power your most data-intensive
                applications
              </SuiTitle>
              <SuiText className='opacity-80'>
                Our parallelized query execution engine, best-in-class
                compression rates, and column-oriented design deliver
                unparalleled performance at scale so that you can focus on
                insights and forget worrying about infrastructure. Whether
                you’re performing live analysis to drive business outcomes or
                building interactive user-facing applications, ClickHouse
                delivers the unparalleled speed-to-insight you can depend on.
              </SuiText>
            </div>
            <Image
              src={chartPerformanceStoring}
              alt='Storing 1 billion rows'
              width={501}
              height={346}
              className='order-first mx-auto lg:mx-0'
            />
          </div>
        </div>

        <div className='bg-neutral-750 py-16 lg:py-24'>
          <div className='section-container flex flex-col gap-16 lg:min-h-96 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
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
            <div className='order-first flex gap-6 lg:order-last'>
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
                onClick={() => {
                  setModalFormLocValue(`footer-cta-perf-variant${pageLayout}`)
                  setIsModalOpen(true)
                  handleFooterCtaClick()
                }}>
                Get personalized support
              </CUIButton>
              <CUIButton
                type='secondary-dark'
                size='lg'
                weight='semibold'
                onClick={() => {
                  handleFooterSecondaryCtaClick()
                }}
                href={`https://console.clickhouse.cloud/signUp?loc=${locTracking}-paid-footer-perf-variant${pageLayout}`}
                target='_blank'
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
              {isModalOpen && (
                <>
                  <LeadForm
                    hiddenFields={{
                      miscBlankField17: 'paid',
                      miscBlankField16: pageLayout,
                      loc__c: modalFormLocValue
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
