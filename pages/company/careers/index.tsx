import { SuiText, SuiTitle } from '../../../components/sui'

import { findOne } from '../../../lib/api/strapi'
import CareersFilter from '../../../components/CareersFilter'
import GetStarted from '../../../components/GetStarted'
import { StrapiImage } from '../../../components/StrapiElements'
import CompanyImages from '../../../components/CompanyImages'
import { CareersData } from '../../../types/careers'
import { GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'

export const getStaticProps: GetStaticProps<CareersData> =
  async function getStaticProps() {
    const data = await findOne('career', {
      populate: [
        'hero',
        'hero.companyImages',
        'companyValues',
        'companyValues.iconSvg',
        'seo',
        'seo.image'
      ]
    })
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function CareersPage({
  hero,
  companyValues,
  positionsTitle,
  seo,
  headerData,
  footerData,
  platforms
}: CareersData) {
  const { title, description, paragraphTitle, paragraphText, companyImages } =
    hero
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='bg-primary-900 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto'>
            <SuiTitle type='h1' className='mb-4 md:!text-6xl'>
              {title}
            </SuiTitle>
            <SuiText
              size='lg'
              weight='normal'
              color='secondary'
              className='max-w-3xl'>
              {description}
            </SuiText>
          </div>
        </div>
        <div className='bg-center bg-cover w-full max-w-full h-72 my-16 overflow-y-hidden'>
          <CompanyImages>
            {companyImages.map((image) => (
              <StrapiImage
                key={image.id}
                sizes='medium'
                {...image}
                className='!h-72 w-auto px-1 object-cover object-center'
              />
            ))}
          </CompanyImages>
        </div>
        <div className='w-full pt-4 px-6 pb-12'>
          <div className='flex flex-col md:flex-row container mx-auto max-w-7xl md:space-x-16 mb-12'>
            <div className='flex flex-col md:w-4/5'>
              <SuiTitle type='h2' className='mb-6'>
                {paragraphTitle}
              </SuiTitle>
              <SuiText
                size='base'
                weight='normal'
                className='whitespace-pre-wrap'>
                {paragraphText}
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-noised text-neutral-0 px-6 pt-12'>
        {companyValues.map((companyValue, index: number) => (
          <div
            className={`flex flex-col md:${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            } container mx-auto max-w-7xl md:space-x-16 mb-28 items-center`}
            key={companyValue.title}>
            <div className='flex flex-col md:w-3/5'>
              <SuiTitle type='h3' className='mb-6 !text-3xl' weight='bold'>
                {companyValue.title}
              </SuiTitle>
              <SuiText
                size='base'
                weight='normal'
                color='secondary'
                className='whitespace-pre-wrap'>
                {companyValue.description}
              </SuiText>
            </div>
            <div className='flex flex-col md:w-2/5 mt-6 md:mt-12 items-center'>
              <StrapiImage
                {...companyValue.iconSvg}
                alt='Empathy at work'
                width={212}
                height={212}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='w-full bg-primary-900 pt-16 pb-16 px-6'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle type='h2'>{positionsTitle}</SuiTitle>
          </div>
        </div>

        <CareersFilter />
      </div>
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
