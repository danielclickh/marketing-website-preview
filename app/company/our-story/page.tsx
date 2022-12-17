import {
  SuiButton,
  SuiHorizontalDivide,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../../components/sui'
import { Person } from '../../../components/person_area'
import { findOne } from '../../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../../components/StrapiElements'
import GetStarted from '../../../components/GetStarted'

async function getData() {
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
      <div className='bg-white dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='4xl'>
              <h1>{title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>{description}</p>
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col mx-auto py-8'>
            <StrapiImage
              src={imagePng.data}
              alt='ClickHouse around the world'
            />
            <div
              className='flex justify-center mt-8 md:space-x-32'
              data-aos='fade-up'>
              {offices.map((office) => (
                <div
                  className='flex flex-col w-44'
                  key={office.name + office.location}>
                  <StrapiImage
                    src={office.flagPng.data}
                    alt={`Image for ${office.name} ${office.location}`}
                  />
                  <div className='flex text-center justify-center'>
                    <SuiText weight='semibold'>
                      <p>{office.name}</p>
                      <span className='text-web-light-c4 dark:text-web-dark-c4 font-normal'>
                        {office.location}
                      </span>
                    </SuiText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='container-light-color w-full pt-16 pb-12'>
        {aboutUs.items.map((item) => (
          <div
            key={item.title}
            className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
            <div className='flex flex-col md:w-3/5'>
              <SuiTitle size='xl'>
                <h2>{item.title}</h2>
              </SuiTitle>
              <div className='pt-2 max-w-4xl '>
                <SuiText size='lg' color='dark'>
                  <p>{item.subtitle}</p>
                </SuiText>
              </div>
              <div className='pt-2 max-w-5xl'>
                <SuiText size='lg'>
                  <p>{item.description}</p>
                </SuiText>
              </div>
            </div>
            <div className='flex flex-col md:w-2/5 mt-6 md:mt-12'>
              <StrapiImage src={item.imagePng.data} />
            </div>
          </div>
        ))}
      </div>

      <div className='w-full pt-16 pb-24 bg-white dark:bg-gunmetal'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle size='xl'>
            <h2>{ourHistory.title}</h2>
          </SuiTitle>
          <SuiSpacer size='xl' />

          <div className='flex flex-col space-y-12'>
            {ourHistory.items.map((item) => (
              <div
                className='flex flex-col md:flex-row items-center'
                key={item.text}>
                <div className='flex md:w-2/12 lg:w-1/12'>
                  <div className='h-16 w-16 container-light-color rounded-full text-center items-center justify-center flex'>
                    <SuiTitle size='sm'>
                      <h5>{item.year}</h5>
                    </SuiTitle>
                  </div>
                </div>
                <div className='flex md:w-8/12 text-center md:text-left'>
                  <SuiText size='lg'>
                    <p>{item.text}</p>
                  </SuiText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='container-light-color w-full'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div className='flex flex-col text-center mx-auto pt-16'>
            <SuiTitle size='xl'>
              <h1>{hiring.title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-3xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>{hiring.description}</p>
              </SuiText>
              {hiring.ctaButton && (
                <div className='flex justify-center pt-6 pb-14'>
                  <SuiButton
                    path={hiring.ctaButton.href}
                    target={hiring.ctaButton.target}
                    title={hiring.ctaButton.text}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white dark:bg-gunmetal w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6'>
          <SuiTitle size='lg'>
            <h2>{team.foundersTitle}</h2>
          </SuiTitle>

          <SuiSpacer size='xl' />

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

          <SuiTitle size='lg'>
            <h2>{team.investorsTitle}</h2>
          </SuiTitle>

          <SuiSpacer size='xl' />

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
            {team.lightInvestorLogosPng.data.map((light, index) => (
              <StrapiPicture
                key={`investors-${index}`}
                light={light}
                dark={team.darkInvestorLogosPng.data[index]}
                size='small'
              />
            ))}
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  )
}
