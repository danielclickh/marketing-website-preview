import { fetchBlogs } from '../../api/blog'
import azureLogo from './assets/azure-logo.svg'
import iconCode from './assets/icon-code.svg'
import logoAstronomer from './assets/logo-astronomer.svg'
import logoBaxenergy from './assets/logo-baxenergy.svg'
import logoMicrosoft from './assets/logo-microsoft.svg'
import Accordion from '@/components-cleaned/Accordion'
import BlogPost from '@/components/BlogPostList/BlogPost'
import ClickHousePartnerLogo from '@/components/ClickHousePartnerLogo'
import { CUIButton, CUILink } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { BlogApiResponse } from '@/types/blogs'
import { CommonProps, HomepageCustomerStories } from '@/types/homepage'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

interface PageProps extends CommonProps {
  customerStories: HomepageCustomerStories
  blogs: BlogApiResponse['data']['blogs']
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonPromise = getCommonProps()
    const homePromise = findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    const blogPromise = fetchBlogs({ category: 'product', search: 'azure' })

    const [
      commonProps,
      { customerStories },
      {
        data: { blogs }
      }
    ] = await Promise.all([commonPromise, homePromise, blogPromise])

    return {
      props: {
        seo: {
          title: 'Azure | ClickHouse',
          path: '/partners/azure',
          description:
            'Transform your Data Analytics with the power of Azure + ClickHouse.'
        },
        customerStories,
        blogs,
        ...commonProps
      }
    }
  }

export default function Page({
  seo,
  headerData,
  footerData,
  customerStories,
  blogs
}: PageProps) {
  useGalaxyOnPage('azurePartnersPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  const customerLogos = customerStories.logos

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='section-container my-20 lg:my-24'>
        <div className='text-center'>
          <ClickHousePartnerLogo
            logo={azureLogo}
            partnerName='Azure'
            className='mb-12'
          />
          <p className='mb-4'>
            <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-3 py-1 text-xs text-primary-300'>
              Partners
            </span>
          </p>
          <h1 className='mx-auto mb-6 max-w-5xl text-[1.75rem] font-bold leading-[1.3] lg:text-[3.5rem]'>
            Transform your Data Analytics with the power of Azure + ClickHouse.
          </h1>
          <p className='mx-auto mb-12 max-w-3xl font-medium lg:text-xl'>
            Supercharge your data with ClickHouse on Azure, combining seamless
            scalability with blazing-fast analytics.
          </p>
          <div className='flex flex-wrap justify-center gap-4 sm:gap-8 md:flex-nowrap md:gap-6'>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=overview'
              target='_blank'
              onClick={useGalaxyOnClick(
                'azurePartnersPage.hero.goToAzureMarketPlace'
              )}>
              Go to Azure Marketplace
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=azurePartnersPagHero'
              onClick={useGalaxyOnClick(
                'azurePartnersPage.hero.tryClickHouseOnAzure'
              )}>
              Try ClickHouse on Azure
            </CUIButton>
          </div>
        </div>
      </div>

      {/* Why? */}
      <div className='bg-white/5 py-16 lg:py-20'>
        <div className='section-container px-6'>
          {/* Intro */}
          <div className='mb-10 space-y-6 text-center lg:mb-16'>
            <Image
              src={iconCode}
              alt='Icon'
              width={72}
              height={72}
              className='inline-block'
            />
            <h2 className='text-[1.75rem] font-semibold leading-[1.3] lg:text-4xl'>
              Why Choose Azure + ClickHouse?
            </h2>
            <p className='mx-auto max-w-xl text-white/70'>
              ClickHouse is the fastest and most resource efficient real-time
              data warehouse and open-source database.
            </p>
          </div>

          {/* Columns */}
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='cloud-tick'>
                <h3 className='text-3xl font-semibold'>
                  Cost effective performance at scale
                </h3>
                <p className='text-balance text-white/70'>
                  Experience sub-second query performance on terabytes of data
                  with ClickHouse’s columnar database architecture with the
                  scale and cost efficiency of Azure’s global infrastructure.
                </p>
              </LinedIconCard>
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='guage'>
                <h3 className='text-3xl font-semibold'>
                  ClickHouse Cloud is Azure MACC Eligible
                </h3>
                <p className='text-balance text-white/70'>
                  Apply your Microsoft Azure Consumption Commitment (MACC)
                  towards the purchase of ClickHouse Cloud, leveraging existing
                  budget and simplifying procurement.
                </p>
              </LinedIconCard>
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='maximize'>
                <h3 className='text-3xl font-semibold'>
                  Secure cloud scale analytics
                </h3>
                <p className='text-balance text-white/70'>
                  Leverage the best in class Azure security features and
                  controls such as Azure Private Link to enforce advanced
                  protection in ClickHouse.
                </p>
              </LinedIconCard>
            </div>
          </div>

          {/* Footnote */}
          <p className='mt-10 text-center font-medium lg:mt-16'>
            Get started in a few minutes with a{' '}
            <Link
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=azurePartnersPageWhy'
              onClick={useGalaxyOnClick('azurePartnersPage.why.freeCloudTrial')}
              className='whitespace-nowrap text-primary-300 hover:underline'>
              free cloud trial -&gt;
            </Link>
          </p>
        </div>
      </div>

      {/* Quotes */}
      <div className='relative z-10 bg-primary-300 py-16 lg:py-20'>
        <div className='section-container'>
          <SuiTitle
            type='h2'
            className='mb-10 text-center !text-primary-900 lg:mb-16'>
            What our customers are saying
          </SuiTitle>
          <div className='hide-scrollbar -mx-4 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-x-visible lg:px-0'>
            <div className='-mx-2 flex flex-row lg:-mx-4 lg:flex-wrap lg:justify-center'>
              <div className='lg:min-w-none w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
                <QuoteCard
                  className='!bg-neutral-900'
                  content={
                    "Our data platform handles massive volumes of real-time events, and ClickHouse has been instrumental in delivering lightning-fast analytics. With ClickHouse Cloud on Azure, we can deploy and scale effortlessly on Azure's reliable, secure, and scalable infrastructure."
                  }
                  logo={{
                    src: logoAstronomer,
                    width: 200,
                    height: 22,
                    alt: 'Astronomer'
                  }}
                />
              </div>
              <div className='lg:min-w-none w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
                <QuoteCard
                  className='!bg-neutral-900'
                  content={
                    'With ClickHouse Cloud generally available on Microsoft Azure, enterprise and digital-native companies alike can take advantage of its breadth of use cases on one of the most open and flexible cloud platforms. Mutual customers and partners can now benefit from real-time analytics and business intelligence solutions to gain valuable insights from their data in new ways.'
                  }
                  logo={{
                    src: logoMicrosoft,
                    width: 200,
                    height: 53,
                    alt: 'Microsoft'
                  }}
                />
              </div>
              <div className='lg:min-w-none w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
                <QuoteCard
                  className='!bg-neutral-900'
                  content={
                    'ClickHouse Cloud on Microsoft Azure supports us in conducting advanced analysis on large volumes of data from various renewable energy sources. By generating actionable insights, creating detailed reports, and developing custom dashboards, we empower our customers to achieve better performance and scale their operations effectively. We have been pleasantly surprised by the remarkable speed and flexibility of ClickHouse, and their team has provided us with exceptional dedicated support.'
                  }
                  logo={{
                    src: logoBaxenergy,
                    width: 174,
                    height: 41,
                    alt: 'Baxenergy'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-white/5 py-16 lg:py-20'>
        <div className='section-container px-6'>
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='book'>
                <h3 className='text-3xl font-semibold'>
                  Real-time <br />
                  insights
                </h3>
                <p className='text-balance text-white/70'>
                  Analyze data in real-time to make faster business decisions.
                </p>
              </LinedIconCard>
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='list-search'>
                <h3 className='text-3xl font-semibold'>
                  Elastic compute <br />
                  and storage
                </h3>
                <p className='text-balance text-white/70'>
                  Optimize performance with Azure’s scalability and ClickHouse’s
                  distributed design.
                </p>
              </LinedIconCard>
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard icon='file-py'>
                <h3 className='text-3xl font-semibold'>
                  Seamless <br />
                  integration
                </h3>
                <p className='text-balance text-white/70'>
                  Easily connect to Azure Event Hub, AzureDB for PG / MySQL,
                  Power BI, and more
                </p>
              </LinedIconCard>
            </div>
          </div>
        </div>
        <div className='mt-10 lg:mt-16'>
          {/* Trusted by */}
          <SuiText
            weight='bold'
            size='sm'
            className='mb-8 text-center uppercase tracking-[0.0875rem] text-primary-300'>
            Trusted by
          </SuiText>
          <div className='mask-logos-carousel opacity-90 grayscale invert'>
            <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerLogos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerLogos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className='section-container my-20 lg:my-24'>
        <div className='space-y-4 text-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='72'
            height='73'
            fill='none'
            viewBox='0 0 72 73'
            className='mb-6 inline-block'>
            <rect
              width='70'
              height='70'
              x='1'
              y='1.35'
              stroke='#FF7575'
              strokeWidth='2'
              rx='16'
            />
            <path
              fill='#FF7575'
              d='M37 19.61a16.73 16.73 0 1 0 0 33.47 16.73 16.73 0 0 0 0-33.47Zm5.98 21.33a7.53 7.53 0 0 0 0-9.19l5.13-5.12a14.73 14.73 0 0 1 0 19.43l-5.13-5.12Zm-11.56-4.6a5.58 5.58 0 1 1 11.16 0 5.58 5.58 0 0 1-11.16 0Zm15.3-11.1-5.13 5.12a7.53 7.53 0 0 0-9.18 0l-5.13-5.12a14.73 14.73 0 0 1 19.44 0Zm-20.83 1.39 5.13 5.12a7.53 7.53 0 0 0 0 9.19l-5.13 5.12a14.73 14.73 0 0 1 0-19.43Zm1.4 20.82 5.12-5.12a7.53 7.53 0 0 0 9.18 0l5.13 5.12a14.73 14.73 0 0 1-19.43 0Z'
            />
          </svg>
          <h2 className='text-[1.75rem] font-semibold leading-[1.3] lg:text-4xl'>
            Seamless Azure marketplace Integration
          </h2>
          <p className='mx-auto max-w-xl text-white/70'>
            ClickHouse is fully integrated into the Azure Marketplace, enabling
            you to:
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-3xl divide-y divide-neutral-700 rounded border border-neutral-700 bg-neutral-700/50 shadow-sm md:space-y-4 md:divide-y-0 md:border-none md:px-8 md:py-6 md:shadow-none'>
          <TickItem
            title='Effortless Deployment'
            description='Set up ClickHouse on Azure in just one click.'
            className='p-3 md:p-0'
          />
          <TickItem
            title='Customizable Pricing'
            description='Select deployment options that fit your needs.'
            className='p-3 md:p-0'
          />
          <TickItem
            title='Dedicated Support'
            description='Get expert assistance from ClickHouse and Azure teams.'
            className='p-3 md:p-0'
          />
        </div>
        <div className='mt-10 flex justify-center'>
          <CUIButton
            type='secondary'
            size='lg'
            weight='semibold'
            href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=overview'
            target='_blank'
            onClick={useGalaxyOnClick(
              'azurePartnersPage.checklist.goToAzureMarketPlace'
            )}>
            Go to Azure Marketplace
            <ExternalLinkIcon className='ml-3 inline-block h-4 w-4' />
          </CUIButton>
        </div>
      </div>

      {/* Form */}
      <div className='my-20 lg:my-24'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center px-6'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='mb-10 text-center text-[1.75rem] font-semibold leading-[1.3] lg:mb-16 lg:text-4xl'>
            Contact us for help with your migration
          </h2>
          <div className='mx-auto max-w-lg'>
            {!formSuccess && (
              <MarketoForm
                formId={'1124'}
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
            )}

            {!formLoaded && <div className='text-center'>Loading form...</div>}

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
          </div>
        </div>
      </div>

      {/* Get started */}
      <div className='section-container my-20 px-6 md:px-8 lg:my-28 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Get started with ClickHouse Cloud and Azure
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            30 day free trial and $300 in credits to spend at your own pace.
          </SuiText>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto mt-8'
            target='_blank'
            href='https://console.clickhouse.cloud/signUp?loc=azurePartnersPageFooterCta'
            onClick={useGalaxyOnClick(
              'azurePartnersPage.footerCta.tryClickHouseOnAzure'
            )}>
            Try ClickHouse on Azure
          </CUIButton>
        </div>
      </div>

      {/* FAQs */}
      <div className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'>
        <div className='pb-10 text-center lg:text-left'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6'>
              FAQ: Azure + ClickHouse
            </SuiTitle>
            <div className='mx-auto max-w-md text-neutral-200'>
              Discover everything you need to know about using ClickHouse on
              Azure. From deployment options and integration with Azure tools to
              performance, pricing, and support, this FAQ section answers your
              most pressing questions and helps you get started with confidence.
            </div>
            <Link
              href='/support/program/'
              target='_self'
              className='mt-6 inline-flex items-center gap-4 text-primary-300 hover:underline'
              onClick={useGalaxyOnClick(
                'azurePartnersPage.faqSection.askAnythingSelect'
              )}>
              <span>Ask us anything</span>{' '}
              <ExternalLinkIcon className='h-4 w-4' />
            </Link>
          </div>
        </div>
        <Accordion
          className='mx-auto w-full max-w-2xl lg:mr-0'
          items={[
            {
              handle: 'What are the options to purchase ClickHouse on Azure?',
              content: (
                <p>
                  You can sign up for ClickHouse Cloud directly, or you can sign
                  up through the{' '}
                  <Link
                    href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=overview'
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    Azure Marketplace
                  </Link>
                  . Through the Marketplace, you’ll have unified billing along
                  with all your other Azure resources - your ClickHouse Cloud
                  organization and its resources are bound to your Azure
                  subscription. Our integration with the Azure Marketplace
                  allows you to either pay for your Azure consumption on a PAYG
                  (pay-as-you-go) basis, or sign a committed contract over a
                  specified period. If your organization has a pre-committed
                  spend agreement with Azure, you may be able to apply some of
                  that committed spend towards ClickHouse Cloud consumption on
                  Azure.
                </p>
              )
            },
            {
              handle: 'What are the pricing options for ClickHouse on Azure?',
              content: (
                <p>
                  Review our Azure pricing and estimate costs using our
                  calculator{' '}
                  <Link
                    href='/pricing?provider=azure'
                    className='text-primary-300 hover:underline'>
                    here
                  </Link>
                  .
                </p>
              )
            },
            {
              handle: 'Which Azure regions are supported?',
              content: (
                <p>
                  All supported Azure regions can be found{' '}
                  <Link
                    href='https://clickhouse.com/docs/cloud/reference/supported-regions#azure-regions'
                    className='text-primary-300 hover:underline'>
                    here
                  </Link>
                  .
                </p>
              )
            },
            {
              handle:
                'How does the performance of ClickHouse on Azure compare to other CSPs ClickHouse supports?',
              content: (
                <p>
                  Our Azure offering is on par with ClickHouse on AWS and GCP in
                  terms of performance. On a hot run we found Azure is faster
                  compared to GCP and AWS. On a cold run, Azure is faster than
                  GCP and slower than AWS. The public ClickBench performance
                  results can be found here{' '}
                  <Link
                    href='https://benchmark.clickhouse.com/'
                    className='text-primary-300 hover:underline'>
                    https://benchmark.clickhouse.com/
                  </Link>
                  .
                </p>
              )
            },
            {
              handle:
                'What types of security and compliance services does ClickHouse offer on Azure?',
              content: (
                <p>
                  ClickHouse offers a 2024 SOC 2 Type II report and updated ISO
                  27001 certificate for its Azure services. HIPAA compliance is
                  currently only available on AWS and GCP for the Enterprise
                  tier but is on the roadmap for Azure.
                </p>
              )
            },
            {
              handle: 'What terms are supported for Azure Private offers?',
              content: (
                <p>
                  Azure private offers can only be set up with 1 month and 1, 2,
                  and 3 year terms.
                </p>
              )
            },
            {
              handle:
                'What is the Microsoft Azure Consumption Commitment (MACC) program and is ClickHouse eligible?',
              content: (
                <p>
                  Yes ClickHouse Cloud is eligible for the MACC program. This
                  program allows ClickHouse Cloud customers to leverage their
                  existing Microsoft Azure commit towards their usage of
                  ClickHouse Cloud. Only a select set of services and solutions
                  on the Azure marketplace qualify for this benefit, and our
                  eligibility into the MACC program strongly validates the value
                  ClickHouse Cloud brings to Azure customers. Learn more about
                  ClickHouse and the MACC program{' '}
                  <Link
                    href='/blog/clickhouse-cloud-microsoft-azure-consumption-commitment-eligble'
                    className='text-primary-300 hover:underline'>
                    here
                  </Link>
                  .
                </p>
              )
            },
            {
              handle:
                'What integrations does ClickHouse Cloud offer with Azure?',
              content: (
                <p>
                  ClickHouse Cloud integrates seamlessly into the Azure
                  ecosystem. Customers can directly query data in Azure Blob
                  Storage using the azureBlobStorage table function, or ingest
                  data into ClickHouse Cloud via ClickPipes using a supported
                  source such as Azure Events Hubs. We also recently launched a
                  connector for Microsoft Power BI which enables Azure customers
                  to build visualizations and business-level dashboards on top
                  of data stored in ClickHouse.
                </p>
              )
            }
          ]}
        />
      </div>

      <HRSeparator className='!max-w-none' />

      {/* Latest blogs */}
      <div className='section-container my-20'>
        <div className='mb-8 flex justify-between'>
          <SuiTitle
            type='h2'
            className='!text-3xl text-neutral-100'
            weight='semibold'>
            Latest news
          </SuiTitle>

          <CUIButton
            type='secondary'
            href='/blog?category=product&search=azure'
            weight='semibold'>
            View all posts
          </CUIButton>
        </div>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {blogs.slice(0, 3).map((blog) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

function TickItem({
  title,
  description,
  className = ''
}: {
  title: string
  description: string
  className?: React.HTMLProps<HTMLDivElement>['className']
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='hidden flex-shrink-0 flex-grow-0 md:block'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex flex-1 flex-col md:flex-row md:gap-2'>
        <strong>
          {title}
          <span className='hidden md:inline'>:</span>
        </strong>
        <span className='text-xs md:text-base'>{description}</span>
      </div>
    </div>
  )
}
