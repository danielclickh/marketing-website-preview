import {
  SuiButton,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../components/sui'
import Image from 'next/image'
import { Testimonial } from '../../components/testimonial'
import { UseCase } from '../../components/use_case'
import { LogoEbay } from '../../components/icons/logo_ebay'
import { LogoCloudflare } from '../../components/icons/logo_cloudflare'
import { LogoSpotify } from '../../components/icons/logo_spotify'
import { LogoDeutche } from '../../components/icons/logo_deutche_bank'
import { LogoUberHex } from '../../components/icons/logo_uber_hex'
import { findOne } from '../../lib/api/strapi'

async function getData() {
  const result = await findOne('use-case', {
    populate: [
      'hero',
      'hero.testimonials',
      'hero.testimonials.avatar',
      'useCases',
      'useCaseItems',
      'useCaseItems.darkLogoPng',
      'useCaseItems.lightLogoPng',
      'useCaseItems.bullets',
      'useCaseItems.ctaButton'
    ]
  })
  result.spotlightUseCase = (result.useCaseItems ?? []).shift()

  return result
}

async function CustomerStoriesPage() {
  const { hero, useCases, spotlightUseCase: spotlight } = await getData()
  return (
    <>
      <div className='bg-web-light-c1 dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>{hero.title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>{hero.description}</p>
              </SuiText>
            </div>
          </div>

          <div className='flex flex-col md:flex-row mt-20 md:justify-evenly pb-16'>
            <Image
              src={`/customer-stories/arrow-left.svg`}
              alt='arrow-left'
              width='94'
              height='94'
              className='cursor-pointer hover:opacity-60'
            />

            <Testimonial
              avatar='avatar-1.png'
              name='Anders Mattias'
              job='Founder of XCon'
              quote='“ClickHouse is a joy to use! It saves me so much time and money
            I can’t recommend it enough!”'
              delay={200}
            />

            <Testimonial
              avatar='avatar-2.png'
              name='Ade Oliseh'
              job='Software Engineer at Google'
              quote='“ClickHouse is the OLAP I’ve been waiting for all my life”'
              delay={300}
            />

            <Testimonial
              avatar='avatar-3.png'
              name='Jennifer Wu'
              job='Founder of FirstArrow'
              quote='“Switching to ClickHouse has completely changed my tech stack for the better. It’s a fantastic DBMS”'
              delay={400}
            />
            <Image
              src={`/customer-stories/arrow-right.svg`}
              alt='arrow-left'
              width='94'
              height='94'
              className='cursor-pointer hover:opacity-60'
            />
          </div>
        </div>
      </div>

      <div className='bg-web-light-c2 dark:bg-web-dark-c2 w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6 2xl:px-0'>
          <SuiTitle size='lg'>
            <h2>{useCases.title}</h2>
          </SuiTitle>
          <SuiText size='lg' color='dark'>
            <p>{useCases.description}</p>
          </SuiText>
        </div>

        <div className='flex max-w-7xl mx-auto mt-6 space-x-12 px-6 2xl:px-0'>
          <SuiPanel
            color='bg-web-light-c1 dark:bg-web-dark-c1'
            shadow
            padding='xl'>
            <div className='flex flex-row'>
              <div className='flex flex-col  w-1/2'>
                <SuiTitle
                  size='xxs'
                  uppercase
                  color='primary'
                  dark_color='primary'>
                  Spotlight
                </SuiTitle>
                <SuiSpacer size='xs' />
                <SuiTitle>Uber</SuiTitle>
                <SuiText>
                  Uber moved its logging platform to ClickHouse increasing
                  developer productivity and overall reliability of the platform
                  while seeing 3x data compression, 10x performance increase,
                  and ½ the reduction in hardware cost.
                </SuiText>
                {/* <ul className='pb-4'>
                  <li className='flex space-x-2'>
                    <StarIcon className='w-5 text-primary' />
                    <SuiText color='darkest'>
                      <p>3x data compression</p>
                    </SuiText>
                  </li>
                  <li className='flex space-x-2'>
                    <StarIcon className='w-5 text-primary' />
                    <SuiText color='darkest'>
                      <p>10x performance increase</p>
                    </SuiText>
                  </li>
                  <li className='flex space-x-2'>
                    <StarIcon className='w-5 text-primary' />
                    <SuiText color='darkest'>
                      <p>½ the reduction in hardware cost</p>
                    </SuiText>
                  </li>
                </ul> */}
                <div className='flex mt-8'>
                  <SuiButton
                    title='Read the case study'
                    path='#'
                    color='dark'
                  />
                </div>
              </div>

              <div className='-mt-8 -mb-14 overflow-hidden mx-auto'>
                <LogoUberHex />
              </div>
            </div>
          </SuiPanel>
        </div>

        <div className='flex flex-col md:flex-row max-w-7xl mx-auto mt-12 space-y-10 md:space-y-0 md:space-x-12 px-6 2xl:px-0'>
          <UseCase
            logo={<LogoEbay />}
            description='eBay adopted ClickHouse for their real time OLAP events (Logs +
              Metrics) infrastructure. The simplified architecture with
              ClickHouse allowed them to reduce their DevOps activity and
              troubleshooting, reduced the overall infrastructure by 90%, and
              they saw a stronger integration with Grafana and ClickHouse for
              visualization and alerting.'
            bullet_one='Reduced DevOps activity and troubleshooting'
            bullet_two='10 times less hardware'
            bullet_three='Stronger integration with Grafana'
            path='#'
          />

          <UseCase
            logo={<LogoCloudflare />}
            description='Cloudflare was having challenges scaling their CitusDB-based
            system which had a high TCO and maintenance costs due to the
            complex architecture. By moving their HTTP analytics data to
            ClickHouse they were able to scale to 8M requests per second,
            deleted 10’s of thousands of lines of code, reduced their MTTR,
            and saw a 7x improvement on customer queries per second they
            could serve.'
            bullet_one='Scaled to 8M requests per second'
            bullet_two='Reduced their MTTR'
            bullet_three='7x improvement on query throughput'
            path='#'
          />
        </div>
        <div className='flex flex-col md:flex-row max-w-7xl mx-auto mt-12 space-y-10 md:space-y-0 md:space-x-12 px-6 2xl:px-0'>
          <UseCase
            logo={<LogoSpotify />}
            description='Spotify’s A/B Experimentation platform is serving thousands of sub-second queries per second on petabyte-scale datasets with Clickhouse. They reduced the amount of low-variance work by an order of magnitude and enabled feature teams to self-serve insights by introducing a unified SQL interface for Data Platform and tools for automatic decision making for Experimentation.'
            bullet_one='Reduced the amount of low-variance work'
            bullet_two='Enabled feature teams to self-serve insights'
            bullet_three='Tools for automatic decision making'
            path='#'
          />
          <UseCase
            logo={<LogoDeutche />}
            description='ClickHouse helps serve the Client Analytics platform for reporting, deep data analysis as well as advanced data science to provide Deutsche Bank’s front office a clear view on their client’s activity and profitability.'
            bullet_one='Platform for reporting and deep data analysis'
            bullet_two='Advanced data science'
            bullet_three='Provide clear view of client’s activity and profitability'
            path='#'
          />
        </div>
      </div>
    </>
  )
}

export default CustomerStoriesPage
