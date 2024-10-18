import { GetStaticProps } from 'next'
import FAQ from '../../components/jp/FAQ'
import GetStarted from '../../components/jp/GetStarted'
import HomepageHero from '../../components/jp/HomepageHero'
import HomepageSectionContentFeed from '../../components/jp/HomepageSectionContentFeed'
import HomepageSectionDeployAlt from '../../components/jp/HomepageSectionDeployAlt'
import HomepageSectionFast from '../../components/jp/HomepageSectionFast'
import HomepageSectionStackIntegration from '../../components/jp/HomepageSectionStackIntegration'
import HomepageSectionTrustedBy from '../../components/jp/HomepageSectionTrustedBy'
import HomepageSectionWhyClickhouse from '../../components/jp/HomepageSectionWhyClickhouse'
import HRSeparator from '../../components/HRSeparator'
import JoinCommunity from '../../components/jp/JoinCommunity'
import Layout from '../../components/jp/Layout'
import { findOne } from '../../lib/api/strapi'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { HomePageProps } from '../../types/homepage'

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
  galaxyOnPage('homePage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <HomepageHero />
      <HomepageSectionTrustedBy customerStories={customerStories} />
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
