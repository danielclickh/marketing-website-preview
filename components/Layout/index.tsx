import React, { ReactNode } from 'react'
import { SeoMetadata } from '../../lib/api/strapi/types'
import Footer from '../Footer'
import { FooterData } from '../Footer/types'
import { Header } from '../header'
import SeoContainer from '../SeoContainer'
interface Props {
  children: ReactNode
  footerData: FooterData
  seo?: SeoMetadata
}
function Layout({ children, footerData, seo }: Props) {
  return (
    <div>
      {seo && <SeoContainer {...seo} />}
      <Header />
      {children}
      <Footer {...footerData} />
    </div>
  )
}

export default Layout
