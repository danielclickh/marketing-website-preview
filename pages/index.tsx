import { GetStaticProps } from 'next'
import DevelopersSection from '../components/DevelopersSection'
import FAQ from '../components/FAQ'
import GetStarted from '../components/GetStarted'
import HomepageHeroLogosVideos from '../components/HomepageHeroLogosVideos'
import HomepageSectionContentFeed from '../components/HomepageSectionContentFeed'
import HomepageSectionDeploy from '../components/HomepageSectionDeploy'
import HomepageSectionDeployAlt from '../components/HomepageSectionDeployAlt'
import HomepageSectionFast from '../components/HomepageSectionFast'
import HomepageSectionSpeed from '../components/HomepageSectionSpeed'
import HomepageSectionStackIntegration from '../components/HomepageSectionStackIntegration'
import HomepageSectionTrustedBy from '../components/HomepageSectionTrustedBy'
import HomepageSectionWhyClickhouse from '../components/HomepageSectionWhyClickhouse'
import HRSeparator from '../components/HRSeparator'
import JoinCommunity from '../components/JoinCommunity'
import Layout from '../components/Layout'
import { findOne } from '../lib/api/strapi'
import { getCommonProps } from '../lib/utils/getCommonProps'
import { HomePageProps } from '../types/homepage'
import { galaxyOnClick, galaxyOnPage } from '../lib/galaxy/galaxy'

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

  const displayNewHomepage = true

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {displayNewHomepage ? (
        <>
          <HomepageSectionTrustedBy customerStories={customerStories} />
          <HomepageSectionContentFeed />
          <HomepageSectionWhyClickhouse />
          <HomepageSectionStackIntegration />
          <HomepageSectionFast />
          <HomepageSectionDeployAlt />
          <JoinCommunity github={headerData.github} />
          <HRSeparator className='my-24' />
          <FAQ />
          <GetStarted platforms={platforms} />
        </>
      ) : (
        <>
          <HomepageHeroLogosVideos
            hero={hero}
            customerStories={customerStories}
          />
          <HomepageSectionSpeed />
          <HRSeparator className='my-24' />
          <HomepageSectionFast />
          <HRSeparator className='my-24' />
          <HomepageSectionDeploy />
          <HRSeparator className='my-24' />
          <JoinCommunity github={headerData.github} />
          <HRSeparator className='my-24' />
          <DevelopersSection />
          <HRSeparator className='my-24' />
          <FAQ />
          <GetStarted platforms={platforms} />
        </>
      )}
    </Layout>
  )
}
