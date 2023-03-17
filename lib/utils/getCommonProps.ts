import fetch from 'cross-fetch'
import { getFooterData } from '../../components/Footer/getFooterData'
import { FooterData } from '../../components/Footer/types'
import { getGetStartedData } from '../../components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '../../components/GetStarted/types'
import { getHeaderData } from '../../components/header/getHeaderData'
import { HeaderData } from '../../components/header/types'

interface Props {
  headerData: HeaderData
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  github: {
    stars: number
  }
}

export async function getCommonProps(): Promise<Props> {
  const headerData = await getHeaderData()
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()
  const githubData = await fetch(
    'https://api.github.com/repos/ClickHouse/ClickHouse'
  )
  const { data } = await githubData.json()
  const stars = data?.stargazers_count ?? 0
  return {
    headerData,
    footerData,
    platforms: getStartedData.platforms,
    github: {
      stars
    }
  }
}
