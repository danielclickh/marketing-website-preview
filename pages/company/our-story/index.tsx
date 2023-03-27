import {
  SuiButton,
  SuiHorizontalDivide,
  SuiText,
  SuiTitle
} from '../../../components/sui'
import { Person } from '../../../components/person_area'
import { findOne } from '../../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../../components/StrapiElements'
import founders from './founders.json'
import investors from './investors.json'
import { OurStoryData } from '../../../types/ourStory'
import Layout from '../../../components/Layout'
import { GetStaticProps } from 'next'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<OurStoryData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.imagePng',
        'hero.offices',
        'hero.offices.flagPng',
        'aboutUs',
        'aboutUs.items',
        'aboutUs.items.imagePng',
        'ourHistory',
        'ourHistory.items',
        'hiring',
        'hiring.ctaButton',
        'team',
        'team.founders',
        'team.founders.profileImagePng',
        'team.investors',
        'team.investors.profileImagePng',
        'team.darkInvestorLogosPng',
        'team.lightInvestorLogosPng',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('our-story', params)

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function OurStoryPage({
  hero,
  aboutUs,
  ourHistory,
  hiring,
  team,
  footerData,
  platforms,
  seo
}: OurStoryData) {
  const { title, description, imagePng, offices } = hero
  return (
    <>
      <Layout footerData={footerData} seo={seo}>
        <div className='pt-10'>
          <div className='pt-10'>
            <div className='flex container mx-auto flex-col px-8 2xl:px-0'>
              <div className='flex flex-col text-center mx-auto'>
                <h1 className='text-4xl leading-tight mb-4 font-basier md:text-5.5xl font-semibold'>
                  Who we are
                </h1>
                <p className='max-w-3xl text-neutral-200'>
                  ClickHouse launched in 2012 with the vision of being the
                  fastest OLAP database on earth. We are the creators of the
                  popular open-source column-oriented database management system
                  which allows users to generate analytical reports using SQL
                  queries in real-time. We understand that data grows in real
                  time and ee believe that results should be fast,
                  <br />
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>very fast</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className='section my-16'>
            <Image
              src='/images/team-who-we-are.png'
              width='751'
              height='406'
              alt='Who we are'
              className='mx-auto'
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row-reverse section-container mx-auto max-w-7xl gap-16 mb-12 items-start'>
          <div className='flex flex-col w-full lg:w-1/2'>
            <StrapiImage {...imagePng} alt='ClickHouse around the world' />
          </div>
          <div className='flex flex-col w-full lg:w-1/2'>
            <SuiTitle type='h2' weight='bold' className='mb-8'>
              Mindfully distributed
            </SuiTitle>
            <div className='max-w-5xl'>
              <div className='whitespace-pre-wrap text-neutral-200'>
                {`ClickHouse is proud to have employees in over 10 countries. We believe that diverse and distributed workplaces working inclusively are an essential advantage.  We work together to make collaboration a strength across timezone differences, languages, and cultures. 

While we’re in different places, we all have the same goals, and we trust each other to do the work needed to achieve them. Being distributed isn’t a way of doing business. It’s a mindset which we leverage intentionally to build a truly global company.
`}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row section-container mx-auto max-w-7xl gap-16 mb-12 items-center'>
          <div className='flex flex-col w-full lg:w-1/2'>
            <Image
              src='/images/our-story/founders.png'
              alt='Founders'
              width={480}
              height={320}
              className='w-full'
            />
          </div>
          <div className='flex flex-col w-full lg:w-1/2'>
            <SuiTitle type='h2' weight='bold' className='mb-8'>
              Our history
            </SuiTitle>
            <div className='max-w-5xl'>
              <div className='whitespace-pre-wrap text-neutral-200 flex flex-col gap-10'>
                {ourHistory.items.map((item) => (
                  <div
                    className='flex flex-row items-start gap-10'
                    key={item.text}>
                    <div className='flex md:w-2/12 lg:w-1/12'>
                      <div className='font-bold text-primary-300 rounded-full text-center items-center justify-center flex'>
                        <SuiTitle
                          type='h5'
                          className='!text-base'
                          weight='medium'>
                          {item.year}
                        </SuiTitle>
                      </div>
                    </div>
                    <div className='flex md:w-8/12 text-left text-neutral-200'>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='w-full pt-16 pb-24 bg-neutral-725'>
          <div className='flex container mx-auto flex-col section-container'>
            <SuiTitle type='h2' weight='bold' className='mb-14 text-center'>
              {team.foundersTitle}
            </SuiTitle>

            <div className='flex flex-col gap-2 items-center sm:flex-row sm:items-start space-y-8 sm:space-y-0 justify-evenly'>
              {founders.map((founder) => (
                <Person
                  key={founder.name + founder.role}
                  avatar={founder.imgSrc}
                  name={founder.name}
                  job={founder.role}
                  className='!max-w-[232px] mx-auto'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='w-full pt-16 pb-24'>
          <div className='flex container mx-auto flex-col section-container'>
            <SuiTitle type='h2' weight='bold' className='mb-14 text-center'>
              Our investors
            </SuiTitle>

            <div className='grid grid-cols-1 min-[340px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 flex-wrap justify-evenly gap-2 investor'>
              {investors.map((investor) => (
                <Person
                  small
                  key={investor.name}
                  avatar={investor.imgSrc}
                  name={investor.name}
                />
              ))}
            </div>

            <div className='flex flex-wrap gap-x-20 gap-y-16 justify-evenly pt-12'>
              {team.darkInvestorLogosPng.map((image, index) => (
                <StrapiImage
                  key={`investors-${index}`}
                  {...image}
                  sizes='small'
                  className='h-10 w-auto mx-auto object-contain max-w-[min(250px,100%)]'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='pb-16 section-container'>
          <div className='bg-primary-300 text-neutral-0 w-full rounded-lg'>
            <div className='flex container mx-auto flex-col 2xl:px-0'>
              <div className='flex flex-col text-center mx-auto pt-16'>
                <SuiTitle type='h2' color='text-default' className='mb-6 '>
                  {hiring.title}
                </SuiTitle>
                <div className='max-w-3xl'>
                  <SuiText size='base' color='text-default' weight='normal'>
                    {hiring.description}
                  </SuiText>
                  {hiring.ctaButton && (
                    <div className='flex justify-center pt-6 pb-14'>
                      <SuiButton
                        type='dark'
                        path={hiring.ctaButton.href}
                        target={hiring.ctaButton.target}>
                        {hiring.ctaButton.text}
                      </SuiButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
