import { getFooterData } from '../../components/Footer/getFooterData'
import { FooterData } from '../../components/Footer/types'
import { getGetStartedData } from '../../components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '../../components/GetStarted/types'
import { HeaderProps } from '../../components/header/types'
import { getHeaderData } from '../../components/header/getHeaderData'
import githubStars from '../../public/githubStars.json'

interface Props {
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  headerData: HeaderProps
}

export async function getCommonProps(): Promise<Props> {
  const header = await getHeaderData()
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()

  const stars = githubStars.stars

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
