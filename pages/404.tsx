import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { SuiButton, SuiLink } from '../components/sui'
import { getCommonProps } from '../lib/utils/getCommonProps'
import { CommonProps } from '../types/homepage'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: '404 | ClickHouse'
        },
        ...commonProps
      }
    }
  }
export default function NotFoundPage({ footerData, seo }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='grid items-center h-screen overflow-hidden'>
        <div className='bg-neutral-900 flex flex-col px-8 py-10 md:flex-row md:px-10 md:border md:border-c4/10 mx-auto max-w-screen-sm divide-y-2 md:divide-x-2 md:divide-y-0'>
          <div className='flex flex-col items-start pb-10 md:pb-0'>
            <p className='text-2xl text-neutral-100 text-left text-bold mb-4'>
              Oops! We can&apos;t find this page...
            </p>
            <p className='text-neutral-200 mb-8 text-left'>
              The page you&apos;re looking for doesn&apos;t appear to exist or
              has been moved.
            </p>
            <div className='flex gap-2'>
              <SuiButton path='/blog' type='secondary' size='sm'>
                <ArrowLeftIcon className='h-3' />
                Back
              </SuiButton>

              <SuiButton path='/' type='secondary' size='sm'>
                Home
              </SuiButton>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start justify-center md:pl-8 pt-10 md:pt-0'>
            <SuiLink
              href='https://docs.clickhouse.com'
              className='hover:text-c6'>
              Documentation
            </SuiLink>

            <SuiLink href='/blog' className='hover:text-c6'>
              Our blog
            </SuiLink>
          </div>
        </div>
      </div>
    </Layout>
  )
}
