import { useState } from 'react'
import { findOne, findAll } from '../../lib/api/strapi'
import { useCasesPageDataProps } from '../../types/useCasesPage'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton']
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
    const commonProps = await getCommonProps()
    return {
      props: {
        useCasesPageData,
        individualUseCases,
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
  individualUseCases
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
            <div className='relative -mt-[80px] w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-10 shadow-md'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {individualUseCases.map((useCase, index) => (
                  <>
                    {console.log(useCase)}
                    <div
                      key={index}
                      className='relative overflow-hidden rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:bg-neutral-750'>
                      <h3 className='mb-4 text-xl font-bold text-neutral-0'>
                        {useCase.title}
                      </h3>
                      <div className='text-neutral-20 whitespace-pre-wrap pb-10 text-sm'>
                        {useCase.description}
                      </div>
                      {useCase.ClientsUsingUseCase.length > 0 && (
                        <div
                          className='absolute bottom-0 left-0 w-full overflow-x-scroll
                      '>
                          {useCase.ClientsUsingUseCase.map((client, index) => (
                            <>{client.logo}</>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className='bg-primary-300 pb-16'></div>
          </div>
        </div>
      </div>
      <div className='bg-grid pt-10'>
        <div className='container mx-auto flex max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
          <div className='mx-auto flex max-w-screen-sm flex-col pt-6 text-center'></div>
        </div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
