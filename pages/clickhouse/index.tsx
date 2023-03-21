import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'
import { FeatureItemLarge } from '../../components/feature_item_large/feature_item_large'
import { findOne } from '../../lib/api/strapi'
import Markdown from '../../components/Markdown'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import BulletPoint from '../../components/BulletPoint'
import GetStarted from '../../components/GetStarted'
import { ClickhouseData } from '../../types/clickhouse'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'

export const getStaticProps: GetStaticProps<ClickhouseData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.mainButton',
        'hero.secondaryButton',
        'hero.gitButton',
        'hero.gitButton.darkIconPng',
        'hero.gitButton.lightIconPng',
        'hero.backgroundPng',
        'features1',
        'features1.items',
        'features1.items.iconSvg',
        'features2',
        'features2.items',
        'features2.items.iconSvg',
        'features3',
        'features3.mainItem',
        'features3.iconSvg',
        'features3.items',
        'features4',
        'features4.items',
        'features5',
        'features5.iconSvg',
        'features5.items',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('click-house', params)

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  hero,
  features1,
  features2,
  features3,
  features4,
  features5,
  seo,
  headerData,
  platforms,
  footerData
}: ClickhouseData) {
  const {
    title,
    description,
    backgroundPng,
    mainButton,
    secondaryButton,
    gitButton
  } = hero
  return (
    <>
      <Layout headerData={headerData} footerData={footerData} seo={seo}>
        <div className='pt-10'>
          <div className='flex container mx-auto flex-col max-w-7xl pb-24 px-4 sm:px-8 2xl:px-0'>
            <div className='flex'>
              <div className='md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
                <SuiTitle type='h1' className='md:!text-6xl'>
                  <Markdown>{title}</Markdown>
                </SuiTitle>
                <SuiText
                  size='base'
                  weight='medium'
                  color='secondary'
                  className='mt-6 md:pr-16'>
                  {description}
                </SuiText>
                <div className='flex flex-col sm:flex-row mt-8 justify-center md:justify-start gap-4'>
                  {mainButton && (
                    <SuiButton
                      type='primary'
                      className='w-48'
                      path={mainButton.href}
                      segmentEvent={{
                        label: mainButton.text,
                        category: 'website-hero'
                      }}
                      target={mainButton.target}>
                      {mainButton.text}
                    </SuiButton>
                  )}
                  {secondaryButton && (
                    <SuiButton
                      type='secondary'
                      className='w-48'
                      path={secondaryButton.href}
                      segmentEvent={{
                        label: secondaryButton.text,
                        category: 'website-hero'
                      }}
                      target={secondaryButton.target}>
                      {secondaryButton.text}
                    </SuiButton>
                  )}
                  {!secondaryButton && gitButton?.text && (
                    <SuiButton
                      type='secondary'
                      className='w-48'
                      path={gitButton.href}
                      segmentEvent={{
                        label: gitButton.text,
                        category: 'website-hero'
                      }}
                      target={gitButton.target}>
                      <StrapiPicture
                        light={gitButton.lightIconPng}
                        dark={gitButton.darkIconPng}
                        width={20}
                        height={20}
                      />
                      {gitButton.text}
                    </SuiButton>
                  )}
                </div>
              </div>
              <div className='hidden md:flex w-6/12 justify-center'>
                <div className='mx-auto flex px-16 mt-4 max-w-full'>
                  {/* <StrapiImage
                    {...backgroundPng}
                    alt='ClickHouse is fast'
                    width={471}
                    height={360}
                    className='w-full max-w-full h-auto'
                  /> */}
                  <img
                    src='/images/clickhouse_oss.png'
                    alt='ClickHouse is fast'
                    width={471}
                    height={360}
                    className='w-full max-w-full h-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-neutral-0'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-24 px-4 sm:px-8 2xl:px-0 pt-16'>
            <SuiTitle type='h3' className='mb-7 !text-lg' color='c6'>
              {features1.title}
            </SuiTitle>
            <div className='feature-container'>
              {features1.items.map((feature) => (
                <FeatureItem
                  key={feature.iconSvg.hash}
                  icon={feature.iconSvg}
                  title={feature.title}
                  description={feature.description}
                  delay={100}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='flex w-full text-neutral-0 pb-20'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
            {features2.pretitle && (
              <SuiTitle type='h5' color='c6' className='mb-2'>
                {features2.pretitle}
              </SuiTitle>
            )}
            <SuiTitle type='h2' className='mb-16'>
              {features2.title}
            </SuiTitle>

            <div className='large-feature-container '>
              {features2.items.map((item) => (
                <FeatureItemLarge
                  key={item.title}
                  icon={item.iconSvg}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full pb-20'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
            {features3.pretitle && (
              <SuiTitle type='h5' className='mb-2' color='c6'>
                {features3.pretitle}
              </SuiTitle>
            )}
            <SuiTitle type='h2' className='mb-6'>
              {features3.mainItem.title}
            </SuiTitle>

            <div className='flex flex-col md:flex-row items-center'>
              <SuiText
                size='base'
                weight='medium'
                className='pt-4 md:pt-0 md:w-3/5 whitespace-pre-wrap'>
                {features3.mainItem.description}
              </SuiText>
              <div className='pt-4 md:pt-0 w-2/5 justify-center flex'>
                <StrapiImage {...features3.iconSvg} />
              </div>
            </div>

            <div className='flex flex-col md:flex-row md:space-x-12 pt-16'>
              {features3.items.map((feature) => (
                <div className='md:w-1/3' key={feature.title}>
                  <SuiText size='lg' weight='bold' className='mb-6'>
                    {feature.title}
                  </SuiText>
                  <SuiText color='secondary' size='base' weight='medium'>
                    {feature.description}
                  </SuiText>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full text-neutral-0 pb-20'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
            {features4.pretitle && (
              <SuiTitle type='h5' color='c6' className='mb-2'>
                {features4.pretitle}
              </SuiTitle>
            )}
            <SuiTitle type='h2' className='mb-12'>
              {features4.title}
            </SuiTitle>

            <div className='large-feature-container'>
              {features4.items.map((feature) => (
                <div key={feature.title}>
                  <SuiText size='lg' weight='bold' className='mb-6 !text-xl'>
                    {feature.title}
                  </SuiText>
                  <SuiText color='secondary' size='base' weight='medium'>
                    {feature.description}
                  </SuiText>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full pb-20'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='md:w-2/5 justify-center flex h-64 w-64'>
                <StrapiImage {...features5.iconSvg} className='h-full w-full' />
              </div>

              <div className='md:w-3/5'>
                {features5.pretitle && (
                  <SuiTitle type='h5' color='c6' className='mb-2'>
                    {features5.pretitle}
                  </SuiTitle>
                )}
                <SuiTitle type='h2' className='mb-6'>
                  {features5.title}
                </SuiTitle>
                <SuiText
                  size='lg'
                  weight='medium'
                  className='whitespace-pre-wrap mb-6'>
                  {features5.description}
                </SuiText>
              </div>
            </div>

            <div className='flex pt-16 flex-col'>
              <SuiTitle type='h2' className='mb-6'>
                {features5.second_title}
              </SuiTitle>
              <SuiText
                color='secondary'
                size='base'
                weight='medium'
                className='max-w-3xl'>
                {features5.second_description}
              </SuiText>

              <div className='flex flex-col md:flex-row pt-6 flex-wrap'>
                {features5.items.map((feature) => (
                  <BulletPoint
                    key={feature.text}
                    text={feature.text}
                    className='w-full md:w-1/2 lg:w-1/3'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <GetStarted platforms={platforms} />
      </Layout>
    </>
  )
}
