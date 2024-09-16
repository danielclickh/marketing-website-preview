import { getFooterData } from '../../components/Footer/getFooterData'
import { FooterData } from '../../components/Footer/types'
import { getGetStartedData } from '../../components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '../../components/GetStarted/types'
import { HeaderProps } from '../../components/Header/types'
import githubStars from '../../public/githubStars.json'

interface Props {
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  headerData: HeaderProps
}

export async function getCommonProps(): Promise<Props> {
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()

  let stars = githubStars?.stars || 36719

  if (process.env.NEXT_IS_PROD === 'true') {
    if (!githubStars || !('stars' in githubStars)) {
      throw new Error('Failed to get GitHub stars.')
    }
  }

  return {
    footerData,
    platforms: getStartedData.platforms,
    headerData: {
      github: {
        stars
      }
    }
  }
}
