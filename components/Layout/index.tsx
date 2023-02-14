import React, { ReactNode } from 'react'
import { SeoMetadata } from '../../lib/api/strapi/types'
import { NewsLetterData } from '../../types/homepage'
import Footer from '../Footer'
import { FooterData } from '../Footer/types'
import { Header } from '../header'
import { HeaderData } from '../header/types'
import SeoContainer from '../SeoContainer'
interface Props {
  children: ReactNode
  headerData: HeaderData
  footerData: FooterData
  seo?: SeoMetadata
}
function Layout({ children, headerData, footerData, seo }: Props) {
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <Header {...headerData} />
      {children}
      <Footer {...footerData} />
    </>
  )
}

export default Layout
