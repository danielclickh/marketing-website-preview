import heroDesktop from './assets/hero-desktop.png'
import AnimatedFlare from '@/components/AnimatedFlare'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'ClickHouse.ai',
          description:
            'Two powerful ways to bring natural language intelligence to your ClickHouse data.',
          path: '/cloud/ai'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='relative overflow-hidden pb-32'>
        <AnimatedFlare className='absolute bottom-10 left-1/2 z-0 aspect-video w-[130vw] max-w-screen-3xl -translate-x-1/2 bg-grid' />
        <div className='section-container relative z-10'>
          <div className='space-y-2 py-24 text-center'>
            <SuiText size='lg' className='text-primary-300' weight='bold'>
              Two powerful ways to bring natural language intelligence to your
              ClickHouse data.
            </SuiText>
            <SuiTitle type='h1' className='lg:text-[5rem]' weight='bold'>
              ClickHouse.ai
            </SuiTitle>
          </div>
          <div className='-mx-16'>
            <Image
              src={heroDesktop}
              width={2460 / 2}
              height={1259 / 2}
              alt=''
              className='h-auto w-full max-w-none'
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
