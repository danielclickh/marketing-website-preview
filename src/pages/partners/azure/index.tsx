import BlogPost from '@/components/BlogPostList/BlogPost'
import ClickHousePartnerLogo from '@/components/ClickHousePartnerLogo'
import { CUIButton, CUILink } from '@/components/ClickUI'
import styles from '@/components/FAQ/styles.module.scss'
import { replaceCustomerLogo } from '@/components/HomepageSectionTrustedByAlt'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { StrapiImage } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { BlogApiResponse } from '@/types/blogs'
import { CommonProps, HomepageCustomerStories } from '@/types/homepage'
import { Disclosure, Transition } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { fetchBlogs } from '../../api/blog'
import azureLogo from './assets/azure-logo.svg'
import iconCode from './assets/icon-code.svg'
import logoAstronomer from './assets/logo-astronomer.svg'
import logoBaxenergy from './assets/logo-baxenergy.svg'
import logoMicrosoft from './assets/logo-microsoft.svg'

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

  const customerLogos = structuredClone(customerStories.logos).map(
    replaceCustomerLogo
  )

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
            <span className='text-xs inline-block rounded-full px-3 py-1 bg-primary-700 border border-primary-500 text-primary-300'>
              Partners
            </span>
          </p>
          <h1 className='text-[1.75rem] lg:text-[3.5rem] leading-[1.3] font-bold mb-6 max-w-5xl mx-auto'>
            Transform your Data Analytics with the power of Azure + ClickHouse.
          </h1>
          <p className='lg:text-xl font-medium mb-12 max-w-3xl mx-auto'>
            Supercharge your data with ClickHouse on Azure, combining seamless
            scalability with blazing-fast analytics.
          </p>
          <div className='flex flex-wrap gap-4 sm:gap-8 md:flex-nowrap md:gap-6 justify-center'>
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
      <div className='py-16 lg:py-20 bg-white/5'>
        <div className='section-container px-6'>
          {/* Intro */}
          <div className='mb-10 lg:mb-16 space-y-6 text-center'>
            <Image
              src={iconCode}
              alt='Icon'
              width={72}
              height={72}
              className='inline-block'
            />
            <h2 className='text-[1.75rem] lg:text-4xl leading-[1.3] font-semibold'>
              Why Choose Azure + ClickHouse?
            </h2>
            <p className='text-white/70 max-w-xl mx-auto'>
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
          <p className='text-center font-medium mt-10 lg:mt-16'>
            Get started in a few minutes with a{' '}
            <Link
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=azurePartnersPageWhy'
              onClick={useGalaxyOnClick('azurePartnersPage.why.freeCloudTrial')}
              className='text-primary-300 hover:underline whitespace-nowrap'>
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
            className='mb-10 lg:mb-16 text-center !text-primary-900'>
            What our customers are saying
          </SuiTitle>
          <div className='overflow-x-auto hide-scrollbar -mx-4 sm:-mx-8 lg:mx-0 px-6 sm:px-8 lg:px-0 lg:overflow-x-visible'>
            <div className='-mx-2 lg:-mx-4 flex flex-row lg:flex-wrap lg:justify-center'>
              <div className='p-2 lg:p-4 lg:w-1/3 min-w-64 w-[90vw] max-w-md lg:max-w-none lg:min-w-none flex-shrink-0 flex-grow-0 lg:flex-1'>
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
              <div className='p-2 lg:p-4 lg:w-1/3 min-w-64 w-[90vw] max-w-md lg:max-w-none lg:min-w-none flex-shrink-0 flex-grow-0 lg:flex-1'>
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
              <div className='p-2 lg:p-4 lg:w-1/3 min-w-64 w-[90vw] max-w-md lg:max-w-none lg:min-w-none flex-shrink-0 flex-grow-0 lg:flex-1'>
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
      <div className='py-16 lg:py-20 bg-white/5'>
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
            className='mb-8 text-primary-300 text-center uppercase tracking-[0.0875rem]'>
            Trusted by
          </SuiText>
          <div className='mask-logos-carousel opacity-90 grayscale invert'>
            <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
              <div className='flex items-center whitespace-nowrap animate-marqueeLeft5'>
                {customerLogos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='flex-shrink-0 flex-grow-0 w-max px-6'>
                      <StrapiImage {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
              <div className='flex items-center whitespace-nowrap animate-marqueeLeft5'>
                {customerLogos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='flex-shrink-0 flex-grow-0 w-max px-6'>
                      <StrapiImage {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className='my-20 lg:my-24 section-container'>
        <div className='text-center space-y-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='72'
            height='73'
            fill='none'
            viewBox='0 0 72 73'
            className='inline-block mb-6'>
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
          <h2 className='text-[1.75rem] lg:text-4xl leading-[1.3] font-semibold'>
            Seamless Azure marketplace Integration
          </h2>
          <p className='text-white/70 max-w-xl mx-auto'>
            ClickHouse is fully integrated into the Azure Marketplace, enabling
            you to:
          </p>
        </div>
        <div className='max-w-3xl mx-auto bg-neutral-700/50 border border-neutral-700 divide-y divide-neutral-700 md:divide-y-0 shadow-sm md:shadow-none md:border-none md:space-y-4 md:py-6 md:px-8 rounded mt-10'>
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
        <div className='flex justify-center mt-10'>
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
            <ExternalLinkIcon className='h-4 w-4 ml-3 inline-block' />
          </CUIButton>
        </div>
      </div>

      {/* Form */}
      <div className='my-20 lg:my-24'>
        <div className='section-container px-6 bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='text-[1.75rem] text-center lg:text-4xl leading-[1.3] font-semibold mb-10 lg:mb-16'>
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
                    formSuccessRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    })
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
      <div className='section-container px-6 my-20 lg:my-28 md:px-8 2xl:px-0'>
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
        <div className='pb-10 text-center'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6 lg:text-left'>
              FAQ: Azure + ClickHouse
            </SuiTitle>
            <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
              Discover everything you need to know about using ClickHouse on
              Azure. From deployment options and integration with Azure tools to
              performance, pricing, and support, this FAQ section answers your
              most pressing questions and helps you get started with confidence.
            </div>
            <CUILink
              href='/support/program/'
              target='_self'
              className='mt-6 flex items-center justify-center gap-4 text-primary lg:justify-start'
              onClick={useGalaxyOnClick(
                'azurePartnersPage.faqSection.askAnythingSelect'
              )}>
              <span>Ask us anything</span>{' '}
              <ExternalLinkIcon className='h-4 w-4' />
            </CUILink>
          </div>
        </div>
        <div className={`${styles.accordionContainer} !gap-3 lg:!gap-6`}>
          <FaqItem title='What are the options to purchase ClickHouse on Azure?'>
            <p>
              You can sign up for ClickHouse Cloud directly, or you can sign up
              through the{' '}
              <Link
                href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=overview'
                target='_blank'
                className='text-primary-300 hover:underline'>
                Azure Marketplace
              </Link>
              . Through the Marketplace, you’ll have unified billing along with
              all your other Azure resources - your ClickHouse Cloud
              organization and its resources are bound to your Azure
              subscription. Our integration with the Azure Marketplace allows
              you to either pay for your Azure consumption on a PAYG
              (pay-as-you-go) basis, or sign a committed contract over a
              specified period. If your organization has a pre-committed spend
              agreement with Azure, you may be able to apply some of that
              committed spend towards ClickHouse Cloud consumption on Azure.
            </p>
          </FaqItem>
          <FaqItem title='What are the pricing options for ClickHouse on Azure?'>
            <p>
              Review our Azure pricing and estimate costs using our calculator{' '}
              <Link
                href='/pricing?provider=azure'
                className='text-primary-300 hover:underline'>
                here
              </Link>
              .
            </p>
          </FaqItem>

          <FaqItem title='Which Azure regions are supported?'>
            <p>
              All supported Azure regions can be found{' '}
              <Link
                href='https://clickhouse.com/docs/cloud/reference/supported-regions#azure-regions'
                className='text-primary-300 hover:underline'>
                here
              </Link>
              .
            </p>
          </FaqItem>

          <FaqItem title='How does the performance of ClickHouse on Azure compare to other CSPs ClickHouse supports?'>
            <p>
              Our Azure offering is on par with ClickHouse on AWS and GCP in
              terms of performance. On a hot run we found Azure is faster
              compared to GCP and AWS. On a cold run, Azure is faster than GCP
              and slower than AWS. The public ClickBench performance results can
              be found here{' '}
              <Link
                href='https://benchmark.clickhouse.com/'
                className='text-primary-300 hover:underline'>
                https://benchmark.clickhouse.com/
              </Link>
              .
            </p>
          </FaqItem>

          <FaqItem
            title='What types of security and compliance services does ClickHouse offer on Azure?
'>
            <p>
              ClickHouse offers a 2024 SOC 2 Type II report and updated ISO
              27001 certificate for its Azure services. HIPAA compliance is
              currently only available on AWS and GCP for the Enterprise tier
              but is on the roadmap for Azure.
            </p>
          </FaqItem>

          <FaqItem title='What terms are supported for Azure Private offers?'>
            <p>
              Azure private offers can only be set up with 1 month and 1, 2, and
              3 year terms.
            </p>
          </FaqItem>

          <FaqItem title='What is the Microsoft Azure Consumption Commitment (MACC) program and is ClickHouse eligible?'>
            <p>
              Yes ClickHouse Cloud is eligible for the MACC program. This
              program allows ClickHouse Cloud customers to leverage their
              existing Microsoft Azure commit towards their usage of ClickHouse
              Cloud. Only a select set of services and solutions on the Azure
              marketplace qualify for this benefit, and our eligibility into the
              MACC program strongly validates the value ClickHouse Cloud brings
              to Azure customers. Learn more about ClickHouse and the MACC
              program{' '}
              <Link
                href='/blog/clickhouse-cloud-microsoft-azure-consumption-commitment-eligble'
                className='text-primary-300 hover:underline'>
                here
              </Link>
              .
            </p>
          </FaqItem>

          <FaqItem title='What integrations does ClickHouse Cloud offer with Azure?'>
            <p>
              ClickHouse Cloud integrates seamlessly into the Azure ecosystem.
              Customers can directly query data in Azure Blob Storage using the
              azureBlobStorage table function, or ingest data into ClickHouse
              Cloud via ClickPipes using a supported source such as Azure Events
              Hubs. We also recently launched a connector for Microsoft Power BI
              which enables Azure customers to build visualizations and
              business-level dashboards on top of data stored in ClickHouse.
            </p>
          </FaqItem>
        </div>
      </div>

      <HRSeparator className='!max-w-none' />

      {/* Latest blogs */}
      <div className='section-container my-20'>
        <div className='flex justify-between mb-8'>
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
      <div className='flex-shrink-0 flex-grow-0 hidden md:block'>
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
      <div className='flex-1 flex flex-col md:flex-row md:gap-2'>
        <strong>
          {title}
          <span className='hidden md:inline'>:</span>
        </strong>
        <span className='text-xs md:text-base'>{description}</span>
      </div>
    </div>
  )
}

function FaqItem({
  title,
  content,
  children
}: {
  title: string
  content?: string
  children?: React.ReactNode
}) {
  return (
    <Disclosure as='div' className={styles.accordion}>
      {({ open }) => (
        <>
          <div>
            <Disclosure.Button className='relative z-10 grid w-full grid-cols-[1fr_1rem] items-center justify-between gap-x-6 rounded-lg p-4 pl-20 pr-6 text-left font-medium text-neutral-200 hover:text-neutral-0 focus:outline-none'>
              <span className='text-md'>{title}</span>
              <span className={styles.plusMinus} data-active={open} />
            </Disclosure.Button>
          </div>
          <Transition
            show={open}
            className='h-full'
            enter='transition-[max-height] duration-300 ease-in-out'
            enterFrom='max-h-0 opacity-0'
            enterTo='max-h-fit opacity-100'
            leave='transition-[max-height] duration-300 ease-in-out'
            leaveFrom='max-h-fit opacity-100'
            leaveTo='max-h-0 opacity-0'>
            <Disclosure.Panel
              className={`home-faqs pb-4 pl-20 pr-4 text-sm text-neutral-200 transition-opacity duration-100 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}>
              {content && <Markdown>{content}</Markdown>}
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
