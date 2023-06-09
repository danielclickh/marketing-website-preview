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
import ReactMarkdown from 'react-markdown'
import HRSeparator from '../../../components/HRSeparator'
import ContactForm from '../../../components/ContactForm'
import { StrapiImage } from '../../../components/StrapiElements'
import LogoCarousel from '../../../components/LogoCarousel'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import BlogPost from '../../../components/BlogPostList/BlogPost'
import Link from 'next/link'

export const getStaticProps: GetStaticProps<ComparisonProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('comparisons', {
      filters: {
        slug: {
          $eq: slug
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
        'Content.RelatedBlogs.blog_posts.thumbnailPng'
      ],
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
        <div className='relative pt-16 lg:pb-24 '>
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='items-start justify-between gap-10 lg:flex lg:grid-cols-2 lg:gap-20'>
              <div className='lg:w-2/3'>
                <div className='items-center md:flex'>
                  <h1 className='mb-6 text-center font-basier text-5xl font-semibold leading-tight text-neutral-200 md:text-left'>
                    {comparison.Title}
                  </h1>
                  {comparison.image && (
                    <StrapiImage {...comparison.image} className='mx-auto' />
                  )}
                </div>
                <div className='rich_content mt-4 mb-12 text-base text-neutral-200'>
                  <ReactMarkdown children={comparison.HeroDescription} />
                </div>
              </div>
              <div>
                <div className='mb-12 lg:mb-0'>
                  <div className='lg:max-w-lg'>
                    <h3 className='mb-6 text-center font-basier text-2xl font-light'>
                      {comparison.formTitle}
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
                    <div className='rich_content mt-4 text-center text-sm'>
                      <ReactMarkdown
                        children='By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {comparison.customerStories.title && (
          <div className='relative mb-16'>
            <div className='inset-0 mx-auto h-16 max-w-7xl skew-y-2 transform bg-primary-300 lg:max-h-96'></div>
            <div className='relative z-10 mx-auto -mt-10 max-w-7xl bg-primary-300'>
              <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0 '>
                <div className='flip-selection mx-auto flex flex-col text-center'>
                  <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-6 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                    {comparison.customerStories.title}{' '}
                    <span className='tilted tilted-black'>
                      <span className='tilted-content leading-8'>
                        {comparison.customerStories.popText}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-10 md:gap-x-14'>
                <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
                <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
                <LogoCarousel
                  logos={comparison.customerStories.logos}
                  speedClass1='animate-marqueeLeft'
                  speedClass2='animate-marqueeLeft2'
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {comparison.testimonialsTitle && (
        <div className='mx-auto mt-28 max-w-7xl px-4 md:px-8 2xl:px-0'>
          <div className='section-container bg-shadow-element yellow-shadow align-shadow-right container mx-auto flex flex-col items-center'>
            {comparison.painpointsIcon && (
              <StrapiImage
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
                            <div className='rich_content text-sm  text-neutral-200'>
                              <ReactMarkdown children={painpoint.Description} />
                            </div>
                          </div>
                          {painpoint.customer && (
                            <div className='h-full w-full lg:w-1/3'>
                              <CUICard className='p-6'>
                                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                                  <div className='rich_content text-sm text-neutral-200'>
                                    <Image
                                      src='/images/Quote.svg'
                                      width={37}
                                      height={28}
                                      alt='Quote'
                                      className='mb-4'
                                    />{' '}
                                    <ReactMarkdown
                                      children={
                                        painpoint.customer.description as string
                                      }
                                    />
                                    {painpoint.customer.logo && (
                                      <StrapiImage
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
                <StrapiImage
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
                  className='animate-fade-in mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-6 shadow-card hover:bg-neutral-750'
                  key={index}>
                  <Link href={testimonial.href}>
                    <div className='flex h-full w-full flex-col justify-between space-y-12'>
                      <div className='text-left'>
                        {testimonial.logo && (
                          <StrapiImage
                            {...testimonial.logo}
                            className='color-swap-no-hover mb-4 h-16  fill-none'
                          />
                        )}
                        <div className='rich-content-comparisons text-sm text-neutral-200'>
                          <ReactMarkdown children={testimonial.Description} />
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
                  <ReactMarkdown children={content.Description} />
                </div>
              )}
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {content.customContent.length > 0 && (
                  <>
                    {content.customContent?.map((custom, index) => {
                      return (
                        <Link
                          key={index}
                          href={custom.href}
                          target='_blank'
                          className={` hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1  hover:no-underline`}>
                          <CUICard className='h-full'>
                            <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                              {custom.Image && (
                                <StrapiImage
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
                                <div className='cursor-pointer font-basier text-xl font-medium leading-tight  text-neutral-100'>
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
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto  flex  flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='mb-12 text-center font-basier text-3xl font-semibold lg:mb-16'>
            Contact us for help with your migration
          </h2>
          <div className='mx-auto max-w-lg'>
            {' '}
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
            <div className='rich_content mt-4 text-center text-sm'>
              <ReactMarkdown
                children='By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).'
              />
            </div>
          </div>
        </div>
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
