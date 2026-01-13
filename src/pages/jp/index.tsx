import HRSeparator from '@/components/HRSeparator'
import FAQ from '@/components/jp/FAQ'
import GetStarted from '@/components/jp/GetStarted'
import HomepageHero from '@/components/jp/HomepageHero'
import HomepageSectionContentFeed from '@/components/jp/HomepageSectionContentFeed'
import HomepageSectionDeployAlt from '@/components/jp/HomepageSectionDeployAlt'
import HomepageSectionFast from '@/components/jp/HomepageSectionFast'
import HomepageSectionStackIntegration from '@/components/jp/HomepageSectionStackIntegration'
import HomepageSectionTrustedBy from '@/components/jp/HomepageSectionTrustedBy'
import HomepageSectionWhyClickhouse from '@/components/jp/HomepageSectionWhyClickhouse'
import JoinCommunity from '@/components/jp/JoinCommunity'
import Layout from '@/components/jp/Layout'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { HomePageProps } from '@/types/homepage'
import { GetStaticProps } from 'next'

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
    data.seo.locale = 'ja_JP'
    data.seo.path = ''
    data.seo.title = '高速オープンソース OLAP DBMS - ClickHouse'
    data.seo.languages = ['en', 'ja']
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
  headerData,
  customerStories,
  platforms
}: HomePageProps) {
  useGalaxyOnPage('homePage')

  return (
    <Layout seo={seo} headerData={headerData}>
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
