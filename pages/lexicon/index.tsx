import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'

interface LexiconProps extends CommonProps {
  lexiconItems: any[]
}

export const getStaticProps: GetStaticProps<LexiconProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const lexiconItems = [
      {
        title: 'Data Warehousing Explained',
        href: '/lexicon/data-warehousing-explained'
      },
      {
        title: 'Distributed Databases',
        href: '/lexicon/distributed-databases'
      },
      {
        title: 'High Performance Databases',
        href: '/lexicon/high-performance-databases'
      },
      {
        title: 'What is an open source database?',
        href: '/lexicon/what-is-an-open-source-database'
      }
    ]

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
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div>
        <h1 className='mx-auto mb-10 pt-10 text-center font-basier text-4xl text-neutral-100 md:text-5.5xl lg:mb-16 lg:pt-20'>
          ClickHouse Lexicon
        </h1>
        <div className='mx-auto my-24 max-w-7xl px-4 sm:px-8 2xl:px-0'>
          <div className='mb-[380px] text-center'>
            <div>
              {lexiconItems.map((item, index) => {
                return (
                  <h2 className='pb-4 text-xl' key={index}>
                    <Link
                      href={item.href}
                      className=' text-primary-300 hover:underline'>
                      {item.title}
                    </Link>
                  </h2>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sitemap
