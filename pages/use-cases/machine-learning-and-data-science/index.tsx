import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Tilt from 'react-parallax-tilt'
import { CUIButton } from '../../../components/ClickUI'
import GetStartedFree from '../../../components/GetStartedFree'
import Layout from '../../../components/Layout'
import AccordionComponent from '../../../components/MLDiagram/Accordion'
import LogoCarousel from '../../../components/LogoCarousel'
import Markdown from '../../../components/Markdown'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import callouts from './callouts.json'
import checkpoints from './checkpoints.json'
import features from './features.json'
import quotes from './quotes.json'

interface MLProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<MLProps> =
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

    const data = await findOne('homepage', params)

    data.seo.path = '/use-cases/machine-learning-and-data-science'
    data.seo.title =
      'Machine Learning and Data Science with ClickHouse | ClickHouse for ML and data science'
    data.seo.description =
      "The ultimate real-time database to power machine learning workloads. With ClickHouse, it's easier than ever to unleash AI with your data."
    data.seo.image = [{ url: 'https://clickhouse.com/images/og-ml-ds.png' }]

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function MLUseCasePage({
  customerStories,
  seo,
  headerData,
  footerData
}: MLProps) {
  useEffect(() => {
    const container = document.getElementById('regionsContainer')
    if (container) {
      const middlePosition =
        container.scrollWidth / 2 - container.clientWidth / 2
      container.scrollLeft = middlePosition
    }
  }, [])
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative z-20 overflow-hidden bg-grid pt-10 pb-20'>
            <div className='absolute z-10 w-full bg-center bg-no-repeat lg:top-64 lg:h-[524px] lg:bg-speed-lines-ml'></div>
            <div className='container relative z-40 mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col xl:mt-16'>
                  <div className='w-full lg:max-w-xl xl:max-w-full'>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      <Link href='/use-cases'>Use cases</Link> / ML &amp; Data
                      Science
                    </h4>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-lg lg:text-left'>
                      ML &amp; Data Science with ClickHouse
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-6 font-normal'>
                        The ultimate real-time database to power machine
                        learning workloads. With&nbsp;ClickHouse, it's easier
                        than ever to unleash AI with your data.
                      </p>
                    </SuiText>
                  </div>
                  <div className='lg:max-w-2xl xl:max-w-full'>
                    {checkpoints.map((checkpoint) => {
                      return (
                        <div
                          className={`item-center flex space-x-4 pb-2`}
                          key={checkpoint.id}>
                          <Image
                            src='/images/cloud/check.svg'
                            width={32}
                            height={33}
                            alt='Icon'
                          />
                          <SuiText
                            size='base'
                            weight='normal'
                            color='secondary'
                            className='flex items-center'>
                            <p>{checkpoint.content}</p>
                          </SuiText>
                        </div>
                      )
                    })}
                    <div className='relative z-40 mt-6 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://clickhouse.cloud/signUp?loc=use-case-ml-and-ds'
                        target='_blank'
                        segmentEvent={{
                          label: 'use-case-ml-and-ds',
                          category: 'use-case-ml-and-ds'
                        }}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        Get started today
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/company/contact?loc=use-case-ml-and-ds'
                        target='_self'
                        segmentEvent={{
                          label: 'use-case-ml-and-ds-contact',
                          category: 'use-case-ml-and-ds-contact'
                        }}
                        linkClass='w-full mx-auto md:mx-0 max-w-[12rem]'
                        className='w-full'>
                        Contact sales
                      </CUIButton>
                    </div>
                  </div>
                </div>
                <div className='relative z-30 mx-auto mt-20 hidden md:mt-10 md:w-4/12 lg:flex'>
                  <Image
                    src='/images/use-cases/ml-and-ds/ml-ds-hero.svg'
                    alt='ClickHouse'
                    width={326}
                    height={316}
                    className='h-auto w-full '
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <h2 className='text-center font-basier text-2xl font-semibold lg:text-4xl lg:leading-relaxed'>
              Find out why companies are using ClickHouse to power&nbsp;their
              machine learning data workloads.
            </h2>
          </div>
          <div className='mx-auto flex max-w-6xl flex-col gap-5 pb-24 md:flex-row'>
            {features.map((feature) => {
              return (
                <div key={feature.id} className='flex-1 text-center'>
                  <Image
                    src={feature.icon}
                    width={32}
                    height={32}
                    alt={feature.content}
                    className='mx-auto h-11 w-auto'
                  />
                  <div className='rich_content px-3 pt-4 text-base text-neutral-200'>
                    <ReactMarkdown children={feature.content} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='clip-inverted-triangle bg-neutral-725'>
          <div className='section-container max-w-7xl'>
            <div className='relative flex flex-col rounded-lg border-t-2 border-neutral-700/80 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
              <div className='p-10'>
                <div className='flex flex-col gap-x-6 gap-y-6 md:h-[490px] md:flex-row lg:h-[360px] xl:h-[320px] '>
                  {quotes.map((quote) => (
                    <Tilt
                      tiltEnable={false}
                      glareEnable={true}
                      glareMaxOpacity={0.4}
                      glareColor='rgba(251, 255, 70, 0.08)'
                      glarePosition='all'
                      className='flex-1'
                      key={quote.id}>
                      {quote.href ? (
                        <Link href={quote.href} target={quote.target}>
                          <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:bg-neutral-725/90 hover:shadow-lg'>
                            <Image
                              src='/images/Quote.svg'
                              width={37}
                              height={28}
                              alt='Quote'
                              className='mb-4 block'
                            />
                            <SuiText color='secondary' className='text-left'>
                              "{quote.content}"
                            </SuiText>
                            <Image
                              src={quote.logo}
                              width={quote.imgWidth}
                              height={quote.imgHeight}
                              alt={quote.title}
                              className='mt-12 md:mt-auto'
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:bg-neutral-800/90 hover:shadow-lg'>
                          <Image
                            src='/images/Quote.svg'
                            width={37}
                            height={28}
                            alt='Quote'
                            className='mb-4 block'
                          />
                          <SuiText color='secondary' className='text-left'>
                            "{quote.content}"
                          </SuiText>
                          <Image
                            src={quote.logo}
                            width={quote.imgWidth}
                            height={quote.imgHeight}
                            alt={quote.title}
                            className='mt-12 md:mt-auto'
                          />
                        </div>
                      )}
                    </Tilt>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='-mt-1 h-1 w-full bg-primary-300'></div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative z-10 mx-auto -mt-10 bg-primary-300'>
          <div className='relative z-10 mx-auto -mt-10 max-w-7xl'>
            <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0 '>
              <div className='flip-selection mx-auto flex flex-col text-center'>
                <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-12 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                  Trusted by developers that work with data at{' '}
                  <span className='tilted tilted-black'>
                    <span className='tilted-content leading-8'>scale</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-20 md:gap-x-14'>
              <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                logos={customerStories.logos}
                speedClass1='animate-marqueeLeft5'
                speedClass2='animate-marqueeLeft6'
              />
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 pb-24'>
          <div className='relative mx-auto pt-12 md:px-0 md:pt-24'>
            <div className='mx-auto max-w-7xl'>
              <AccordionComponent />
              <div className='mx-auto max-w-5xl px-4 xl:px-0'>
                <div className='grid justify-between gap-20 pt-20 lg:grid-cols-2'>
                  {callouts.map((feature) => (
                    <div key={feature.id} className='px-3'>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className='mb-4'
                      />
                      <h3 className='mb-4 text-lg font-bold'>
                        {feature.title}
                      </h3>
                      <div className='rich_content text-base text-neutral-200'>
                        <Markdown children={feature.content} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow '>
          <div className='section-container mb-24 flex w-full pt-24 text-neutral-0 md:px-8 2xl:px-0 '>
            <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-right bg-no-repeat py-16 px-4 xl:px-24'>
              <div className='flex flex-col text-center'>
                <SuiTitle type='h2' color='white'>
                  Supporting{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>references</span>
                  </span>{' '}
                </SuiTitle>
                <div className='mx-auto mb-8 mt-6 max-w-2xl text-center text-neutral-300'>
                  For detailed guides about how to get started with ClickHouse
                  for ML, follow along in our blog:
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-decimal space-y-2 text-left	text-primary-300'>
                    <li>
                      <Link
                        href='/blog/vector-search-clickhouse-p1'
                        className='text-primary-300'>
                        Vector Search with ClickHouse - Part 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/vector-search-clickhouse-p2'
                        className='text-primary-300'>
                        Vector Search with ClickHouse - Part 2
                      </Link>
                    </li>
                    <li>
                      <a
                        href='https://www.youtube.com/watch?v=hGRNcftpqAk'
                        className='text-primary-300'
                        target='_blank'>
                        Video: ClickHouse for AI - Vectors, Embedding, Semantic
                        Search, and more - Alexey Milovidov, ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.youtube.com/watch?v=F08ktx1ZrpI'
                        className='text-primary-300'
                        target='_blank'>
                        Video: Vector Search In ClickHouse - Dale McDiarmid
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://python.langchain.com/docs/integrations/vectorstores/clickhouse'
                        className='text-primary-300'
                        target='_blank'>
                        Using Langchain with ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://deepnote.com/blog/clickhouse'
                        className='text-primary-300'
                        target='_blank'>
                        Using Deepnote with ClickHouse
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-44 text-neutral-0 md:px-8 2xl:px-0'>
            <GetStartedFree
              href='https://clickhouse.cloud/signUp?loc=ml-and-ds-use-case-getstarted-footer'
              textBefore='Get started with ClickHouse'
              textSlanted='Cloud'
              textAfter='for free'
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
