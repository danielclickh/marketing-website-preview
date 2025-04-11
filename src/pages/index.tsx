import { GetStaticProps } from 'next'
import FAQ from '@/components/FAQ'
import GetStarted from '@/components/GetStarted'
import HomepageHeroAlt from '@/components/HomepageHeroAlt'
import HomepageSectionContentFeed from '@/components/HomepageSectionContentFeed'
import HomepageSectionDeployAlt from '@/components/HomepageSectionDeployAlt'
import HomepageSectionFast from '@/components/HomepageSectionFast'
import HomepageSectionStackIntegration from '@/components/HomepageSectionStackIntegration'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import HomepageSectionWhyClickhouse from '@/components/HomepageSectionWhyClickhouse'
import HRSeparator from '@/components/HRSeparator'
import JoinCommunity from '@/components/JoinCommunity'
import Layout from '@/components/Layout'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { HomePageProps } from '@/types/homepage'

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
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
    data.seo.path = ''
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function HomePage({
  hero,
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
      <HRSeparator />
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
