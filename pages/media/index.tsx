import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Image from 'next/image'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'

interface LogoContainerProps {
  h_url: string
  h_title: string
  v_url: string
  v_title: string
  background: string
}

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'Media Kit',
          path: '/media'
        },
        ...commonProps
      }
    }
  }

const LogoContainer = (props: LogoContainerProps) => (
  <div
    className={
      'w-54 flex flex-col gap-2 rounded-md border border-neutral-725 p-2 align-middle ' +
      props.background
    }>
    <Image
      src={'images/media/' + props.h_url}
      alt={props.h_title}
      width='234'
      height='78'
      className='self-center'
    />

    <Image
      src={'/images/media/' + props.v_url}
      alt={props.v_title}
      width='150'
      height='102'
      className='self-center'
    />
  </div>
)

function MediaPage({ seo, headerData, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex max-w-7xl flex-col px-4 md:px-8 2xl:px-0'>
          <div className='mx-auto flex max-w-screen-sm flex-col pt-6 text-center'>
            <h1 className='mb-16 font-basier text-5.5xl font-semibold'>
              Media
            </h1>
          </div>
          <div className='flex text-center'>
            <div className='flex w-full flex-col justify-center'>
              <h2 className='text-center font-basier text-2xl font-semibold'>
                Logo usage
              </h2>

              <div className='mt-8 mb-56 flex w-full flex-wrap justify-center gap-8 md:justify-evenly'>
                <LogoContainer
                  background='bg-primary-300'
                  h_url='ch_logo_blk_sm.svg'
                  h_title='ClickHouse Logo Horizontal - Black on Yellow'
                  v_url='ch_logo_blk_md_vert.svg'
                  v_title='ClickHouse Logo Vertical - Black on Yellow'
                />
                <LogoContainer
                  background='bg-neutral-0'
                  h_url='ch_logo_blk_sm.svg'
                  h_title='ClickHouse Logo Horizontal - Black'
                  v_url='ch_logo_blk_md_vert.svg'
                  v_title='ClickHouse Logo Vertical - Black'
                />
                <LogoContainer
                  background='bg-neutral-900'
                  h_url='ch_logo_wht_sm.svg'
                  h_title='ClickHouse Logo Horizontal - White'
                  v_url='ch_logo_wht_md_vert.svg'
                  v_title='ClickHouse Logo Vertical - White'
                />
                <LogoContainer
                  background='bg-neutral-800'
                  h_url='ch_logo_yel_sm.svg'
                  h_title='ClickHouse Logo Horizontal - Yellow'
                  v_url='ch_logo_yel_md_vert.svg'
                  v_title='ClickHouse Logo Vertical - Yellow'
                />
                <LogoContainer
                  background='bg-neutral-800'
                  h_url='ch_logo_mx_sm.svg'
                  h_title='ClickHouse Logo Horizontal - Mixed'
                  v_url='ch_logo_mx_md_vert.svg'
                  v_title='ClickHouse Logo Vertical - Mixed'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MediaPage
