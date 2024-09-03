import { GetStaticProps } from 'next'
import { CUIButton } from '../../components/ClickUI'
import { SuiText, SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'
import Layout from '../../components/Layout'
import Image from 'next/image'

import hero from './hero.svg'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'chDB',
          description: '',
          path: '/chdb'
        },
        ...commonProps
      }
    }
  }

export default function ChdbPage({ headerData, footerData, seo }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='relative my-20'>
        <div className='absolute bottom-0 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
        <div className='section-container relative z-10 lg:py-20'>
          <div className='flex flex-col items-center gap-10 lg:flex-row'>
            <div className='flex-1 space-y-6'>
              <SuiTitle type='h1' className='!text-5xl'>
                chDB - fast, reliable, and scalable in-process database
              </SuiTitle>
              <SuiText className='text-balance'>
                Experience the power of ClickHouse, in-process. With
                unparalleled performance, reliability, and scalability for any
                data-intensive application.
              </SuiText>
              <TickItem>Blazing fast SQL engine</TickItem>
              <TickItem>Seamless data integration</TickItem>
              <TickItem>Supports 80+ data formats</TickItem>
              <CUIButton type='primary' size='lg' weight='semibold'>
                Try it today
              </CUIButton>
            </div>
            <div className='hidden flex-shrink-0 flex-grow-0 lg:block'>
              <Image src={hero} width={573} height={344} alt='hero' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function TickItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLDivElement>['className']
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
