import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import '../styles/securiti-cookie-banner.scss'
import '../styles/securiti-overrides.scss'
import React, { useEffect } from 'react'
import { Inconsolata, Inter } from 'next/font/google'
import { SnackbarContextProvider } from '../components/sui'
import { AppProps } from 'next/app'
import Script from 'next/script'
import UTMPersist, { onExperimentViewed } from '../components/UTMPersist'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useInitGalaxy } from '../lib/galaxy/galaxy'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import { Galaxy } from '../lib/galaxy/web/browser'

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
  trackingCallback: onExperimentViewed,
  features: {
    'redirect-cp-login-to-uc': {
      defaultValue: false
    },
    'tilted-text': {
      defaultValue: false,
      rules: [
        {
          coverage: 1,
          seed: 'mktg-hero-tilted-text',
          hashVersion: 2,
          variations: [false, true],
          weights: [0.5, 0.5],
          key: 'mktg-hero-tilted-text',
          meta: [
            {
              key: '0',
              name: 'Control'
            },
            {
              key: '1',
              name: 'Variation 1'
            }
          ],
          phase: '0',
          name: 'mktg-hero-tilted-text'
        }
      ]
    }
  }
})

// Let the GrowthBook instance know when the URL changes so the active
// experiments can update accordingly
function updateGrowthBookURL() {
  gb.setURL(window.location.href)
}

function MyApp({ Component, pageProps }: AppProps) {
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
      <Head>
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </Head>
      <GrowthBookProvider growthbook={gb}>
        <main
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
      {router.pathname !== '/marketo-forms/[id]' && (
        <>
          {is_prod ? (
            // THIS IS PRODUCTION
            <Script id='google-tag-manager' strategy='lazyOnload'>
              {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmId}');
          `}
            </Script>
          ) : (
            // THIS IS DEV/LOCAL
            <Script id='google-tag-manager' strategy='lazyOnload'>
              {`
            <!-- Google Tag Manager -->
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=BzKh0v8t1wje2QxxRxIGzA&gtm_preview=env-74&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
            </Script>
          )}
          <Script
            id='stripmkttok-script'
            src='https://discover.clickhouse.com/js/stripmkttok.js'
            type='text/javascript'
            async
          />
          {/* Securiti.ai Cookie Banner - first is produciton mode, second is dev */}
          {is_prod ? (
            // THIS IS PRODUCTION
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
          ) : (
            // THIS IS DEV/LOCAL
            <Script
              defer
              data-skip-css='false'
              data-strict-csp
              src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
              data-tenant-uuid='8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
              data-domain-uuid='e058d040-977c-4594-aa2c-84b844ce5cf0'
              data-backend-url='https://app.securiti.ai'
              onReady={() => {
                console.log('Cookie banner in dev mode')
                const cookieSettingsButton = document.querySelector(
                  '#cookie-settings-button'
                )
                cookieSettingsButton?.classList.remove('hidden')
                cookieSettingsButton?.classList.add('cmp-revoke-consent')
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default MyApp
