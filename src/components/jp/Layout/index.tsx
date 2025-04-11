import { ReactNode } from 'react'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { HeaderProps } from '../../Header/types'
import SeoContainer from '../../SeoContainer'
import Footer from '../Footer'
import { FooterData } from '../Footer/types'
import Header from '../Header'
interface Props {
  children: ReactNode
  footerData: FooterData
  headerData: HeaderProps
  seo?: SeoMetadata
}
function Layout({ children, footerData, headerData, seo }: Props) {
  return (
    <div>
      {seo && <SeoContainer {...seo} />}
      <Header {...headerData} />
      <div className='readable-content'>{children}</div>
      <Footer {...footerData} />
    </div>
  )
}

export default Layout
