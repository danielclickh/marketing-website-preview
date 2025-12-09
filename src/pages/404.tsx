import SmartBackButton from '@/components-cleaned/SmartBackButton'
import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: '404 | ClickHouse',
          path: '/404',
          robots: 'noindex'
        },
        ...commonProps
      }
    }
  }

export default function NotFoundPage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='section-container flex items-center justify-center gap-16 py-16 lg:py-24 xl:py-36'>
        <CUICard>
          <CUICard.Body className='space-y-4 p-4 lg:space-y-6 lg:p-6'>
            <div className='space-y-4'>
              <SuiTitle type='h1' className='md:!text-4xl'>
                Oops! We can&apos;t find this page...
              </SuiTitle>
              <p className='text-neutral-200'>
                The page you&apos;re looking for doesn&apos;t appear to exist or
                has been moved.
              </p>
              <div className='flex items-center gap-6'>
                <SmartBackButton
                  fallbackPath='/'
                  className='flex h-8 items-center justify-center gap-1 rounded border border-primary-600 bg-transparent px-4 text-xs text-neutral-0 transition hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'>
                  <ArrowLeftIcon className='h-3' /> Go back
                </SmartBackButton>
                <Link href='/' className='text-sm hover:underline'>
                  Go home
                </Link>
              </div>
            </div>
            <HRSeparator />
            <ul className='flex flex-wrap gap-x-6 gap-y-2'>
              <li>
                <Link
                  href='https://clickhouse.com/docs'
                  className='text-sm text-primary-300 hover:underline'>
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-sm text-primary-300 hover:underline'>
                  Our blog
                </Link>
              </li>
              <li>
                <Link
                  href='/company/events'
                  className='text-sm text-primary-300 hover:underline'>
                  Events
                </Link>
              </li>
            </ul>
          </CUICard.Body>
        </CUICard>
      </div>
    </Layout>
  )
}
