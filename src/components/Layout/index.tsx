import Footer from '../Footer'
import { FooterData } from '../Footer/types'
import Header from '../Header'
import { HeaderProps } from '../Header/types'
import SeoContainer from '../SeoContainer'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  footerData: FooterData
  headerData: HeaderProps
  seo?: SeoMetadata
}
function Layout({ children, footerData, headerData, seo }: Props) {
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <Header {...headerData} />
      <main className='readable-content'>{children}</main>
      <Footer {...footerData} />
    </>
  )
}

export default Layout
