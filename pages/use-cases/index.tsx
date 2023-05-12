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

export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton', 'Industries', 'Industries.icon']
    })

    console.log(useCasesPageData)

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
    setVisibleTestimonials((prevValue) => prevValue + 3)
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
            <div className='relative -mt-[80px] w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-3 shadow-lg md:p-10'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {individualUseCases.map((useCase, index) => (
                  <div
                    key={index}
                    className='hide-scrollbar hide-scrollbar relative z-20 min-w-full overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-card hover:bg-neutral-750'>
                    {useCase.icon && (
                      <div className='px-6 pt-6 pb-3'>
                        <StrapiImage {...useCase.icon} />
                      </div>
                    )}

                    <h3 className='mb-4 px-6 text-xl font-bold text-neutral-0'>
                      {useCase.title}
                    </h3>
                    <div className='text-neutral-20 whitespace-pre-wrap px-6 pb-28 text-sm'>
                      {useCase.description}
                    </div>
                    {useCase.ClientsUsingUseCase.length > 0 && (
                      <div className='hide-scrollbar absolute left-0 bottom-0 z-20 h-20 w-full overflow-x-scroll border-t border-neutral-700/80'>
                        <div className='flex w-full justify-between divide-x divide-neutral-700/80 '>
                          {useCase.ClientsUsingUseCase.map(
                            (client, index) =>
                              client.logo &&
                              client.href && (
                                <div key={index}>
                                  <Link href={client.href}>
                                    <StrapiImage
                                      {...client.logo}
                                      className='h-20 grayscale hover:cursor-pointer hover:grayscale-0'
                                    />
                                  </Link>
                                </div>
                              )
                          )}
                        </div>
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
      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className='gap-3 md:columns-2 lg:columns-3'>
          {quotes.slice(0, visibleTestimonials).map((quote, index) => (
            <div
              key={index}
              className='animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-6 shadow-card hover:bg-neutral-750'>
              {quote.quotes.href && (
                <Link href={quote.quotes.href}>
                  <StrapiImage
                    {...quote.quotes.logo}
                    className='color-swap mb-4 h-auto w-32'
                  />
                </Link>
              )}
              <p className='text-sm font-normal text-white'>
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
      <div className='bg-shadow-element yellow-shadow align-shadow-right bg-neutral-900'>
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
