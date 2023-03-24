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
    <>
      {seo && <SeoContainer {...seo} />}
      <Header />
      {children}
      <Footer {...footerData} />
    </>
  )
}

export default Layout
