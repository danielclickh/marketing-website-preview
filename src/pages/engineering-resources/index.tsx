import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { getEngineeringResources } from '@/lib/engineering-resources'
import { EngineeringResource } from '@/lib/engineering-resources/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

interface EngineeringResourcesProps extends CommonProps {
  engResourcesItems: EngineeringResource[]
}

export const getStaticProps: GetStaticProps<EngineeringResourcesProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const engResourcesItems = getEngineeringResources()

    return {
      props: {
        engResourcesItems: engResourcesItems,
        seo: {
          title: 'Engineering Resources - ClickHouse',
          path: '/engineering-resources'
        },
        ...commonProps
      }
    }
  }

function Sitemap({
  seo,
  headerData,
  footerData,
  engResourcesItems: engResourcesItems
}: EngineeringResourcesProps) {
  const router = useRouter()
  const [search, setSearch] = useState<string | null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  const items = (() => {
    // Filter items by search term
    if (search) {
      engResourcesItems = engResourcesItems.filter((item) => {
        const searchTerm = search.trim().toLowerCase()
        const inTitle = item.title.toLowerCase().includes(searchTerm)
        const inExcerpt = item.excerpt.toLowerCase().includes(searchTerm)
        const inBody = item.body.toLowerCase().includes(searchTerm)

        return inTitle || inExcerpt || inBody
      })
    }

    return engResourcesItems
  })()

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlSearch = queryParams.get('search')

    // Check the search query is not empty
    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = []

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`)
    }

    if (queryParams.length) {
      router.push(
        '/engineering-resources?' + queryParams.join('&'),
        undefined,
        { shallow: true }
      )
    } else {
      router.push('/engineering-resources', undefined, { shallow: true })
    }
  }, [search])

  useGalaxyOnPage('lexiconPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid'>
        <div className='section-container py-16 md:py-20'>
          <SuiTitle type='h1' color='white' className='mb-12 md:!text-6xl'>
            ClickHouse Engineering Resources
          </SuiTitle>

          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='max-w-[300px]'
            value={search || ''}
            onChange={searchChange}
          />

          <hr className='my-6 h-[1px] border-0 bg-white bg-opacity-40' />

          {items.map((item) => {
            const authorName = item.author || "The ClickHouse Team"
            const lastUpdated = item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : null

            return (
              <div className='my-10' key={item.slug}>
                <SuiTitle type='h2' className='!text-xl'>
                  <Link
                    href={`/engineering-resources/${item.slug}`}
                    className='text-primary-300 hover:underline'>
                    {item.title}
                  </Link>
                </SuiTitle>
                <div className='mt-2 text-neutral-200'>{item.excerpt}</div>
                <div className='mt-2 text-sm text-neutral-300'>
                  {authorName}{lastUpdated && ` • ${lastUpdated}`}
                </div>
              </div>
            )
          })}

          {!items.length && (
            <p className='mt-12 text-center'>
              {search ? `No search results for "${search}"` : 'No results'}
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Sitemap
