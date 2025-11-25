import GlobalSearchProvider from '@/components-cleaned/GlobalSearchProvider'
import SmartBackProvider from '@/components-cleaned/SmartBackProvider'
import UTMPersist, { onExperimentViewed } from '@/components/UTMPersist'
import { useInitGalaxy } from '@/lib/galaxy/galaxy'
import { Galaxy } from '@/lib/galaxy/web/browser'
import '@/styles/globals.scss'
import '@/styles/securiti-overrides.scss'
import { ClickUIProvider, ThemeName } from '@clickhouse/click-ui'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import { GoogleTagManager } from '@next/third-parties/google'
import { AppProps } from 'next/app'
import { Inconsolata, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useReportWebVitals } from 'next/web-vitals'
import { useEffect, useState } from 'react'

const GTM_ID = process?.env?.NEXT_PUBLIC_GTM

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

const basier = localFont({
  variable: '--font-basier',
  display: 'swap',
  src: [
    {
      path: '../fonts/BasierSquare/basiersquare-medium-webfont.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/BasierSquare/basiersquare-semibold-webfont.woff',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/BasierSquare/basiersquare-bold-webfont.woff',
      weight: '700',
      style: 'normal'
    }
  ]
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

  useReportWebVitals((metric) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'web_vitals',
        webVitalsData: metric
      })
    }
  })

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

  const isMarketoIframe = router.pathname === '/marketo-forms/[id]'

  return (
    <>
      <ClickUIProvider theme={theme}>
        <Head>
          <base href='/' />
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <meta
            content='telephone=no, address=no, email=no'
            name='format-detection'
          />
          <meta name='apple-mobile-web-app-title' content='ClickHouse' />
          <link rel='manifest' href='/site.webmanifest' />
          <link
            href='/favicon.ico'
            rel='icon'
            sizes='48x48'
            type='image/x-icon'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link
            rel='icon'
            type='image/png'
            href='/favicons/favicon-96x96.png'
            sizes='96x96'
          />
          <link rel='icon' type='image/svg+xml' href='/favicons/favicon.svg' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/favicons/apple-touch-icon.png'
          />
        </Head>
        <GrowthBookProvider growthbook={gb}>
          <GlobalSearchProvider enabled={!isMarketoIframe}>
            <SmartBackProvider>
              <div
                id='main-site-container'
                className={`${inter.variable} font-inter ${inconsolata.variable} ${basier.variable}`}>
                <div className='flex min-h-screen flex-col'>
                  <Component {...pageProps} />
                </div>
              </div>
              <UTMPersist />
            </SmartBackProvider>
          </GlobalSearchProvider>
        </GrowthBookProvider>

        {/* Exclude tracking from marketo iframe routes */}
        {!isMarketoIframe && (
          <>
            {/* GTM */}
            {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

            {/* Cleans marketo email tracking tokens */}
            <Script
              id='stripmkttok-script'
              src='https://discover.clickhouse.com/js/stripmkttok.js'
              type='text/javascript'
              async
            />

            {/* Securiti.ai Cookie Banner */}
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
