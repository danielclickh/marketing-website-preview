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
import Markdown from '../../../components/Markdown'
import HRSeparator from '../../../components/HRSeparator'
import ContactForm from '../../../components/ContactForm'

export const getStaticProps: GetStaticProps<ComparisonProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('comparisons', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: ['painpoint', 'seo', 'testimonials'],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    const comparison = data[0]
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
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative gap-24 px-8 pb-10 pt-16 md:px-0 lg:pb-32 '>
          <div className='mx-auto max-w-7xl px-8 xl:px-0'>
            <div className='grid grid-cols-2 items-center gap-20'>
              <div>
                <h1 className='mb-6 font-basier text-5.5xl font-semibold leading-tight text-neutral-200'>
                  {comparison.Title}
                </h1>
                <p className='mb-12 text-neutral-200'>
                  {comparison.HeroDescription}
                </p>
              </div>
              <div>
                <div className='p-4 pr-0'>
                  <h3 className='mb-6 text-center text-xl font-light text-primary-300'>
                    Contact us to find out the power of ClickHouse
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
                  <Markdown className='mt-4 text-center text-sm'>
                    By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle-use-cases'>
          <div className='section-container mt-12 max-w-7xl lg:mt-0'>
            <div className='relative -mt-[80px] w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-3 shadow-lg md:p-10'>
              <div className='grid grid-cols-1 gap-8'>
                {comparison.painpoint.map((painpoint, index) => {
                  return (
                    <CUICard key={index} className='p-6'>
                      <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                        <div className='flex items-start gap-10'>
                          <div className='w-1/2'>
                            <h3 className='mb-4 flex-grow font-basier text-xl font-medium leading-tight  text-neutral-100'>
                              {painpoint.Title}
                            </h3>
                            <div className='text-neutral-20  text-sm'>
                              <Markdown>{painpoint.Description}</Markdown>
                            </div>
                          </div>
                          <div className='w-1/2'>
                            <h4 className='mb-4 font-basier text-lg font-medium leading-tight text-neutral-100'>
                              How our customers did it
                            </h4>
                            <div className='text-neutral-20 text-sm'>
                              <Markdown>{painpoint.Proofpoint}</Markdown>
                            </div>
                          </div>
                        </div>
                      </CUICard.Body>
                    </CUICard>
                  )
                })}
              </div>
            </div>
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
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
