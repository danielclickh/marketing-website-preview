import iconPlay from '../assets/icon-play.svg'
import Accordion from '@/components-cleaned/Accordion'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LogoAnnouncementLink from '@/components/LogoAnnouncementLink'
import Modal from '@/components/Modal'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import Bullseye from '@/components/icons/Bullseye'
import Clock from '@/components/icons/Clock'
import Coins from '@/components/icons/Coins'
import FileDashed from '@/components/icons/FileDashed'
import Globe from '@/components/icons/Globe'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { LearnProps } from '@/types/learn'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const data = await findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })
    return {
      props: {
        seo: {
          title: 'ClickHouse Certification | ClickHouse',
          description:
            'Elevate your career to industry-leading heights by passing our official ClickHouse Certification exam.',
          path: '/learn/certification',
          imageUrl:
            'https://clickhouse.com/images/clickhouse-certification-og.png'
        },
        ...data,
        ...commonProps
      }
    }
  }

type FeatureProps = {
  label?: string
  icon: JSX.Element
  value: string
}

function Feature(props: FeatureProps) {
  return (
    <div className='flex items-center gap-4 rounded border border-neutral-700/80 bg-neutral-900/50 p-4 text-white shadow-card'>
      <div className='flex flex-shrink-0 flex-grow-0 flex-col items-center justify-center self-stretch border-r border-neutral-700/80 pr-4 text-primary-300'>
        <div className='max-w-[26px]'>{props.icon}</div>
      </div>
      <div className='flex flex-grow flex-wrap items-center md:gap-4'>
        {props.label && (
          <div className='w-full flex-shrink-0 flex-grow-0 font-bold md:w-auto md:font-normal'>
            {props.label}
          </div>
        )}
        <div
          className={
            'ml-auto w-full' +
            (props.label
              ? ' opacity-75 md:w-auto md:max-w-[340px] md:text-right md:opacity-100'
              : '')
          }>
          {props.value}
        </div>
      </div>
    </div>
  )
}

type CheckListItemProps = {
  value: string
}

function CheckListItem(props: CheckListItemProps) {
  return (
    <div className='mt-2 flex items-start gap-2'>
      <svg
        className='mt-0.5 flex-shrink-0 flex-grow-0 text-primary'
        style={{ width: '20px', height: 'auto' }}
        width='17'
        height='18'
        viewBox='0 0 17 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12.2938 6.61787C12.3519 6.67592 12.398 6.74485 12.4294 6.82072C12.4609 6.89659 12.4771 6.97792 12.4771 7.06006C12.4771 7.14219 12.4609 7.22352 12.4294 7.2994C12.398 7.37527 12.3519 7.4442 12.2938 7.50225L7.91875 11.8772C7.86071 11.9354 7.79178 11.9815 7.7159 12.0129C7.64003 12.0444 7.5587 12.0605 7.47657 12.0605C7.39443 12.0605 7.3131 12.0444 7.23723 12.0129C7.16135 11.9815 7.09242 11.9354 7.03438 11.8772L5.15938 10.0022C5.0421 9.88497 4.97622 9.72591 4.97622 9.56006C4.97622 9.39421 5.0421 9.23515 5.15938 9.11787C5.27665 9.0006 5.43571 8.93471 5.60157 8.93471C5.76742 8.93471 5.92648 9.0006 6.04375 9.11787L7.47657 10.5515L11.4094 6.61787C11.4674 6.55976 11.5364 6.51366 11.6122 6.48221C11.6881 6.45076 11.7694 6.43457 11.8516 6.43457C11.9337 6.43457 12.015 6.45076 12.0909 6.48221C12.1668 6.51366 12.2357 6.55976 12.2938 6.61787ZM16.8516 8.93506C16.8516 10.542 16.375 12.1129 15.4823 13.4491C14.5895 14.7852 13.3205 15.8266 11.8359 16.4416C10.3512 17.0565 8.71755 17.2174 7.14146 16.9039C5.56536 16.5904 4.11763 15.8166 2.98132 14.6803C1.84502 13.544 1.07119 12.0963 0.757686 10.5202C0.444181 8.94407 0.605083 7.31041 1.22004 5.82576C1.83501 4.34111 2.87641 3.07215 4.21256 2.17937C5.54871 1.28658 7.11959 0.810059 8.72657 0.810059C10.8808 0.812333 12.9461 1.66909 14.4693 3.19233C15.9925 4.71557 16.8493 6.78087 16.8516 8.93506ZM15.6016 8.93506C15.6016 7.57531 15.1984 6.2461 14.4429 5.11551C13.6875 3.98493 12.6138 3.10374 11.3575 2.58339C10.1013 2.06303 8.71894 1.92689 7.38532 2.19216C6.0517 2.45743 4.82669 3.11221 3.86521 4.0737C2.90372 5.03519 2.24894 6.26019 1.98367 7.59381C1.71839 8.92743 1.85454 10.3098 2.37489 11.566C2.89525 12.8222 3.77643 13.896 4.90702 14.6514C6.03761 15.4068 7.36682 15.8101 8.72657 15.8101C10.5493 15.808 12.2968 15.083 13.5856 13.7941C14.8745 12.5053 15.5995 10.7578 15.6016 8.93506Z'
          fill='currentColor'
        />
      </svg>
      {props.value}
    </div>
  )
}

export default function CertificationPage({
  footerData,
  headerData,
  customerStories,
  seo
}: LearnProps) {
  useGalaxyOnPage('certificationPage')

  const [watchWebinar, setWatchWebinar] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='bg-grid'>
        <div className='section-container flex flex-row flex-wrap items-start justify-between gap-x-6 gap-y-16 py-16 md:py-20 lg:flex-nowrap'>
          {/* Content column */}
          <div className='w-full space-y-6 text-center lg:max-w-[600px] lg:text-left'>
            <p className='text-base font-bold text-primary-300'>
              <Link href='/learn' className='hover:underline'>
                Training
              </Link>{' '}
              / <span>Certification</span>
            </p>
            <SuiTitle type='h1' color='white' className='md:!text-6xl'>
              ClickHouse&nbsp;Certified Developer&nbsp;Exam
            </SuiTitle>
            <SuiText color='secondary'>
              Elevate your career to industry-leading heights! Take our official{' '}
              <br className='hidden sm:block' />
              ClickHouse Certification exam to validate your ClickHouse
              expertise.
            </SuiText>
            <div className='!my-8 flex flex-wrap justify-center gap-4 lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                className='px-8'
                href='https://buy.stripe.com/14keYf7q55tn2Jy001'
                onClick={useGalaxyOnClick(
                  'certificationPage.hero.purchaseCertificationBusinessSelect'
                )}
                target='_blank'>
                Purchase as business
              </CUIButton>
              <CUIButton
                type='secondary-dark'
                size='lg'
                className='px-8'
                href='https://buy.stripe.com/3csbM36m1cVPgAo147'
                onClick={useGalaxyOnClick(
                  'certificationPage.hero.purchaseCertificationPersonalSelect'
                )}
                target='_blank'>
                Purchase as individual
              </CUIButton>
            </div>
            <LogoAnnouncementLink
              mode='dark'
              className='mx-auto max-w-max bg-white/5 lg:ml-0 lg:max-w-none'
              logo={{
                src: iconPlay,
                width: 44,
                height: 44,
                alt: 'Play'
              }}
              href='#'
              onClick={(event) => {
                event.preventDefault()
                setWatchWebinar(true)
              }}>
              Preparing for the ClickHouse Certified Developer exam
              <br />
              <span className='text-primary-300 group-hover:underline'>
                Watch the webinar
              </span>
            </LogoAnnouncementLink>
            <Modal isOpen={watchWebinar} onClose={() => setWatchWebinar(false)}>
              <div className='w-full flex-shrink-0'>
                <h3 className='mb-6 mt-1 pr-20 text-2xl md:-mt-1'>
                  Preparing for the ClickHouse Certified Developer exam
                </h3>
                {watchWebinar && (
                  <ResponsiveEmbed>
                    <iframe
                      src='https://www.youtube-nocookie.com/embed/bLXCYhf5G8Q?rel=0&autoplay=1'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowFullScreen
                    />
                  </ResponsiveEmbed>
                )}
              </div>
            </Modal>
          </div>

          {/* Form column */}
          <div className='w-full lg:max-w-[600px]'>
            <p className='mb-4'>
              There is no required prerequisite for attempting this exam, but we
              highly recommend taking the Real-time Analytics with ClickHouse
              training course - available either{' '}
              <a href='/learn/real-time-analytics' className='text-primary-300'>
                On-demand
              </a>{' '}
              or Instructor-led, which covers all the exam objectives listed
              below.
            </p>

            <p className='mb-4'>
              Check out our{' '}
              <Link href='/learn#live-training' className='text-primary-300'>
                Live Events
              </Link>{' '}
              to register for the next Instructor-led Real-time Analytics with
              ClickHouse training.
            </p>

            <div className='flex flex-col gap-2'>
              <Feature
                icon={<Bullseye className='h-auto w-full' />}
                value='Recommended for ClickHouse experts who handle app creation, data ingestion, modeling, query efficiency, and optimization.'
              />
              <Feature
                icon={<FileDashed className='h-auto w-full' />}
                value='Performance-based, hands-on exam'
              />
              <Feature
                icon={<Clock className='h-auto w-full' />}
                value='2h to complete the exam'
              />
              <Feature
                icon={<Coins className='h-auto w-full' />}
                value='$200 per attempt'
              />
              <Feature
                icon={<Globe className='h-auto w-full' />}
                value='English'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exam */}
      <div className='bg-primary-300 py-12 text-primary-800 md:py-24'>
        <div className='section-container'>
          {/* Intro */}
          <div className='mx-auto mb-8 max-w-3xl text-center'>
            <SuiTitle type='h2' className='mb-6'>
              Exam objectives
            </SuiTitle>
            <p className='mt-6'>
              To be fully prepared to pass the ClickHouse Certified Developer
              exam, candidates should be able to successfully complete the
              following tasks on a ClickHouse service, given access to the
              ClickHouse documentation, and using the clickhouse-client.
            </p>
            <CUIButton
              type='primary-dark'
              size='lg'
              weight='semibold'
              href='/learn/certification#faqs'
              linkClass='w-full max-w-[14rem]'
              onClick={useGalaxyOnClick(
                'certificationPage.examObjectives.FaqsSelect'
              )}
              className='group mx-auto mt-8 w-full max-w-[250px]'>
              <span className=''>Frequently asked questions</span>
            </CUIButton>
          </div>

          {/* Objectives */}
          <div className='mx-auto my-8 max-w-3xl'>
            <div className='flex flex-col gap-2 rounded bg-primary-800/95 p-2 text-white sm:gap-6 sm:p-6'>
              <CUICard>
                <CUICard.Body className='p-4 sm:p-6'>
                  <p className='mb-4 font-basier text-[20px]'>Modeling data</p>
                  <ul className='flex flex-col gap-2'>
                    <li>
                      <CheckListItem value='Create a new database' />
                    </li>
                    <li>
                      <CheckListItem value='Create a new table that satisfies a given criteria or matches a given file format' />
                    </li>
                    <li>
                      <CheckListItem value='Choose efficient data types for columns when appropriate' />
                    </li>
                    <li>
                      <CheckListItem
                        value='Define an efficient primary key given a specific criteria of the types of queries that will be
                      executed on a MergeTree table'
                      />
                    </li>
                    <li>
                      <CheckListItem value='Define and query a Dictionary' />
                    </li>
                  </ul>
                </CUICard.Body>
              </CUICard>
              <CUICard>
                <CUICard.Body className='p-4 sm:p-6'>
                  <p className='mb-4 font-basier text-[20px]'>Inserting data</p>
                  <ul className='flex flex-col gap-2'>
                    <li>
                      <CheckListItem value='Insert a local file into a table' />
                    </li>
                    <li>
                      <CheckListItem value='Insert a file from cloud storage into a table' />
                    </li>
                    <li>
                      <CheckListItem value='Insert a Parquet, CSV, or TSV file into a table' />
                    </li>
                    <li>
                      <CheckListItem value='Provide minor transformations to columns as they are being inserted' />
                    </li>
                    <li>
                      <CheckListItem value='Insert data from one table into another' />
                    </li>
                  </ul>
                </CUICard.Body>
              </CUICard>
              <CUICard>
                <CUICard.Body className='p-4 sm:p-6'>
                  <p className='mb-4 font-basier text-[20px]'>Analyzing data</p>
                  <ul className='flex flex-col gap-2'>
                    <li>
                      <CheckListItem value='Write a query that satisfies a given criteria' />
                    </li>
                    <li>
                      <CheckListItem
                        value='Write a query that uses regular functions. For example, searches for substrings within a String
                      column, or converts a timestamp to the beginning of a time interval'
                      />
                    </li>
                    <li>
                      <CheckListItem
                        value='Write a query that uses aggregate functions. For example, find the max/min/sum/avg of a column, or
                      the number of unique values, or a given quantile'
                      />
                    </li>
                    <li>
                      <CheckListItem
                        value='Use a GROUP BY to compute buckets of aggregated values given a specified timeframe or grouping
                      criteria'
                      />
                    </li>
                  </ul>
                </CUICard.Body>
              </CUICard>
              <CUICard>
                <CUICard.Body className='p-4 sm:p-6'>
                  <p className='mb-4 font-basier text-[20px]'>
                    Optimizing query performance
                  </p>
                  <ul className='flex flex-col gap-2'>
                    <li>
                      <CheckListItem value='Define a materialized view that stores the result of a non-aggregation query' />
                    </li>
                    <li>
                      <CheckListItem
                        value='Define a materialized view that stores the result of an aggregate function using the
                      AggregatingMergeTree or SummingMergeTree table engines'
                      />
                    </li>
                    <li>
                      <CheckListItem value='Define a projection on a table' />
                    </li>
                    <li>
                      <CheckListItem value='Define a set or minmax skipping index on a table' />
                    </li>
                  </ul>
                </CUICard.Body>
              </CUICard>
              <CUICard>
                <CUICard.Body className='p-4 sm:p-6'>
                  <p className='mb-4 font-basier text-[20px]'>
                    Deduplication and mutations
                  </p>
                  <ul className='flex flex-col gap-2'>
                    <li>
                      <CheckListItem value='Perform a lightweight delete operation on a table' />
                    </li>
                    <li>
                      <CheckListItem value='Implement an efficient upsert strategy using the ReplacingMergeTree table engine' />
                    </li>
                    <li>
                      <CheckListItem
                        value='Implement an efficient strategy for performing frequent updates using the CollapsingMergeTree table
                      engine'
                      />
                    </li>
                  </ul>
                </CUICard.Body>
              </CUICard>
              <div>
                <CUIButton
                  type='primary'
                  size='lg'
                  weight='semibold'
                  href='https://buy.stripe.com/14keYf7q55tn2Jy001'
                  linkClass='w-full'
                  onClick={useGalaxyOnClick(
                    'certificationPage.objectives.purchaseCertification'
                  )}
                  target='_blank'
                  className='w-full sm:mx-auto sm:w-auto'>
                  Purchase now
                </CUIButton>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className='mx-auto mt-16 max-w-3xl text-center'>
            <Image
              src='/images/learn/certified-developer-badge.png'
              alt='ClickHouse Certified Developer'
              width={417}
              height={363}
              className='mb-16 inline-block max-w-52'
            />

            <p className='mb-6'>
              To become a ClickHouse Certified Developer, you will need to pass
              our hands-on, performance-based exam. The exam involves completing
              a series of real-world tasks on ClickHouse clusters in a
              supervised environment.
            </p>
            <p className='mb-6'>
              Those who successfully complete the Exam will receive a unique
              ClickHouse Certified Developer digital badge to share on their
              social media or present to their management.
            </p>
            <p className='mb-6'>
              If you have any questions, please email{' '}
              <a
                href='mailto:certifications@clickhouse.com'
                target='_blank'
                className='underline'>
                certifications@clickhouse.com
              </a>
              .
            </p>
          </div>

          {/* Logo carousel */}
          <SuiTitle type='h3' className='mb-6 mt-28 text-center'>
            Trusted by the best developers that work with data{' '}
            <TiltedText type='white-on-black' className='px-1 py-0.5'>
              at scale
            </TiltedText>
          </SuiTitle>
          <div className='mask-logos-carousel mx-auto max-w-5xl opacity-90 brightness-50 grayscale'>
            <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id='faqs'
        className='bg-shadow-element relative mx-auto my-24 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as React.CSSProperties
        }>
        <div className='pb-10 text-center lg:text-left'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6 lg:text-left'>
              FAQs
            </SuiTitle>
            <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
              Wherever you need us, we’re there. We love to engage in thoughtful
              conversation with the ClickHouse community and are always on-hand
              to answer your questions.
            </div>
          </div>
        </div>
        <Accordion
          className='mx-auto w-full max-w-2xl lg:mr-0'
          items={[
            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.whyCertified'
              ),
              handle: 'Why should I get certified?',
              content: (
                <>
                  <p className='mb-4'>
                    Being a ClickHouse Certified professional validates your
                    ClickHouse expertise and tells both current and prospective
                    employers that you have the necessary skill set that
                    companies want and need for building and deploying
                    successful ClickHouse applications.
                  </p>
                  <p>
                    Our goal with the ClickHouse certification program is to
                    provide a meaningful and recognizable credential in the
                    software industry that companies can trust and be confident
                    in knowing you have a competitive advantage and will be a
                    more effective contributor on ClickHouse projects.
                  </p>
                </>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.whoShouldTakeExam'
              ),
              handle:
                'Who should take the ClickHouse Certified Developer exam?',
              content: (
                <p>
                  Software professionals responsible for creating and/or
                  deploying ClickHouse applications, including modeling and
                  storing the data efficiently, ingesting data, writing
                  efficient queries, and optimizing the performance of queries.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.trainingRequirement'
              ),
              handle: 'Do I have to attend training to become certified?',
              content: (
                <p>
                  No - anyone can purchase and take an exam attempt. However, it
                  is highly recommended that you take our free Real-time
                  Analytics with ClickHouse training course, which covers all of
                  the exam objectives and is offered both virtually and
                  on-demand.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examFormat'
              ),
              handle: 'What is the format of the exam?',
              content: (
                <p>
                  The exam is a hands-on, performance-based test where you are
                  given tasks to complete. You take the exam using your own
                  computer. We use a third-party vendor named HackerRank which
                  builds the exam environment, displays the exam tasks, and
                  provides a user interface for you to complete the tasks.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick('certificationPage.faqSection.examCost'),
              handle: 'How much does it cost to take the exam?',
              content: (
                <p>
                  The ClickHouse Certified Developer exam is $200 USD per
                  attempt. An exam attempt is valid for 365 days after purchase,
                  at which time it will expire. Note that exam attempt purchases
                  are not refundable.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.purchaseExamAttempt'
              ),
              handle: 'How do I purchase an exam attempt?',
              content: (
                <p>
                  Individual exam attempts can be purchased on our website at{' '}
                  <Link
                    href='/learn/certification'
                    className='text-primary-300 hover:underline'>
                    https://clickhouse.com/learn/certification
                  </Link>
                  . If you wish to purchase multiple exam attempts at once,
                  please email us at{' '}
                  <Link
                    href='mailto:certification@clickhouse.com'
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    certification@clickhouse.com
                  </Link>
                  .
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examDuration'
              ),
              handle: 'How long is the exam?',
              content: (
                <p>
                  You will be given 2 hours to successfully complete 10 to 12
                  hands-on tasks.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examResults'
              ),
              handle: 'How will I receive my exam results?',
              content: (
                <p>
                  You will receive an email within 5 business days of your exam
                  completion.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick('certificationPage.faqSection.examSwag'),
              handle: 'Do I get some swag if I get certified?',
              content: (
                <p>
                  Yes - of course! You will get a t-shirt with the certification
                  logo on it, as well as some stickers and maybe a surprise or
                  two in the swag box. In addition, we hope to have special
                  gatherings at ClickHouse conferences to celebrate those of you
                  who are certified, as well as assist certified professionals
                  who want to present at meetups and conferences.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.shareCertification'
              ),
              handle: "How do I let people know that I'm certified?",
              content: (
                <p>
                  Once certified, you will receive a digital badge from a
                  third-party vendor named Credly that specializes in
                  credentialing software professionals. You can share your
                  digital badge on LinkedIn, X, Facebook and all the other usual
                  social media platforms. You can also download and print out a
                  signed certificate of your credential.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.afterPurchasingExam'
              ),
              handle: 'What happens after I purchase an exam attempt?',
              content: (
                <p>
                  You will receive an email with instructions on how to access
                  the exam on hackerrank.com. You will need to create an account
                  on HackerRank using the same email address used to purchase
                  the exam.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examScheduling'
              ),
              handle: 'How do I schedule a time to take the exam?',
              content: (
                <p>
                  You don't! You can take the exam right away after you purchase
                  an attempt, or any time up to 365 days after the purchase
                  date. You just take the exam whenever you are ready. Be aware
                  that the entire exam attempt will take slightly more than 2
                  hours, because it can take up to 5-10 minutes for the exam
                  environment to get built and to work through the pre-exam
                  process.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examProctoring'
              ),
              handle: 'Is the exam proctored?',
              content: (
                <p>
                  Yes, using AI technology. No other person watches you take the
                  exam, but your exam attempt is monitored using your web camera
                  and an AI technology that verifies the same person is taking
                  the exam throughout the duration. Therefore, your computer
                  must have a functioning web camera and the room should have
                  good lighting. The exam environment monitors any answers that
                  seem to have been generated by an AI tool. The exam
                  environment also records your screen for each task, and
                  monitors when you leave the exam tab in your web browser,
                  which you are allowed to do only for accessing the
                  documentation or for translating English to another language.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examDocumentationAccess'
              ),
              handle: 'Can I have access to the documentation during the exam?',
              content: (
                <p>
                  Yes, you can go to the ClickHouse docs in a separate tab in
                  your browser.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.externalMonitorUse'
              ),
              handle: 'Can I use an external monitor?',
              content: (
                <p>
                  No. The AI proctoring notifies us if an external monitor is
                  attached.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.aiUsageInExam'
              ),
              handle: 'Can I use AI to answer the tasks?',
              content: (
                <p>
                  No. The only external resource you are allowed to access is on
                  clickhouse.com, which includes the documentation, blogs and
                  any other articles posted there.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.minimumPassingScore'
              ),
              handle: 'What is the minimum passing score for the exam?',
              content: (
                <p>
                  The passing score is 70%. Not all tasks are weighted equally,
                  as some tasks are more difficult or take longer to complete.
                  Most of the exam is graded by scripts, but note that we
                  manually review the results of every exam attempt, so you will
                  not get your exam results immediately. It can take up to 5
                  business days to get your exam results.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examLanguage'
              ),
              handle: 'What language is the exam available in?',
              content: (
                <p>
                  The exam is only available in English, but you may open a
                  separate tab in your web browser to access a translation
                  website of your choice.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.certificationValidity'
              ),
              handle: 'How long is my awarded certification valid?',
              content: (
                <p>
                  Once certified, always certified! Your ClickHouse
                  certification will show the date that you earned the
                  credential, and the credential does not expire.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examAttemptsLimit'
              ),
              handle: 'Is there a limit to the number of exam attempts?',
              content: (
                <p>
                  There is no limit to the number of exam attempts you can take.
                  You do have to purchase each exam attempt at $200 USD, and you
                  must wait 7 days from your previous attempt before attempting
                  the exam again.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examBreaks'
              ),
              handle: 'Can I take a break during the exam?',
              content: (
                <p>
                  Sure - you can get up and stretch your legs and leave the room
                  if necessary. Keep in mind that taking a break does not stop
                  the timer on the exam. Once you start the exam, it will end in
                  two hours (or sooner if you complete all the tasks and submit
                  the exam manually).
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.examAccommodations'
              ),
              handle:
                'Can exam accommodations be made as needed for individuals taking the exam?',
              content: (
                <p>
                  Please don't hesitate to email us at{' '}
                  <Link
                    href='mailto:certification@clickhouse.com'
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    certification@clickhouse.com
                  </Link>{' '}
                  to discuss any desired accommodations.
                </p>
              )
            },

            {
              onOpen: useGalaxyOnClick(
                'certificationPage.faqSection.furtherQuestions'
              ),
              handle: 'Further Questions?',
              content: (
                <p>
                  If your question wasn’t answered, please contact us at{' '}
                  <Link
                    href='mailto:certification@clickhouse.com'
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    certification@clickhouse.com
                  </Link>
                  .
                </p>
              )
            }
          ]}
        />
      </div>
    </Layout>
  )
}
