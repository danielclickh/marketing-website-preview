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
import Image from 'next/image'
import FollowUs from '../../../components/FollowUs'

const careerImgs = [
  {
    id: 1,
    url: '/images/careers/Group.png',
    alt: 'At the laptop'
  },
  { id: 2, url: '/images/careers/Guiness.png', alt: 'Team' },
  { id: 3, url: '/images/careers/Kseniia.png', alt: 'Kseniia' },
  { id: 4, url: '/images/careers/ZachTanyaGuy.png', alt: 'Meeting' },
  {
    id: 5,
    url: '/images/careers/Group.png',
    alt: 'At the laptop'
  },
  { id: 6, url: '/images/careers/Guiness.png', alt: 'Team' },
  { id: 7, url: '/images/careers/Kseniia.png', alt: 'Kseniia' },
  { id: 7, url: '/images/careers/ZachTanyaGuy.png', alt: 'Meeting' }
]

const values = [
  {
    icon: '/images/careers/icons/customer-first.svg',
    title: 'Customer first',
    content:
      'We succeed when our customers and users succeed. They’re are at the center of everything we do. Our passion for our users translates into their passion for ClickHouse.'
  },
  {
    icon: '/images/careers/icons/distributed.svg',
    title: 'Distributed',
    content:
      'ClickHouse is proud to have employees in over 10 countries. We believe that diverse and distributed workplaces working inclusively are an essential advantage.'
  },
  {
    icon: '/images/careers/icons/remote.svg',
    title: 'Remote and flexible',
    content:
      'We’re a remote company, with a flexible work-from-anywhere policy. We work in small product oriented teams to focus & execute faster. We don’t track working hours, what matters is what you get done.'
  },
  {
    icon: '/images/careers/icons/empathy.svg',
    title: 'Empathy at work',
    content:
      'Empathy is the ability to place yourself in the shoes of others, to try to understand their thoughts, feelings, and needs, and also know that we don’t know it all and need to approach other people with the humility to learn.'
  },
  {
    icon: '/images/careers/icons/diversity.svg',
    title: 'Diversity',
    content:
      'Diverse and inclusive environments are both an  advantage and a moral imperative. 40% of our leadership team consists of women, and we are proud to have a diverse group of investors, board members, and advisors.'
  },
  {
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
  headerData,
  footerData
}: CareersData) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='pt-10'>
        <div className='relative pt-10'>
          <div className='bg-primary-300 absolute inset-0 transform -skew-y-2 lg:max-h-96'></div>
          <div className='relative z-10'>
            <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
              <div className='flex flex-col text-center mx-auto px-8'>
                <h1 className='mb-4 font-basier text-neutral-800 text-5.5xl font-semibold'>
                  Become part of our team
                </h1>
                <p className='text-neutral-800 max-w-3xl'>
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
          <div className='bg-center bg-cover w-full max-w-full h-72 my-16 overflow-y-hidden'>
            <CompanyImages>
              {careerImgs.map((image) => (
                <Image
                  src={image.url}
                  width='750'
                  height='565'
                  alt={image.alt}
                  key={image.id}
                  className='!h-72 w-auto px-1 object-cover object-center rounded-md'></Image>
              ))}
            </CompanyImages>
          </div>
        </div>
        <div className='w-full pt-4 pb-12 px-8'>
          <div className='flex flex-col md:flex-row container mx-auto max-w-7xl md:space-x-16 mb-6'>
            <div className='flex flex-col md:w-4/5'>
              <h2 className='font-basier mb-6 text-4xl'>Our values</h2>
            </div>
          </div>
          <div className='max-w-7xl mx-auto'>
            <div className='grid lg:grid-cols-3 gap-20'>
              {values.map((value) => (
                <div className='col'>
                  <div className='flex items-start gap-4'>
                    <Image
                      src={value.icon}
                      width={32}
                      height={32}
                      alt='Twitter image'
                    />{' '}
                    <div>
                      <h4 className='font-bold mb-3 font-inter'>
                        {value.title}
                      </h4>
                      <p className='font-light font-inter leading-relaxed text-sm'>
                        {value.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto w-full pt-16 pb-16 flex flex-col'>
        <SuiTitle type='h2'>{positionsTitle}</SuiTitle>

        <CareersFilter />
      </div>
      <FollowUs />
    </Layout>
  )
}
