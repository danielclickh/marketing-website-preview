import fetch from 'cross-fetch'
import { getFooterData } from '../../components/Footer/getFooterData'
import { FooterData } from '../../components/Footer/types'
import { getGetStartedData } from '../../components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '../../components/GetStarted/types'
import { HeaderProps } from '../../components/header/types'
import { getHeaderData } from '../../components/header/getHeaderData'
interface Props {
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  headerData: HeaderProps
}

export async function getCommonProps(): Promise<Props> {
  const header = await getHeaderData()
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()
  // const githubData = await fetch(
  //   'https://api.github.com/repos/ClickHouse/ClickHouse'
  // )
  // const data = await githubData.json()
  const stars = 30380
  return {
    footerData,
    platforms: getStartedData.platforms,
    headerData: {
      header,
      github: {
        stars
      }
    }
  }
}
