import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import CopyUrlButton from '../../../components/CopyUrlButton'
import DemoCard from '../../../components/DemoCard'
import FollowUs from '../../../components/FollowUs'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import NewsLetter from '../../../components/NewsLetter'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import ReadingProgress from '../../../components/ReadingProgress'
import SocialButton from '../../../components/SocialButton'
import { SuiButton, SuiText, SuiTitle } from '../../../components/sui'
import TableOfContents from '../../../components/TableOfContents'
import { findAll, getStagingOnlyFilters } from '../../../lib/api/strapi'
import { useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { DemoProps } from '../../../types/demo'
import { Demo } from '../../../types/demos'
import { ParamsType } from '../../../types/homepage'

export const getServerSideProps: GetServerSideProps<DemoProps> =
  async function getServerSideProps({ params }) {
    const { link } = params as ParamsType
    const stagingOnlyFilters = getStagingOnlyFilters()

    const filters: Record<string, any> = {
      Link: { $eq: link },
      External: { $eq: false },
      $or: stagingOnlyFilters
    }

    const { data } = await findAll('demos', {
      filters,
      populate: ['Image'],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true
      }
    }

    const demo = data[0] as Demo

    const otherDemoParams = {
      populate: ['Image'],
      sort: ['SortOrder:ASC', 'publishedAt:DESC'],
      fields: ['Title', 'Description', 'Link', 'GitHubLink', 'External'],
      pagination: { limit: 3 },
      filters: {
        Link: {
          $ne: link
        },
        ListOnDemos: {
          $eq: true
        },
        $or: stagingOnlyFilters
      }
    }
    const { data: otherDemos } = await findAll('demos', otherDemoParams)
    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    const demo_link = demo.External ? demo.Link : `/demos/${demo.Link}`

    return {
      props: {
        ...demo,
        otherDemos,
        seo: {
          title: demo.Title,
          description: demo.Description,
          type: 'article',
          siteName: 'ClickHouse',
          image: [demo.Image],
          path: demo_link
        },
        newsLetterData,
        ...commonData
      }
    }
  }

export default function DemoPage({
  Title,
  Content,
  seo,
  headerData,
  footerData,
  newsLetterData,
  otherDemos = []
}: DemoProps) {
  useGalaxyOnPage('demo_page')
  const contentRef = React.createRef<HTMLDivElement>()
  const footerRef = React.createRef<HTMLDivElement>()
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='relative'>
        <div style={{ position: 'relative' }}>
          <ReadingProgress target={contentRef} />
        </div>
        <div className='section-container mx-auto flex flex-col xl:flex-row xl:pt-20'>
          <div className='block pt-10 lg:pl-0 2xl:pr-8'>
            <Link href='/demos'>
              <button className='mr-8 flex items-center text-base font-semibold'>
                <ArrowLeftIcon className='mr-2 w-4' />
                Back
              </button>
            </Link>
          </div>
          {/* <div className='flex w-full flex-col pt-2 items-center lg:pr-80'>
            <h1 className='flex mb-8 mt-6 font-basier text-4xl font-bold text-neutral-100 '>
              <span className='leading-snug'>{Title}</span>
            </h1>
          </div> */}
        </div>
        <div className='absolute right-0 z-0 hidden h-full pr-10 transition-opacity duration-500 xl:block 2xl:pr-30'>
          <TableOfContents
            contentRef={contentRef}
            footerRef={footerRef}
            headersSelector={'h1, h2, h3'}
          />
        </div>
        <div className='section-container mx-auto flex xl:pl-32 xl:pr-40'>
          <div className='flex w-full flex-col pb-20 lg:pr-[180px] xl:pl-4'>
            {Content && (
              <div className='flex flex-col lg:flex-row'>
                <div ref={contentRef} className='w-full'>
                  <Markdown
                    className='rich-text-content leading-6'
                    allowHeaderLink>
                    {Content}
                  </Markdown>
                </div>
              </div>
            )}
            <HRSeparator className='my-8' />
            <div className='mb-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='flex'>
                <SuiText size='sm' weight='medium' color='primary'>
                  Share this demo
                </SuiText>
              </div>
              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                <CopyUrlButton />
                {[
                  'y_combinator',
                  'twitter',
                  'bluesky',
                  'facebook',
                  'linkedin'
                ].map((social) => (
                  <SocialButton key={social} type={social} title={Title} />
                ))}
              </div>
            </div>
            <NewsLetter {...newsLetterData} />
          </div>
        </div>
      </div>

      <div className='flex w-full pb-8 text-neutral-0' ref={footerRef}>
        <div className='section-container mx-auto flex flex-col bg-opacity-10 px-8 pb-8 pt-12 md:bg-no-repeat 2xl:px-0'>
          <div className='flex justify-between pb-8'>
            <SuiTitle
              type='h2'
              className='!text-3xl text-neutral-100'
              weight='semibold'>
              Other demos
            </SuiTitle>
            <SuiButton
              path='/demos'
              type='empty'
              color='primary'
              className='font-base border border-primary-300/50	'>
              View all Demos
            </SuiButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 lg:grid-cols-3'>
            {otherDemos
              .map((demo) => (
                <DemoCard key={demo.id} {...demo} />
              ))}
          </div>
        </div>
      </div>
      <FollowUs />
    </Layout>
  )
}
