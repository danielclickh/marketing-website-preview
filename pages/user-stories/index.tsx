import { useState } from 'react'
import { SuiPanel } from '../../components/sui'
import { UseCase } from '../../components/use_case'
import { findAll, findOne } from '../../lib/api/strapi'

import { ChevronRightIcon } from '@heroicons/react/solid'
import { UseCasesData } from '../../types/useCases'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import Image from 'next/image'
import { CUIButton } from '../../components/ClickUI'
import HRSeparator from '../../components/HRSeparator'
import { CheckIcon } from '@heroicons/react/outline'
import GiveItAGo from '../../components/GiveItAGo'
import BlogPost from '../../components/BlogPostList/BlogPost'
import HomepageCustomerVideos from '../../components/HomepageVideos'

export const getStaticProps: GetStaticProps<UseCasesData> =
  async function getStaticProps() {
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
    result.seo.path = '/user-stories'
    const blogsParams = {
      filters: {
        category: {
          $eqi: 'customer stories'
        }
      },
      sort: ['date:DESC', 'publishedAt:DESC'],
      populate: ['thumbnailPng', 'author'],
      fields: ['category', 'title', 'slug'],
      pagination: { limit: 3 }
    }
    const { data: customerStories } = await findAll('blog-posts', blogsParams)
    const commonProps = await getCommonProps()
    return {
      props: {
        ...result,
        customerStories,
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
    logo: '/images/use-cases/instabug.svg',
    category: 'Observability',
    text: 'At Instabug, we rely on ClickHouse to help power our real-time observability solutions that developers rely on. ClickHouse Cloud reduced our operational overhead and cost of managing ClickHouse ourselves allowing us to focus on our users.',
    customer: 'Instabug',
    width: 189,
    height: 33
  },
  {
    id: 3,
    logo: '/images/use-cases/rokt.svg',
    category: 'Analytics',
    text: 'Rokt has been an eager partner of ClickHouse as we modernize our analytics stack. By offloading operations to the experts our developers are focused on delivering the best experience possible while the business scales. We we are thrilled to see the path ClickHouse is forging.',
    customer: 'Rokt',
    width: 115,
    height: 32
  },
  {
    id: 4,
    logo: '/images/use-cases/darwinium-logo.png',
    category: 'Security and Fraud',
    text: 'Darwinium chose ClickHouse as its database engine of choice because it is fast, flexible, rich in capabilities and cloud-ready. It provides the functionality we need to support real time user journey orchestration for fraud and security teams in global digital businesses.',
    customer: 'Darwinium',
    width: 180,
    height: 34
  },
  {
    id: 5,
    logo: '/images/use-cases/synq-logo.png',
    category: 'ClickHouse Cloud',
    text: 'At Synq we have very high demands of both ingestion and query performance. After a thorough vendor selection process, only ClickHouse Cloud was able to meet those requirements with ease, while providing the powerful preprocessing logic our solution requires.',
    customer: 'Synq',
    width: 106,
    height: 40
  },
  {
    id: 6,
    logo: '/images/use-cases/adevinta-logo.png',
    category: 'ClickHouse Cloud',
    text: "Amazing to have been one of the first users of ClickHouse Serverless Cloud. It's scalable and blazingly fast ClickHouse in the cloud with simple onboarding and excellent support. Great experience.",
    customer: 'Adevinta',
    width: 134,
    height: 30
  },

  {
    id: 7,
    logo: '/images/use-cases/minted-logo.png',
    category: 'ClickHouse Cloud',
    text: 'We use ClickHouse Cloud to monitor millions of real-time web performance data points, to ensure we’re getting faster all the time. The platform delivers fast and reliable data management, while also proving to be cost efficient and user-friendly.',
    customer: 'Minted',
    width: 123,
    height: 32
  },
  {
    id: 8,
    logo: '/images/use-cases/washington-post-logo.svg',
    category: 'Analytics',
    text: 'ClickHouse Cloud Private Preview has allowed us to replace a batch analytics pipeline with one that is near-real time and costs less to run without having to manage or scale a ClickHouse cluster ourselves.',
    customer: 'The Washington Post',
    width: 206,
    height: 32
  },
  {
    id: 9,
    logo: '/images/use-cases/airtory-logo.png',
    category: 'Analytics',
    text: 'Airtory needed a fast, scalable and affordable data engine to power our dynamic creatives, and ClickHouse was the perfect solution for this. The ease of the ClickHouse Cloud helped us ramp up quickly and offer powerful insights for our clients into their marketing campaigns giving them a great ROI.',
    customer: 'Airtory',
    width: 85,
    height: 32
  },

  {
    id: 10,
    logo: '/images/use-cases/calibre-logo.svg',
    category: 'Analytics',
    text: 'ClickHouse Cloud gave us the confidence to deploy ClickHouse and infinitely have a scalable serverless analytics database.',
    customer: 'Calibre',
    width: 144,
    height: 32
  },
  {
    id: 11,
    logo: '/images/use-cases/forefront-logo.png',
    category: 'ClickHouse Cloud',
    text: "The team truly delivered on the fully managed ClickHouse product I've been looking for. The platform makes it trivial to spin up and connect to a cluster, and removes all concern around managing underlying infrastructure. I would highly recommend this product.",
    customer: 'Forefront',
    width: 221,
    height: 32
  }
]

function CustomerStoriesPage({
  spotlight,
  useCaseItems,
  seo,
  customerStories,
  headerData,
  footerData
}: UseCasesData) {
  const [visibleTestimonials, setVisibleTestimonials] = useState(6)

  const loadMore = () => {
    setVisibleTestimonials((prevValue) => prevValue + 6)
  }
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
          <div className='mx-auto flex max-w-screen-sm flex-col pt-6 text-center'>
            <h1 className='mb-16 font-basier text-5.5xl font-semibold'>
              User stories
            </h1>
          </div>
          <div>
            <div className='grid gap-x-20 lg:grid-cols-2'>
              <div className='relative text-center lg:text-left xl:max-w-xl'>
                <div className='relative font-basier text-4xl font-semibold leading-snug'>
                  <Image
                    src='/images/Quote.svg'
                    width={35}
                    height={35}
                    alt='Quote'
                    className='-mt-10 inline-block'
                  />{' '}
                  There is that feeling of new tech where everything just feels
                  like it's going right.
                </div>
                <p className='mt-6 text-base text-neutral-200'>
                  We were using Postgres, but there was a moment in time when we
                  hit the 64TB database limit and we couldn't read or write fast
                  enough. We prototyped in ClickHouse Cloud in a week and we
                  were able to ingest data 5 to 6 times faster than Postgres. We
                  saved 10x in cost.
                </p>
                <div className='mt-12 items-center justify-between xl:flex'>
                  <div className='flex-0'>
                    <p className='text-base font-semibold'>Harlow Ward</p>
                    <p className='font-inconsolata text-base text-primary-300'>
                      Co-founder and CTO, Clearbit
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-16 w-full xl:mt-0'>
                <div className='relative w-full'>
                  <div className='max-w-full rounded-md bg-primary-300 lg:absolute lg:inset-3 lg:-right-10 lg:-top-3 lg:skew-x-0 lg:transform'></div>
                  <div className='relative top-0 left-0 aspect-video h-fit w-full rounded-md'>
                    <HomepageCustomerVideos
                      videos={[
                        {
                          videoId: '863656379',
                          type: 'vimeo',
                          vimeoCode: 'ec5de7be6d',
                          image: '/images/clearbit-tile.png'
                        }
                      ]}
                    />
                  </div>
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
            <h2 className='text-center font-basier text-3xl font-bold'>
              Case studies
            </h2>
          </div>
          <div>
            <div
              className='relative mt-10 flex space-x-12 md:min-h-fit'
              id={spotlight.anchorId}>
              <SuiPanel
                color='bg-neutral-725'
                border
                padding='xl'
                className='border-l-4 border-l-primary-300'>
                <div className='flex flex-col items-center justify-between lg:flex-row'>
                  <div className='flex w-full flex-col md:w-2/3 xl:max-w-3xl'>
                    <p
                      className='mb-8 font-basier text-2xl font-semibold
                    '>
                      Uber moved its logging platform to ClickHouse increasing
                      developer productivity and overall reliability
                    </p>
                    <ul className='space-y-4'>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='h-6 w-6 stroke-1 text-primary-300' />
                          <span>3x data compression</span>
                        </p>
                      </li>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='h-6 w-6 stroke-1 text-primary-300' />
                          <span>10x performance increase</span>
                        </p>
                      </li>
                      <li>
                        <p className='flex items-center space-x-3'>
                          <CheckIcon className='h-6 w-6 stroke-1 text-primary-300' />
                          <span>½ the reduction in hardware cost</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className='mt-10 w-full max-w-xs md:block lg:mt-0'>
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
                        <div className='mx-auto mt-8'>
                          <CUIButton
                            type='secondary'
                            className='group mx-auto w-auto'
                            target={spotlight.ctaButton.target}
                            href={spotlight.ctaButton.href}
                            iconRight={
                              <ChevronRightIcon
                                height='18'
                                className='pt-0.5 transition group-hover:translate-x-1/2'
                              />
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

      <div className='w-full pb-6 text-neutral-0'>
        <div className='mx-auto max-w-7xl'>
          <div className='mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 2xl:px-0'>
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
        <h2 className='mb-20 text-center font-basier text-3xl font-semibold'>
          What our customers say
        </h2>
      </div>
      <div className='mx-auto max-w-7xl px-4 pb-24 md:px-8 2xl:px-0'>
        <div className='bg-shadow-element-center red-shadow grid gap-y-6 gap-x-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonialsJson.slice(0, visibleTestimonials).map((testimonial) => (
            <div
              className='animate-fade-in relative flex w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:shadow-lg'
              key={testimonial?.id}>
              <div className='flex h-full w-full flex-col justify-between space-y-12'>
                <div className='text-left'>
                  <Image
                    src='/images/Quote.svg'
                    width={35}
                    height={35}
                    alt='Quote'
                    className='mb-4'
                  />{' '}
                  <p className='text-base text-neutral-200'>
                    {testimonial?.text}
                  </p>
                </div>
                <div>
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.category}
                    width={testimonial.width}
                    height={testimonial.height}
                    className='h-8 w-auto'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleTestimonials < testimonialsJson.length && (
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
      <HRSeparator />
      <div className='section-container my-24'>
        <div className='mx-auto mb-14'>
          <Image
            src='/images/use-cases/recent-customer-stories-icon.svg'
            width={72}
            height={72}
            alt='Case studies icon'
            className='mx-auto mb-6'
          />{' '}
          <h2 className='text-center font-basier text-3xl font-bold'>
            Recent customer stories
          </h2>
        </div>
        <div className='flex w-full flex-col gap-y-6 md:grid md:grid-cols-3 md:gap-x-16 md:gap-y-0 '>
          {customerStories.map((blog) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
        <CUIButton
          type='secondary'
          href='/blog?category=customer-stories'
          linkClass='mx-auto mt-10 w-fit block'>
          View all
        </CUIButton>
      </div>
      <HRSeparator />
      <div className='my-24'>
        <h2 className='mb-16 text-center font-basier text-4xl font-semibold text-neutral-100'>
          Ready to give it a go?
        </h2>
        <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
          <GiveItAGo />
        </div>
      </div>
    </Layout>
  )
}

export default CustomerStoriesPage
