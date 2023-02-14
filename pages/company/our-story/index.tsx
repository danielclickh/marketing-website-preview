import {
  SuiButton,
  SuiHorizontalDivide,
  SuiText,
  SuiTitle
} from '../../../components/sui'
import { Person } from '../../../components/person_area'
import { findOne } from '../../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../../components/StrapiElements'
import GetStarted from '../../../components/GetStarted'
import { OurStoryData } from '../../../types/ourStory'
import Layout from '../../../components/Layout'
import { GetStaticProps } from 'next'
import { getCommonProps } from '../../../lib/utils/getCommonProps'

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
  headerData,
  footerData,
  getStartedData,
  seo
}: OurStoryData) {
  const { title, description, imagePng, offices } = hero
  return (
    <>
      <Layout headerData={headerData} footerData={footerData} seo={seo}>
        <div className='bg-hero bg-cover pt-16'>
          <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
            <div className='flex flex-col text-center mx-auto'>
              <SuiTitle type='h1' className='mb-5'>
                {title}
              </SuiTitle>
              <SuiText
                size='lg'
                color='secondary'
                weight='medium'
                className='max-w-xl mb-16'>
                {description}
              </SuiText>
            </div>
            <div className='flex flex-col mx-auto py-8'>
              <StrapiImage {...imagePng} alt='ClickHouse around the world' />
              <div className='flex justify-between mt-8 gap-x-16 md:gap-x-32 max-w-lg mx-auto'>
                {offices.map((office) => (
                  <div
                    className='flex flex-col items-center'
                    key={office.name + office.location}>
                    <StrapiImage
                      {...office.flagPng}
                      alt={`Image for ${office.name} ${office.location}`}
                      className='mb-3'
                    />
                    <div className='flex flex-col text-center justify-center'>
                      <SuiText size='base' weight='bold' className='mb-1'>
                        {office.name}
                      </SuiText>
                      <SuiText size='base' weight='medium' color='secondary'>
                        {office.location}
                      </SuiText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-c2 text-c5 w-full pt-16 pb-12 px-6'>
          <SuiTitle type='h2' weight='bold' className='mb-4 max-w-7xl mx-auto'>
            {aboutUs.title}
          </SuiTitle>
          {aboutUs.items.map((item, index: number) => (
            <div
              key={item.title}
              className={`flex flex-col-reverse ${
                index % 2 == 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } container mx-auto max-w-7xl gap-16 mb-12 items-start`}>
              <div className='flex flex-col w-full lg:w-3/5'>
                {item.title && (
                  <SuiTitle type='h3' weight='bold' className='mb-4 !text-3xl'>
                    {item.title}
                  </SuiTitle>
                )}
                {item.subtitle && (
                  <div className='mb-2 max-w-4xl '>
                    <SuiText size='lg' weight='medium' color='secondary'>
                      {item.subtitle}
                    </SuiText>
                  </div>
                )}
                <div className='max-w-5xl'>
                  <SuiText
                    size='base'
                    weight='medium'
                    className='whitespace-pre-wrap'>
                    {item.description}
                  </SuiText>
                </div>
              </div>
              <div className='flex flex-col w-full lg:w-2/5'>
                <StrapiImage {...item.imagePng} />
              </div>
            </div>
          ))}
        </div>

        <div className='w-full pt-16 pb-24 bg-c1 px-6'>
          <div className='flex container mx-auto flex-col max-w-7xl'>
            <SuiTitle type='h2' className='mb-11 mx-auto md:ml-0'>
              {ourHistory.title}
            </SuiTitle>

            <div className='flex flex-col space-y-8'>
              {ourHistory.items.map((item) => (
                <div
                  className='flex flex-col md:flex-row items-center gap-y-10'
                  key={item.text}>
                  <div className='flex md:w-2/12 lg:w-1/12'>
                    <div className='h-20 w-20 bg-c2 text-c5 rounded-full text-center items-center justify-center flex'>
                      <SuiTitle type='h5' className='!text-base' weight='bold'>
                        {item.year}
                      </SuiTitle>
                    </div>
                  </div>
                  <div className='flex md:w-8/12 text-center md:text-left'>
                    <SuiText size='base' weight='medium'>
                      {item.text}
                    </SuiText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-c2 text-c5 w-full px-6'>
          <div className='flex container mx-auto flex-col 2xl:px-0'>
            <div className='flex flex-col text-center mx-auto pt-16'>
              <SuiTitle type='h2' className='mb-6'>
                {hiring.title}
              </SuiTitle>
              <div className='max-w-3xl'>
                <SuiText size='base' color='secondary' weight='medium'>
                  {hiring.description}
                </SuiText>
                {hiring.ctaButton && (
                  <div className='flex justify-center pt-6 pb-14'>
                    <SuiButton
                      type='primary'
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
        <div className='bg-c1 w-full pt-16 pb-24 px-6'>
          <div className='flex container mx-auto flex-col max-w-7xl'>
            <SuiTitle
              type='h3'
              weight='bold'
              className='mb-14 !text-3xl text-center sm:text-left'>
              {team.foundersTitle}
            </SuiTitle>

            <div className='flex flex-col gap-2 items-center sm:flex-row sm:items-start space-y-8 sm:space-y-0 justify-evenly'>
              {team.founders.map((founder) => (
                <Person
                  key={founder.name + founder.role}
                  avatar={founder.profileImagePng}
                  name={founder.name}
                  job={founder.role}
                  className='!max-w-[232px] mx-auto'
                />
              ))}
            </div>
            <div className='w-96 pt-8 pb-12 self-center'>
              <SuiHorizontalDivide />
            </div>

            <SuiTitle type='h3' weight='bold' className='mb-14 !text-3xl'>
              {team.investorsTitle}
            </SuiTitle>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 flex-wrap justify-evenly gap-2 investor'>
              {team.investors.map((investor) => (
                <Person
                  small
                  key={investor.name + investor.role}
                  avatar={investor.profileImagePng}
                  name={investor.name}
                  job={investor.role}
                />
              ))}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-16 justify-evenly pt-12'>
              {team.lightInvestorLogosPng.map((light, index) => (
                <StrapiPicture
                  key={`investors-${index}`}
                  light={light}
                  dark={team.darkInvestorLogosPng[index]}
                  sizes='small'
                  className='h-10 w-auto mx-auto object-contain max-w-[min(250px,100%)]'
                />
              ))}
            </div>
          </div>
        </div>
        <GetStarted {...getStartedData} />
      </Layout>
    </>
  )
}
