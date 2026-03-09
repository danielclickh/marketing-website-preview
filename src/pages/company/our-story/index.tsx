import almazcapital from './assets/investor-almazcapital.png'
import altimeter from './assets/investor-altimeter.png'
import battery from './assets/investor-battery.svg'
import benchmark from './assets/investor-benchmark.png'
import bessemer from './assets/investor-bessemer.svg'
import bond from './assets/investor-bond.svg'
import coatue from './assets/investor-coatue.svg'
import firstmark from './assets/investor-firstmark.png'
import indexventures from './assets/investor-indexventures.png'
import ivp from './assets/investor-ivp.svg'
import khosla from './assets/investor-khosla.svg'
import leadedge from './assets/investor-leadedge.png'
import lightspeed from './assets/investor-lightspeed.png'
import nebius from './assets/investor-nebius.png'
import redpoint from './assets/investor-redpoint.png'
import troweprice from './assets/investor-t-rowe-price.svg'
import wcm from './assets/investor-wcm.svg'
import founders from './founders.json'
import styles from './styles.module.scss'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import { Person } from '@/components/person_area'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { OurStoryData } from '@/types/ourStory'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'

export const getStaticProps: GetStaticProps<OurStoryData> =
  async function getStaticProps() {
    const params = {
      populate: [
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
    data.seo.path = '/company/our-story'
    data.seo.languages = ['en', 'ja']
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function OurStoryPage({
  ourHistory,
  hiring,
  team,
  headerData,
  seo
}: OurStoryData) {
  useGalaxyOnPage('ourStoryPage')

  return (
    <>
      <Layout seo={seo} headerData={headerData}>
        <div className='relative pt-10'>
          <div className='pt-10'>
            <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
              <div className='mx-auto flex flex-col text-center'>
                <h1 className='mb-4 font-basier text-4xl font-semibold leading-tight text-neutral-100 md:text-5.5xl'>
                  Who we are
                </h1>
                <p className='max-w-3xl text-neutral-200'>
                  Work on ClickHouse began in 2009 with the vision of being the
                  fastest OLAP database on earth. We are the creators of the
                  popular open-source column-oriented database management system
                  which allows users to generate analytical reports using SQL
                  queries in real-time. We understand that data grows in real
                  time and we believe that results should be fast, very{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>fast</span>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className='relative pt-10'>
              <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 2xl:px-0'>
                <div className='flex'>
                  <Image
                    src='/images/team-who-we-are.png'
                    width='751'
                    height='406'
                    loading='eager'
                    priority
                    alt='Who we are'
                    className='mx-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='section-container mx-auto my-32 flex max-w-7xl flex-col items-start gap-16 lg:flex-row-reverse'>
          <div className='flex w-full flex-col lg:w-1/2'>
            <Image
              src='/images/our-story/map-wrap.png'
              height={488}
              width={1025}
              alt='ClickHouse around the world'
            />
          </div>
          <div className='flex w-full flex-col lg:w-1/2'>
            <SuiTitle
              type='h2'
              weight='semibold'
              className='mb-8 text-neutral-100'>
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
        <div className='section-container mx-auto mb-12 flex max-w-7xl flex-col items-center gap-16 lg:flex-row'>
          <div className='flex w-full flex-col lg:w-1/2'>
            <Image
              src='/images/our-story/founders.png'
              alt='Founders'
              width={480}
              height={320}
              className='w-full'
            />
          </div>
          <div className='flex w-full flex-col lg:w-1/2'>
            <SuiTitle
              type='h2'
              weight='semibold'
              className='mb-8 text-neutral-100'>
              Our history
            </SuiTitle>
            <div className='max-w-5xl'>
              <div className='flex flex-col whitespace-pre-wrap text-neutral-200'>
                {ourHistory.items.map((item) => (
                  <div className={styles.historyItem} key={item.text}>
                    <div className='flex'>
                      <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                        <SuiTitle
                          type='h5'
                          className='min-w-[3rem] !text-base'
                          weight='medium'>
                          {item.year}
                        </SuiTitle>
                      </div>
                    </div>
                    <div className={styles.historyText}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='w-full bg-neutral-725 pb-24 pt-16'>
          <div className='section-container container mx-auto flex flex-col'>
            <SuiTitle
              type='h2'
              weight='bold'
              className='mb-14 text-center text-neutral-100'>
              {team.foundersTitle}
            </SuiTitle>

            <div className='flex flex-col items-center justify-evenly gap-2 space-y-8 sm:flex-row sm:items-start sm:space-y-0'>
              {founders.map((founder) => (
                <Person
                  key={founder.name + founder.role}
                  avatar={founder.imgSrc}
                  name={founder.name}
                  job={founder.role}
                  className='mx-auto !max-w-[232px]'
                  personType='founder'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='w-full pb-24 pt-16'>
          <div className='section-container container mx-auto space-y-12'>
            <SuiTitle
              type='h2'
              weight='bold'
              className='mb-14 text-center text-neutral-100'>
              Our investors
            </SuiTitle>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row xl:flex-wrap xl:items-center xl:justify-around'>
              {(
                [
                  {
                    src: indexventures,
                    width: 672 / 3,
                    height: 177 / 3,
                    alt: 'Index Ventures'
                  },
                  {
                    src: benchmark,
                    width: 651 / 3,
                    height: 177 / 3,
                    alt: 'Benchmark'
                  },
                  { src: coatue, width: 141, height: 59, alt: 'Coatue' },
                  {
                    src: altimeter,
                    width: 609 / 3,
                    height: 177 / 3,
                    alt: 'Altimeter'
                  },
                  { src: khosla, width: 213, height: 59, alt: 'Khosla' },
                  {
                    src: lightspeed,
                    width: 492 / 3,
                    height: 177 / 3,
                    alt: 'Lightspeed'
                  },
                  { src: bond, width: 144, height: 59, alt: 'Bond' },
                  { src: bessemer, width: 119, height: 59, alt: 'Bessemer' },
                  { src: battery, width: 186, height: 59, alt: 'Battery' },
                  { src: ivp, width: 75, height: 59, alt: 'IVP' },
                  {
                    src: troweprice,
                    width: 222,
                    height: 64,
                    alt: 'T.Rowe Price'
                  },
                  { src: wcm, width: 126, height: 42, alt: 'WCM' },
                  {
                    src: nebius,
                    width: 504 / 3,
                    height: 177 / 3,
                    alt: 'Nebius'
                  },
                  {
                    src: redpoint,
                    width: 483 / 3,
                    height: 177 / 3,
                    alt: 'Redpoint'
                  },
                  {
                    src: almazcapital,
                    width: 489 / 3,
                    height: 177 / 3,
                    alt: 'AlmazCapital'
                  },
                  {
                    src: firstmark,
                    width: 528 / 3,
                    height: 177 / 3,
                    alt: 'Firstmark'
                  },
                  {
                    src: leadedge,
                    width: 576 / 3,
                    height: 177 / 3,
                    alt: 'Lead Edge'
                  }
                ] satisfies Array<
                  Pick<ImageProps, 'src' | 'width' | 'height' | 'alt'>
                >
              )
                .toSorted((a, b) => a.alt.localeCompare(b.alt))
                .map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={item.src}
                      width={item.width}
                      height={item.height}
                      alt={item.alt}
                      className='mx-auto flex-1 flex-grow-0'
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className='section-container pb-16'>
          <div className='flip-selection w-full rounded-lg bg-primary-300 py-16 text-neutral-0'>
            <div className='container mx-auto flex flex-col 2xl:px-0'>
              <div className='mx-auto flex flex-col text-center'>
                <SuiTitle type='h2' color='text-default' className='mb-6'>
                  Interested in joining our team?
                </SuiTitle>
                <div className='max-w-3xl'>
                  <SuiText size='base' color='text-default' weight='normal'>
                    If you are looking for a place to build something new, be an
                    agent of change, and have an opportunity to have a
                    significant impact on the company’s success, this is the
                    place for you.
                  </SuiText>

                  {hiring.ctaButton && (
                    <CUIButton
                      type='primary-dark'
                      className='group mx-auto mt-6 flex w-auto'
                      href='/company/careers'
                      size='lg'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }>
                      View careers
                    </CUIButton>
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
