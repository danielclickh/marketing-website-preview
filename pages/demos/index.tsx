import { GetStaticProps } from 'next'
import Link from 'next/link'
import { CUICard } from '../../components/ClickUI'
import FollowUs from '../../components/FollowUs'
import Layout from '../../components/Layout'
import Markdown from '../../components/Markdown'
import { SuiText, SuiTitle } from '../../components/sui'
import { findAll } from '../../lib/api/strapi'
import { StrapiImage } from '../../components/StrapiElements'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { galaxyOnPage } from '../../lib/galaxy/galaxy'
import { CommonProps } from '../../types/homepage'

type Demo = {
  id: number
  Title: string
  Description: string
  Link: string
  LinkType: '_blank' | '_self'
  Image: null | StrapiImageType
}

interface DemosPageProps extends CommonProps {
  demos: Demo[]
}

export const getStaticProps: GetStaticProps<DemosPageProps> =
  async function getServerSideProps(context) {
    const commonProps = await getCommonProps()

    const { data: demos } = await findAll('demos', {
      sort: ['SortOrder:ASC', 'publishedAt:DESC'],
      populate: ['Image']
    })

    return {
      props: {
        title: 'Demos',
        demos,
        seo: {
          title: 'ClickHouse Demos',
          description: '',
          path: '/demos'
        },
        ...commonProps
      }
    }
  }

export default function DemosPage({
  demos,
  seo,
  headerData,
  footerData
}: DemosPageProps) {
  galaxyOnPage('demosPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-20 lg:pt-20'>
        <SuiTitle type='h1'>Our Demo Aplications</SuiTitle>
        <SuiText className='mt-6 text-lg'>
          Discover how companies are using ClickHouse to speed up their
          workloads and lower costs.
        </SuiText>
      </div>
      <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
        <div className='w-full'>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
            {demos.map((demo, index) => (
              <Link
                key={demo.id}
                href={demo.Link}
                target={demo.LinkType}
                className='hover:scale-102 group group transition ease-in-out hover:-translate-y-1 hover:no-underline'>
                <CUICard>
                  <CUICard.Body className='min-h-full'>
                    <div className='flex min-h-full flex-col gap-4 p-6'>
                      {demo.Image && (
                        <StrapiImage
                          {...demo.Image}
                          sizes='medium'
                          alt={demo.Title}
                          width={774}
                          height={420}
                          className='mb-12 flex items-center justify-center bg-primary-300 text-lg font-black text-primary-900'
                        />
                      )}
                      <SuiTitle type='h3'>{demo.Title}</SuiTitle>
                      <Markdown className='opacity-80'>
                        {demo.Description}
                      </Markdown>
                      <div className='mt-auto flex justify-end'>
                        <span className='inline-block rounded border border-primary-300/50 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:border-primary-300'>
                          <span className='inline-flex items-center gap-4'>
                            <span className='flex-shrink-0 flex-grow-0'>
                              Open demo
                            </span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='18'
                              height='18'
                              fill='none'
                              viewBox='0 0 18 18'>
                              <path
                                fill='#FFFFE8'
                                d='M17.813 6.75a.563.563 0 0 1-1.125 0V2.108l-6.54 6.54a.562.562 0 0 1-.795-.795l6.539-6.54H11.25a.562.562 0 1 1 0-1.125h6a.562.562 0 0 1 .563.562v6ZM14.25 9.188a.562.562 0 0 0-.563.562v6.75a.188.188 0 0 1-.187.188h-12a.188.188 0 0 1-.188-.188v-12a.187.187 0 0 1 .188-.188h6.75a.563.563 0 1 0 0-1.125H1.5A1.312 1.312 0 0 0 .187 4.5v12A1.313 1.313 0 0 0 1.5 17.813h12a1.313 1.313 0 0 0 1.313-1.313V9.75a.563.563 0 0 0-.563-.563Z'
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <FollowUs />
      </div>
    </Layout>
  )
}
