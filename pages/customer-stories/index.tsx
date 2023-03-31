import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../components/sui'
import { UseCase } from '../../components/use_case'
import { findOne } from '../../lib/api/strapi'
import GetStarted from '../../components/GetStarted'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'
import { CustomerStoriesData } from '../../types/customerStories'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import Image from 'next/image'
import { CUIButton } from '../../components/ClickUI'
import HRSeparator from '../../components/HRSeparator'
import { CheckIcon } from '@heroicons/react/outline'
import GiveItAGo from '../../components/GiveItAGo'

export const getStaticProps: GetStaticProps<CustomerStoriesData> =
  async function getStaticProps() {
    const result = await findOne('use-case', {
      populate: [
        'hero',
        'hero.testimonials',
        'hero.testimonials.avatar',
        'useCases',
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

type TestimonialsJson = {
  id: number
  logo: string
  category: string
  text: string
  customer: string
  width: number
  height: number
}
const testimonialsJson: Array<TestimonialsJson> = [
  {
    id: 1,
    logo: '/images/use-cases/posthog-logo.svg',
    category: 'Analytics',
    text: 'ClickHouse Cloud has made it absolutely effortless to use ClickHouse for data analysis while not having to spend any time managing cluster shards/replicas or worrying about provisioning on the storage or cpu side.',
    customer: 'Posthog',
    width: 155,
    height: 30
  },
  {
    id: 2,
    logo: '/images/use-cases/instabug-logo.png',
    category: 'Observability',
    text: 'At Instabug, we rely on ClickHouse to help power our teal-time observability solutions that developers rely on. ClickHouse Cloud reduced our operational overhead and cost of managing ClickHouse ourselves allowing us to focus on our users.',
    customer: 'Instabug',
    width: 152,
    height: 32
  },
  {
    id: 3,
    logo: '/images/use-cases/rokt-logo.png',
    category: 'Analytics',
    text: 'Rokt has been an eager partner of ClickHouse as we modernize our analytics stack. By offloading operations to the experts our developers are focused on delivering the best experience possible while the business scales. We we are thrilled to see the path ClickHouse is forging.',
    customer: 'Rokt',
    width: 90,
    height: 25
  },
  {
    id: 4,
    logo: '/images/use-cases/darwinium-logo.png',
    category: 'Security and Fraud',
    text: 'Darwinium chose Clickhouse as its database engine of choice because it is fast, flexible, rich in capabilities and cloud-ready. It provides the functionality we need to support real time user journey orchestration for fraud and security teams in global digital businesses.',
    customer: 'Darwinium',
    width: 180,
    height: 34
  },
  {
    id: 5,
    logo: '/images/use-cases/synq-logo.png',
    category: 'Analytics',
    text: 'At Synq we have very high demands of both ingestion and query performance. After a thorough vendor selection process, only ClickHouse Cloud was able to meet those requirements with ease, while providing the powerful preprocessing logic our solution requires.',
    customer: 'Synq',
    width: 100,
    height: 100
  },
  {
    id: 6,
    logo: '/images/use-cases/adevinta-logo.png',
    category: 'Cloud',
    text: "Amazing to have been one of the first users of ClickHouse Serverless Cloud. It's scalable and blazingly fast ClickHouse in the cloud with simple onboarding and excellent support. Great experience.",
    customer: 'Adevinta',
    width: 134,
    height: 30
  }
]

function CustomerStoriesPage({
  hero: { title, description, testimonials },
  spotlight,
  useCases,
  useCaseItems,
  seo,
  platforms,
  footerData
}: CustomerStoriesData) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='pt-10'>
        <div className='flex container mx-auto max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-6 max-w-screen-sm'>
            <h1 className='text-5.5xl font-semibold mb-16 font-basier'>
              Use cases
            </h1>
          </div>
          <div>
            <div className='grid xl:grid-cols-2 gap-x-20'>
              <div className='relative xl:max-w-xl text-center xl:text-left'>
                <div className='text-4xl font-semibold relative font-basier leading-snug'>
                  <Image
                    src='/images/Quote.svg'
                    width={35}
                    height={35}
                    alt='Quote'
                    className='inline-block -mt-10'
                  />{' '}
                  Last time I checked, we read 2&nbsp;
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>billion</span>
                  </span>{' '}
                  rows a second of CDN access&nbsp;logs
                </div>
                <p className='mt-6 text-neutral-200 text-base'>
                  We were really not doing well with ingesting all the logs that
                  we have because it's big data, it's all the users of Disney+
                  generating that data. Ever since we chose ClickHouse, it's
                  been going well.
                </p>
                <div className='xl:flex justify-between items-center mt-12'>
                  <div className='flex-0'>
                    <p className='text-base font-semibold'>Roni Lazimi</p>
                    <p className='text-base font-inconsolata text-primary-300'>
                      Software Engineer @ Disney+ Streaming
                    </p>
                  </div>
                  <div className='mt-4 xl:mt-0'>
                    <CUIButton
                      type='secondary'
                      className='w-auto mx-auto'
                      target='_self'
                      href='/blog/nyc-meetup-report-high-speed-content-distribution-analytics-for-streaming-platforms'
                      iconRight={<ChevronRightIcon className='w-4 h-4' />}>
                      Learn more
                    </CUIButton>
                  </div>
                </div>
              </div>
              <div className='w-full mt-16 xl:mt-0'>
                <div className='w-full relative'>
                  <div className='bg-primary-300 max-w-full lg:skew-x-0 lg:inset-3 lg:absolute lg:transform lg:-right-10 lg:-top-3 rounded-md'></div>
                  <iframe
                    src='https://www.youtube.com/embed/CVVp6N8Xeoc?rel=0'
                    frameBorder='0'
                    allow='autoplay; fullscreen; picture-in-picture'
                    allowFullScreen
                    className='rounded-md h-fit w-full top-0 left-0 relative aspect-video'
                    title='Getting Started.mp4'></iframe>
                </div>
              </div>
            </div>
          </div>
          <HRSeparator className='my-16' />
          <div className='mx-auto mb-6'>
            <Image
              src='/images/case-studies-icon.svg'
              width={72}
              height={72}
              alt='Case studies icon'
              className='mx-auto mb-6'
            />{' '}
            <h2 className='text-3xl font-bold text-center font-basier'>
              Case studies
            </h2>
          </div>
          <div>
            <div
              className='flex mt-10 space-x-12 relative md:min-h-fit'
              id={spotlight.anchorId}>
              <SuiPanel
                color='bg-neutral-725'
                border
                padding='xl'
                className='border-l-4 border-l-primary-300'>
                <div className='flex flex-col lg:flex-row items-center justify-between'>
                  <div className='flex flex-col w-full md:w-2/3 xl:max-w-3xl'>
                    <p
                      className='text-2xl font-semibold mb-8 font-basier
                    '>
                      Uber moved its logging platform to ClickHouse increasing
                      developer productivity and overall reliability
                    </p>
                    <ul className='space-y-4'>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='stroke-1 w-6 h-6 text-primary-300' />
                          <span>3x data compression</span>
                        </p>
                      </li>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='stroke-1 w-6 h-6 text-primary-300' />
                          <span>10x performance increase</span>
                        </p>
                      </li>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='stroke-1 w-6 h-6 text-primary-300' />
                          <span>½ the reduction in hardware cost</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className='md:block w-full max-w-xs mt-10 lg:mt-0'>
                    <div
                      className='mx-auto w-full
                    '>
                      <Image
                        className='mx-auto'
                        alt={spotlight.companyName}
                        src={spotlight.darkLogoPng.url}
                        width={
                          spotlight.darkLogoPng.width
                            ? spotlight.darkLogoPng.width
                            : 180
                        }
                        height={
                          spotlight.darkLogoPng.height
                            ? spotlight.darkLogoPng.height
                            : 63
                        }
                      />

                      {spotlight.ctaButton && (
                        <div className='mt-8 mx-auto'>
                          <CUIButton
                            type='secondary'
                            className='w-auto mx-auto'
                            target={spotlight.ctaButton.target}
                            href={spotlight.ctaButton.href}
                            iconRight={
                              <ChevronRightIcon className='w-4 h-4' />
                            }>
                            Read use case
                          </CUIButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SuiPanel>
            </div>
          </div>
        </div>
      </div>

      <div className='text-neutral-0 w-full pb-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto mt-12 gap-10 px-4 md:px-8 2xl:px-0'>
            {useCaseItems.map((useCase, index) => (
              <UseCase
                id={useCase.anchorId}
                key={`usecase-${index}`}
                lightLogo={useCase.lightLogoPng}
                darkLogo={useCase.darkLogoPng}
                description={useCase.description}
                bullets={useCase.bullets}
                path={useCase?.ctaButton?.href}
                btnText={useCase?.ctaButton?.text}
                target={useCase?.ctaButton?.target}
              />
            ))}
          </div>
        </div>
      </div>
      <HRSeparator className='my-16' />
      <div className='mx-auto mb-6'>
        <Image
          src='/images/what-our-customers-say.svg'
          width={72}
          height={72}
          alt='What our customers say'
          className='mx-auto mb-6'
        />{' '}
        <h2 className='text-3xl font-semibold text-center mb-20 font-basier'>
          What our customers say
        </h2>
      </div>
      <div className='max-w-7xl mx-auto pb-20 px-4 md:px-8 2xl:px-0'>
        <div className='grid lg:grid-cols-3 gap-y-6 gap-x-6 bg-shadow-element-center red-shadow'>
          {testimonialsJson.map((testimonial) => (
            <div
              className='flex w-full flex-col text-center px-4 bg-neutral-900/50 border border-neutral-725 rounded-lg p-6 relative shadow-card hover:shadow-lg'
              key={testimonial?.id}>
              <div className='w-full h-full flex flex-col justify-between space-y-12'>
                <div className='text-left'>
                  <p className='text-primary-300 font-inconsolata mb-4'>
                    {testimonial?.category}
                  </p>
                  <p className='text-neutral-200 text-base'>
                    &ldquo;{testimonial?.text}&ldquo;
                  </p>
                </div>
                <div>
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.category}
                    width={testimonial.width}
                    height={testimonial.height}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HRSeparator />
      <div className='my-16'>
        <h2 className='text-center font-basier text-neutral-100 font-basier text-4xl font-semibold mb-16'>
          Ready to give it a go?
        </h2>
        <div className='max-w-7xl mx-auto px-4 md:px-8 2xl:px-0'>
          <GiveItAGo />
        </div>
      </div>
    </Layout>
  )
}

export default CustomerStoriesPage
