import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { findAll } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ComparisonProps } from '@/types/comparisons'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Tilt from 'react-parallax-tilt'

export const getStaticProps: GetStaticProps<ComparisonProps> =
  async function getStaticProps() {
    const { data } = await findAll('comparisons', {
      filters: {
        slug: {
          $eq: 'redshift'
        }
      },
      populate: [
        'painpoint',
        'paintpoint.customer.*',
        'painpoint.customer.description',
        'painpoint.customer.logo',
        'painpointsTitle',
        'painpointsIcon',
        'seo',
        'Testimonials',
        'Testimonials.*',
        'Testimonials.logo.*',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng',
        'image',
        'formTitle',
        'testimonialsTitle',
        'testimonialsIcon',
        'Content',
        'Content.customContent',
        'Content.customContent.Image',
        'Content.RelatedBlogs',
        'Content.RelatedBlogs.blog_posts',
        'Content.RelatedBlogs.blog_posts.*',
        'Content.RelatedBlogs.blog_posts.author',
        'Content.RelatedBlogs.blog_posts.thumbnailPng',
        'BigNumbers',
        'BigNumbers.*'
      ],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true
      }
    }

    const comparison = data[0]

    const seo = comparison.seo

    seo.path = '/comparison/redshift'
    seo.languages = ['en', 'ja']

    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        comparison,
        seo,
        newsLetterData,
        ...commonData
      }
    }
  }

export default function ComparisonPage({
  footerData,
  headerData,
  seo,
  comparison
}: ComparisonProps) {
  useGalaxyOnPage('redshiftComparisonPage')
  const formSuccessRef1 = useRef<HTMLDivElement | null>(null)
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative pt-16 lg:pb-24'>
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='w-full items-start gap-10 lg:grid lg:grid-cols-8 lg:gap-20'>
              <div className='lg:col-span-5'>
                <div className='mb-8 items-center md:flex md:justify-between md:gap-x-10'>
                  <div>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight text-neutral-0 md:mb-0 md:text-left md:text-5.5xl'>
                      {comparison.Title}
                    </h1>
                  </div>
                  <div>
                    {comparison.image && (
                      <StrapiImageUrl
                        {...comparison.image}
                        loading='eager'
                        className='mx-auto lg:mx-0'
                      />
                    )}
                  </div>
                </div>
                <div className='rich_content mb-12 mt-4 text-center text-base text-neutral-0 md:text-left'>
                  <Markdown className='text-lg'>
                    {comparison.HeroDescription}
                  </Markdown>
                </div>

                {comparison.BigNumbers && (
                  <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.4}
                    glareColor='rgba(251, 255, 70, 0.08)'
                    glarePosition='all'
                    className='mb-12 h-full'>
                    <div className='cui-card flex flex-col items-stretch gap-y-5 rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-3 shadow-card hover:shadow-lg lg:flex-row lg:divide-x lg:divide-neutral-700/80'>
                      {comparison.BigNumbers.map((bigNumber, index) => {
                        return (
                          <div className='flex-1 p-3 text-center' key={index}>
                            <p className='mb-2 text-5xl'>{bigNumber.Number}</p>
                            <p className='text-md text-primary-300'>
                              {bigNumber.Text}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </Tilt>
                )}
              </div>
              <div className='lg:col-span-3'>
                <div className='mb-12 lg:mb-0'>
                  <div className='lg:max-w-lg'>
                    <h3 className='mb-6 text-center font-basier text-xl font-light text-neutral-0'>
                      {comparison.formTitle}
                    </h3>
                    <>
                      {!formSuccess && (
                        <MarketoForm
                          formId={'1156'}
                          clearbitTracking={true}
                          onLoad={() => {
                            setFormLoaded(true)
                          }}
                          onSuccess={() => {
                            setFormSuccess(true)
                            // Delay needed to allow the ref to update before scrolling
                            setTimeout(() => {
                              formSuccessRef1.current?.scrollIntoView()
                            }, 10)

                            return false // Stops page from reloading
                          }}
                        />
                      )}

                      {!formLoaded && (
                        <div className='text-center'>Loading form...</div>
                      )}

                      {formSuccess && (
                        <div ref={formSuccessRef1}>
                          <h3 className='text-center text-2xl font-bold'>
                            Thank you for your submission!
                          </h3>
                          <p className='mt-2 text-center text-neutral-200'>
                            We will be in touch soon.
                          </p>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle -mt-16 xl:-mt-28'>
          <div className='relative z-40 mx-auto mt-4 max-w-4xl pb-0 pt-20 lg:mt-6'>
            <div className='mx-auto flex items-center gap-4 px-4 md:px-0'>
              <div className='container mx-auto max-w-4xl border-none px-6 2xl:px-0'>
                <div className='overflow-hidden rounded-xl'>
                  <ResponsiveEmbed html='<iframe src="https://www.youtube-nocookie.com/embed/8FUfyvoqDTg?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='-mt-1 bg-primary-300 py-12 lg:mt-0'>
          <div className='mx-auto max-w-2xl text-center text-neutral-900'>
            <p className='mb-6 text-2xl font-bold'>
              "Moving over to ClickHouse, we were basically able to cut that
              (Redshift) bill in half"
            </p>
            <p className='text-xl font-light text-neutral-725'>Brooke McKim</p>
            <p className='text-xl font-light text-neutral-725'>
              Co-founder and CTO, Vantage
            </p>
          </div>
        </div>
      </div>
      <div className='bg-primary-300 py-6'>
        <div className='mx-auto'>
          <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-6 text-center font-basier text-xl font-semibold leading-normal text-neutral-900 md:px-0'>
            Trusted by developers that work with data at{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content leading-8'>scale</span>
            </span>
          </div>
          <div className='section-container relative max-w-5xl pb-16'>
            <LogoCarousel logos={comparison.customerStories.logos} />
          </div>
        </div>
      </div>
      {comparison.painpointsTitle && (
        <div className='mx-auto mt-28 max-w-7xl px-4 md:px-8 2xl:px-0'>
          <div className='section-container bg-shadow-element yellow-shadow align-shadow-right container mx-auto flex flex-col items-center'>
            {comparison.painpointsIcon && (
              <StrapiImageUrl
                {...comparison.painpointsIcon}
                className='mb-4 fill-none'
              />
            )}
            <h2 className='text-center font-basier text-3xl font-semibold'>
              {comparison.painpointsTitle}
            </h2>
            <div className='mt-10 lg:mt-20'>
              <div className='grid grid-cols-1 gap-8'>
                {comparison.painpoint.map((painpoint, index) => {
                  return (
                    <CUICard key={index} className='p-6'>
                      <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                        <div className='flex flex-col items-start gap-10 lg:flex-row'>
                          <div className='w-full lg:w-2/3'>
                            <h3 className='mb-4 flex-grow text-center font-basier text-3xl font-semibold leading-tight text-neutral-100 lg:text-left'>
                              {painpoint.Title}
                            </h3>
                            <div className='rich_content text-neutral-0'>
                              <Markdown>{painpoint.Description}</Markdown>
                            </div>
                          </div>
                          {painpoint.customer && (
                            <div className='h-full w-full lg:w-1/3'>
                              <CUICard className='p-6'>
                                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                                  <div className='rich_content text-neutral-0'>
                                    <Image
                                      src='/images/Quote.svg'
                                      width={37}
                                      height={28}
                                      alt='Quote'
                                      className='mb-4'
                                    />{' '}
                                    <Markdown>
                                      {painpoint.customer.description as string}
                                    </Markdown>
                                    {painpoint.customer.logo && (
                                      <StrapiImageUrl
                                        {...painpoint.customer.logo}
                                      />
                                    )}
                                  </div>
                                </CUICard.Body>
                              </CUICard>
                            </div>
                          )}
                        </div>
                      </CUICard.Body>
                    </CUICard>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {comparison.testimonialsTitle && (
        <>
          <HRSeparator className='my-16 lg:my-24' />
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
              {comparison.testimonialsIcon && (
                <StrapiImageUrl
                  {...comparison.testimonialsIcon}
                  className='mb-4 fill-none'
                />
              )}
              <h2 className='text-center font-basier text-3xl font-semibold'>
                {comparison.testimonialsTitle}
              </h2>
            </div>
            <div className='mt-10 gap-3 md:columns-2 lg:mt-20 lg:columns-3'>
              {comparison.Testimonials.map((testimonial, index) => (
                <div
                  className='mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-6 shadow-card hover:bg-neutral-750'
                  key={index}>
                  <Link href={testimonial.href}>
                    <div className='flex h-full w-full flex-col justify-between space-y-12'>
                      <div className='text-left'>
                        {testimonial.logo && (
                          <StrapiImageUrl
                            {...testimonial.logo}
                            className='color-swap-no-hover mb-4 h-16 fill-none'
                          />
                        )}
                        <div className='space-y-4 text-neutral-0'>
                          <ReactMarkdown>
                            {testimonial.Description}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <HRSeparator className='my-16 lg:my-24' />
      <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
        {comparison.Content.map((content, index) => {
          return (
            <div key={index} className='mx-auto mb-10 max-w-7xl'>
              <h3 className='mb-4 text-2xl font-semibold'>
                {content.SectionTitle}
              </h3>
              {content.Description && (
                <div className='rich_content mb-6'>
                  <ReactMarkdown>{content.Description}</ReactMarkdown>
                </div>
              )}
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {content.customContent.length > 0 && (
                  <>
                    {content.customContent?.map((custom, index) => {
                      if (!custom.href) {
                        return null
                      }
                      return (
                        <Link
                          key={index}
                          href={custom.href}
                          target='_blank'
                          className={
                            'hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 hover:no-underline'
                          }>
                          <CUICard className='h-full'>
                            <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                              {custom.Image && (
                                <StrapiImageUrl
                                  {...custom.Image}
                                  sizes='medium'
                                  alt={custom.Image.alternativeText}
                                  className='w-full rounded-t-lg xl:h-52 xl:object-cover'
                                  width={100}
                                  height={100}
                                />
                              )}
                              <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                                <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                                  {custom.Category}
                                </div>
                                <div className='cursor-pointer font-basier text-xl font-medium leading-tight text-neutral-100'>
                                  {custom.Title}
                                </div>
                              </div>
                            </CUICard.Body>
                            <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                              {custom.Footer}
                            </CUICard.Footer>
                          </CUICard>
                        </Link>
                      )
                    })}
                  </>
                )}
                {content.RelatedBlogs.length > 0 && (
                  <>
                    {content.RelatedBlogs.flatMap((custom) =>
                      custom.blog_posts.map((blog) => (
                        <BlogPost key={blog.id} {...blog} />
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <HRSeparator className='my-16 lg:my-24' />
      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='mb-12 text-center font-basier text-xl font-semibold lg:mb-16'>
            Contact us for help with your migration
          </h2>
          <div className='mx-auto max-w-lg'>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1156'}
                  clearbitTracking={true}
                  onLoad={() => {
                    setFormLoaded(true)
                  }}
                  onSuccess={() => {
                    setFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      formSuccessRef.current?.scrollIntoView()
                    }, 10)

                    return false // Stops page from reloading
                  }}
                />
              )}

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <h3 className='text-center text-2xl font-bold'>
                    Thank you for your submission!
                  </h3>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </Layout>
  )
}
