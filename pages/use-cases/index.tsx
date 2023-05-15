import { useState } from 'react'
import { findOne, findAll } from '../../lib/api/strapi'
import { useCasesPageDataProps } from '../../types/useCasesPage'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { StrapiImage } from '../../components/StrapiElements'
import Link from 'next/link'
import { CUIButton } from '../../components/ClickUI'
import GetStartedFree from '../../components/GetStartedFree'
import Image from 'next/image'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import { CUICard } from '../../components/ClickUI'

export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton', 'Industries', 'Industries.icon']
    })

    const individualUseCasesParams = {
      sort: ['id:ASC'],
      populate: [
        'description',
        'shortDescription',
        'ClientsUsingUseCase',
        'ClientsUsingUseCase.*',
        'ClientsUsingUseCase.logo.*',
        'icon'
      ]
    }
    const { data: individualUseCases } = await findAll(
      'individual-use-cases',
      individualUseCasesParams
    )

    const quotesParams = {
      sort: ['id:DESC'],
      populate: ['quotes', 'quotes.*', 'quotes.logo.*']
    }
    const { data: quotes } = await findAll('use-case-quotes', quotesParams)

    const commonProps = await getCommonProps()
    return {
      props: {
        useCasesPageData,
        individualUseCases,
        quotes,
        seo: {
          title: `${useCasesPageData.Title} | ClickHouse`,
          description: useCasesPageData.Description
        },
        ...commonProps
      }
    }
  }

function UseCasesPage({
  seo,
  headerData,
  footerData,
  useCasesPageData,
  individualUseCases,
  quotes
}: useCasesPageDataProps) {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3)

  const loadMore = () => {
    setVisibleTestimonials((prevValue) => prevValue + (quotes.length - 3))
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative gap-24 px-8 pb-20 pt-16 md:px-0 lg:pb-44 '>
          <div className='mx-auto max-w-2xl'>
            <div className='mx-auto text-center md:mr-0 '>
              <h1 className='mb-6 font-basier text-5.5xl font-semibold text-neutral-200'>
                {useCasesPageData.Title}
              </h1>
              <p className='mb-12 text-neutral-200'>
                {useCasesPageData.Description}
              </p>
              <p>
                <a
                  href={useCasesPageData.ctaButton.href}
                  target='_blank'
                  className='inline-block rounded border-primary-300 bg-primary-300 py-3 px-8 font-semibold text-neutral-900 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-400'
                  onClick={() => {
                    try {
                      window.analytics.track('click', {
                        label: 'Start your free Cloud trial',
                        category: 'use-cases-hero-cta'
                      })
                    } catch (e) {}
                  }}>
                  {useCasesPageData.ctaButton.text}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle-use-cases'>
          <div className='section-container mt-12 max-w-7xl lg:mt-0'>
            <div className='relative -mt-[80px] w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-3 shadow-lg md:p-10'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {individualUseCases.map((useCase, index) => (
                  <div
                    key={index}
                    id={useCase.title.replace(/[\s&]+/g, '').toLowerCase()}
                    className='relative z-20'>
                    <CUICard>
                      <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                        <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                          <div className='mb-1 font-inconsolata text-base font-medium text-primary-300'>
                            {useCase.icon && <StrapiImage {...useCase.icon} />}
                          </div>
                          <div className='font-basier text-xl font-medium leading-tight  text-neutral-100'>
                            {useCase.title}
                          </div>
                          <div className='text-neutral-20 whitespace-pre-wrap pb-20 text-sm'>
                            {useCase.description}
                          </div>
                        </div>
                      </CUICard.Body>
                      <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                        {useCase.ClientsUsingUseCase.length > 0 && (
                          <div className='absolute left-0 bottom-0 z-50 h-20 w-full overflow-hidden rounded-b-lg border border-neutral-700/80 bg-neutral-900'>
                            <div className='flex w-full justify-between'>
                              {useCase.ClientsUsingUseCase.length > 3 && (
                                <>
                                  <div
                                    id={`buttonPrev-${index}`}
                                    className='group absolute top-0 left-0 z-40 hidden h-full transform bg-gradient-to-l from-neutral-900 via-neutral-800 to-transparent pl-2 pr-10 hover:cursor-pointer md:flex'>
                                    <span className='sr-only'>Previous</span>
                                    <div className='flex items-center'>
                                      <ChevronLeftIcon
                                        height='30'
                                        className='fill-slate-100 pt-0.5 opacity-50 transition duration-300 group-hover:fill-primary-300 group-hover:opacity-100'
                                      />
                                    </div>
                                  </div>
                                  <div
                                    id={`buttonNext-${index}`}
                                    className='group absolute top-0 right-0 z-40 hidden h-full transform bg-gradient-to-l from-neutral-900 via-neutral-800 to-transparent pr-2 pl-10 hover:cursor-pointer md:flex'>
                                    <span className='sr-only'>Next</span>
                                    <div className='flex items-center'>
                                      <ChevronRightIcon
                                        height='30'
                                        className='fill-slate-100 pt-0.5 opacity-50 transition duration-300 group-hover:fill-primary-300 group-hover:opacity-100'
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              <Glider
                                draggable
                                hasArrows
                                slidesToShow={3}
                                slidesToScroll={1}
                                rewind={true}
                                arrows={{
                                  prev: `#buttonPrev-${index}`,
                                  next: `#buttonNext-${index}`
                                }}>
                                {useCase.ClientsUsingUseCase.map(
                                  (client, index) => (
                                    <div
                                      key={index}
                                      className={`w-96 ${
                                        index !== 0
                                          ? 'border-l border-l-neutral-700/80'
                                          : 'md:ml-6'
                                      } ${
                                        index !==
                                        useCase.ClientsUsingUseCase.length - 1
                                          ? ''
                                          : 'md:mr-8'
                                      }`}>
                                      <Link href={client.href}>
                                        <div className='h-20 w-full'>
                                          <StrapiImage
                                            {...client.logo}
                                            className='h-full w-full object-contain grayscale hover:cursor-pointer hover:grayscale-0'
                                          />
                                        </div>
                                      </Link>
                                    </div>
                                  )
                                )}
                              </Glider>
                            </div>
                          </div>
                        )}
                      </CUICard.Footer>
                    </CUICard>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className='gap-3 md:columns-2 lg:columns-3'>
          {quotes.slice(0, visibleTestimonials).map((quote, index) => (
            <div
              key={index}
              className='animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover shadow-card hover:bg-neutral-750'>
              {quote.quotes.href && (
                <Link href={quote.quotes.href} className=''>
                  <StrapiImage
                    {...quote.quotes.logo}
                    className='color-swap mt-4 ml-1 h-auto w-32'
                  />
                </Link>
              )}
              <p className='px-4 pb-6 pt-3 text-sm font-normal text-white'>
                "{quote.quotes.quote}"
              </p>
            </div>
          ))}
        </div>
        {visibleTestimonials < quotes.length && (
          <div className='mx-auto mt-12'>
            <CUIButton
              type='secondary'
              className='mx-auto w-auto'
              onClick={loadMore}
              iconRight=''>
              View more
            </CUIButton>
          </div>
        )}
      </div>
      <div
        className='bg-shadow-element yellow-shadow align-shadow-right bg-neutral-900'
        id='industries'>
        <div className='mx-auto max-w-7xl px-4 py-20 md:px-8 2xl:px-0'>
          <div className='py-10'>
            <Image
              src='/images/industries-icon.svg'
              width={72}
              height={72}
              alt='Industries'
              className='mx-auto'
            />
            <h2 className='mt-4 text-center text-3xl font-bold text-neutral-0'>
              Industries
            </h2>
            <div className='py-24'>
              <div className='grid gap-24 md:grid-cols-2 lg:grid-cols-3'>
                {useCasesPageData.Industries.map((industry, index) => (
                  <div className='text-center' key={index}>
                    {industry.icon && (
                      <StrapiImage
                        {...industry.icon}
                        className='mx-auto mb-4'
                      />
                    )}
                    <h3 className='text-lg font-bold'>{industry.name}</h3>
                    <p className='mt-4 text-sm text-neutral-200'>
                      {industry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <GetStartedFree href='https://clickhouse.cloud/signUp?loc=use-cases-get-started-footer' />
        </div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
