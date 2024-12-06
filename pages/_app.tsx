import { ClickUIProvider, ThemeName } from '@clickhouse/click-ui'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import { AppProps } from 'next/app'
import { Inconsolata, Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { SnackbarContextProvider } from '../components/sui'
import UTMPersist, { onExperimentViewed } from '../components/UTMPersist'
import { useInitGalaxy } from '../lib/galaxy/galaxy'
import { Galaxy } from '../lib/galaxy/web/browser'
import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import '../styles/securiti-cookie-banner.scss'
import '../styles/securiti-overrides.scss'

const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-TL8H72K'
const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
let is_prod = false

if (websiteUrl === 'https://clickhouse.com') {
  is_prod = true
} else {
  is_prod = false
}

const inter = Inter({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

const inconsolata = Inconsolata({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inconsolata',
  adjustFontFallback: false,
  fallback: []
})

// Create a client-side GrowthBook instance
const gb = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  enableDevMode: true,
  trackingCallback: onExperimentViewed
})

// Let the GrowthBook instance know when the URL changes so the active
// experiments can update accordingly
function updateGrowthBookURL() {
  gb.setURL(window.location.href)
}

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeName>('dark')

  const router = useRouter()
  useInitGalaxy()

  useEffect(() => {
    const glx_id = Galaxy.getGalaxySessionId()

    // Load features from the GrowthBook API and keep them up-to-date
    gb.loadFeatures({ autoRefresh: true })
    gb.setAttributes({
      user_id: undefined,
      session_id: glx_id,
      id: glx_id
    })
    // Subscribe to route change events and update GrowthBook
    router.events.on('routeChangeComplete', updateGrowthBookURL)
    return () => router.events.off('routeChangeComplete', updateGrowthBookURL)
  }, [])

  return (
    <>
      <ClickUIProvider theme={theme}>
        <Head>
          <base href='/' />
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <link href='favicon.ico' rel='icon' type='image/x-icon' />
        </Head>
        <GrowthBookProvider growthbook={gb}>
          <main
            id='main-site-container'
            className={`${inter.variable} font-inter ${inconsolata.variable}`}>
            <SnackbarContextProvider>
              <div className='flex min-h-screen flex-col'>
                <Component {...pageProps} />
              </div>
            </SnackbarContextProvider>
          </main>
          <UTMPersist />
        </GrowthBookProvider>
        {/* GTM - Prod/Env environments */}
        {is_prod && router.pathname !== '/marketo-forms/[id]' && (
          <>
            <Script
              id='gtm-gtag'
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
            />
            <Script
              id='gtm-init'
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtmId}');`
              }}
            />
            <Script
              id='stripmkttok-script'
              src='https://discover.clickhouse.com/js/stripmkttok.js'
              type='text/javascript'
              async
            />
            {/* Securiti.ai Cookie Banner - first is produciton mode, second is dev */}
            <Script
              defer
              data-strict-csp
              data-skip-css='false'
              src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
              data-tenant-uuid='8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
              data-domain-uuid='e058d040-977c-4594-aa2c-84b844ce5cf0'
              data-backend-url='https://app.securiti.ai'
              onReady={() => {
                const cookieSettingsButton = document.querySelector(
                  '#cookie-settings-button'
                )
                cookieSettingsButton?.classList.remove('hidden')
                cookieSettingsButton?.classList.add('cmp-revoke-consent')
              }}
            />
          </>
        )}
      </ClickUIProvider>
    </>
  )
}

export default MyApp
