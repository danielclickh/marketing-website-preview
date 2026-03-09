import { useClickOutside } from '../../../hooks'
import logos from './bigquery-to-aws.svg'
import chartCosts from './chart-costs.svg'
import chartLatency from './chart-latency.svg'
import iconCheck from './icon-check-yellow.svg'
import iconCoinDark from './icon-coins-dark.svg'
import iconDevelopers from './icon-developers.svg'
import iconFx from './icon-fx.svg'
import iconGuageDark from './icon-guage-dark.svg'
import iconGuage from './icon-guage.svg'
import iconHandCoins from './icon-hand-coins.svg'
import iconQuote from './icon-quote.svg'
import iconStorageDark from './icon-storage-dark.svg'
import logoBlock from './logo-block.png'
import logoPostgress from './logo-postgress.svg'
import logoRedshift from './logo-redshift.svg'
import logoSnowflake from './logo-snowflake.svg'
import logoAdevinta from './logoAdevinta.svg'
import StrapiBlogPostCard from '@/components-cleaned/StrapiBlogPostCard'
import FeatureCard from '@/components/Cards/FeatureCard'
import { CUIButton, CUICard } from '@/components/ClickUI'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import MoreComparisons from '@/components/MoreComparisons'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { StrapiImageProps } from '@/components/StrapiElements/types'
import { SuiText, SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import {
  ComparisonPage,
  ComparisonProps,
  RepeatableContent
} from '@/types/comparisons'
import { HomepageCustomerStories } from '@/types/homepage'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const locTracking = 'bigquery-to-clickhouse-on-aws-page'

export interface BigQueryPageProps extends ComparisonProps {
  customerStories: HomepageCustomerStories
}

export async function getStaticProps() {
  const { data }: { data: ComparisonPage[] } = await findAll('comparisons', {
    filters: {
      id: {
        $eq: 7
      }
    },
    populate: [
      'Content',
      'Content.customContent',
      'Content.customContent.Image',
      'Content.RelatedBlogs',
      'Content.RelatedBlogs.blog_posts',
      'Content.RelatedBlogs.blog_posts.thumbnailPng',
      'Content.RelatedBlogs.blog_posts.author',
      'Content.RelatedBlogs.blog_posts.author.profiles',
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

  const props: BigQueryPageProps = {
    comparison,
    customerStories,
    seo: {
      title: 'Migrate from BigQuery to ClickHouse',
      description:
        'BigQuery handles ad-hoc queries and smaller data volumes effectively, but scaling turns cost and performance management into a significant challenge.',
      path: '/campaigns/bigquery-to-clickhouse-on-aws'
    },
    ...(await getCommonProps())
  }

  return {
    props
  }
}

export default function BigQueryPage({
  headerData,
  seo,
  comparison,
  customerStories
}: BigQueryPageProps) {
  useGalaxyOnPage(`BigQueryToClickhouseOnAwsPage`)

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalInnerRef = useRef<HTMLDivElement | null>(null)
  const modalFormSuccessRef = useRef<HTMLDivElement | null>(null)
  const [modalFormSuccess, setModalFormSuccess] = useState(false)
  const [modalFormLoaded, setModalFormLoaded] = useState(false)

  // Reset modal form on modal close
  useEffect(() => {
    if (!isModalOpen && modalFormSuccess) {
      setModalFormSuccess(false)
      setModalFormLoaded(false)
    }
  }, [isModalOpen])

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

  // At the top of your component, add this:
  const handlePersonalizedSupportClick = useGalaxyOnClick(
    `BigQueryToClickhouseOnAwsPage.heroCta.personalizedSupportSelect`
  )

  // Then in the JSX, replace the onClick with:
  const handleStartTrialClick = useGalaxyOnClick(
    `BigQueryToClickhouseOnAwsPage.heroCta.startTrialSelect`
  )

  // At the top of your component, add this:
  const handleMigrationDocClick = useGalaxyOnClick(
    `BigQueryToClickhouseOnAwsPage.heroCta.migrationDocSelect`
  )

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='container mx-auto my-16 flex max-w-7xl flex-col items-center px-8 2xl:px-0'>
        <div className='mx-auto max-w-[800px] space-y-6 text-center'>
          <div className='relative mx-auto w-full max-w-max'>
            <div className='absolute bottom-0 left-[53.59%] right-[0.24%] top-0 z-0 animate-pulse rounded-2xl shadow-stackIntegrationGraphicSmall lg:shadow-stackIntegrationGraphic' />
            <Image
              src={logos}
              alt='ClickHouse vs BigQuery'
              width={402}
              height={90}
              className='relative z-10'
            />
          </div>

          <SuiTitle type='h1' weight='bold'>
            Migrate from
            <br />
            BigQuery <span className='text-primary-300'>to</span> ClickHouse
          </SuiTitle>

          <SuiText weight='medium' className='sm:text-lg'>
            BigQuery handles ad-hoc queries and smaller data volumes
            effectively, but scaling turns cost and performance management into
            a significant challenge. By migrating to ClickHouse from BigQuery,
            you can expect:
          </SuiText>
        </div>

        <div className='mb-8 mt-10 grid max-w-[1030px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <FeatureCard
            className='!w-full'
            icon={
              <Image
                src={iconGuageDark}
                alt='ClickHouse'
                width={32}
                height={32}
              />
            }
            title='95%'
            description='Faster querying speeds'
          />
          <FeatureCard
            className='!w-full'
            icon={
              <Image
                src={iconStorageDark}
                alt='ClickHouse'
                width={32}
                height={32}
              />
            }
            title='60%'
            description='Less storage space required'
          />
          <FeatureCard
            className='!w-full'
            icon={
              <Image src={iconFx} alt='ClickHouse' width={32} height={32} />
            }
            title='1300+'
            description='Data functions for math, geo, ML, time series, and more'
            descriptionFullWidth
          />
          <FeatureCard
            className='!w-full'
            icon={
              <Image
                src={iconCoinDark}
                alt='ClickHouse'
                width={32}
                height={32}
              />
            }
            title='Up to 100x'
            description='More cost effective solution'
          />
        </div>

        <div className='mx-auto max-w-[800px]'>
          <SuiText
            weight='medium'
            className='text-neutral-200 sm:text-center sm:text-lg'>
            If you are considering a migration from BigQuery to ClickHouse on
            AWS we are providing a limited offer whereby you can benefit from:
          </SuiText>
        </div>

        <div className='my-12 w-full sm:px-4'>
          <div className='-m-3 flex flex-wrap items-start justify-center'>
            <div className='flex w-full items-center gap-3 text-balance p-3 md:max-w-[314px] md:basis-1/2 lg:basis-1/3'>
              <Image src={iconCheck} alt='Check' width={24} height={24} />
              <SuiText className='sm:text-lg'>Free migration services</SuiText>
            </div>
            <div className='flex w-full items-center gap-3 text-balance p-3 md:max-w-[314px] md:basis-1/2 lg:basis-1/3'>
              <Image src={iconCheck} alt='Check' width={24} height={24} />
              <SuiText className='sm:text-lg'>
                Discount on your ClickHouse Cloud subscriptions
              </SuiText>
            </div>
            <div className='flex w-full items-center gap-3 text-balance p-3 md:max-w-[314px] md:basis-1/2 lg:basis-1/3'>
              <Image src={iconCheck} alt='Check' width={24} height={24} />
              <SuiText className='sm:text-lg'>
                Promotional Credits on AWS
              </SuiText>
            </div>
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col justify-center px-4 sm:flex-row sm:px-0'>
          <CUIButton
            type='primary'
            size='lg'
            weight='semibold'
            className='flex w-full sm:max-w-60'
            onClick={() => {
              handlePersonalizedSupportClick()
              setIsModalOpen(true)
            }}>
            Start free migration
          </CUIButton>
        </div>
      </div>

      <HomepageSectionTrustedByAlt
        className='!my-24 bg-neutral-700/80 py-8'
        heading='Trusted by'
        customerStories={customerStories}
        numberOfRows={1}
      />

      <div className='container mx-auto my-16 max-w-7xl space-y-8 px-8 2xl:px-0'>
        <div className='mb-16 flex flex-col items-center gap-6 text-center'>
          <Image src={iconDevelopers} alt='Icon' width={72} height={72} />
          <SuiTitle type='h2'>Why developers choose ClickHouse</SuiTitle>
        </div>

        {/* Latency */}
        <CUICard className='!block space-y-8 p-8 md:space-y-10 md:p-10'>
          <Image src={iconGuage} alt='Icon' width={36} height={24} />
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <div className='grid grid-cols-1 gap-6 lg:max-w-2xl'>
              <SuiTitle type='h2'>BigQuery’s query latency</SuiTitle>
              <SuiText>
                Achieving sub-second query response times and supporting highly
                concurrent workloads can be painful in BigQuery, if not
                impossible.
              </SuiText>
              <SuiText>
                ClickHouse is purpose-built for real-time, large-volume, data
                analytics. It’s the fastest and most resource-efficient database
                for analytics and is designed to serve queries with high
                concurrency without enforcing limits on the number of parallel
                queries.
              </SuiText>
              <SuiText>
                Whether you’re aggregating large volumes of data in real-time,
                interactively slicing and dicing on the fly, or powering
                customer-facing dashboards, ClickHouse ensures blazing speed.
              </SuiText>
            </div>
            <Image
              src={chartLatency}
              alt='Latency when querying 1 billion rows'
              width={342}
              height={305}
              className='mx-auto flex-shrink flex-grow-0 lg:mx-0'
            />
          </div>
          <CUICard className='gap-6 !bg-[#323232] p-6 lg:flex-row lg:items-stretch lg:pr-10'>
            <div className='flex flex-col items-center gap-6 self-stretch sm:flex-row lg:max-w-3xl'>
              <Image
                src={iconQuote}
                alt='Quote'
                width={36}
                height={28}
                className='flex-shrink-0 flex-grow-0 self-start'
              />
              <div className='grid grid-cols-1 gap-6'>
                <SuiText>
                  We needed a solution that could scale, but also provide
                  end-user facing analytics capabilities with low latency and
                  high throughput.{' '}
                  <Link
                    href={`/blog/serving-real-time-analytics-across-marketplaces-at-adevinta?loc=${locTracking}`}
                    className='text-primary-300 hover:underline'>
                    Read blog
                  </Link>
                </SuiText>
              </div>
            </div>
            <Image
              src={logoAdevinta}
              alt='Adevinta logo'
              width={110}
              height={25}
              className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
            />
          </CUICard>
        </CUICard>

        {/* Costs */}
        <CUICard className='!block space-y-8 p-8 md:space-y-10 md:p-10'>
          <Image src={iconHandCoins} alt='Icon' width={38} height={30} />
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <div className='grid grid-cols-1 gap-6 lg:max-w-2xl'>
              <SuiTitle type='h2'>BigQuery’s high cost</SuiTitle>
              <SuiText>
                BigQuery’s pricing model can lead companies to artificially
                constrain usage or access to data, leading to lower ROI.
              </SuiText>
              <SuiText>
                ClickHouse is designed to manage huge volumes of data
                efficiently. Its efficient management of resources helps to
                maximize its cost-effectiveness. ClickHouse was designed from
                the ground up for best-in-class resource utilization.
              </SuiText>
              <SuiText>
                For example, Prefect reduced costs by 33%{' '}
                <Link
                  href={`/blog/prefect-event-driven-workflow-orchestration-powered-by-clickhouse?loc=${locTracking}`}
                  className='text-primary-300 hover:underline'>
                  moving from BigQuery to ClickHouse
                </Link>
                , and{' '}
                <Link
                  href={`/blog/juspay-analyzes-payment-transactions-in-real-time-with-clickhouse?loc=${locTracking}`}
                  className='text-primary-300 hover:underline'>
                  Juspay
                </Link>{' '}
                reduced its operating expenses by 10x after migrating its
                analytics workloads from BigQuery to ClickHouse.
              </SuiText>
            </div>
            <Image
              src={chartCosts}
              alt='Cost for querying 1 billion rows'
              width={336}
              height={273}
              className='mx-auto flex-shrink flex-grow-0 lg:mx-0'
            />
          </div>
          <CUICard className='gap-6 !bg-[#323232] p-6 lg:flex-row lg:pr-10'>
            <div className='flex flex-col items-center gap-6 self-stretch sm:flex-row lg:max-w-3xl'>
              <Image
                src={iconQuote}
                alt='Quote'
                width={36}
                height={28}
                className='flex-shrink-0 flex-grow-0 self-start'
              />
              <div className='grid grid-cols-1 gap-6'>
                <SuiText>
                  [BigQuery] discourages data usage. Instead of encouraging
                  analysts to query the database in any and all ways they can
                  imagine you’ll end up worrying about needing to limit them and
                  come up with processes for controlling the volume of data
                  being used.
                </SuiText>
                <SuiText>
                  We simply don’t want the hassle of trying to figure out in
                  advance of how many BigQuery slots to purchase - what a
                  headache!{' '}
                  <Link
                    href={`/blog/hifis-migration-from-bigquery-to-clickhouse?loc=${locTracking}`}
                    className='text-primary-300 hover:underline'>
                    Read blog
                  </Link>
                </SuiText>
              </div>
            </div>
            <Image
              src={logoBlock}
              alt='Block logo'
              width={61}
              height={86}
              className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
            />
          </CUICard>
        </CUICard>
      </div>

      {/* Roadmap */}
      <div className='my-16 bg-neutral-700 py-16'>
        <div className='section-container'>
          <div className='relative rounded border-t-4 border-primary-300 bg-neutral-750 p-8 text-center lg:p-10'>
            <SuiTitle type='h3' weight='bold' className='mb-4'>
              When not to migrate from BigQuery to ClickHouse Cloud{' '}
              <span className='text-primary-300'>yet</span>?
            </SuiTitle>
            <SuiText>
              If you need multi-statement transactions or extensive joins over
              highly normalized tables.
              <br />
              Both are on our{' '}
              <Link
                href='https://github.com/ClickHouse/ClickHouse/issues/74046'
                target='_blank'
                className='text-primary-300 hover:underline'>
                roadmap for 2025
              </Link>
              .
            </SuiText>
          </div>
        </div>
      </div>

      {/* Related content */}
      <div className='container mx-auto my-16 max-w-7xl px-8 2xl:px-0'>
        {comparison.Content.map((content, index) => {
          return (
            <div key={index} className='mx-auto mb-10 max-w-7xl'>
              <div className='mb-16 text-center'>
                <SuiTitle type='h2'>{content.SectionTitle}</SuiTitle>
                {content.Description && (
                  <div className='rich_content mt-4 text-center'>
                    <ReactMarkdown>{content.Description}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {combineRenderedContent(
                  content.customContent,
                  content.RelatedBlogs
                ).map((card, index) => {
                  return <div key={index}>{card}</div>
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 lg:mb-6'
          />
          <SuiTitle type='h2' className='mb-12 text-center lg:mb-16'>
            Contact us for help with your migration
          </SuiTitle>
          <div className='mx-auto max-w-lg'>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1237'}
                  clearbitTracking={true}
                  onLoad={(formObject) => {
                    setFormLoaded(true)

                    // Set field values
                    formObject.addHiddenFields({
                      miscBlankField17: 'organic',
                      loc__c: 'footer'
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

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

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
          </div>
        </div>
      </div>

      {/* More comparisons */}
      <MoreComparisons
        comparisons={[
          {
            name: 'PostgreSQL',
            link: `/comparison/postgresql?loc=${locTracking}`,
            logo: logoPostgress
          },
          {
            name: 'Redshift',
            link: `/comparison/redshift?loc=${locTracking}`,
            logo: logoRedshift
          },
          {
            name: 'Snowflake',
            link: `/comparison/snowflake?loc=${locTracking}`,
            logo: logoSnowflake
          }
        ]}
      />

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
              ClickHouse. Please leave your details below and we will reach out
              with availability shortly to learn about how we can assist you on
              this journey.
            </SuiText>
            <>
              {!modalFormSuccess && (
                <MarketoForm
                  formId={'1237'}
                  clearbitTracking={true}
                  onLoad={(formObject) => {
                    setModalFormLoaded(true)

                    // Set field values
                    formObject.addHiddenFields({
                      miscBlankField17: 'organic',
                      loc__c: 'modal'
                    })
                  }}
                  onSuccess={() => {
                    setModalFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      modalFormSuccessRef.current?.scrollIntoView()
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
                  <SuiTitle type='h3' className='text-center'>
                    Thank you for your submission!
                  </SuiTitle>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function CustomContentCard({
  href,
  category,
  title,
  footer,
  image
}: {
  href: LinkProps['href']
  category: string
  title: string
  footer: string
  image?: Omit<
    StrapiImageProps,
    'sizes' | 'alt' | 'className' | 'width' | 'height'
  >
}) {
  return (
    <Link
      href={href}
      target='_blank'
      className={
        'hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 hover:no-underline'
      }>
      <CUICard className='h-full'>
        <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
          {image && (
            <StrapiImageUrl
              {...image}
              sizes='medium'
              alt={image.alternativeText}
              className='w-full rounded-t-lg xl:h-52 xl:object-cover'
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
            <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
              {category}
            </div>
            <div className='cursor-pointer font-basier text-xl font-medium leading-tight text-neutral-100'>
              {title}
            </div>
          </div>
        </CUICard.Body>
        <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
          {footer}
        </CUICard.Footer>
      </CUICard>
    </Link>
  )
}

function combineRenderedContent(
  custom: RepeatableContent['customContent'],
  related: RepeatableContent['RelatedBlogs']
) {
  const customRendered = custom
    .filter((content) => !!content.href)
    .map((custom, index) => {
      return (
        <CustomContentCard
          key={index}
          href={`${custom.href}?loc=${locTracking}`}
          image={custom.Image}
          category={custom.Category}
          title={custom.Title}
          footer={custom.Footer}
        />
      )
    })

  const relatedRendered = related.flatMap((custom) => {
    return custom.blog_posts.map((blog) => {
      return <StrapiBlogPostCard key={blog.id} entry={blog} />
    })
  })

  return [...customRendered, ...relatedRendered]
}
