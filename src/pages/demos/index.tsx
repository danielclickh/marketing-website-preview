import DemoCard from '@/components/DemoCard'
import FollowUs from '@/components/FollowUs'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { findAll, findOne, getStagingOnlyFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { Demo } from '@/types/demos'
import { CommonProps } from '@/types/homepage'
import { GetServerSideProps } from 'next'

interface DemosPageProps extends CommonProps {
  title: null | string
  description: null | string
  demos: Demo[]
}

export const getServerSideProps: GetServerSideProps<DemosPageProps> =
  async function getServerSideProps({ params }) {
    const commonProps = await getCommonProps()
    const stagingOnlyFilters = getStagingOnlyFilters()
    const {
      Title: title,
      Description: description,
      SEO: seo
    } = await findOne('demos-page', {
      populate: ['SEO', 'SEO.image']
    })

    const filters: Record<string, any> = {
      $or: stagingOnlyFilters
    }

    const { data: demos } = await findAll('demos', {
      filters,
      sort: ['SortOrder:ASC', 'publishedAt:DESC'],
      populate: ['Image']
    })

    if (!seo?.title) seo.title = title
    seo.path = '/demos'
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
  headerData
}: DemosPageProps) {
  useGalaxyOnPage('demosPage')
  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:mb-20 lg:pt-20'>
        <SuiTitle type='h1'>{title || 'Demos'}</SuiTitle>
        {!!description && (
          <Markdown className='mt-6 text-lg'>{description}</Markdown>
        )}
      </div>
      <div className='container mx-auto max-w-7xl px-8 pt-8 2xl:px-0'>
        <div className='w-full'>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
            {demos
              .filter((demo) => demo.ListOnDemos)
              .map((demo) => (
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
