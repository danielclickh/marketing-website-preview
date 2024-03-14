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

  const router = useRouter()

  const [testType, setTestType] = useState<number | 'control'>('control')

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const test = parseInt(queryParams.get('test') || '')
    if (test && !isNaN(test) && [1, 2, 3, 4].includes(test)) {
      setTestType(test)
    }
  }, [router])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {testType === 'control' && (
        <LayoutControl
          hero={hero}
          customerStories={customerStories}
          headerData={headerData}
          platforms={platforms}
        />
      )}
      {testType === 1 && (
        <LayoutExperiment1
          hero={hero}
          customerStories={customerStories}
          headerData={headerData}
          platforms={platforms}
        />
      )}
      {testType === 2 && (
        <LayoutExperiment2
          hero={hero}
          customerStories={customerStories}
          headerData={headerData}
          platforms={platforms}
        />
      )}
      {testType === 3 && (
        <LayoutExperiment3
          customerStories={customerStories}
          headerData={headerData}
          platforms={platforms}
        />
      )}
      {testType === 4 && (
        <LayoutExperiment4
          customerStories={customerStories}
          headerData={headerData}
          platforms={platforms}
        />
      )}
    </Layout>
  )
}

type LayoutProps = Omit<
  HomePageProps,
  | 'seo'
  | 'footerData'
  | 'aboutClickhouse'
  | 'clickhouseCloud'
  | 'clickhouseCloudItems'
  | 'testimonials'
  | 'customerLogos'
>

function LayoutControl({
  hero,
  customerStories,
  headerData,
  platforms
}: LayoutProps) {
  return (
    <>
      <HomepageHero hero={hero} />
      <HomepageSectionTrustedBy
        className='bg-primary-300 pb-24 text-primary-800'
        customerStories={customerStories}
      />
      <HomepageSectionVideoGrid className='bg-primary-300 pb-24 text-primary-800' />
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
  )
}

function LayoutExperiment1({
  hero,
  customerStories,
  headerData,
  platforms
}: LayoutProps) {
  return (
    <>
      <HomepageHero hero={hero} />
      <HomepageSectionTrustedBy
        className='bg-primary-300 pb-24 text-primary-800'
        customerStories={customerStories}
      />
      <HomepageSectionVideoGrid className='bg-primary-300 pb-24 text-primary-800' />
      <HomepageSectionStackIntegration />
      <HRSeparator className='my-24' />
      <HomepageSectionFast />
      <HomepageSectionWhyClickhouse />
      <HomepageSectionDeployAlt />
      <JoinCommunity github={headerData.github} />
      <HRSeparator className='my-24' />
      <FAQ />
      <GetStarted platforms={platforms} />
    </>
  )
}

function LayoutExperiment2({
  hero,
  customerStories,
  headerData,
  platforms
}: LayoutProps) {
  return (
    <>
      <HomepageHero hero={hero} />
      <HomepageSectionTrustedBy
        className='bg-primary-300 pb-24 text-primary-800'
        customerStories={customerStories}
      />
      <HomepageSectionContentFeed />
      <HomepageSectionWhyClickhouse />
      <HomepageSectionStackIntegration />
      <HRSeparator className='my-24' />
      <HomepageSectionFast />
      <HomepageSectionDeployAlt />
      <JoinCommunity github={headerData.github} />
      <HRSeparator className='my-24' />
      <FAQ />
      <GetStarted platforms={platforms} />
    </>
  )
}

function LayoutExperiment3({
  customerStories,
  headerData,
  platforms
}: Omit<LayoutProps, 'hero'>) {
  return (
    <>
      <HomepageHeroAlt />
      <HomepageSectionTrustedByAlt customerStories={customerStories} />
      <HRSeparator />
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
  )
}

function LayoutExperiment4({
  customerStories,
  headerData,
  platforms
}: Omit<LayoutProps, 'hero'>) {
  return (
    <>
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
    </>
  )
}
