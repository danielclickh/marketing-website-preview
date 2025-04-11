import { getFooterData } from '@/components/Footer/getFooterData'
import { FooterData } from '@/components/Footer/types'
import { getGetStartedData } from '@/components/GetStarted/getStartedData'
import { GettingStartedPlatform } from '@/components/GetStarted/types'
import { HeaderProps } from '@/components/Header/types'
import githubStars from '../../../public/githubStars.json'

interface Props {
  footerData: FooterData
  platforms: Array<GettingStartedPlatform>
  headerData: HeaderProps
}

export async function getCommonProps(): Promise<Props> {
  const footerData = await getFooterData()
  const getStartedData = await getGetStartedData()

  // Set default fallback
  let stars = 36719

  if (
    typeof githubStars === 'object' &&
    'stars' in githubStars &&
    typeof githubStars.stars === 'number'
  ) {
    stars = githubStars.stars
  } else if (process.env.NEXT_IS_PROD === 'true') {
    throw new Error('Failed to get GitHub stars.')
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
