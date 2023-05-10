import { useState } from 'react'
import { findAll, findOne } from '../../lib/api/strapi'
import { UseCasesPage } from '../../types/useCasesPage'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'

export const getStaticProps: GetStaticProps<UseCasesPage> =
  async function getStaticProps() {
    const useCasesPage = await findOne('use-case-feature', {
      populate: ['title']
    })

    console.log(useCasesPage)

    const result = await findOne('use-case', {
      populate: [
        'useCaseItems',
        'useCaseItems.darkLogoPng',
        'useCaseItems.lightLogoPng',
        'useCaseItems.bullets',
        'useCaseItems.ctaButton',
        'seo',
        'seo.image'
      ]
    })
    result.spotlight = (result.useCaseItems ?? []).shift()

    const commonProps = await getCommonProps()
    return {
      props: {
        ...result,
        ...commonProps
      }
    }
  }

function UseCasesPage({ seo, headerData, footerData }: UseCasesPage) {
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
                Use Cases
              </h1>
              <p className='mb-12 text-neutral-200'>
                Discover how businesses use ClickHouse to build real-time
                applications, extract valuable insights from large-scale and
                complex streaming datasets, and accelerate their analytical
                workloads.
              </p>
              <p>
                <a
                  href='https://clickhouse.cloud/signUp?loc=use-cases-hero-cta'
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
                  Start your free Cloud trial
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle'>
          <div className='section-container mt-12 max-w-7xl lg:mt-0'>
            <div className='relative -mt-[100px] w-full bg-black'>
              <p>asdf</p>
              <p>asdf</p>
              <p>asdf</p>
              <p>asdf</p>
              <p>asdf</p>
              <p>asdf</p>
              <p>asdf</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-grid pt-10'>
        <div className='container mx-auto flex max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
          <div className='mx-auto flex max-w-screen-sm flex-col pt-6 text-center'></div>
        </div>
      </div>
      <div className='clip-inverted-triangle'>
        <div className='section-container mt-12 max-w-3xl lg:mt-0'></div>
      </div>
      <div className='-mt-1 bg-primary-300 pt-8 pb-16'>
        <div className='h-96 w-full bg-black'>hello</div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
