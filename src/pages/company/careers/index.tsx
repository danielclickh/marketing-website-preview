import CareersFilter from '@/components/CareersFilter'
import CompanyImages from '@/components/CompanyImages'
import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CareersData } from '@/types/careers'
import { GetStaticProps } from 'next'
import Image from 'next/image'

const careerImgs = [
  { id: 2, url: '/images/careers/Meeting.png', alt: 'Meeting' },
  {
    id: 1,
    url: '/images/careers/Kseniia.png',
    alt: 'Kseniia'
  },
  { id: 3, url: '/images/careers/At-the-office.png', alt: 'At the office' },
  { id: 7, url: '/images/careers/Roopa.png', alt: 'Roopa' },
  { id: 6, url: '/images/careers/Zach-Tanya-Guy.png', alt: 'Zach Tanya & Guy' },
  { id: 4, url: '/images/careers/Heineken-Brewry.png', alt: 'Heineken-Brewry' },
  {
    id: 5,
    url: '/images/careers/2-programmers.png',
    alt: 'Programmers'
  }
]

const values = [
  {
    id: 1,
    icon: '/images/careers/icons/customer-first.svg',
    title: 'Customer first',
    content:
      'We succeed when our customers and users succeed. They’re are at the center of everything we do. Our passion for our users translates into their passion for ClickHouse.'
  },
  {
    id: 2,
    icon: '/images/careers/icons/distributed.svg',
    title: 'Distributed',
    content:
      'ClickHouse is proud to have employees in over 10 countries. We believe that diverse and distributed workplaces working inclusively are an essential advantage.'
  },
  {
    id: 4,
    icon: '/images/careers/icons/empathy.svg',
    title: 'Empathy at work',
    content:
      'Empathy is the ability to place yourself in the shoes of others, to try to understand their thoughts, feelings, and needs, and also know that we don’t know it all and need to approach other people with the humility to learn.'
  },
  {
    id: 5,
    icon: '/images/careers/icons/diversity.svg',
    title: 'Diversity',
    content:
      'Diverse and inclusive environments are both an  advantage and a moral imperative. 40% of our leadership team consists of women, and we are proud to have a diverse group of investors, board members, and advisors.'
  },
  {
    id: 6,
    icon: '/images/careers/icons/trust.svg',
    title: 'Trust',
    content:
      'We work together to make collaboration a strength across timezone differences, languages, and cultures. While we’re in different places, we all have the same goals, and we trust each other to do the work needed to achieve them.'
  }
]

export const getStaticProps: GetStaticProps<CareersData> =
  async function getStaticProps() {
    const data = await findOne('career', {
      populate: ['seo', 'seo.image']
    })
    const commonProps = await getCommonProps()
    data.seo.path = '/company/careers'
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function CareersPage({
  positionsTitle,
  seo,
  headerData
}: CareersData) {
  useGalaxyOnPage('careersPage')

  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='relative pt-10'>
          <div className='absolute inset-0 mx-auto max-w-7xl -skew-y-2 transform rounded-md bg-primary-300 lg:max-h-96'></div>
          <div className='relative z-10'>
            <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
              <div className='flip-selection mx-auto flex flex-col text-center'>
                <h1 className='mb-4 font-basier text-4xl font-semibold leading-tight text-neutral-800 md:text-5.5xl'>
                  Become part of our team
                </h1>
                <p className='max-w-3xl text-neutral-800'>
                  We are a globally diverse and distributed team, united behind
                  a common goal of creating industry-leading, real-time
                  analytics. Here, you will have an opportunity to solve some of
                  the most cutting edge technical challenges and have direct
                  ownership of your work and vision. If you are a contributor by
                  nature, a thinker as well as a doer - we’ll definitely click!
                </p>
              </div>
            </div>
          </div>
          <div className='my-10 h-72 w-full max-w-full overflow-y-hidden bg-cover bg-center'>
            <CompanyImages>
              {careerImgs.map((image) => (
                <Image
                  src={image.url}
                  width='400'
                  height='300'
                  alt={image.alt}
                  key={image.id}
                  className='object-cover object-center px-1'></Image>
              ))}
            </CompanyImages>
          </div>
        </div>
        <div className='w-full px-8 pt-16'>
          <div className='container mx-auto mb-6 flex max-w-7xl flex-col md:flex-row md:space-x-16'>
            <div className='flex flex-col md:w-4/5'>
              <h2 className='mb-6 font-basier text-4xl text-neutral-100'>
                Our values
              </h2>
            </div>
          </div>
          <div className='mx-auto max-w-7xl'>
            <div className='grid gap-x-20 gap-y-10 lg:grid-cols-3'>
              {values.map((value) => (
                <div className='col' key={value.id}>
                  <div className='flex items-start gap-4'>
                    <Image src={value.icon} width={32} height={32} alt='Icon' />{' '}
                    <div>
                      <h4 className='mb-3 font-inter font-bold'>
                        {value.title}
                      </h4>
                      <Markdown className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        {value.content}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto my-16 w-full max-w-screen-md border-t border-neutral-725 px-7'></div>
      <div className='w-full px-8'>
        <div className='bg-shadow-element yellow-shadow mx-auto flex max-w-7xl flex-col'>
          <h2 className='mb-6 font-inter text-3xl font-semibold'>
            Job openings
          </h2>
          <CareersFilter />
        </div>
      </div>

      <div
        className='mx-auto my-16 max-w-7xl px-8 2xl:px-0'
        id='protect-against-recruitment-scams'>
        <div className='max-w-5xl'>
          <h2 className='mb-6 font-basier text-4xl text-neutral-100'>
            Protecting yourself against recruitment scams
          </h2>
          <Markdown>
            {`
ClickHouse is committed to ethical recruitment practices. This information helps our candidates protect themselves against recruitment scams.

Unfortunately, recruitment scams are common. Scammers often impersonate representatives of prominent companies like ClickHouse to take advantage of job seekers.

## What is a recruitment scam?

Recruitment scams are fraudulent schemes where scammers pose as recruiters or employers, offering attractive job opportunities that require upfront payments or personal information. They may:

- Ask for money to secure work permits, visas, or cover travel expenses
- Use fake websites, unsolicited emails, calls, or texts
- Request personal data or money to "finalize" the application process
- Conduct fraudulent interviews or send fake offer letters

**Note: ClickHouse will never ask for money from candidates during any stage of the recruitment process.**

## Tips to avoid becoming a victim

- Be cautious: Don't open attachments or click links in suspicious emails
- Do your own typing: Use a search engine to look up websites instead of clicking on links
- Don't respond to requests for personal or financial information
- Use and regularly update security software
- Report suspicious emails, calls, or texts to law enforcement

## How to identify scams

Common signs of recruitment scams include:

- Advertisements in various media for false job openings
- Job postings with mobile phone numbers instead of office numbers
- Requests to send applications to illegitimate email addresses or fax numbers
- Urgent requests for fund transfers or electronic payments
- Vague or oddly worded job descriptions
- Requests for sensitive personal information (e.g., birth date, social security number, bank details)

Scammers often use fake email addresses designed to appear as if they're from ClickHouse. Stay vigilant and verify all communication through official channels.
            `}
          </Markdown>
        </div>
      </div>

      <FollowUs />
    </Layout>
  )
}
