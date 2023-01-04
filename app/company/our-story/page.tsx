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
import { OurStoryData } from './types'

async function getData(): Promise<OurStoryData> {
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
      'team.lightInvestorLogosPng'
    ]
  }
  const data = await findOne('our-story', params)

  return data
}

export default async function OurStoryPage() {
  const { hero, aboutUs, ourHistory, hiring, team } = await getData()
  const { title, description, imagePng, offices } = hero
  return (
    <>
      <div className='bg-hero bg-cover pt-16'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto' data-aos='fade-up'>
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
            <div
              className='flex justify-between mt-8 gap-x-16 md:gap-x-32 max-w-lg mx-auto'
              data-aos='fade-up'>
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
      <div className='bg-c2 text-c5 w-full pt-16 pb-12'>
        <SuiTitle
          type='h2'
          weight='bold'
          className='mb-4 px-6 max-w-7xl mx-auto'>
          {aboutUs.title}
        </SuiTitle>
        {aboutUs.items.map((item, index: number) => (
          <div
            key={item.title}
            className={`flex flex-col-reverse ${
              index % 2 == 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } container mx-auto max-w-7xl px-6 gap-16 mb-12 items-start`}>
            <div className='flex flex-col w-full lg:w-3/5'>
              {item.title && (
                <SuiTitle type='h2' className='mb-4'>
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
            <div className='flex flex-col w-full lg:w-2/5' data-aos='fade-up'>
              <StrapiImage {...item.imagePng} />
            </div>
          </div>
        ))}
      </div>

      <div className='w-full pt-16 pb-24 bg-c1'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle type='h2' className='mb-11 mx-auto md:ml-0'>
            {ourHistory.title}
          </SuiTitle>

          <div className='flex flex-col space-y-16'>
            {ourHistory.items.map((item) => (
              <div
                className='flex flex-col md:flex-row items-center'
                key={item.text}>
                <div className='flex md:w-2/12 lg:w-1/12'>
                  <div className='h-16 w-16 bg-c2 text-c5 rounded-full text-center items-center justify-center flex'>
                    <SuiTitle type='h5'>{item.year}</SuiTitle>
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

      <div className='bg-c2 text-c5 w-full'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-16'>
            <SuiTitle type='h2' className='mb-2'>
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
      <div className='bg-c1 w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle type='h2' className='mb-8'>
            {team.foundersTitle}
          </SuiTitle>

          <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 justify-evenly'>
            {team.founders.map((founder) => (
              <Person
                key={founder.name + founder.role}
                avatar={founder.profileImagePng}
                name={founder.name}
                job={founder.role}
              />
            ))}
          </div>
          <div className='w-96 pt-8 pb-12 self-center'>
            <SuiHorizontalDivide />
          </div>

          <SuiTitle type='h3' className='mb-8'>
            {team.investorsTitle}
          </SuiTitle>

          <div className='flex justify-evenly investor'>
            {team.investors.map((investor) => (
              <Person
                key={investor.name + investor.role}
                avatar={investor.profileImagePng}
                name={investor.name}
                job={investor.role}
              />
            ))}
          </div>

          <div className='flex flex-wrap justify-evenly pt-12'>
            {team.lightInvestorLogosPng.map((light, index) => (
              <StrapiPicture
                key={`investors-${index}`}
                light={light}
                dark={team.darkInvestorLogosPng[index]}
                sizes='small'
              />
            ))}
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  )
}
