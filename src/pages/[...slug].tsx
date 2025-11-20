import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import SupportProgram from '@/components/SupportProgram'
import { SuiTitle } from '@/components/sui'
import { findAll, getPathsValues } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CatAllParamsType, RichContentPageProps } from '@/types/homepage'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<RichContentPageProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as CatAllParamsType
    const { data } = await findAll('rich-content-pages', {
      filters: {
        $or: [
          {
            url: {
              $eq: `/${slug.join('/')}`
            }
          },
          {
            url: {
              $eq: `/${slug.join('/')}/`
            }
          }
        ]
      },
      populate: ['seo']
    })
    const page = data[0]

    if (!page) {
      return {
        notFound: true
      }
    }

    const commonProps = await getCommonProps()
    return {
      props: {
        title: page.title,
        content: page.content,
        fullWidthContent: page.full_width_content,
        leftContent: page.left_content,
        rightContent: page.right_content,
        slug: slug.join('/'),
        ...commonProps,
        seo: {
          title: page.seo?.title ?? page.title,
          description: page.seo?.description ?? page.title,
          type: 'website',
          siteName: 'ClickHouse',
          path: `/${slug.join('/')}`
        }
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = await getPathsValues(
    'rich-content-pages',
    {
      fields: ['url']
    },
    'url',
    true
  )

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: paths.filter((item) => item.params.slug.join('/') !== 'ai'),
    fallback: 'blocking'
  }
}

export default function RichContentPage({
  title,
  content,
  fullWidthContent,
  leftContent,
  rightContent,
  footerData,
  headerData,
  seo,
  slug
}: RichContentPageProps) {
  const lockContent =
    slug &&
    [
      'legal/agreements/terms-of-service',
      'legal/agreements/data-processing-addendum',
      'legal/agreements/terms-of-service/archive/202210',
      'legal/agreements/terms-of-service/archive/202308'
    ].includes(slug)

  const galaxyEventPrefixMap: Record<string, string> = {
    'support/program': 'supportProgramPage',
    'legal/agreements/terms-of-service': 'termsOfServicePage',
    'legal/agreements/data-processing-addendum': 'dataProcessingAddendumPage',
    'legal/agreements/terms-of-service/archive/202210':
      'termsOfServiceArchiveOct2022Page',
    'legal/agreements/terms-of-service/archive/202308':
      'termsOfServiceArchiveAug2023Page'
  }
  const galaxyEventPrefix = galaxyEventPrefixMap[slug ?? ''] || ''

  useGalaxyOnPage(galaxyEventPrefix, [slug])

  const pageBody = (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {slug === 'support/program' ? (
        <SupportProgram
          {...{
            title,
            content,
            fullWidthContent,
            leftContent,
            rightContent,
            footerData,
            seo,
            slug
          }}
        />
      ) : (
        <div className='rich-content-page'>
          {slug === 'legal/agreements/terms-of-service' ? (
            <>
              <h1 className='container mx-auto flex max-w-screen-lg items-center justify-center px-0 py-16 text-center font-basier text-5xl font-bold'>
                {title}
              </h1>
            </>
          ) : (
            <SuiTitle
              type='h1'
              className='container mx-auto flex max-w-screen-lg items-center justify-center px-0 py-16 text-center font-bold'>
              {title}
            </SuiTitle>
          )}
          <div className='mb-16 px-4 pb-16'>
            <div className='container mx-auto max-w-7xl'>
              {content && (
                <Markdown className='rich-text-content show-anchor'>
                  {content}
                </Markdown>
              )}

              {(leftContent || rightContent) && (
                <div
                  className={
                    leftContent && rightContent
                      ? 'mb-16 flex flex-col items-start justify-center gap-x-[5%] md:grid md:grid-cols-2'
                      : 'mb-16'
                  }>
                  {leftContent && (
                    <Markdown className='rich-text-content show-anchor w-full'>
                      {leftContent}
                    </Markdown>
                  )}
                  {rightContent && (
                    <Markdown className='rich-text-content show-anchor w-full'>
                      {rightContent}
                    </Markdown>
                  )}
                </div>
              )}

              {fullWidthContent && (
                <Markdown className='rich-text-content show-anchor mx-auto my-16'>
                  {fullWidthContent}
                </Markdown>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )

  if (lockContent) {
    return (
      <>
        <div
          className='print:hidden'
          style={{ userSelect: 'none' }}
          ref={(el) => {
            el &&
              el.addEventListener('selectstart', function () {
                return false
              })
          }}>
          {pageBody}
        </div>
        <div className='hidden text-black print:block'>
          Please request a copy from legal@clickhouse.com
        </div>
      </>
    )
  }

  return pageBody
}
