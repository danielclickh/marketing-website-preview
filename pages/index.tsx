import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DevelopersSection from '../components/DevelopersSection'
import FAQ from '../components/FAQ'
import GetStarted from '../components/GetStarted'
import HomepageHero from '../components/HomepageHero'
import HomepageHeroAlt from '../components/HomepageHeroAlt'
import HomepageSectionContentFeed from '../components/HomepageSectionContentFeed'
import HomepageSectionDeploy from '../components/HomepageSectionDeploy'
import HomepageSectionDeployAlt from '../components/HomepageSectionDeployAlt'
import HomepageSectionFast from '../components/HomepageSectionFast'
import HomepageSectionSpeed from '../components/HomepageSectionSpeed'
import HomepageSectionStackIntegration from '../components/HomepageSectionStackIntegration'
import HomepageSectionTrustedBy from '../components/HomepageSectionTrustedBy'
import HomepageSectionTrustedByAlt from '../components/HomepageSectionTrustedByAlt'
import HomepageSectionVideoGrid from '../components/HomepageSectionVideoGrid'
import HomepageSectionWhyClickhouse from '../components/HomepageSectionWhyClickhouse'
import HRSeparator from '../components/HRSeparator'
import JoinCommunity from '../components/JoinCommunity'
import Layout from '../components/Layout'
import { findOne } from '../lib/api/strapi'
import { getCommonProps } from '../lib/utils/getCommonProps'
import { HomePageProps } from '../types/homepage'
import { galaxyOnPage } from '../lib/galaxy/galaxy'
import { useFeatureValue, useGrowthBook } from '@growthbook/growthbook-react'
import { updateLinks } from '../components/UTMPersist'

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
