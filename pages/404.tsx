import { ArrowLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
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
          title: '404 | ClickHouse',
          path: '/404'
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
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='grid h-screen items-center overflow-hidden'>
        <div className='mx-auto flex max-w-screen-sm flex-col divide-y-2 bg-neutral-900 px-8 py-10 md:flex-row md:divide-x-2 md:divide-y-0 md:border md:border-c4/10 md:px-10'>
          <div className='flex flex-col items-start pb-10 md:pb-0'>
            <p className='text-bold mb-4 text-left text-2xl text-neutral-100'>
              Oops! We can&apos;t find this page...
            </p>
            <p className='mb-8 text-left text-neutral-200'>
              The page you&apos;re looking for doesn&apos;t appear to exist or
              has been moved.
            </p>
            <div className='flex gap-2'>
              <SuiButton onClick={handleBack} type='secondary' size='sm'>
                <ArrowLeftIcon className='h-3' />
                Back
              </SuiButton>

              <SuiButton path='/' type='secondary' size='sm'>
                Home
              </SuiButton>
            </div>
          </div>
          <div className='flex flex-col items-start justify-center gap-2 pt-10 md:pl-8 md:pt-0'>
            <SuiLink
              href='https://docs.clickhouse.com'
              className='hover:text-c6'
            >
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
