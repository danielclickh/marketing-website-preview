import { GetStaticProps } from 'next'
import React from 'react'
import Layout from '../../components/Layout'
import { SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'Sitemap - ClickHouse'
        },
        ...commonProps
      }
    }
  }

function Sitemap({ seo, headerData, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-20 md:pt-30'>
        <div className='mx-10 min-h-screen pb-10 md:pb-20 '>
          <div className='mx-auto mb-20 flex w-full flex-col items-center justify-center gap-20 md:mb-36 md:flex-row-reverse'>
            <div className='flex max-w-screen-md flex-col items-center md:items-start'>
              <SuiTitle
                type='h1'
                color='primary'
                weight='bold'
                className='pb-6 md:!text-6xl'>
                ClickHouse Cloud on AWS
              </SuiTitle>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sitemap
