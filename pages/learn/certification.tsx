import { CheckCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import { CUIButton } from '../../components/ClickUI'
import CopyUrlButton from '../../components/CopyUrlButton'
import Bullseye from '../../components/icons/Bullseye'
import Certificate from '../../components/icons/Certificate'
import CertificateSquare from '../../components/icons/CertificateSquare'
import Clock from '../../components/icons/Clock'
import Coins from '../../components/icons/Coins'
import FileDashed from '../../components/icons/FileDashed'
import Globe from '../../components/icons/Globe'
import Layout from '../../components/Layout'
import LogoCarousel from '../../components/LogoCarousel'
import Markdown from '../../components/Markdown'
import MarketoForm from '../../components/MarketoForm'
import SocialButton from '../../components/SocialButton'
import { SuiText, SuiTitle } from '../../components/sui'
import { findOne } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { LearnProps } from '../../types/learn'

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const data = await findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })
    return {
      props: {
        seo: {
          title: 'ClickHouse Certification | ClickHouse',
          description: '',
          path: '/learn/certification'
        },
        ...data,
        ...commonProps
      }
    }
  }

type FeatureProps = {
  icon: JSX.Element,
  label: string,
  value: string
}

function Feature(props: FeatureProps) {
  return (
    <div className='border border-neutral-700/80 rounded bg-neutral-900/50 text-white shadow-card p-4 flex gap-4 items-center'>
      <div className='text-primary-300 flex-shrink-0 flex-grow-0 border-r border-neutral-700/80 pr-4 self-stretch flex flex-col justify-center items-center'>
        <div className='max-w-[26px]'>
          {props.icon}
        </div>
      </div>
      <div className="flex md:gap-4 items-center flex-wrap flex-grow">
        <div className="flex-shrink-0 flex-grow-0 w-full md:w-auto font-bold md:font-normal">{props.label}</div>
        <div className="ml-auto w-full md:w-auto md:max-w-[340px] md:text-right opacity-75 md:opacity-100">{props.value}</div>
      </div>
    </div>
  )
}

export default function CertificationPage({
  footerData,
  headerData,
  customerStories,
  seo
}: LearnProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)


  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>

      {/* Hero */}
      <div className="section-container my-16 md:my-20 grid grid-cols-1 lg:grid-cols-2 auto-rows-max gap-x-6 gap-y-8">

        {/* Content */}
        <div className='col-start-1 row-start-1'>
          <SuiTitle
            type='h1'
            color='white'
            className='mb-6 md:!text-6xl'>
            ClickHouse Certified Developer Exam
          </SuiTitle>
          <SuiText color='secondary'>
            Elevate your career to industry-leading heights! Take our official <br className='hidden sm:block' />ClickHouse
            Certification exam to validate your ClickHouse expertise.
          </SuiText>
        </div>

        {/* Features */}
        <div className='col-start-1 row-start-2 lg:row-start-2 flex flex-col gap-2'>
          <Feature
            icon={<Bullseye className='w-full h-auto' />}
            label='Audience'
            value='ClickHouse experts who handle app creation, data ingestion, modeling, query efficiency, and optimization.' />
          <Feature
            icon={<FileDashed className='w-full h-auto' />}
            label='Exam format'
            value='Performance-based, hands-on exam' />
          <Feature
            icon={<Clock className='w-full h-auto' />}
            label='Duration'
            value='2 hours' />
          <Feature
            icon={<Coins className='w-full h-auto' />}
            label='Exam cost'
            value='$200 per attempt' />
          <Feature
            icon={<Globe className='w-full h-auto' />}
            label='Language'
            value='English' />
        </div>

        {/* Form intro */}
        <div className='col-start-1 row-start-3 lg:col-start-2 lg:row-start-1'>
          <div className='relative h-full flex flex-col gap-6 justify-end'>
            <p className='text-center text-[26px]'>
              Stay ahead of the curve! If you’d like to be the first to know when the exam is released, share your contact details below.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className='col-start-1 row-start-4 lg:col-start-2 lg:row-start-2'>
          <div className='border border-neutral-700/80 rounded bg-neutral-900/50 text-white shadow-card p-6 h-full flex flex-col justify-center'>
            <div className="w-full">
              {!formSuccess && (
                <MarketoForm
                  formId={'1116'}
                  onLoad={() => setFormLoaded(true)}
                  onSuccess={() => {
                    setFormSuccess(true)

                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      formSuccessRef.current?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }, 10)

                    return false // Stops page from reloading
                  }}
                />
              )}

              {formLoaded && !formSuccess && (
                <div className='disclaimer-text mt-8 text-center text-sm font-medium text-neutral-200'>
                  <Markdown>
                    By registering, you acknowledge that ClickHouse will process
                    your personal information in accordance with our [Privacy
                    Policy](/legal/privacy-policy).
                  </Markdown>
                </div>
              )}

              {!formLoaded && <div className='text-center'>Loading form...</div>}

              {formSuccess && (
                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                  <div className='subscribed'>
                    <div className='success-container text-center'>
                      <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
                      <p className='text-xl font-bold'>
                        Thanks for registering!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Exam */}
      <div className='bg-primary-300 text-primary-800 py-12 md:py-24'>
        <div className='section-container relative'>

          {/* Badge */}
          <Image
            src='/images/learn/certified-developer-badge.png'
            alt={'ClickHouse Certified Developer'}
            width={494}
            height={449}
            className='absolute right-0 -top-20 md:-top-40 max-w-[130px] md:max-w-[247px]' />

          {/* Intro */}
          <div className='text-center max-w-3xl mx-auto mb-8'>
            <SuiTitle type='h2' className='my-6'>Exam objectives</SuiTitle>
            <p className='mt-6'>To be fully prepared to pass the ClickHouse Certified Developer exam, candidates should
              be able to successfully complete the following tasks on a ClickHouse service, given access to the
              ClickHouse documentation, and using either the clickhouse-client or the ClickHouse SQL Console.</p>
          </div>

          {/* Objectives */}
          <div className='max-w-3xl mx-auto flex flex-col gap-6 my-8'>
            <div className='bg-primary-800/95 text-white rounded p-6'>
              <p className='mb-4'><strong>Modeling Data</strong></p>
              <ul className='pl-6 list-disc flex flex-col gap-2'>
                <li>Create a new database</li>
                <li>Create a new table that satisfies a given criteria or matches a given file format</li>
                <li>Choose efficient data types for columns when appropriate</li>
                <li>Define an efficient primary key given a specific criteria of the types of queries that will be
                  executed on a MergeTree table
                </li>
              </ul>
            </div>
            <div className='bg-primary-800/95 text-white rounded p-6'>
              <p className='mb-4'><strong>Inserting Data</strong></p>
              <ul className='pl-6 list-disc flex flex-col gap-2'>
                <li>Insert a local file into a table</li>
                <li>Insert a file from cloud storage into a table</li>
                <li>Insert a Parqet, CSV, or TSV file into a table</li>
                <li>Provide minor transformations to columns as they are being inserted</li>
                <li>Insert data from one table into another</li>
              </ul>
            </div>
            <div className='bg-primary-800/95 text-white rounded p-6'>
              <p className='mb-4'><strong>Analyzing Data</strong></p>
              <ul className='pl-6 list-disc flex flex-col gap-2'>
                <li>Write a query that satisfies a given criteria</li>
                <li>Write a query that uses regular functions. For example, searches for substrings within a String
                  column, or converts a timestamp to the beginning of a time interval
                </li>
                <li>Write a query that uses aggregate functions. For example, find the max/min/sum/avg of a column, or
                  the number of unique values, or a given quantile
                </li>
                <li>Use a GROUP BY to compute buckets of aggregated values given a specified timeframe or grouping
                  criteria
                </li>
              </ul>
            </div>
            <div className='bg-primary-800/95 text-white rounded p-6'>
              <p className='mb-4'><strong>Optimizing Query Performance</strong></p>
              <ul className='pl-6 list-disc flex flex-col gap-2'>
                <li>Define a materialized view that stores the result of a non-aggregation query</li>
                <li>Define a materialized view that stores the result of an aggregate function using the
                  AggregatingMergeTree or SummingMergeTree table engines
                </li>
                <li>Define a projection on a table</li>
                <li>Define a set or minmax skipping index on a table</li>
              </ul>
            </div>
            <div className='bg-primary-800/95 text-white rounded p-6'>
              <p className='mb-4'><strong>Deduplication and Mutations</strong></p>
              <ul className='pl-6 list-disc flex flex-col gap-2'>
                <li>Perform a lightweight delete operation on a table</li>
                <li>Implement an efficient upsert strategy using the ReplacingMergeTree table engine</li>
                <li>Implement an efficient strategy for performing frequent updates using the CollapsingMergeTree table
                  engine
                </li>
              </ul>
            </div>
          </div>

          {/* Footnote */}
          <div className='text-center max-w-3xl mx-auto mt-16'>
            <p className='mb-6'>To become a ClickHouse Certified Engineer, you will need to pass our hands-on,
              performance-based exam. The exam involves completing a series of real-world tasks on ClickHouse clusters
              in a supervised environment. We encourage you to review our Certification FAQ, which includes our "How to
              prepare" webinar before attempting the exam.</p>
            <p className='mb-6'>Those who successfully complete the Exam will receive a unique ClickHouse Certified
              Developer digital badge to share on their social media or present to their management.</p>
            <p className='mb-6'>If you have any questions, please email <a href="mailto:certification@clickhouse.com"
                                                                           target='_blank'>certification@clickhouse.com</a>.
            </p>
          </div>

          {/* Logo carousel */}
          <SuiTitle type='h3' className='text-center mt-28 mb-6'>
            Trusted by the best developers that work with data{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>at scale</span>
            </span>
          </SuiTitle>
          <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
            <div className='absolute left-0 z-10 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
            <div className='absolute right-0 z-10 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
            <LogoCarousel
              logos={customerStories.logos.slice(0, Math.ceil(customerStories.logos.length / 2))}
              speedClass1='animate-marqueeLeft'
              speedClass2='animate-marqueeLeft2' />
          </div>

        </div>
      </div>

    </Layout>
  )
}
