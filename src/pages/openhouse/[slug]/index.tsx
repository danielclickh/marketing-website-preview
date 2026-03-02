import OpenhouseTemplate2025 from '@/components-cleaned/OpenhouseTemplate2025'
import OpenhouseTemplate2026 from '@/components-cleaned/OpenhouseTemplate2026'
import Footer from '@/components/Footer'
import SeoContainer from '@/components/SeoContainer'
import {
  openhouseService,
  seoFieldToNextComponentProps
} from '@/lib/api/strapi'
import { IS_PRODUCTION } from '@/lib/next'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, ParamsType } from '@/types/homepage'
import { EntryOpenhouse } from '@/types/strapi'
import { GetStaticProps } from 'next'

export interface RoadshowProps extends CommonProps {
  entry: EntryOpenhouse
}

export const getStaticProps: GetStaticProps<RoadshowProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType

    const [commonProps, entry] = await Promise.all([
      getCommonProps(),
      openhouseService.findOne({
        filters: {
          slug: {
            $eq: slug
          }
        },
        publicationState: IS_PRODUCTION ? 'live' : 'preview'
      })
    ])

    if (!entry) {
      return {
        notFound: true
      }
    }

    const startDateObject = new Date(entry.startDate)

    const seo = seoFieldToNextComponentProps(entry.seo, {
      title: `Open House ${startDateObject.getFullYear()}: Free Database and AI User Conference - ${entry.heading.replaceAll(`\n`, ', ')} | ClickHouse`,
      path: `/openhouse/${entry.slug}`
    })

    return {
      props: {
        entry,
        seo,
        ...commonProps
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data = await openhouseService.findAll({
    fields: ['slug'],
    populate: [],
    publicationState: IS_PRODUCTION ? 'live' : 'preview'
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

const TEMPLATE_MAP: Record<
  EntryOpenhouse['template'],
  React.ComponentType<any>
> = {
  Y2025: OpenhouseTemplate2025,
  Y2026: OpenhouseTemplate2026
} as const

export default function Page({ seo, entry }: RoadshowProps) {
  const Template = TEMPLATE_MAP[entry.template]
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <Template entry={entry} />
      <Footer />
    </>
  )
}
