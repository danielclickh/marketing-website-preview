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
import UseCasesComparisons from '../../components/UseCasesComparisons'

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

    const firstThreeIds = [3, 14, 9] // Specify the IDs you want to keep at the beginning
    quotes.sort((a, b) => {
      const aIndex = firstThreeIds.indexOf(a.id)
      const bIndex = firstThreeIds.indexOf(b.id)

      // If both elements are in the firstThreeIds array, sort them based on their index
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // If only one of the elements is in the firstThreeIds array, prioritize it
      if (aIndex !== -1) {
        return -1
      }

      if (bIndex !== -1) {
        return 1
      }

      // If neither element is in the firstThreeIds array, maintain their original order
      return 0
    })

    const commonProps = await getCommonProps()
    return {
      props: {
        useCasesPageData,
        individualUseCases,
        quotes,
        seo: {
          title: `${useCasesPageData.Title} | ClickHouse`,
          description: useCasesPageData.Description,
          path: '/use-cases'
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
        <div className='relative gap-24 px-8 pb-16 pt-16 md:px-0 '>
          <div className='mx-auto max-w-3xl'>
            <div className='mx-auto text-center md:mr-0 '>
              <h1 className='mb-6 font-basier text-4xl font-semibold text-neutral-200 md:text-5.5xl md:leading-tight'>
                {useCasesPageData.Title} for the
                <br />
                real-time data warehouse
              </h1>
              <p className='mx-auto mb-12 max-w-2xl text-xl leading-[175%] text-neutral-200'>
                Unlock faster queries and the ability to handle greater
                concurrency. No&nbsp;matter how much data you’re working with.
              </p>
              <p>
                <a
                  href={useCasesPageData.ctaButton.href}
                  target='_blank'
                  className='inline-block rounded border-primary-300 bg-primary-300 py-3 px-8 font-semibold text-neutral-900 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-400'>
                  {useCasesPageData.ctaButton.text}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='clip-inverted-triangle-use-cases'>
          <div className='section-container mt-12 flex max-w-6xl flex-col gap-y-6 lg:mt-0'>
            {individualUseCases.map((useCase, index) => (
              <div key={index}>
                <CUICard>
                  <CUICard.Body className='rounded-t-lg bg-neutral-900'>
                    <div className='flex flex-col items-start justify-between gap-x-6 lg:flex-row'>
                      <div className='relative p-6 lg:w-[560px]'>
                        {useCase.title === 'Business Intelligence' && (
                          <div className='absolute right-0'>
                            <CUIButton
                              type='secondary'
                              size='sm'
                              className='group mx-auto'
                              href='/use-cases/business-intelligence'
                              iconRight={
                                <ChevronRightIcon
                                  height='18'
                                  className='pt-0.5 transition group-hover:translate-x-1/2'
                                />
                              }>
                              Learn more
                            </CUIButton>
                          </div>
                        )}
                        {useCase.title === 'Logs, Events, & Traces' && (
                          <div className='absolute right-0'>
                            <CUIButton
                              type='secondary'
                              size='sm'
                              className='group mx-auto'
                              href='/use-cases/logging-and-metrics'
                              iconRight={
                                <ChevronRightIcon
                                  height='18'
                                  className='pt-0.5 transition group-hover:translate-x-1/2'
                                />
                              }>
                              Learn more
                            </CUIButton>
                          </div>
                        )}
                        {useCase.title === 'Machine Learning & GenAI' && (
                          <div className='absolute right-0'>
                            <CUIButton
                              type='secondary'
                              size='sm'
                              className='group mx-auto'
                              href='/use-cases/machine-learning-and-data-science'
                              iconRight={
                                <ChevronRightIcon
                                  height='18'
                                  className='pt-0.5 transition group-hover:translate-x-1/2'
                                />
                              }>
                              Learn more
                            </CUIButton>
                          </div>
                        )}
                        {useCase.title === 'Real-time Analytics' && (
                          <div className='absolute right-0'>
                            <CUIButton
                              type='secondary'
                              size='sm'
                              className='group mx-auto'
                              href='/use-cases/real-time-analytics'
                              iconRight={
                                <ChevronRightIcon
                                  height='18'
                                  className='pt-0.5 transition group-hover:translate-x-1/2'
                                />
                              }>
                              Learn more
                            </CUIButton>
                          </div>
                        )}
                        <div className='flex flex-col items-start justify-center gap-4'>
                          <div className='mb-1 flex flex-col gap-y-2 font-inconsolata text-base font-medium text-primary-300'>
                            {useCase.icon && <StrapiImage {...useCase.icon} />}
                          </div>
                          <div className='font-basier text-xl font-medium leading-tight  text-neutral-100'>
                            {useCase.title}
                          </div>
                          <div className='text-neutral-20 whitespace-pre-wrap text-sm'>
                            {useCase.description}
                          </div>
                        </div>
                      </div>
                      <div className='lg:w-[590px]'>
                        <div className='hide-scrollbar max-h-64 overflow-scroll'>
                          {useCase.ClientsUsingUseCase.length > 0 && (
                            <div className='grid grid-cols-2'>
                              {useCase.ClientsUsingUseCase.map(
                                (client, index) => (
                                  <div
                                    key={index}
                                    className='logos-color-swap flex h-[86px] w-full items-center border-l border-b border-[#464641] last:border-r '>
                                    <Link
                                      href={client.href}
                                      className='color-swap mx-auto w-full object-contain'>
                                      <StrapiImage
                                        {...client.logo}
                                        className='mx-auto mt-auto '
                                      />
                                    </Link>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>
              </div>
            ))}
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
      </div>

      <UseCasesComparisons />

      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className=' gap-3 md:columns-2 lg:columns-3'>
          {quotes.slice(0, visibleTestimonials).map((quote, index) => (
            <div key={index}>
              {quote.quotes.href ? (
                <Link href={quote.quotes.href} className=''>
                  <div
                    key={index}
                    className='logos-color-swap animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-4 shadow-card hover:bg-neutral-750'>
                    <div className='w-1/2'>
                      <StrapiImage
                        {...quote.quotes.logo}
                        className='color-swap h-16'
                      />
                    </div>
                    <p className='min-h-[145px] pt-1 text-sm font-normal text-white'>
                      "{quote.quotes.quote}"
                    </p>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className='logos-color-swap animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover shadow-card hover:bg-neutral-750'>
                  <div className='w-1/2'>
                    <StrapiImage
                      {...quote.quotes.logo}
                      className='color-swap h-16'
                    />
                  </div>
                  <p className='px-4 pb-6 pt-3 text-sm font-normal text-white'>
                    "{quote.quotes.quote}"
                  </p>
                </div>
              )}
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
