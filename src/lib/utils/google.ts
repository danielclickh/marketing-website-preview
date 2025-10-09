import { getBrowserCookie } from '@/lib/utils/cookies'

/**
 * Extracts the user ID from the Google Analytics device ID.
 * @example `GA1.1.xxxxxxxxxx.xxxxxxxxxx => xxxxxxxxxx-xxxxxxxxxx`
 * @link https://support.google.com/analytics/answer/11397207
 */
const extractGoogleAnalyticsUserIdFromCookie = (
  gaCookie: string | undefined
) => {
  if (gaCookie) {
    // Remove the Google Analytics tracker from the device ID.
    const userIdParts = gaCookie.split('.').slice(-2)
    if (userIdParts.length === 2) {
      return userIdParts.join('-')
    }
  }
  return undefined
}

/**
 * Returns the Google Analytics User ID from a browser cookie name.
 * @example `getGoogleAnalyticsUserIdFromBrowserCookie('_ga')`
 */
export const getGoogleAnalyticsUserIdFromBrowserCookie = (
  cookieName: string
) => {
  const browserCookie = getBrowserCookie(cookieName)
  return extractGoogleAnalyticsUserIdFromCookie(browserCookie)
}
