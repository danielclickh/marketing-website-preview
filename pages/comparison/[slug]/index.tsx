import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import { ComparisonProps } from '../../../types/comparisons'
import { ParamsType } from '../../../types/homepage'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import {
  NOT_FOUND_FALLBACK,
  REVALIDATE_SECONDS
} from '../../../lib/utils/revalidationConfig'
import { CUICard } from '../../../components/ClickUI'
import ReactMarkdown from 'react-markdown'
import HRSeparator from '../../../components/HRSeparator'
import ContactForm from '../../../components/ContactForm'
import { StrapiImage } from '../../../components/StrapiElements'
import LogoCarousel from '../../../components/LogoCarousel'
import React from 'react'

export const getStaticProps: GetStaticProps<ComparisonProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('comparisons', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: [
        'painpoint',
        'seo',
        'testimonials',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng',
        'image',
        'formTitle'
      ],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    const comparison = data[0]

    console.log('comparison', comparison)

    const seo = comparison.seo

    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        comparison,
        seo,
        newsLetterData,
        ...commonData
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function ComparisonPage({
  footerData,
  headerData,
  seo,
  comparison
}: ComparisonProps) {
  const logos1 = comparison.customerStories.logos.slice(
    0,
    Math.ceil(comparison.customerStories.logos.length / 2)
  )
  const logos2 = comparison.customerStories.logos.slice(
    Math.ceil(comparison.customerStories.logos.length / 2)
  )
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative px-8 pt-16 lg:pb-24 xl:px-0 '>
          <div className='mx-auto max-w-7xl'>
            <div className='grid grid-cols-2 items-start gap-20'>
              <div>
                <div className='flex items-center'>
                  <h1 className='mb-6 font-basier text-5xl font-semibold leading-tight text-neutral-200'>
                    {comparison.Title}
                  </h1>
                  {comparison.image && <StrapiImage {...comparison.image} />}
                </div>
                <div className='rich_content mt-4 mb-12 text-base text-neutral-200'>
                  <ReactMarkdown children={comparison.HeroDescription} />
                </div>
              </div>
              <div>
                <div className='p-4 pt-0 pr-0'>
                  <h3 className='mb-6 text-center font-basier text-2xl font-light'>
                    {comparison.formTitle}
                  </h3>
                  <ContactForm
                    firstNameLabel='First Name'
                    lastNameLabel='Last Name'
                    emailLabel='Email'
                    companyLabel='Company'
                    messageLabel='Message'
                    submitButtonLabel='Submit'
                    thankYouMessage='Thank you for submitting the form!'
                    disclaimer=''
                  />
                  <div className='rich_content mt-4 text-center text-sm'>
                    <ReactMarkdown
                      children='By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {comparison.customerStories.title && (
          <div className='relative mb-16'>
            <div className='inset-0 mx-auto h-12 max-w-7xl skew-y-2 transform bg-primary-300 lg:max-h-96'></div>
            <div className='relative z-10 mx-auto -mt-6 max-w-7xl  bg-primary-300'>
              <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0 '>
                <div className='flip-selection mx-auto flex flex-col text-center'>
                  <div className='mx-auto mb-8 w-fit max-w-4xl px-4 py-6 pt-10 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                    {comparison.customerStories.title}{' '}
                    <span className='tilted tilted-black'>
                      <span className='tilted-content leading-8'>
                        {comparison.customerStories.popText}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-20 md:gap-x-14'>
                <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
                <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
                <LogoCarousel
                  logos={logos1}
                  speedClass1='animate-marqueeLeft'
                  speedClass2='animate-marqueeLeft2'
                />
                <LogoCarousel
                  logos={logos2}
                  speedClass1='animate-marqueeLeft3'
                  speedClass2='animate-marqueeLeft4'
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className='gap-3 md:columns-2 lg:columns-3'>quotes</div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const params = {
    fields: ['slug']
  }

  const paths = await getPathsValues('comparisons', params)
  return {
    paths,
    fallback: NOT_FOUND_FALLBACK
  }
}
