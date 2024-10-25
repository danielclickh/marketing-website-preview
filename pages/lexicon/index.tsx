import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import { getLexicons } from '../../lib/lexicons'
import { Lexicon } from '../../lib/lexicons/types'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'
import { useGalaxyOnPage } from '../../lib/galaxy/galaxy'

interface LexiconProps extends CommonProps {
  lexiconItems: Lexicon[]
}

export const getStaticProps: GetStaticProps<LexiconProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const lexiconItems = getLexicons()

    return {
      props: {
        lexiconItems,
        seo: {
          title: 'Lexicon - ClickHouse',
          path: '/lexicon'
        },
        ...commonProps
      }
    }
  }

function Sitemap({ seo, headerData, footerData, lexiconItems }: LexiconProps) {
  const router = useRouter()
  const [search, setSearch] = useState<string | null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  const items = (() => {
    // Filter items by search term
    if (search) {
      lexiconItems = lexiconItems.filter((item) => {
        const searchTerm = search.trim().toLowerCase()
        const inTitle = item.title.toLowerCase().includes(searchTerm)
        const inExcerpt = item.excerpt.toLowerCase().includes(searchTerm)
        const inBody = item.body.toLowerCase().includes(searchTerm)

        return inTitle || inExcerpt || inBody
      })
    }

    return lexiconItems
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
      router.push('/lexicon?' + queryParams.join('&'), undefined, {
        shallow: true
      })
    } else {
      router.push('/lexicon', undefined, { shallow: true })
    }
  }, [search])

  useGalaxyOnPage('lexiconPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid'>
        <div className='section-container py-16 md:py-20'>
          <SuiTitle type='h1' color='white' className='mb-12 md:!text-6xl'>
            ClickHouse Lexicon
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
            return (
              <div
                className='my-10 flex flex-wrap items-center justify-between md:flex-nowrap'
                key={item.slug}>
                <div className='mb-4 w-full md:mb-0 md:w-1/3'>
                  <SuiTitle type='h2' className='!text-xl'>
                    <Link
                      href={`/lexicon/${item.slug}`}
                      className='text-primary-300 hover:underline'>
                      {item.title}
                    </Link>
                  </SuiTitle>
                </div>
                <div className='w-full md:w-2/3'>{item.excerpt}</div>
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
