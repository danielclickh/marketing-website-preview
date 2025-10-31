import UseCasesCards from '@/components-cleaned/UseCasesCards'
import FAQ from '@/components/FAQ'
import GetStarted from '@/components/GetStarted'
import HRSeparator from '@/components/HRSeparator'
import HomepageHeroAlt from '@/components/HomepageHeroAlt'
import HomepageSectionContentFeed from '@/components/HomepageSectionContentFeed'
import HomepageSectionDeployAlt from '@/components/HomepageSectionDeployAlt'
import HomepageSectionFast from '@/components/HomepageSectionFast'
import HomepageSectionStackIntegration from '@/components/HomepageSectionStackIntegration'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import HomepageSectionWhyClickhouse from '@/components/HomepageSectionWhyClickhouse'
import JoinCommunity from '@/components/JoinCommunity'
import Layout from '@/components/Layout'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateHomepageSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { HomepageCustomerStoryLogo, HomePageProps } from '@/types/homepage'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)

    // Remove unwanted svg data from being serialized
    data.customerStories.logos = data.customerStories.logos.map(
      (story: HomepageCustomerStoryLogo) => {
        if (story.darkLogoPng && story.darkLogoPng?.svgText) {
          delete story.darkLogoPng.svgText
        }

        if (story.lightLogoPng && story.lightLogoPng?.svgText) {
          delete story.lightLogoPng.svgText
        }

        return story
      }
    )

    data.seo.path = ''
    data.seo.schema = generateHomepageSchema()
    data.seo.languages = ['en', 'ja']
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function HomePage({
  seo,
  footerData,
  headerData,
  customerStories,
  platforms
}: HomePageProps) {
  useGalaxyOnPage('homePage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <HomepageHeroAlt />
      <HomepageSectionTrustedByAlt customerStories={customerStories} />
      <section className='section-container my-16 lg:my-28'>
        <UseCasesCards />
      </section>
      <HomepageSectionContentFeed />
      <HomepageSectionWhyClickhouse />
      <HomepageSectionStackIntegration />
      <HomepageSectionFast />
      <HomepageSectionDeployAlt />
      <JoinCommunity github={headerData.github} />
      <HRSeparator className='my-24' />
      <FAQ />
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
