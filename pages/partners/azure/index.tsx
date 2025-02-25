import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ClickHousePartnerLogo from '../../../components/ClickHousePartnerLogo'
import { CUIButton } from '../../../components/ClickUI'
import HomepageSectionTrustedByAlt from '../../../components/HomepageSectionTrustedByAlt'
import Layout from '../../../components/Layout'
import LinedIconCard from '../../../components/LinedIconCard'
import QuoteCard from '../../../components/QuoteCard'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps, HomepageCustomerStories } from '../../../types/homepage'
import logoNeon from '../../cloud/clickpipes/postgres-cdc-connector/assets/logo-neon.svg'
import logoSyntagePng from '../../cloud/clickpipes/postgres-cdc-connector/assets/logo-syntage.png'
import logoVueling from '../../cloud/clickpipes/postgres-cdc-connector/assets/logo-vueling.svg'
import azureLogo from './assets/azure-logo.svg'
import iconCode from './assets/icon-code.svg'

interface PageProps extends CommonProps {
  customerStories: HomepageCustomerStories
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

    const [commonProps, { customerStories }] = await Promise.all([
      commonPromise,
      homePromise
    ])

    return {
      props: {
        seo: {
          title: 'Azure | ClickHouse',
          path: '/partners/azure',
          description:
            'Transform your Data Analytics with the power of Azure + ClickHouse.'
        },
        customerStories,
        ...commonProps
      }
    }
  }

export default function Page({
  seo,
  headerData,
  footerData,
  customerStories
}: PageProps) {
  useGalaxyOnPage('azurePartnersPage')

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
            <CUIButton type='primary' size='lg' weight='semibold' href='#'>
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
        <div className='section-container'>
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
                  commitment towards the purchase of ClickHouse Cloud through
                  the Azure marketplace, leveraging existing budget and
                  simplifying procurement.
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
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/3'>
              <QuoteCard
                className='!bg-neutral-900'
                content={
                  "Our data platform handles massive volumes of real-time events, and ClickHouse has been instrumental in delivering lightning-fast analytics. With ClickHouse Cloud on Azure, we can deploy and scale effortlessly on Azure's reliable, secure, and scalable infrastructure."
                }
                logo={{
                  src: logoNeon,
                  width: 102 * 1.2,
                  height: 28 * 1.2,
                  alt: 'Neon'
                }}
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <QuoteCard
                className='!bg-neutral-900'
                content={
                  'With ClickHouse Cloud generally available on Microsoft Azure, enterprise and digital-native companies alike can take advantage of its breadth of use cases on one of the most open and flexible cloud platforms. Mutual customers and partners can now benefit from real-time analytics and business intelligence solutions to gain valuable insights from their data in new ways.'
                }
                logo={{
                  src: logoSyntagePng,
                  width: 321 / 2,
                  height: 79 / 2,
                  alt: 'Syntage'
                }}
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <QuoteCard
                className='!bg-neutral-900'
                content={
                  'ClickHouse Cloud on Microsoft Azure supports us in conducting advanced analysis on large volumes of data from various renewable energy sources. By generating actionable insights, creating detailed reports, and developing custom dashboards, we empower our customers to achieve better performance and scale their operations effectively. We have been pleasantly surprised by the remarkable speed and flexibility of ClickHouse, and their team has provided us with exceptional dedicated support.'
                }
                logo={{
                  src: logoVueling,
                  width: 140,
                  height: 44,
                  alt: 'Vueling'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='py-16 lg:py-20 bg-white/5'>
        <div className='section-container'>
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
        <div className='mt-16 -mb-10'>
          <HomepageSectionTrustedByAlt
            heading='Trusted by'
            customerStories={customerStories}
          />
        </div>
      </div>

      {/* Get started */}
      <div className='section-container my-20 lg:my-28 md:px-8 2xl:px-0'>
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
    </Layout>
  )
}
