import DemoCard from '@/components/DemoCard'
import FollowUs from '@/components/FollowUs'
import Markdown from '@/components/Markdown'
import Layout from '@/components/jp/Layout'
import { SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { Demo } from '@/types/demos'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'

interface DemosPageProps extends CommonProps {
  title: null | string
  description: null | string
  demos: Demo[]
}

export const getStaticProps: GetStaticProps<DemosPageProps> =
  async function getServerSideProps(context) {
    const commonProps = await getCommonProps()

    const {
      Title: title,
      Description: description,
      SEO: seo
    } = await findOne('demos-page', {
      populate: ['SEO', 'SEO.image']
    })

    const { data: demos } = await findAll('demos', {
      sort: ['SortOrder:ASC', 'publishedAt:DESC'],
      populate: ['Image']
    })

    if (!seo?.title) seo.title = title
    seo.locale = 'ja_JP'
    seo.path = '/jp/demos'
    seo.title = 'ClickHouse デモ'
    seo.languages = ['en', 'ja']

    return {
      props: {
        title,
        description,
        demos,
        seo,
        ...commonProps
      }
    }
  }

export default function DemosPage({
  title,
  description,
  demos,
  seo,
  headerData,
  footerData
}: DemosPageProps) {
  useGalaxyOnPage('demosPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-20 lg:pt-20'>
        <SuiTitle type='h1'>デモ</SuiTitle>
        {!!description && (
          <Markdown className='mt-6 text-lg'>
            ClickHouse
            のスピードとスケーラビリティを紹介するオープンソースのデモ
          </Markdown>
        )}
      </div>
      <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
        <div className='w-full'>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
            {demos.map((demo) => (
              <DemoCard key={demo.id} {...demo} />
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
