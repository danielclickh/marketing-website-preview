import { getFooterData } from '../../components/Footer/getFooterData'
import { FooterData } from '../../components/Footer/types'
import { getGetStartedData } from '../../components/GetStarted/getStartedData'
import { GettingStartedData } from '../../components/GetStarted/types'
import { getHeaderData } from '../../components/header/getHeaderData'
import { HeaderData } from '../../components/header/types'

interface Props {
  headerData: HeaderData
  footerData: FooterData
  getStartedData: GettingStartedData
}

export async function getCommonProps(): Promise<Props> {
  const headerData = await getHeaderData()
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()
  return {
    headerData,
    footerData,
    platforms: getStartedData.platforms
  }
}
