import Footer from '../Footer'
import Header from '../Header'
import { HeaderProps } from '../Header/types'
import SeoContainer from '../SeoContainer'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  headerData: HeaderProps
  seo?: SeoMetadata
}
function Layout({ children, headerData, seo }: Props) {
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <Header {...headerData} />
      <main className='readable-content'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
