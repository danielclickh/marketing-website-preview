import { useState } from 'react'
import { findOne, findAll } from '../../lib/api/strapi'
import { useCasesPageDataProps } from '../../types/useCasesPage'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import Image from 'next/image'
import Link from 'next/link'
import Glider from 'react-glider'
import 'glider-js/glider.min.css'

export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton', 'Industries']
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
      sort: ['id:ASC'],
      populate: ['quotes']
    }
    const { data: quotes } = await findAll('use-case-quotes', quotesParams)

    console.log(quotes)

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
  const [visibleTestimonials, setVisibleTestimonials] = useState(6)

  const loadMore = () => {
    setVisibleTestimonials((prevValue) => prevValue + 6)
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative gap-24 px-8 pb-20 pt-16 md:px-0 md:pt-20 lg:pb-44 '>
          <div className='mx-auto max-w-2xl'>
            <div className='mx-auto text-center md:mr-0 md:mt-8'>
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
        <div className='clip-inverted-triangle'>
          <div className='section-container mt-12 max-w-7xl lg:mt-0'>
            <div className='relative -mt-[80px] w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-10 shadow-lg'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {individualUseCases.map((useCase, index) => (
                  <div
                    key={index}
                    className='relative z-20 overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-card hover:bg-neutral-750'>
                    <h3 className='mb-4 px-6 pt-6 text-xl font-bold text-neutral-0'>
                      {useCase.title}
                    </h3>
                    <div className='text-neutral-20 whitespace-pre-wrap px-6 pb-28 text-sm'>
                      {useCase.description}
                    </div>
                    {useCase.ClientsUsingUseCase.length > 0 && (
                      <div className='hide-scrollbar absolute left-0 bottom-0 flex h-20 w-full justify-between divide-x divide-neutral-700/80 overflow-x-scroll border-t border-neutral-700/80'>
                        {useCase.ClientsUsingUseCase.map(
                          (client, index) =>
                            client.logo &&
                            client.href && (
                              <Image
                                src={client.logo.url}
                                width={client.logo.width}
                                height={client.logo.height}
                                className='h-20 grayscale hover:cursor-pointer hover:grayscale-0'
                              />
                            )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl px-4 py-20 md:px-8 2xl:px-0'>
        <div className='inline-grid grid-cols-3 gap-3'>
          {quotes.map((quote, index) => (
            <div
              key={index}
              className='rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:bg-neutral-750'>
              <h3 className=''>{quote.quotes.customerName}</h3>
              <p className='text-sm font-normal text-white'>
                "{quote.quotes.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
